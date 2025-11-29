import { db, doc, getDoc, updateDoc, arrayUnion } from "./firebase-config.js";

const GEMINI_API_KEY = "AIzaSyAujS0R7sxSpH1LvfU93o3Sm--uCV1qqqo";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const question = urlParams.get('question');
    const desc = urlParams.get('desc');

    // Check Login
    const username = localStorage.getItem('ime_username');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }

    if (!question) {
        window.location.href = 'dashboard.html';
        return;
    }

    document.getElementById('questionTitle').textContent = question;
    document.getElementById('questionDesc').textContent = desc || '';

    const learntBtn = document.getElementById('learntBtn');
    let isLearnt = false;

    // Check Firestore if already learnt
    try {
        const userRef = doc(db, "users", username.toLowerCase());
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            const learntQuestions = userData.learnt_questions || [];
            if (learntQuestions.includes(question)) {
                isLearnt = true;
                markAsLearntUI(learntBtn);
            }
        }
    } catch (error) {
        console.error("Error checking learnt status:", error);
    }

    // Call Gemini
    try {
        const answer = await getGeminiAnswer(question, desc);
        renderAnswer(answer);
    } catch (error) {
        console.error(error);
        document.getElementById('answerArea').innerHTML = `
            <div style="color: #ef4444; text-align: center; padding: 2rem;">
                <p>Error generating answer. Please try again.</p>
                <p style="font-size: 0.8rem; opacity: 0.7;">${error.message}</p>
            </div>
        `;
    }

    // Handle Learnt Click
    learntBtn.addEventListener('click', async () => {
        if (!isLearnt) {
            try {
                learntBtn.disabled = true;
                learntBtn.textContent = "Saving...";

                const userRef = doc(db, "users", username.toLowerCase());
                await updateDoc(userRef, {
                    learnt_questions: arrayUnion(question)
                });

                markAsLearntUI(learntBtn);

                // Redirect back after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            } catch (error) {
                console.error("Error marking as learnt:", error);
                alert("Failed to save progress. Please check your connection.");
                learntBtn.disabled = false;
                learntBtn.textContent = "Mark as Learnt";
            }
        } else {
            window.location.href = 'dashboard.html';
        }
    });
});

function markAsLearntUI(btn) {
    btn.innerHTML = "Learnt ✓";
    btn.style.background = "rgba(16, 185, 129, 0.2)";
    btn.style.color = "#34d399";
    btn.style.border = "1px solid rgba(16, 185, 129, 0.3)";
    btn.disabled = false;
}

async function getGeminiAnswer(title, desc) {
    const prompt = `
        Subject: Industrial Management and Entrepreneurship (IME)
        Question: ${title}
        Context: ${desc}
        
        Please provide a concise, easy-to-understand answer to this question suitable for a student preparing for an exam. 
        Use bullet points where appropriate. Format with Markdown.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error("No answer generated.");
    }
}

function renderAnswer(text) {
    const container = document.getElementById('answerArea');
    container.innerHTML = marked.parse(text);
}
