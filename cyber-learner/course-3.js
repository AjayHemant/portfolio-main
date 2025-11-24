// Course 3 - Python Hacking Modules JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-test-btn")
  const testResult = document.querySelector(".test-result")
  const scoreDisplay = document.querySelector(".score-display")
  const resultMessage = document.querySelector(".result-message")
  const nextCourseBtn = document.querySelector(".next-course-btn")
  const retryBtn = document.querySelector(".retry-btn")

  // Correct answers
  const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: "b",
    q4: "b",
    q5: "b",
    q6: "b",
    q7: "a",
    q8: "b",
    q9: "b",
    q10: "b",
    q11: "c",
    q12: "b",
    q13: "b",
    q14: "b",
    q15: "b",
    q16: "a",
    q17: "b",
    q18: "b",
    q19: "c",
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
      scoreDisplay.style.color = "#00bfff"
      resultMessage.textContent = "Congratulations! You passed the test and can proceed to the next course."
      resultMessage.style.color = "#00bfff"
      nextCourseBtn.style.display = "inline-block"
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
    window.location.href = "course-4.html"
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

    if (!progress.completedCourses.includes(3)) {
      progress.completedCourses.push(3)
      progress.currentCourse = 4
      localStorage.setItem("cyberLearnerProgress", JSON.stringify(progress))
    }
  }
})
