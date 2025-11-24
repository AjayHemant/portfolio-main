// Smooth scrolling for better UX
let currentCourse = 1
let completedCourses = []

document.addEventListener("DOMContentLoaded", () => {
  // Progression system state

  // Load progress from localStorage
  loadProgress()

  // Update UI based on current progress
  updateProgressionUI()

  // Add click handlers to available start buttons
  addStartButtonHandlers()

  // Add visual effects
  initializeVisualEffects()

  // Add hover effects for topic cards
  const topicCards = document.querySelectorAll(".topic-card:not(.locked)")

  topicCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add subtle glow effect
      this.style.filter = "brightness(1.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.filter = ""
    })
  })

  // Animate XP bar on page load
  setTimeout(() => {
    const xpBar = document.querySelector(".xp-bar")
    if (xpBar) {
      xpBar.style.width = "0%"
      setTimeout(() => {
        xpBar.style.width = "65%"
      }, 500)
    }
  }, 1000)

  // Initially hide cards for animation
  // This is handled in initializeVisualEffects function

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault()
      // Focus on first available start button
      const firstButton = document.querySelector(".start-btn:not([disabled])")
      if (firstButton) {
        firstButton.focus()
      }
    }
  })

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault()
      // Reset progress (for testing)
      if (confirm("Reset all progress? This cannot be undone.")) {
        localStorage.removeItem("cyberLearnerProgress")
        currentCourse = 1
        completedCourses = []
        updateProgressionUI()
      }
    }
  })

  // Performance optimization: Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add("reduced-motion")
  }
})

function loadProgress() {
  const savedProgress = localStorage.getItem("cyberLearnerProgress")
  if (savedProgress) {
    const progress = JSON.parse(savedProgress)
    currentCourse = progress.currentCourse || 1
    completedCourses = progress.completedCourses || []
  }
}

function saveProgress() {
  const progress = {
    currentCourse: currentCourse,
    completedCourses: completedCourses,
  }
  localStorage.setItem("cyberLearnerProgress", JSON.stringify(progress))
}

function updateProgressionUI() {
  const allCards = document.querySelectorAll(".topic-card")
  const progressBar = document.querySelector(".progress-bar")
  const progressText = document.querySelector(".progress-text")
  const currentLevelText = document.querySelector(".current-level")

  // Update progress bar
  const totalCourses = 14 // Not including future courses
  const progressPercentage = (completedCourses.length / totalCourses) * 100
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`
  }

  // Update progress text
  if (progressText) {
    progressText.textContent = `Course ${currentCourse} of ${totalCourses}`
  }

  // Update current level
  if (currentLevelText) {
    if (currentCourse <= 3) {
      currentLevelText.textContent = "Level 1"
    } else if (currentCourse <= 9) {
      currentLevelText.textContent = "Level 2"
    } else if (currentCourse <= 14) {
      currentLevelText.textContent = "Level 3"
    } else {
      currentLevelText.textContent = "Complete!"
    }
  }

  // Update cards
  allCards.forEach((card) => {
    const courseNumber = Number.parseInt(card.dataset.course)
    const statusIndicator = card.querySelector(".status-indicator")
    const startBtn = card.querySelector(".start-btn")

    if (!courseNumber) return // Skip future courses

    // Remove all status classes
    card.classList.remove("available", "locked", "completed")

    if (completedCourses.includes(courseNumber)) {
      // Completed course
      card.classList.add("completed")
      statusIndicator.textContent = "✅"
      statusIndicator.classList.remove("current")
      startBtn.textContent = "Completed"
      startBtn.disabled = true
      startBtn.style.background = "linear-gradient(45deg, #4CAF50, #45a049)"
      startBtn.style.color = "#fff"
    } else if (courseNumber === currentCourse) {
      // Current available course
      card.classList.add("available")
      statusIndicator.textContent = "▶"
      statusIndicator.classList.add("current")
      startBtn.textContent = "Start Course"
      startBtn.disabled = false
    } else if (courseNumber > currentCourse) {
      // Locked course
      card.classList.add("locked")
      statusIndicator.textContent = "🔒"
      statusIndicator.classList.remove("current")
      const requiredCourse = courseNumber - 1
      startBtn.textContent = `Complete Course ${requiredCourse}`
      startBtn.disabled = true
    }
  })
}

function addStartButtonHandlers() {
  const startButtons = document.querySelectorAll(".start-btn")

  startButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      if (this.disabled) return

      const topicCard = this.closest(".topic-card")
      const courseNumber = Number.parseInt(topicCard.dataset.course)

      // Navigate to course page
      window.location.href = `course-${courseNumber}.html`
    })
  })
}

function markCourseComplete(courseNumber) {
  if (!completedCourses.includes(courseNumber)) {
    completedCourses.push(courseNumber)
  }

  if (courseNumber === currentCourse && currentCourse < 14) {
    currentCourse++
  }

  saveProgress()
  updateProgressionUI()
}

// Make function available globally
window.markCourseComplete = markCourseComplete

function showCompletionNotification(courseTitle) {
  // Create notification element
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #00ff41, #00cc33);
    color: #000;
    padding: 20px 30px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 1.1rem;
    z-index: 10000;
    box-shadow: 0 10px 30px rgba(0, 255, 65, 0.3);
    animation: slideIn 0.3s ease;
  `

  notification.innerHTML = `
    <div style="text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 10px;">🎉</div>
      <div>Course Completed!</div>
      <div style="font-size: 0.9rem; margin-top: 5px; opacity: 0.8;">${courseTitle}</div>
    </div>
  `

  // Add animation keyframes
  const style = document.createElement("style")
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease reverse"
    setTimeout(() => {
      document.body.removeChild(notification)
      document.head.removeChild(style)
    }, 300)
  }, 3000)
}

function initializeVisualEffects() {
  // Add intersection observer for card animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Initially hide cards for animation
  const topicCards = document.querySelectorAll(".topic-card")
  topicCards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Add floating particles
  setInterval(createFloatingParticle, 3000)

  // Add glitch effect to network attacks card
  const networkAttacksCard = document.querySelector(".network-attacks")
  if (networkAttacksCard) {
    setInterval(() => {
      if (Math.random() < 0.1) {
        networkAttacksCard.style.filter = "hue-rotate(180deg)"
        setTimeout(() => {
          networkAttacksCard.style.filter = ""
        }, 100)
      }
    }, 1000)
  }
}

function createFloatingParticle() {
  const particle = document.createElement("div")
  particle.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: #00ff41;
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
  `

  const startX = Math.random() * window.innerWidth
  const startY = window.innerHeight + 10

  particle.style.left = startX + "px"
  particle.style.top = startY + "px"

  document.body.appendChild(particle)

  const animation = particle.animate(
    [
      { transform: "translateY(0px)", opacity: 0.3 },
      { transform: `translateY(-${window.innerHeight + 20}px)`, opacity: 0 },
    ],
    {
      duration: 3000 + Math.random() * 2000,
      easing: "linear",
    },
  )

  animation.onfinish = () => {
    particle.remove()
  }
}

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth"
