// Course 14 - Ethical Hacking Methodology JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-test-btn")
  const testResult = document.querySelector(".test-result")
  const scoreDisplay = document.querySelector(".score-display")
  const resultMessage = document.querySelector(".result-message")
  const completeCourseBtn = document.querySelector(".complete-course-btn")
  const retryBtn = document.querySelector(".retry-btn")

  // Correct answers
  const correctAnswers = {
    q1: "a",
    q2: "b",
    q3: "b",
    q4: "c",
    q5: "b",
    q6: "b",
    q7: "c",
    q8: "b",
    q9: "a",
    q10: "b",
    q11: "b",
    q12: "b",
    q13: "a",
    q14: "b",
    q15: "a",
    q16: "b",
    q17: "b",
    q18: "c",
    q19: "c",
    q20: "b",
  }

  submitBtn.addEventListener("click", () => {
    let score = 0
    const totalQuestions = 20

    for (let i = 1; i <= totalQuestions; i++) {
      const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`)
      if (selectedAnswer && selectedAnswer.value === correctAnswers[`q${i}`]) {
        score++
      }
    }

    testResult.style.display = "block"
    scoreDisplay.textContent = `Final Score: ${score}/${totalQuestions}`

    if (score >= 18) {
      scoreDisplay.style.color = "#00ff7f"
      resultMessage.textContent =
        "🎉 Congratulations! You have successfully completed the Cyber Learner course! You are now ready to begin your journey in ethical hacking."
      resultMessage.style.color = "#00ff7f"
      completeCourseBtn.style.display = "inline-block"
      retryBtn.style.display = "none"
      markCourseComplete()
    } else {
      scoreDisplay.style.color = "#ff4444"
      resultMessage.textContent = `You need at least 18 correct answers to pass the final test. You got ${score}. Please study the material again and retry.`
      resultMessage.style.color = "#ff4444"
      completeCourseBtn.style.display = "none"
      retryBtn.style.display = "inline-block"
    }

    testResult.scrollIntoView({ behavior: "smooth" })
  })

  completeCourseBtn.addEventListener("click", () => {
    // Show completion message and redirect to main page
    alert(
      "🎓 Course Completed! You have successfully finished all 14 courses in the Cyber Learner platform. Continue practicing and stay updated with the latest security trends!",
    )
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

    if (!progress.completedCourses.includes(14)) {
      progress.completedCourses.push(14)
      progress.currentCourse = 14 // All courses completed
      progress.allCoursesCompleted = true
      localStorage.setItem("cyberLearnerProgress", JSON.stringify(progress))
    }
  }
})
