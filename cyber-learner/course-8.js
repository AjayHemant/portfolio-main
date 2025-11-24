// Course 8 - Packet Analysis JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-test-btn")
  const testResult = document.querySelector(".test-result")
  const scoreDisplay = document.querySelector(".score-display")
  const resultMessage = document.querySelector(".result-message")
  const nextCourseBtn = document.querySelector(".next-course-btn")
  const retryBtn = document.querySelector(".retry-btn")

  // Correct answers
  const correctAnswers = {
    q1: "b",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "b",
    q6: "a",
    q7: "b",
    q8: "b",
    q9: "c",
    q10: "b",
    q11: "c",
    q12: "a",
    q13: "b",
    q14: "b",
    q15: "c",
    q16: "b",
    q17: "b",
    q18: "b",
    q19: "b",
    q20: "b",
  }

  submitBtn.addEventListener("click", () => {
    let score = 0
    const totalQuestions = 20

    // Check answers
    for (let i = 1; i <= totalQuestions; i++) {
      const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`)
      if (selectedAnswer && selectedAnswer.value === correctAnswers[`q${i}`]) {
        score++
      }
    }

    // Display results
    testResult.style.display = "block"
    scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`

    if (score >= 18) {
      scoreDisplay.style.color = "#daa520"
      resultMessage.textContent =
        "Congratulations! You passed the test and completed the Networking Foundations section!"
      resultMessage.style.color = "#daa520"
      nextCourseBtn.style.display = "inline-block"
      nextCourseBtn.textContent = "Continue to Hacking Tools"
      retryBtn.style.display = "none"
      markCourseComplete()
    } else {
      scoreDisplay.style.color = "#ff4444"
      resultMessage.textContent = `You need at least 18 correct answers to pass. You got ${score}. Please study the material again and retry.`
      resultMessage.style.color = "#ff4444"
      nextCourseBtn.style.display = "none"
      retryBtn.style.display = "inline-block"
    }

    testResult.scrollIntoView({ behavior: "smooth" })
  })

  nextCourseBtn.addEventListener("click", () => {
    // Since we're only going up to course 8, redirect back to main page
    window.location.href = "index.html"
  })

  retryBtn.addEventListener("click", () => {
    const radios = document.querySelectorAll('input[type="radio"]')
    radios.forEach((radio) => (radio.checked = false))
    testResult.style.display = "none"
    document.querySelector(".test-section").scrollIntoView({ behavior: "smooth" })
  })

  function markCourseComplete() {
    const progress = JSON.parse(localStorage.getItem("cyberLearnerProgress")) || {
      currentCourse: 1,
      completedCourses: [],
    }

    if (!progress.completedCourses.includes(8)) {
      progress.completedCourses.push(8)
      progress.currentCourse = 9
      localStorage.setItem("cyberLearnerProgress", JSON.stringify(progress))
    }
  }
})
