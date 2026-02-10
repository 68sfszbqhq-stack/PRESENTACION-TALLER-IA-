// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDeLawqVQwQBO5d6G_LfNBasX9VMIceHXQ",
    authDomain: "taller-ia-docente.firebaseapp.com",
    databaseURL: "https://taller-ia-docente-default-rtdb.firebaseio.com", // Importante: URL de la RTDB
    projectId: "taller-ia-docente",
    storageBucket: "taller-ia-docente.firebasestorage.app",
    messagingSenderId: "1009886707689",
    appId: "1:1009886707689:web:b4c4665df35984bce71578",
    measurementId: "G-B3GML8HF2S"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
console.log("Firebase inicializado correctamente con Database URL");
