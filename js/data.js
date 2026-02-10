// Contenido de la presentación (Extraído y Adaptado)

const presentationData = [
    // --- DIAPOSITIVA 1: INTRO ---
    {
        id: 'slide-intro',
        type: 'content',
        title: 'Uso de la IA en mi Labor Docente',
        content: `
            <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; height: 100%;">
                <div style="flex: 1; text-align: left;">
                    <span class="tag">Consejo Académico & Taller Intensivo</span>
                    <h2>Estrategias Éticas y Humanistas para el Aula</h2>
                    <p class="intro-text">Ponente: <strong>Lic. Jose Roberto Mendoza Mendoza</strong></p>
                    <p class="quote">"La tecnología como medio, no como fin."</p>
                </div>
                <div style="flex: 0 0 300px; text-align: center; background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div id="qrcode-large"></div>
                    <p style="margin-top: 10px; font-weight: bold; color: var(--primary-color);">¡Escanea para Participar!</p>
                    <div id="participants-summary" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
                        <span style="font-size: 2rem;">👥</span>
                        <span id="participant-count" style="font-size: 1.5rem; font-weight: bold;">0</span>
                        <div id="participants-list" style="max-height: 100px; overflow-y: auto; font-size: 0.9rem; color: #666; margin-top: 5px; text-align: left;">
                            <!-- Nombres aquí -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="opinion-box" style="margin-top: 1rem;">
                <strong>Opinión:</strong> Buenos días. Hoy no hablaremos solo de herramientas, sino de cómo integrarlas con sentido ético y humanista.
            </div>
        `
    },

    // --- DIAPOSITIVA 2: ANÁLISIS CONCEPTUAL ---
    {
        id: 'slide-analisis',
        type: 'content',
        title: 'Análisis Conceptual',
        content: `
            <h2>Perspectivas sobre la IA en la Educación</h2>
            <ul>
                <li><strong>SEP (Boletín 26):</strong> Herramienta estratégica para fortalecer el Sistema Educativo Nacional.</li>
                <li><strong>UNAM (Desafíos):</strong> Riesgos éticos, plagio y necesidad de mediación crítica.</li>
                <li><strong>Premisa Clave:</strong> La tecnología es un MEDIO, nunca el fin.</li>
            </ul>
            <div class="opinion-box">
                <strong>Opinión:</strong> Comencemos analizando el terreno. Mientras la SEP propone aprovechar la IA para fortalecer el sistema educativo, la academia, representada por la UNAM, nos alerta sobre los desafíos éticos. Nuestro punto de equilibrio es entender que la IA es solo un medio para alcanzar el aprendizaje.
            </div>
        `
    },

    // --- INTERACCIÓN 1: ENCUESTA ---
    {
        id: 'poll-vision',
        type: 'poll',
        question: '¿Con qué visión te identificas más actualmente?',
        options: [
            'Optimista (La IA transformará todo positivamente)',
            'Cautelosa (Útil, pero con muchos riesgos)',
            'Escéptica (Prefiero métodos tradicionales)',
            'Curiosa (Quiero aprender más)'
        ]
    },

    // --- NUEVA INTERACCIÓN 2: LLUVIA DE IDEAS ÉTICA ---
    {
        id: 'brainstorm-etica',
        type: 'brainstorm',
        question: '¿Cuáles son las principales responsabilidades éticas al usar IA?',
        content: '<p style="text-align:center; color:#666;">Piensen en privacidad, veracidad, autoría...</p>'
    },

    // --- NUEVA INTERACCIÓN 3: CUADRO COLABORATIVO (BOARD) ---
    {
        id: 'board-comparativo',
        type: 'team_board', // Nuevo tipo de diapositiva
        title: 'Cuadro Comparativo Colaborativo',
        columns: [
            'Política Educativa (SEP)<br><small>(humanista)</small>',
            'Visión Crítica (UNAM)<br><small>(crítica y vigilantes)</small>',
            'Organismos Internacionales<br><small>(Novedoso)</small>'
        ],
        instruction: 'En equipos, agreguen puntos clave para cada visión:'
    },

    // --- DIAPOSITIVA 3: CUADRO COMPARATIVO (RESUMEN) ---
    {
        id: 'slide-comparativo-resumen',
        type: 'content',
        title: 'Resumen: Visiones de la IA',
        content: `
            <table>
                <thead>
                    <tr>
                        <th>Eje de Análisis</th>
                        <th>Visión Política (SEP)</th>
                        <th>Visión Crítica (UNAM)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Enfoque</strong></td>
                        <td>Fortalecimiento administrativo y pedagógico.</td>
                        <td>Ética, riesgos y mediación humana.</td>
                    </tr>
                    <tr>
                        <td><strong>Rol Docente</strong></td>
                        <td>Agente de transformación.</td>
                        <td>Filtro crítico indispensable.</td>
                    </tr>
                </tbody>
            </table>
            <div class="opinion-box">
                <strong>Opinión:</strong> Aquí podemos contrastar las visiones. Observen cómo, aunque los enfoques varían, todos coinciden en algo: la necesidad de un docente presente.
            </div>
        `
    },

    // --- DIAPOSITIVA 4: REFLEXIÓN (BRAINSTORMING) ---
    {
        id: 'brainstorm-rol',
        type: 'brainstorm',
        question: '¿Qué palabra define mejor el rol del docente frente a la IA?'
    },
    {
        id: 'slide-rol-docente-info',
        type: 'content',
        title: 'Reflexión: El Rol Docente',
        content: `
            <h2>¿Qué papel debe ocupar la IA?</h2>
            <ul>
                <li><strong>Optimización:</strong> Automatiza lo repetitivo para liberar tiempo.</li>
                <li><strong>Foco Humano:</strong> Centrarse en el acompañamiento socioemocional.</li>
                <li><strong>Mediador Insustituible:</strong> La IA no tiene empatía ni contexto cultural.</li>
            </ul>
        `
    },

    // --- NUEVA DIAPOSITIVA: ANALOGÍA WIKIPEDIA vs IA ---
    {
        id: 'slide-analogia',
        type: 'content',
        title: 'Del Pánico a la Integración: La Analogía de Wikipedia',
        content: `
            <ul>
                <li><strong>El Pasado (Wikipedia):</strong> La prohibimos por "poco confiable". Hoy aprendimos a usarla como punto de partida, no de llegada.</li>
                <li><strong>El Presente (IA):</strong> Estamos repitiendo el patrón de rechazo.</li>
                <li><strong>La Realidad Técnica:</strong> La IA NO "sabe" cosas; es un <strong>sistema probabilístico</strong>.</li>
                <li><strong>El Riesgo:</strong> Genera respuestas <em>plausibles</em> (suenan reales) pero pueden tener <strong>sesgos, errores y fuentes inexistentes</strong>.</li>
            </ul>
            <div class="opinion-box">
                <strong>Opinión:</strong> Recordamos cuando decíamos "¡No usen Wikipedia!"? Hoy, la historia se repite. Pero ojo: la IA es diferente. No es una enciclopedia, es una calculadora de probabilidades de palabras. Está programada para sonar convincente, no necesariamente para decir la verdad. Por eso al principio inventaba fuentes; su objetivo era la probabilidad, no la veracidad.
            </div>
        `
    },

    // --- DIAPOSITIVA 5: RIESGOS ---
    {
        id: 'slide-riesgos',
        type: 'content',
        title: 'Riesgos de la IA sin Mediación',
        content: `
            <h2>¿Qué sucede sin criterio pedagógico?</h2>
            <ul>
                <li><strong>Deshumanización:</strong> Enseñanza mecánica y fría.</li>
                <li><strong>Falta de Contexto:</strong> Respuestas genéricas no adaptadas.</li>
                <li><strong>Pérdida de Pensamiento Crítico:</strong> Consumo pasivo de respuestas.</li>
            </ul>
        `
    },

    // --- NUEVA INTERACCIÓN: RIESGOS SIN MEDIACIÓN ---
    {
        id: 'brainstorm-riesgos',
        type: 'brainstorm',
        question: '¿Qué riesgos se presentan si la IA se usa sin mediación pedagógica?'
    },

    // --- INTERMEDIO: CAMBIO DE SECCIÓN ---
    {
        id: 'section-aplicacion',
        type: 'content',
        title: '',
        content: `
            <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; text-align:center;">
                <h1 style="font-size: 4rem; color: var(--primary-color); border:none;">Aplicación pedagógica de IA en el diseño didáctico</h1>
                <p style="font-size: 2rem; color: #666; margin-top:20px;">Estrategias y Casos Reales</p>
            </div>
        `
    },

    // --- DIAPOSITIVA 6: APLICACIÓN PRÁCTICA ---
    {
        id: 'slide-contexto',
        type: 'content',
        title: 'Aplicación Práctica: Contexto Real',
        content: `
            <ul>
                <li><strong>Grupos Heterogéneos:</strong> Diferentes niveles de comprensión.</li>
                <li><strong>Neurodivergencias:</strong> Necesidad de explicaciones visuales o simplificadas.</li>
                <li><strong>Problemática:</strong> Enseñar temas complejos (Programación) resultaba frustrante.</li>
            </ul>
            <div class="opinion-box">
                <strong>Opinión:</strong> Pasemos a la práctica. En mi caso, el desafío es enseñar programación web. Tengo grupos muy diversos.
            </div>
        `
    },

    // --- DIAPOSITIVA 7: SOLUCIÓN ---
    {
        id: 'slide-solucion',
        type: 'content',
        title: 'Solución con IA: Diferenciación',
        content: `
            <ul>
                <li><strong>Pedagogía:</strong> Diferenciar contenidos y apoyos.</li>
                <li><strong>Herramientas:</strong> MagicSchool AI (nivelar textos) y ChatGPT (estructurar).</li>
                <li><strong>Objetivo:</strong> Misma meta, diferentes rutas.</li>
            </ul>
        `
    },

    // --- DIAPOSITIVA 8: NEURODIVERGENCIA ---
    {
        id: 'slide-neuro',
        type: 'content',
        title: 'Atención a la Neurodivergencia',
        content: `
            <h2>Inclusión efectiva mediante tecnología</h2>
            <ul>
                <li><strong>Desglose:</strong> Instrucciones largas a pasos micro-secuenciados.</li>
                <li><strong>Apoyos Visuales:</strong> Generación de descripciones para diagramas.</li>
                <li><strong>Reducción de Ansiedad:</strong> Recuperación de la autonomía del alumno.</li>
            </ul>
        `
    },

    // --- DIAPOSITIVA 9: PROYECTO ---
    {
        id: 'slide-proyecto',
        type: 'content',
        title: 'Proyecto: Portal de Bienestar',
        content: `
            <h2>Proyecto Transversal Integrador</h2>
            <ul>
                <li><strong>Producto:</strong> Sitio web sobre Salud Integral.</li>
                <li><strong>1er Año:</strong> Salud Emocional (contenido).</li>
                <li><strong>2do Año:</strong> Salud Física (programación).</li>
                <li><strong>Rol IA:</strong> Asistente de código y corrector de estilo.</li>
            </ul>
        `
    },



    // --- DIAPOSITIVA 10: CONCLUSIÓN ---
    {
        id: 'slide-conclusion',
        type: 'content',
        title: 'Conclusión',
        content: `
            <div style="text-align: center; margin: 40px;">
                <p class="quote">
                    "La Inteligencia Artificial es una herramienta poderosa,<br>pero el corazón de la educación sigue siendo humano."
                </p>
            </div>
            <ul>
                <li>El docente valida.</li>
                <li>El docente contextualiza.</li>
                <li>El docente inspira.</li>
            </ul>
            <div class="opinion-box">
                <strong>Opinión:</strong> Para cerrar: hemos visto cómo la IA puede planear, diferenciar y adaptar, pero nunca podrá sustituir la mirada de aprobación que le dan a un alumno cuando logra algo. Usemos la IA para ser más eficientes, pero usemos nuestro corazón para educar. Muchas gracias.
            </div>
        `
    }
];
