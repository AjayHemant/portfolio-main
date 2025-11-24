const firebaseConfig = {
    apiKey: "AIzaSyA94TXINfS7X96N_28qOv6z2osIbd9Fzz4",
    authDomain: "solo-leveling-88381.firebaseapp.com",
    projectId: "solo-leveling-88381",
    storageBucket: "solo-leveling-88381.firebasestorage.app",
    messagingSenderId: "242279025138",
    appId: "1:242279025138:web:a09b16db869a067ce2c36b",
    measurementId: "G-02RESFZT2B"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Auth handlers
  document.getElementById('signupBtn').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'main.html')
      .catch(error => showError(error.message));
  });

  document.getElementById('loginBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => window.location.href = 'main.html')
      .catch(error => showError(error.message));
  });

  document.getElementById('googleAuth').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => window.location.href = 'main.html')
      .catch(error => showError(error.message));
  });

  function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(() => errorDiv.style.display = 'none', 5000);
  }