// Lógica del Presentador

let currentSlideIndex = 0;
const slides = presentationData; // Importado de data.js (asegúrate de incluirlo en HTML)

// Referencias DOM
const slideContent = document.getElementById('slide-content');
const questionText = document.getElementById('question-text');
const resultsArea = document.getElementById('results-area');
const slideIndicator = document.getElementById('slide-indicator');
const qrContainer = document.getElementById('qrcode');
// const accessCodeElement = document.getElementById('access-code'); // Eliminado del DOM

// Generar código de sesión único (si no existe)
let sessionCode = 'TALLER-IA'; // Código fijo para simplificar acceso
localStorage.setItem('sessionCode', sessionCode); // Guardar para compartir
// accessCodeElement ya no existe, pero seguimos usando el código internamente

// Generar QR para el header antiguo (ELIMINADO)
// El QR grande se genera en renderSlide ahora

// Inicializar Firebase (Asumiendo que firebase ya está inicializado en el HTML)
const database = firebase.database();
const sessionRef = database.ref('sessions/' + sessionCode);

// Establecer estado inicial de la sesión
sessionRef.update({
    currentSlide: 0,
    isActive: true
});

// Escuchar participantes globales
listenForParticipants();

// Renderizar diapositiva
function renderSlide(index) {
    const slide = slides[index];
    slideIndicator.textContent = `Diapositiva ${index + 1} / ${slides.length}`;

    // Limpiar área de resultados
    resultsArea.innerHTML = '';

    // Actualizar Firebase con la diapositiva actual
    sessionRef.update({
        currentSlide: index,
        slideType: slide.type
    });

    if (slide.type === 'content') {
        questionText.style.display = 'none';
        slideContent.innerHTML = `
            <h1>${slide.title}</h1>
            <div class="content-body">${slide.content}</div>
            <div id="results-area" class="results-area"></div> 
        `;

        // Generar QR GRANDE si existe el contenedor (solo en slide 1)
        const qrLargeContainer = document.getElementById('qrcode-large');
        if (qrLargeContainer) {
            qrLargeContainer.innerHTML = ''; // Limpiar previo
            // URL DE PRODUCCIÓN
            const prodUrl = 'https://68sfszbqhq-stack.github.io/PRESENTACION-TALLER-IA-/participante.html';
            const fullUrl = `${prodUrl}?session=${sessionCode}`;

            new QRCode(qrLargeContainer, {
                text: fullUrl,
                width: 250,
                height: 250,
                colorDark: "#9D2449", // Guinda institucional
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        // Re-asignar resultsArea porque lo sobrescribimos con innerHTML
        // (Mejor práctica: tener contenedores separados, pero por simplicidad...)
    } else if (slide.type === 'poll') {
        questionText.style.display = 'block';
        questionText.textContent = slide.question;
        slideContent.innerHTML = ''; // Limpiar contenido previo si es necesario
        slideContent.appendChild(questionText);
        slideContent.appendChild(resultsArea);

        // Escuchar votos en tiempo real
        listenForVotes(slide.id, slide.options);
    } else if (slide.type === 'brainstorm') {
        questionText.style.display = 'block';
        questionText.textContent = slide.question;
        slideContent.innerHTML = '';
        slideContent.appendChild(questionText);
        slideContent.appendChild(resultsArea);

        // Escuchar respuestas de lluvia de ideas
        listenForBrainstorm(slide.id);
    } else if (slide.type === 'team_board') {
        questionText.style.display = 'block';
        questionText.textContent = slide.title;
        slideContent.innerHTML = '';
        slideContent.appendChild(questionText);

        // Create Board Layout
        const boardContainer = document.createElement('div');
        boardContainer.className = 'board-container';
        boardContainer.style.display = 'flex';
        boardContainer.style.width = '100%';
        boardContainer.style.height = '100%';
        boardContainer.style.gap = '10px';

        slide.columns.forEach((colName, index) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'board-column';
            colDiv.style.flex = '1';
            colDiv.style.background = '#f3f4f6';
            colDiv.style.padding = '10px';
            colDiv.style.borderRadius = '8px';
            colDiv.style.display = 'flex';
            colDiv.style.flexDirection = 'column';

            colDiv.innerHTML = `<h3 style="text-align:center; color:var(--primary-color); border-bottom:2px solid #ddd; padding-bottom:5px;">${colName}</h3><div id="col-${index}" style="flex:1; overflow-y:auto;"></div>`;
            boardContainer.appendChild(colDiv);
        });

        slideContent.appendChild(boardContainer);
        listenForBoardIds(slide.id, slide.columns.length);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide(currentSlideIndex);
    }
}

function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
        currentSlideIndex++;
        renderSlide(currentSlideIndex);
    }
}

