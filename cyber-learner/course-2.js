// Course 2 - Python Programming JavaScript
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
    q5: "c",
    q6: "a",
    q7: "b",
    q8: "b",
    q9: "a",
    q10: "b",
    q11: "b",
    q12: "a",
    q13: "b",
    q14: "a",
    q15: "b",
    q16: "b",
    q17: "b",
    q18: "c",
    q19: "a",
    q20: "b",
  }

  submitBtn.addEventListener("click", () => {
    const formData = new FormData()
    const questions = document.querySelectorAll(".question")
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
      scoreDisplay.style.color = "#ff6b6b"
      resultMessage.textContent = "Congratulations! You passed the test and can proceed to the next course."
      resultMessage.style.color = "#ff6b6b"
      nextCourseBtn.style.display = "inline-block"
      retryBtn.style.display = "none"

      // Mark course as complete
      markCourseComplete()
    } else {
      scoreDisplay.style.color = "#ff4444"
      resultMessage.textContent = `You need at least 18 correct answers to pass. You got ${score}. Please study the material again and retry.`
      resultMessage.style.color = "#ff4444"
      nextCourseBtn.style.display = "none"
      retryBtn.style.display = "inline-block"
    }

    // Scroll to results
    testResult.scrollIntoView({ behavior: "smooth" })
  })

  nextCourseBtn.addEventListener("click", () => {
    window.location.href = "course-3.html"
  })

  retryBtn.addEventListener("click", () => {
    // Reset all radio buttons
    const radios = document.querySelectorAll('input[type="radio"]')
    radios.forEach((radio) => (radio.checked = false))

    // Hide results
    testResult.style.display = "none"

    // Scroll to top of test
    document.querySelector(".test-section").scrollIntoView({ behavior: "smooth" })
  })

  function markCourseComplete() {
    // Save completion to localStorage
    const progress = JSON.parse(localStorage.getItem("cyberLearnerProgress")) || {
      currentCourse: 1,
      completedCourses: [],
    }

    if (!progress.completedCourses.includes(2)) {
      progress.completedCourses.push(2)
      progress.currentCourse = 3
      localStorage.setItem("cyberLearnerProgress", JSON.stringify(progress))
    }
  }
})
