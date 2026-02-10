// Lógica del Participante

const sessionCodeFromUrl = urlParams.get('session') || urlParams.get('code'); // Soportar ambos params
let sessionCode = sessionCodeFromUrl || 'TALLER-IA'; // Default automático

// Referencias DOM
const loginScreen = document.getElementById('login-screen');
const waitingScreen = document.getElementById('waiting-screen');
const interactionScreen = document.getElementById('interaction-screen');
const interactionArea = document.getElementById('interaction-area');
const currentQuestion = document.getElementById('current-question');
const displayNameSpan = document.getElementById('display-name');

let currentUser = {
    name: '',
    id: '' // Generado o de auth
};

const database = firebase.database();
let sessionRef;

function joinSession() {
    const usernameInput = document.getElementById('username').value;
    if (!usernameInput) return alert('Por favor ingresa tu nombre');

    // Código ya definido por defecto arriba, no hace falta validación estricta

    currentUser.name = usernameInput;
    currentUser.id = Date.now().toString(); // ID temporal simple

    document.getElementById('username').value = '';
    loginScreen.style.display = 'none';
    waitingScreen.style.display = 'block';
    displayNameSpan.textContent = currentUser.name;

    sessionRef = database.ref('sessions/' + sessionCode);

    // Registrar usuario (opcional)
    sessionRef.child('users').child(currentUser.id).set({
        name: currentUser.name,
        joinedAt: firebase.database.ServerValue.TIMESTAMP
    });

    // Generar QR para compartir
    const shareContainer = document.getElementById('share-container');
    const shareQr = document.getElementById('share-qr');
    if (shareContainer && shareQr) {
        shareContainer.style.display = 'block';
        shareQr.innerHTML = '';
        new QRCode(shareQr, {
            text: window.location.href, // La URL actual ya tiene ?code=...
            width: 100,
            height: 100,
            colorDark: "#333333",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    }

    listenToSession();
}

function listenToSession() {
    sessionRef.on('value', (snapshot) => {
        const sessionData = snapshot.val();
        if (!sessionData) return;

        const slideIndex = sessionData.currentSlide;
        const slideData = presentationData[slideIndex]; // Necesitamos acceder a la data también aquí

        updateInterface(slideData);
    });
}

function updateInterface(slide) {
    if (!slide) return;

    // Siempre mostrar la pantalla de interacción (ahora sirve para contenido también)
    waitingScreen.style.display = 'none';
    interactionScreen.style.display = 'block';

    // Título de la diapositiva o pregunta
    currentQuestion.textContent = slide.title || slide.question;

    // Limpiar área de contenido/interacción
    interactionArea.innerHTML = '';

    if (slide.type === 'content') {
        // Renderizar el contenido HTML (Texto, listas, etc.)
        const contentDiv = document.createElement('div');
        contentDiv.className = 'mobile-slide-content'; // Clase para CSS específico móvil
        contentDiv.innerHTML = slide.content;
        interactionArea.appendChild(contentDiv);
    } else {
        // Diapositivas interactivas (Encuestas, etc.)
        if (slide.type === 'poll') {
            renderPollOptions(slide);
        } else if (slide.type === 'brainstorm') {
            renderBrainstormInput(slide);
        } else if (slide.type === 'team_board') {
            renderBoardInput(slide);
        }
    }
}

function renderPollOptions(slide) {
    slide.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.style.width = '100%';
        btn.style.marginBottom = '10px';
        btn.textContent = option;
        btn.onclick = () => submitVote(slide.id, option);
        interactionArea.appendChild(btn);
    });
}

function renderBrainstormInput(slide) {
    const input = document.createElement('textarea');
    input.placeholder = 'Escribe tu idea aquí...';
    input.style.width = '100%';
    input.style.padding = '1rem';
    input.style.marginBottom = '1rem';
    input.rows = 4;

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Enviar Idea';
    btn.onclick = () => {
        if (input.value.trim()) submitBrainstorm(slide.id, input.value);
    };

    interactionArea.appendChild(input);
    interactionArea.appendChild(btn);
}

function renderBoardInput(slide) {
    const label = document.createElement('label');
    label.textContent = "Selecciona la Columna:";
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const select = document.createElement('select');
    select.style.width = '100%';
    select.style.padding = '10px';
    select.style.marginBottom = '15px';
    select.style.fontSize = '1rem';

    slide.columns.forEach((col, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = col;
        select.appendChild(opt);
    });

    const input = document.createElement('textarea');
    input.placeholder = 'Escribe tu aporte para esta columna...';
    input.style.width = '100%';
    input.style.padding = '1rem';
    input.style.marginBottom = '1rem';
    input.rows = 4;

    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Agregar al Cuadro';
    btn.onclick = () => {
        if (input.value.trim()) {
            submitBoardItem(slide.id, parseInt(select.value), input.value);
            input.value = ''; // Clear input but keep column selected
        }
    };

    interactionArea.appendChild(label);
    interactionArea.appendChild(select);
    interactionArea.appendChild(input);
    interactionArea.appendChild(btn);
}

function submitVote(slideId, option) {
    sessionRef.child('responses').child(slideId).child(currentUser.id).set(option);
    alert('¡Voto enviado!');
    waitingScreen.style.display = 'block';
    interactionScreen.style.display = 'none';
}

function submitBrainstorm(slideId, text) {
    sessionRef.child('responses').child(slideId).push({
        text: text,
        author: currentUser.name,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    alert('¡Idea enviada!');
    document.querySelector('textarea').value = '';
}

function submitBoardItem(slideId, colIndex, text) {
    sessionRef.child('responses').child(slideId).push({
        text: text,
        columnIndex: colIndex,
        author: currentUser.name,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    alert('¡Agregado al cuadro!');
}