function resetVotes() {
    const slideId = slides[currentSlideIndex].id;
    sessionRef.child('responses').child(slideId).remove();
    renderSlide(currentSlideIndex);
}

// Escuchas de Firebase
// Variables Globales
let globalUsers = {};
let enableNotifications = false; // Flag para no mostrar el historial al cargar

// Función para mostrar notificaciones flotantes (Toasts)
function showToast(userId, action, detail = "") {
    if (!enableNotifications) return; // Ignorar carga inicial

    // Buscar nombre
    let userName = "Un participante";
    if (typeof userId === 'object' && userId.name) {
        userName = userId.name;
    } else if (globalUsers[userId] && globalUsers[userId].name) {
        userName = globalUsers[userId].name;
    } else if (typeof userId === 'string' && userId.length > 3) {
        userName = userId; // Fallback extremo
    }

    // Contenedor (crear si no existe)
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Crear Toast
    const toast = document.createElement('div');
    toast.className = 'participant-toast';
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-icon">👤</span>
            <div style="font-size:0.9em; opacity:0.8;">${action}</div>
        </div>
        <div style="width:100%;">
            <strong style="color:var(--primary-color);">${userName}</strong><br>
            <span style="font-size:0.9em; color:#555;">${detail}</span>
        </div>
    `;

    container.appendChild(toast);

    // Auto-eliminar
    setTimeout(() => {
        if (toast.parentElement) toast.remove();
    }, 4000);
}

function listenForVotes(slideId, options) {
    // Reset notification flag for new slide context
    enableNotifications = false;
    setTimeout(() => { enableNotifications = true; }, 1500);

    // 1. CHART UPDATE (Keep using 'value' for aggregation)
    sessionRef.child('responses').child(slideId).on('value', (snapshot) => {
        const votes = snapshot.val() || {};
        const totalVotes = Object.keys(votes).length;

        // Calcular conteos
        const counts = {};
        options.forEach(opt => counts[opt] = 0);
        Object.values(votes).forEach(vote => {
            // vote is now potentially complex, handle both string and object?
            // Actually, let's keep it simple: we assume simple string values for chart
            const val = (typeof vote === 'object') ? vote.answer : vote;
            if (counts[val] !== undefined) counts[val]++;
        });

        // Renderizar barras (sin cambios mayores)
        resultsArea.innerHTML = '';
        options.forEach(opt => {
            const count = counts[opt];
            const percentage = totalVotes === 0 ? 0 : (count / totalVotes) * 100;
            const barContainer = document.createElement('div');
            barContainer.style.width = '100%';
            barContainer.style.marginBottom = '20px';
            barContainer.innerHTML = `
                <div style="display:flex; justify-content:space-between; font-size:1.5rem; margin-bottom:5px;">
                    <span>${opt}</span>
                    <span>${count} (${Math.round(percentage)}%)</span>
                </div>
                <div style="background:#ddd; height:30px; border-radius:15px; overflow:hidden;">
                    <div class="vote-bar" style="width:${percentage}%; height:100%; background:var(--primary-color);"></div>
                </div>
            `;
            resultsArea.appendChild(barContainer);
        });
    });

    // 2. NOTIFICATIONS (Listen for new added children)
    sessionRef.child('responses').child(slideId).on('child_added', (snapshot) => {
        const userId = snapshot.key; // Key is userId in votes
        const voteOption = snapshot.val(); // Value is the option chosen
        showToast(userId, 'Votación', `Eligió: "${voteOption}"`);
    });

    // NOTA: child_changed si cambian voto
    sessionRef.child('responses').child(slideId).on('child_changed', (snapshot) => {
        const userId = snapshot.key;
        const voteOption = snapshot.val();
        showToast(userId, 'Cambio de Voto', `Ahora elige: "${voteOption}"`);
    });
}

function listenForBrainstorm(slideId) {
    // Reset notification flag
    enableNotifications = false;
    setTimeout(() => { enableNotifications = true; }, 1500);

    // Mapa para seguimiento de frecuencias y elementos DOM
    const wordMap = {};

    // Contenedor Flex para la nube
    resultsArea.innerHTML = '';
    resultsArea.className = 'brainstorm-container';

    // Paleta de colores vibrantes
    const colors = ['#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#4caf50', '#ff9800', '#ff5722', '#673ab7'];

    sessionRef.child('responses').child(slideId).on('child_added', (snapshot) => {
        const val = snapshot.val();
        const rawText = val.text;
        const authorName = val.author || "Anónimo"; // Use Author
        const normalizedText = rawText.trim().toLowerCase();

        // MOSTRAR NOTIFICACIÓN DETALLADA
        showToast({ name: authorName }, 'Idea', `"${rawText}"`);

        if (wordMap[normalizedText]) {
            // ... (Lógica de palabra repetida sin cambios) ...
            const data = wordMap[normalizedText];
            data.count++;

            const el = data.element;
            const fontSize = 1.8 + Math.log2(data.count) * 0.8;

            el.style.fontSize = `${fontSize}rem`;
            el.style.fontWeight = data.count > 1 ? '800' : '600';

            el.classList.remove('pulse');
            void el.offsetWidth;
            el.classList.add('pulse');

        } else {
            // --- NUEVA PALABRA ---
            const el = document.createElement('div');
            el.className = 'cloud-word';
            // Estructura con Autor
            el.innerHTML = `
                ${rawText}
                <span class="author-tag">por ${authorName}</span>
            `;

            el.style.fontSize = '1.8rem';
            el.style.fontWeight = '600';

            const color = colors[Math.floor(Math.random() * colors.length)];
            el.style.color = color;
            el.style.border = `2px solid ${color}22`;
            el.style.backgroundColor = `${color}11`;

            resultsArea.appendChild(el);

            wordMap[normalizedText] = {
                count: 1,
                element: el
            };
        }
    });

    // ... (rest of function)

    // Si se borran
    sessionRef.child('responses').child(slideId).on('child_removed', () => {
        resultsArea.innerHTML = '';
        // Reiniciar mapa (simple, en prod sería más fino)
        for (const prop of Object.getOwnPropertyNames(wordMap)) {
            delete wordMap[prop];
        }
    });
}

function listenForBoardIds(slideId, numCols) {
    // Reset notification flag
    enableNotifications = false;
    setTimeout(() => { enableNotifications = true; }, 1500);

    sessionRef.child('responses').child(slideId).on('child_added', (snapshot) => {
        const val = snapshot.val();
        const colIndex = val.columnIndex;
        const colText = val.text;
        const authorName = val.author || "Anónimo";

        // MOSTRAR NOTIFICACIÓN DETALLADA
        showToast({ name: authorName }, 'Aportación', `"${colText}"`);

        if (colIndex >= 0 && colIndex < numCols) {
            const colContainer = document.getElementById(`col-${colIndex}`);
            if (colContainer) {
                const card = document.createElement('div');
                card.className = 'brainstorm-card';
                // Añadir autor visible en la tarjeta del board
                card.innerHTML = `
                    ${colText}
                    <span class="author-tag">por ${authorName}</span>
                `;
                // Estilos base ya definidos en CSS
                colContainer.appendChild(card);
            }
        }
    });

    sessionRef.child('responses').child(slideId).on('child_removed', () => {
        // Simple reset for prototype
        for (let i = 0; i < numCols; i++) {
            const c = document.getElementById(`col-${i}`);
            if (c) c.innerHTML = '';
        }
    });
}

// Iniciar
renderSlide(currentSlideIndex);

function listenForParticipants() {
    sessionRef.child('users').on('value', (snapshot) => {
        globalUsers = snapshot.val() || {}; // ACTUALIZAR CACHE GLOBAL
        const count = Object.keys(globalUsers).length;

        // Actualizar contador en Intro Slide (si existe)
        const countEl = document.getElementById('participant-count');
        const listEl = document.getElementById('participants-list');

        if (countEl) countEl.textContent = count;

        if (listEl) {
            listEl.innerHTML = '';
            Object.values(globalUsers).forEach(user => {
                const span = document.createElement('span');
                span.textContent = user.name + ', ';
                listEl.appendChild(span);
            });
        }
    });
}

function fullSessionReset() {
    if (confirm("⚠️ ¿ESTÁS SEGURO? \n\nEsto borrará a TODOS los participantes y TODAS las respuestas de la sesión actual.\n\nÚsalo solo antes de empezar una nueva presentación real.")) {
        // Borrar respuestas
        sessionRef.child('responses').remove();
        // Borrar usuarios
        sessionRef.child('users').remove();

        // Reiniciar variables locales visuales
        globalUsers = {};

        // Feedback
        alert("✅ Sesión reiniciada correctamente. \nEl contador de participantes volverá a 0.");

        // Recargar para limpiar cualquier estado visual residual
        location.reload();
    }
}

async function exportReport() {
    const btn = document.querySelector('button[onclick="exportReport()"]');
    const originalText = btn.textContent;
    btn.textContent = "⏳ Generando...";
    btn.disabled = true;

    try {
        // 1. Obtener todos los datos de respuestas de Firebase
        const snapshot = await sessionRef.child('responses').once('value');
        const allResponses = snapshot.val() || {};

        // 2. Construir el HTML del reporte
        let reportHTML = `
            <html>
            <head>
                <title>Evidencia de Sesión - Taller IA</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; color: #333; }
                    .slide-report { border: 1px solid #ccc; padding: 20px; margin-bottom: 20px; page-break-inside: avoid; border-radius: 8px; }
                    h1 { color: #9D2449; border-bottom: 2px solid #ccc; padding-bottom: 10px; }
                    h2 { font-size: 1.2rem; background: #eee; padding: 10px; border-radius: 5px; }
                    .stats { margin: 10px 0; font-weight: bold; color: #666; }
                    .response-item { background: #f9f9f9; padding: 5px 10px; margin: 3px 0; border-radius: 4px; border-left: 3px solid #2e86c1; font-size:0.9rem; }
                    .board-col { display:inline-block; vertical-align:top; width:30%; background:#f0f0f0; margin-right:1%; padding:10px; font-size:0.8rem; }
                    .vote-bar { height: 20px; background: #9D2449; margin-bottom: 10px; display:flex; align-items:center; color:white; font-size:0.8rem; padding-left:5px; }
                    @media print { button { display: none; } }
                </style>
            </head>
            <body>
                <h1>Reporte de Evidencia - Taller IA Docente</h1>
                <p>Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                <button onclick="window.print()" style="font-size:1.2rem; padding:10px 20px; margin-bottom:20px;">🖨️ Imprimir / Guardar PDF</button>
        `;

        // 3. Iterar cada diapositiva y agregar sus contenidos y respuestas
        slides.forEach((slide, index) => {
            const slideId = slide.id;
            const slideResponses = allResponses[slideId] || {};

            reportHTML += `<div class="slide-report">`;
            reportHTML += `<h2>Diapositiva ${index + 1}: ${slide.title || slide.question || "Sin Título"}</h2>`;

            // Mostrar contenido estático brevemente
            if (slide.type === 'content') {
                // Limpiar HTML tags para resumen simple o dejarlo si es corto
                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = slide.content;
                reportHTML += `<div style="font-style:italic; color:#666; font-size:0.9rem; margin-bottom:10px;">(Contenido de lectura/presentación)</div>`;
            }

            // --- PROCESAR RESPUESTAS SEGÚN TIPO ---

            // A) Lluvia de Ideas (Brainstorm)
            if (slide.type === 'brainstorm') {
                const count = Object.keys(slideResponses).length;
                reportHTML += `<div class="stats">${count} Ideas recibidas:</div>`;
                Object.values(slideResponses).forEach(r => {
                    const author = r.author || "Anónimo";
                    reportHTML += `<div class="response-item"><strong>${author}:</strong> ${r.text}</div>`;
                });
            }

            // B) Encuesta (Poll)
            else if (slide.type === 'poll') {
                const total = Object.keys(slideResponses).length;
                reportHTML += `<div class="stats">Total Votos: ${total}</div>`;

                // Calcular porcentajes
                const counts = {};
                slide.options.forEach(opt => counts[opt] = 0);
                Object.values(slideResponses).forEach(r => {
                    const val = (typeof r === 'object') ? r.answer : r; // handle legacy format
                    if (counts[val] !== undefined) counts[val]++;
                });

                slide.options.forEach(opt => {
                    const c = counts[opt];
                    const pct = total ? Math.round((c / total) * 100) : 0;
                    reportHTML += `
                        <div style="margin-bottom:5px;">${opt} (${c})</div>
                        <div style="background:#ddd; width:100%; height:20px; border-radius:4px;">
                            <div style="width:${pct}%; background:#9D2449; height:100%; border-radius:4px;"></div>
                        </div>
                    `;
                });
            }

            // C) Tablero Colaborativo (Team Board)
            else if (slide.type === 'team_board') {
                const count = Object.keys(slideResponses).length;
                reportHTML += `<div class="stats">${count} Tarjetas en el tablero:</div><div style="display:flex; gap:10px;">`;

                // Agrupar por columna
                const cols = {};
                slide.columns.forEach((name, i) => cols[i] = { name: name, items: [] });

                Object.values(slideResponses).forEach(r => {
                    if (cols[r.columnIndex]) cols[r.columnIndex].items.push(r);
                });

                // Renderizar columnas
                Object.values(cols).forEach(col => {
                    reportHTML += `<div class="board-col"><strong>${col.name}</strong><hr>`;
                    col.items.forEach(item => {
                        const author = item.author || "Anónimo";
                        reportHTML += `<div class="response-item" style="font-size:0.8rem; border-color:#999;"><strong>${author}:</strong> ${item.text}</div>`;
                    });
                    reportHTML += `</div>`;
                });
                reportHTML += `</div>`;
            }

            reportHTML += `</div>`; // Cierre slide-report
        });

        reportHTML += `</body></html>`;

        // 4. Abrir ventana y escribir reporte
        const win = window.open('', '_blank');
        win.document.write(reportHTML);
        win.document.close();

    } catch (e) {
        console.error(e);
        alert("Error generando el reporte: " + e.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

async function exportReport() {
    const btn = document.querySelector('button[onclick="exportReport()"]');
    const originalText = btn.textContent;
    btn.textContent = "⏳ Generando PDF...";
    btn.disabled = true;

    try {
        const snapshot = await sessionRef.child('responses').once('value');
        const allResponses = snapshot.val() || {};

        // Estilos para simular la vista PPTX
        let reportHTML = `
            <html>
            <head>
                <title>Evidencia Taller IA - \${new Date().toLocaleDateString()}</title>
                <style>
                    @page { size: landscape; margin: 0; }
                    body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background: #eee; -webkit-print-color-adjust: exact; }
                    
                    /* Contenedor de Página (1 Slide por hoja) */
                    .slide-page { 
                        width: 100vw; 
                        height: 100vh; 
                        page-break-after: always; 
                        display: flex; 
                        flex-direction: row; /* Lado a lado: Slide | Datos */
                        background: white;
                        overflow: hidden;
                    }

                    /* 1. Vista Previa del Slide (Izquierda) */
                    .slide-preview-container {
                        flex: 2;
                        padding: 40px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        background: #fff;
                        border-right: 5px solid #9D2449;
                        position: relative;
                    }
                    
                    /* Simular estilos del slide original */
                    .slide-content h1, .slide-content h2 { color: #9D2449; margin-bottom: 0.5em; }
                    .slide-content ul { font-size: 1.3rem; line-height: 1.6; color: #333; }
                    .slide-content p { font-size: 1.2rem; }
                    
                    /* Clases específicas de tu Data.js */
                    .tag { background: #9D2449; color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; display: inline-block; margin-bottom: 15px; }
                    .quote { font-style: italic; color: #555; border-left: 4px solid #D4AF37; padding-left: 15px; margin: 20px 0; font-size: 1.3rem; }
                    .opinion-box { background: #fdf2f4; padding: 15px; border-left: 4px solid #9D2449; margin-top: 20px; font-size: 1rem; }
                    .intro-text { font-size: 1.4rem; color: #333; }

                    /* 2. Panel de Evidencia (Derecha) */
                    .evidence-panel {
                        flex: 1;
                        background: #f9f9f9;
                        padding: 30px;
                        display: flex;
                        flex-direction: column;
                        overflow-y: auto;
                        box-shadow: inset 5px 0 15px rgba(0,0,0,0.05);
                    }
                    
                    .evidence-header { font-size: 1.2rem; font-weight: bold; color: #333; margin-bottom: 15px; border-bottom: 2px solid #ccc; padding-bottom: 5px; }
                    .stat-big { font-size: 2.5rem; font-weight: bold; color: #9D2449; }
                    
                    .response-item { 
                        background: white; 
                        padding: 10px; 
                        margin-bottom: 8px; 
                        border-radius: 6px; 
                        border-left: 4px solid #2e86c1; 
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        font-size: 0.9rem;
                    }
                    .author-label { font-size: 0.75rem; color: #777; font-weight: bold; display: block; margin-bottom: 2px; }

                    /* Gráficos de barras */
                    .bar-container { margin-bottom: 10px; }
                    .bar-label { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 2px; }
                    .bar-bg { background: #e0e0e0; height: 15px; border-radius: 10px; overflow: hidden; }
                    .bar-fill { height: 100%; background: #9D2449; }

                    /* Botón de impresión */
                    .print-btn {
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        padding: 15px 30px; background: #28a745; color: white;
                        font-size: 1.2rem; border: none; border-radius: 8px; cursor: pointer;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    .print-btn {
                        position: fixed; top: 20px; right: 20px; z-index: 9999;
                        padding: 15px 30px; background: #28a745; color: white;
                        font-size: 1.2rem; border: none; border-radius: 8px; cursor: pointer;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    }
                    @media print { .print-btn { display: none; } }
                </style>
            </head>
            <body>
                <button class="print-btn" onclick="window.print()">🖨️ Guardar como PDF</button>
        `;

        slides.forEach((slide, index) => {
            const slideId = slide.id;
            const res = allResponses[slideId] || {};
            const count = Object.keys(res).length;

            reportHTML += `<div class="slide-page">`;

            // --- IZQUIERDA: VISTA PREVIA ---
            reportHTML += `<div class="slide-preview-container"><div class="slide-content">`;

            // Título
            reportHTML += `<h2>Diapositiva ${index + 1}</h2>`;

            if (slide.title) reportHTML += `<h1>${slide.title}</h1>`;
            if (slide.question) reportHTML += `<h1>${slide.question}</h1>`; // Para encuestas/brainstorm

            // Renderizar contenido HTML si existe
            if (slide.content) {
                // Limpieza básica: quitar scripts o cosas raras si las hubiera
                reportHTML += `<div>${slide.content}</div>`;
            } else if (slide.type === 'team_board') {
                // Representación visual del board vacío
                reportHTML += `<div style="display:flex; gap:10px; margin-top:20px;">`;
                slide.columns.forEach(col => {
                    reportHTML += `<div style="flex:1; background:#f0f0f0; padding:10px; border-radius:5px; text-align:center;"><strong>${col}</strong></div>`;
                });
                reportHTML += `</div>`;
            }
            reportHTML += `</div></div>`; // Fin Preview

            // --- DERECHA: EVIDENCIA ---
            reportHTML += `<div class="evidence-panel">`;
            reportHTML += `<div class="evidence-header">📊 Resultados / Participación</div>`;

            if (count === 0) {
                reportHTML += `<p style="color:#999; font-style:italic;">Sin participación registrada en esta diapositiva.</p>`;
            } else {

                // --- LÓGICA POR TIPO DE SLIDE PARA DATOS ---

                if (slide.type === 'poll') {
                    reportHTML += `<div class="stat-big">${count} Votos</div><hr>`;
                    const counts = {};
                    slide.options.forEach(o => counts[o] = 0);
                    Object.values(res).forEach(r => {
                        const val = (typeof r === 'object') ? r.answer : r;
                        if (counts[val] !== undefined) counts[val]++;
                    });

                    slide.options.forEach(opt => {
                        const c = counts[opt];
                        const pct = count ? Math.round((c / count) * 100) : 0;
                        reportHTML += `
                            <div class="bar-container">
                                <div class="bar-label"><span>${opt}</span><span>${c} (${pct}%)</span></div>
                                <div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div>
                            </div>
                        `;
                    });
                }
                else if (slide.type === 'brainstorm') {
                    reportHTML += `<div class="stat-big">${count} Ideas</div><hr>`;
                    Object.values(res).forEach(r => {
                        const author = r.author || "Anónimo";
                        reportHTML += `
                            <div class="response-item">
                                <span class="author-label">${author} dijo:</span>
                                ${r.text}
                            </div>
                         `;
                    });
                }
                else if (slide.type === 'team_board') {
                    reportHTML += `<div class="stat-big">${count} Tarjetas</div><hr>`;
                    // Agrupar por columnas para reporte ordenado
                    const cols = {};
                    slide.columns.forEach((name, i) => cols[i] = { name: name, items: [] });
                    Object.values(res).forEach(r => { if (cols[r.columnIndex]) cols[r.columnIndex].items.push(r); });

                    Object.values(cols).forEach(col => {
                        if (col.items.length > 0) {
                            reportHTML += `<strong style="color:#9D2449; margin-top:10px; display:block;">${col.name}</strong>`;
                            col.items.forEach(item => {
                                const author = item.author || "Anónimo";
                                reportHTML += `<div class="response-item"><span class="author-label">${author}:</span>${item.text}</div>`;
                            });
                        }
                    });
                }
            }
            reportHTML += `</div></div>`; // Fin Evidence Panel y Slide Page
        });

        reportHTML += `</body></html>`;

        const win = window.open('', '_blank');
        win.document.write(reportHTML);
        win.document.close();

    } catch (e) {
        console.error(e);
        alert("Error: " + e.message);
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
    }
}

