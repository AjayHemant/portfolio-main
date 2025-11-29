import { db, doc, getDoc } from "./firebase-config.js";

// Render Functions
function getTagClass(text) {
    const lower = text.toLowerCase();
    if (lower.includes('high') || lower.includes('90%') || lower.includes('88%') || lower.includes('85%')) return 'tag-high';
    if (lower.includes('medium') || lower.includes('82%') || lower.includes('78%') || lower.includes('75%')) return 'tag-medium';
    if (lower.includes('low')) return 'tag-low';
    if (lower.includes('long')) return 'tag-long';
    if (lower.includes('short')) return 'tag-short';
    return 'tag-default';
}

function createCard(item, type, learntQuestions) {
    const div = document.createElement('div');
    div.className = 'card';

    // Check if learnt
    const isLearnt = learntQuestions.includes(item.title);

    if (isLearnt) {
        div.classList.add('card-learnt');
    }

    let tagText = '';
    if (type === 'recurring') tagText = item.frequency;
    else if (type === 'likely') tagText = item.probability;
    else if (type === 'common') tagText = item.type;

    const tagClass = getTagClass(tagText);

    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:start;">
            <h3>${item.title}</h3>
            ${isLearnt ? '<span style="color:#34d399; font-weight:bold;">✓</span>' : ''}
        </div>
        <p>${item.desc}</p>
        <span class="tag ${tagClass}">${tagText}</span>
    `;

    // Add click event
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
        const params = new URLSearchParams({
            question: item.title,
            desc: item.desc
        });
        window.location.href = `answer.html?${params.toString()}`;
    });

    return div;
}

function renderColumn(data, elementId, type, learntQuestions) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear existing content
    data.forEach(item => {
        container.appendChild(createCard(item, type, learntQuestions));
    });
}

function updateProgressDashboard(learntQuestions, totalQuestions) {
    const learnedCount = learntQuestions.length;
    const percentage = totalQuestions > 0 ? Math.round((learnedCount / totalQuestions) * 100) : 0;

    document.getElementById('learnedCount').textContent = learnedCount;
    document.getElementById('totalCount').textContent = totalQuestions;
    document.getElementById('percentComplete').textContent = percentage + '%';

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + '%';
}

async function loadDashboardData(username) {
    try {
        // Fetch User Data (Learnt Questions)
        let learntQuestions = [];
        try {
            const userRef = doc(db, "users", username.toLowerCase());
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                learntQuestions = userSnap.data().learnt_questions || [];
            }
        } catch (error) {
            console.error("Error fetching user progress:", error);
        }

        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Update Header Info
        const subjectInfo = document.querySelector('.subject-info');
        if (subjectInfo) {
            subjectInfo.textContent = `${data.subjectName} (${data.subjectCode})`;
        }

        // Render Columns
        renderColumn(data.recurringTopics, 'recurring-topics', 'recurring', learntQuestions);
        renderColumn(data.likelyQuestions, 'likely-questions', 'likely', learntQuestions);
        renderColumn(data.commonTypes, 'common-types', 'common', learntQuestions);

        // Calculate total questions
        const totalQuestions = data.recurringTopics.length + data.likelyQuestions.length + data.commonTypes.length;
        updateProgressDashboard(learntQuestions, totalQuestions);

    } catch (error) {
        console.error("Could not load dashboard data:", error);
        // Fallback or error message could go here
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check login status
    const username = localStorage.getItem('ime_username');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    // Update username display
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        userDisplay.textContent = username;
    }

    // Load dashboard data
    loadDashboardData(username);
});
