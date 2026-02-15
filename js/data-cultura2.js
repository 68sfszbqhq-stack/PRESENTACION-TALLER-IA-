
const presentationDataCultura2 = [
    // 1. Title Slide
    {
        id: 'cd2-title',
        type: 'content',
        title: 'Cultura Digital II',
        content: `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center;">
                <h2 style="font-size: 2.5rem; color: #666; margin-bottom: 2rem;">Colaboración Digital: Resolviendo el Futuro Hoy</h2>
                <div style="position: relative; width: 100%; max-width: 800px; height: 300px; overflow: hidden; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <img src="https://picsum.photos/id/1/1920/1080" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <p style="margin-top: 2rem; font-size: 1.5rem; color: #444;">Docente: Jose Mendoza | 2º Semestre</p>
                
                <!-- QR Code Container for Participation -->
                <div style="margin-top: 20px; background: white; padding: 15px; border-radius: 10px; display: inline-block;">
                    <div id="qrcode-large"></div>
                    <p style="font-size: 0.9rem; color: var(--primary-color); margin-top: 5px;">Unirse a la sesión</p>
                </div>
            </div>
        `
    },

    // 2. Big Quote: El Problema Invisible
    {
        id: 'cd2-problem',
        type: 'content',
        title: 'El Problema Invisible',
        content: `
            <div style="display: flex; gap: 3rem; align-items: center; justify-content: center; height: 100%;">
                <div style="flex: 1;">
                    <span class="tag">Problemática Comunitaria</span>
                    <blockquote style="font-size: 2.5rem; font-weight: 800; color: var(--primary-color); border-left: 8px solid var(--secondary-color); padding-left: 30px; margin: 30px 0; line-height: 1.2;">
                        "Falta de habilidades para la comunicación efectiva y el trabajo colaborativo."
                    </blockquote>
                    <p style="font-size: 1.8rem; color: #555;">En un mundo hiperconectado, paradójicamente nos cuesta resolver conflictos juntos.</p>
                </div>
                <div style="flex: 1; max-width: 500px;">
                    <img src="https://picsum.photos/id/1015/1920/1080" style="width: 100%; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
                </div>
            </div>
        `
    },

    // 3. Split Image Right: La Dinámic
    {
        id: 'cd2-dynamics',
        type: 'content',
        title: 'La Dinámica: Teléfono Descompuesto Digital',
        content: `
            <div style="display: flex; gap: 3rem; align-items: center; height: 100%;">
                <div style="flex: 1;">
                    <h3 style="color: var(--secondary-color);">Inicio - 45 Minutos</h3>
                    <p style="font-size: 1.6rem; color: #333; margin-bottom: 2rem;">¿Qué pasa cuando intentamos resolver un problema complejo con mensajes simples? Vamos a experimentar los desafíos de la comunicación digital.</p>
                    <ul>
                        <li>Formar equipos pequeños</li>
                        <li>Comunicar un mensaje complejo usando solo chat</li>
                        <li>Comparar el resultado final</li>
                        <li>Reflexionar sobre la claridad</li>
                    </ul>
                </div>
                <div style="flex: 0 0 40%; text-align: right;">
                    <img src="https://picsum.photos/id/3/800/1200" style="width: 100%; max-height: 60vh; object-fit: cover; border-radius: 15px;">
                </div>
            </div>
        `
    },

    // 4. Grid Cards: Arsenal Digital
    {
        id: 'cd2-tools',
        type: 'content',
        title: 'Nuestro Arsenal Digital',
        content: `
            <h2 style="text-align: center; margin-bottom: 3rem;">Más de 20 herramientas para dominar</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; width: 100%;">
                <!-- Card 1 -->
                <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-left: 5px solid #2e86c1;">
                    <h3 style="margin-top: 0; color: #2e86c1;">Gestión</h3>
                    <p style="font-size: 1.4rem; color: #555;">Trello, Miro, Notion, Asana</p>
                </div>
                <!-- Card 2 -->
                <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-left: 5px solid #e67e22;">
                    <h3 style="margin-top: 0; color: #e67e22;">Creación</h3>
                    <p style="font-size: 1.4rem; color: #555;">Google Docs, Slides, Canva</p>
                </div>
                <!-- Card 3 -->
                <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-left: 5px solid #27ae60;">
                    <h3 style="margin-top: 0; color: #27ae60;">Comunicación</h3>
                    <p style="font-size: 1.4rem; color: #555;">Slack, Teams, Google Chat</p>
                </div>
                <!-- Card 4 -->
                <div style="background: white; padding: 2rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-left: 5px solid #8e44ad;">
                    <h3 style="margin-top: 0; color: #8e44ad;">Interacción</h3>
                    <p style="font-size: 1.4rem; color: #555;">Kahoot, Padlet, Quizlet</p>
                </div>
            </div>
            <p style="text-align: center; margin-top: 2rem; font-style: italic; color: #888;">No son solo apps, son superpoderes de productividad.</p>
        `
    },

    // 5. Split Image Left: ABP
    {
        id: 'cd2-abp',
        type: 'content',
        title: 'Aprendizaje Basado en Proyectos (ABP)',
        content: `
            <div style="display: flex; gap: 3rem; align-items: center; height: 100%;">
                <div style="flex: 0 0 40%;">
                    <img src="https://picsum.photos/id/314/800/1200" style="width: 100%; max-height: 60vh; object-fit: cover; border-radius: 15px;">
                </div>
                <div style="flex: 1;">
                    <span class="tag">Metodología Activa</span>
                    <p style="font-size: 1.6rem; margin: 1.5rem 0;">No vamos a memorizar. Vamos a investigar, proponer y crear. El objetivo es identificar una problemática real y abordarla.</p>
                    <ul>
                        <li>Formar equipos de 3-4 integrantes</li>
                        <li>Elegir una problemática del PAEC</li>
                        <li>Planificar una solución innovadora</li>
                        <li>Usar al menos 3 herramientas digitales</li>
                    </ul>
                </div>
            </div>
        `
    },

    // 6. Statistic: Why?
    {
        id: 'cd2-why',
        type: 'content',
        title: '¿Por qué hacemos esto?',
        content: `
            <div style="text-align: center; padding: 3rem;">
                <h2 style="color: #666; margin-bottom: 1rem;">El mercado laboral actual</h2>
                <div style="font-size: 6rem; font-weight: 900; color: var(--primary-color); line-height: 1;">Soft Skills</div>
                <p style="font-size: 2rem; max-width: 800px; margin: 2rem auto;">Las empresas buscan comunicación, negociación y empatía digital. Al usar Trello o Slack hoy, estás entrenando para tu puesto de trabajo mañana.</p>
                <div class="opinion-box" style="display: inline-block;">
                    Transferencia al ámbito laboral y social
                </div>
            </div>
        `
    },

    // 7. Bullet Points: Misión
    {
        id: 'cd2-mission',
        type: 'content',
        title: 'La Misión: Producto Integrador',
        content: `
            <div style="display: flex; gap: 3rem; align-items: center;">
                <div style="flex: 1;">
                    <h3 style="color: var(--secondary-color);">Desarrollo - 180 Minutos</h3>
                    <p style="font-size: 1.6rem; margin-bottom: 2rem;">Su equipo debe entregar una solución tangible que evidencie el proceso colaborativo.</p>
                    <ul>
                        <li>Tablero de proyecto inicial (Miro/Trello)</li>
                        <li>Documento colaborativo de investigación (Google Docs)</li>
                        <li>Evidencia gráfica de colaboración (Capturas)</li>
                        <li>Cartel de difusión o presentación final</li>
                    </ul>
                </div>
                <div style="flex: 0 0 400px;">
                    <img src="https://picsum.photos/id/445/1920/1080" style="width: 100%; border-radius: 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
                </div>
            </div>
        `
    },

    // 8. Evaluation
    {
        id: 'cd2-eval',
        type: 'content',
        title: 'Evaluación y Criterios',
        content: `
            <div style="display: flex; gap: 3rem; align-items: start; height: 100%;">
                <div style="flex: 1;">
                    <h2>Cómo medimos el éxito</h2>
                    <p style="font-size: 1.5rem; margin-bottom: 2rem;">La calificación se divide en proceso y resultado.</p>
                    <ul>
                        <li><strong>30%</strong> - Lista de Cotejo: Participación activa en dinámicas.</li>
                        <li><strong>70%</strong> - Lista de Cotejo: Calidad y pertinencia del producto integrador.</li>
                        <li><strong>Requisito:</strong> Uso crítico de al menos 3 herramientas.</li>
                        <li><strong>Meta:</strong> Fomentar la autorregulación.</li>
                    </ul>
                </div>
                <div style="flex: 0 0 35%;">
                     <img src="https://picsum.photos/id/106/800/1200" style="width: 100%; max-height: 60vh; object-fit: cover; border-radius: 15px;">
                </div>
            </div>
        `
    },

    // 9. Call to Action
    {
        id: 'cd2-final',
        type: 'content',
        title: '¿Están listos para transformar?',
        content: `
            <div style="text-align: center; margin-top: 2rem;">
                <h3 style="color: #666;">Estudio Independiente: 2 Horas</h3>
                <p style="font-size: 2rem; max-width: 900px; margin: 2rem auto;">
                    Refinen su proyecto. Exploren herramientas avanzadas. Sean creativos. 
                    <br><br>
                    <strong>La tecnología es el vehículo, ustedes son los conductores.</strong>
                </p>
                <div style="margin-top: 3rem; font-size: 4rem; font-weight: 900; color: var(--primary-color); letter-spacing: 2px;">
                    MANOS A LA OBRA
                </div>
                <p style="margin-top: 3rem; color: #999;">Cultura Digital II - Jose Mendoza</p>
            </div>
        `
    }
];
