
// Helper for Icons (Embedded SVGs to avoid dependencies)
const Icons = {
    Layout: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-brand-primary"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>`,
    Edit3: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-brand-primary"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
    MessageSquare: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-brand-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    Zap: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-brand-primary"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-brand-accent mr-3 shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    Target: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-brand-primary mr-3 shrink-0"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    Users: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-16 h-16 text-brand-accent mx-auto opacity-80"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    TrendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-20 h-20 text-brand-primary"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
};

const presentationDataCultura2 = [
    // 1. Title Slide
    {
        id: 'cd2-title',
        type: 'content',
        content: `
            <div class="flex flex-col items-center justify-center h-full text-center px-8 relative overflow-hidden bg-brand-dark">
                <div class="absolute inset-0 z-0">
                   <div class="absolute inset-0 bg-brand-dark/80 z-10 w-full h-full"></div>
                   <img src="https://picsum.photos/id/1/1920/1080" alt="Background" class="w-full h-full object-cover">
                </div>
                <div class="z-10 max-w-4xl relative">
                  <h2 class="text-brand-primary text-xl font-bold tracking-widest uppercase mb-4">
                    Cultura Digital II
                  </h2>
                  <h1 class="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                    Colaboración Digital: Resolviendo el Futuro Hoy
                  </h1>
                  <div class="h-1 w-24 bg-brand-accent mx-auto mb-6"></div>
                  <p class="text-xl text-gray-300">
                    Docente: Jose Mendoza | 2º Semestre
                  </p>
                  
                  <!-- QR Code Container for Participation -->
                  <div class="mt-8 bg-white p-4 rounded-lg inline-block shadow-lg">
                      <div id="qrcode-large"></div>
                      <p class="text-sm text-brand-primary font-bold mt-2">¡Escanea para Participar!</p>
                  </div>
                </div>
            </div>
        `
    },

    // 2. Big Quote: El Problema Invisible
    {
        id: 'cd2-problem',
        type: 'content',
        content: `
          <div class="flex flex-col items-center justify-center h-full text-center px-12 relative bg-brand-dark">
             <div class="absolute inset-0 z-0">
               <div class="absolute inset-0 bg-brand-dark/90 z-10 w-full h-full"></div>
               <img src="https://picsum.photos/id/1015/1920/1080" alt="Background" class="w-full h-full object-cover grayscale">
            </div>
            <div class="z-10 max-w-5xl relative">
              <div class="mb-8 flex justify-center">
                ${Icons.Users}
              </div>
              <h2 class="text-2xl text-gray-400 mb-6 uppercase tracking-widest">El Problema Invisible</h2>
              <blockquote class="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-8">
                "Falta de habilidades para la comunicación efectiva y el trabajo colaborativo."
              </blockquote>
              <p class="text-xl text-brand-primary font-medium">
                — Problemática Comunitaria Identificada
              </p>
              <p class="mt-8 text-gray-400 max-w-2xl mx-auto text-xl">
                En un mundo hiperconectado, paradójicamente nos cuesta resolver conflictos juntos.
              </p>
            </div>
          </div>
        `
    },

    // 3. Split Image Right: La Dinámic
    {
        id: 'cd2-dynamics',
        type: 'content',
        content: `
          <div class="flex flex-col md:flex-row h-full bg-brand-dark">
            <div class="flex-1 flex flex-col justify-center p-12 md:p-16">
              <h2 class="text-4xl font-serif font-bold text-white mb-2">La Dinámica: El Teléfono Descompuesto Digital</h2>
              <h3 class="text-xl text-brand-primary mb-6">Inicio - 45 Minutos</h3>
              <p class="text-lg text-gray-300 mb-8 leading-relaxed">¿Qué pasa cuando intentamos resolver un problema complejo con mensajes simples? Vamos a experimentar los desafíos de la comunicación digital y cómo los malentendidos afectan nuestra convivencia escolar.</p>
              <ul class="space-y-4">
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Formar equipos pequeños</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Comunicar un mensaje complejo usando solo chat</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Comparar el resultado final</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Reflexionar sobre la claridad y herramientas</span>
                  </li>
              </ul>
            </div>
            <div class="flex-1 h-64 md:h-auto relative">
               <img src="https://picsum.photos/id/3/800/1200" alt="Visual" class="w-full h-full object-cover">
               <div class="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent opacity-50 md:opacity-100 md:w-24"></div>
            </div>
          </div>
        `
    },

    // 4. Grid Cards: Arsenal Digital
    {
        id: 'cd2-tools',
        type: 'content',
        content: `
          <div class="flex flex-col h-full bg-brand-dark p-8 md:p-16 justify-center">
            <div class="mb-12 text-center md:text-left">
              <h2 class="text-4xl font-serif font-bold text-white mb-2">Nuestro Arsenal Digital</h2>
              <p class="text-xl text-gray-400">Más de 20 herramientas para dominar. No son solo apps, son superpoderes de productividad.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mx-auto">
                <!-- Card 1 -->
                <div class="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex items-start space-x-4 transition-colors hover:bg-slate-800">
                  <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    ${Icons.Layout}
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2">Gestión</h4>
                    <p class="text-gray-400">Trello, Miro, Notion, Asana</p>
                  </div>
                </div>
                <!-- Card 2 -->
                <div class="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex items-start space-x-4 transition-colors hover:bg-slate-800">
                  <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    ${Icons.Edit3}
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2">Creación</h4>
                    <p class="text-gray-400">Google Docs, Slides, Canva</p>
                  </div>
                </div>
                <!-- Card 3 -->
                <div class="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex items-start space-x-4 transition-colors hover:bg-slate-800">
                  <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    ${Icons.MessageSquare}
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2">Comunicación</h4>
                    <p class="text-gray-400">Slack, Teams, Google Chat</p>
                  </div>
                </div>
                <!-- Card 4 -->
                <div class="bg-slate-800/50 p-8 rounded-xl border border-slate-700 flex items-start space-x-4 transition-colors hover:bg-slate-800">
                  <div class="bg-slate-900 p-3 rounded-lg border border-slate-700">
                    ${Icons.Zap}
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-white mb-2">Interacción</h4>
                    <p class="text-gray-400">Kahoot, Padlet, Quizlet</p>
                  </div>
                </div>
            </div>
          </div>
        `
    },

    // 5. Split Image Left: ABP
    {
        id: 'cd2-abp',
        type: 'content',
        content: `
          <div class="flex flex-col md:flex-row-reverse h-full bg-brand-dark">
            <div class="flex-1 flex flex-col justify-center p-12 md:p-16">
              <h2 class="text-4xl font-serif font-bold text-white mb-2">Aprendizaje Basado en Proyectos (ABP)</h2>
              <h3 class="text-xl text-brand-accent mb-6">Metodología Activa</h3>
              <p class="text-lg text-gray-300 mb-8 leading-relaxed">No vamos a memorizar. Vamos a investigar, proponer y crear. El objetivo es identificar una problemática real (Salud, Convivencia, Psicosocial) y abordarla.</p>
              <ul class="space-y-4">
                  <li class="flex items-start text-gray-300">
                      ${Icons.Target}
                      <span>Formar equipos de 3-4 integrantes</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.Target}
                      <span>Elegir una problemática del PAEC</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.Target}
                      <span>Planificar una solución innovadora</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.Target}
                      <span>Usar al menos 3 herramientas digitales</span>
                  </li>
              </ul>
            </div>
            <div class="flex-1 h-64 md:h-auto relative">
               <img src="https://picsum.photos/id/314/800/1200" alt="Visual" class="w-full h-full object-cover">
               <div class="absolute inset-0 bg-gradient-to-l from-brand-dark to-transparent opacity-50 md:opacity-100 md:w-24 left-auto right-0"></div>
            </div>
          </div>
        `
    },

    // 6. Statistic: Why?
    {
        id: 'cd2-why',
        type: 'content',
        content: `
          <div class="flex flex-col items-center justify-center h-full text-center px-12 bg-gradient-to-br from-brand-dark to-slate-900">
             <div class="mb-8">
               ${Icons.TrendingUp}
             </div>
             <h2 class="text-7xl md:text-9xl font-bold text-white mb-4 tracking-tighter">Soft Skills</h2>
             <h3 class="text-2xl md:text-3xl text-brand-accent mb-8 font-serif">El mercado laboral actual</h3>
             <p class="text-xl text-gray-400 max-w-3xl">
               Las empresas buscan comunicación, negociación y empatía digital. Al usar Trello o Slack hoy, estás entrenando para tu puesto de trabajo mañana.
             </p>
             <div class="mt-12 p-4 border-t border-slate-700 text-sm text-gray-500">
               Transferencia al ámbito laboral y social
             </div>
          </div>
        `
    },

    // 7. Bullet Points: Misión (Usando fallback style del renderer)
    {
        id: 'cd2-mission',
        type: 'content',
        content: `
            <div class="flex flex-col h-full bg-brand-dark p-12 md:p-24 justify-center">
              <h2 class="text-5xl font-serif font-bold text-white mb-4">La Misión: Producto Integrador</h2>
              <h3 class="text-2xl text-brand-primary mb-12">Desarrollo - 180 Minutos</h3>
              <div class="grid md:grid-cols-2 gap-12 items-center">
                 <p class="text-xl text-gray-300 leading-relaxed">
                   Su equipo debe entregar una solución tangible que evidencie el proceso colaborativo.
                 </p>
                 <div class="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                    <ul class="space-y-6">
                        <li class="flex items-center text-lg text-white">
                          <div class="w-2 h-2 bg-brand-accent rounded-full mr-4"></div>
                          Tablero de proyecto inicial (Miro/Trello)
                        </li>
                        <li class="flex items-center text-lg text-white">
                          <div class="w-2 h-2 bg-brand-accent rounded-full mr-4"></div>
                          Documento colaborativo de investigación (Google Docs)
                        </li>
                        <li class="flex items-center text-lg text-white">
                          <div class="w-2 h-2 bg-brand-accent rounded-full mr-4"></div>
                          Evidencia gráfica de colaboración (Capturas, fotos)
                        </li>
                        <li class="flex items-center text-lg text-white">
                          <div class="w-2 h-2 bg-brand-accent rounded-full mr-4"></div>
                          Cartel de difusión o presentación final (Canva/Slides)
                        </li>
                    </ul>
                 </div>
              </div>
            </div>
        `
    },

    // 8. Evaluation
    {
        id: 'cd2-eval',
        type: 'content',
        content: `
          <div class="flex flex-col md:flex-row h-full bg-brand-dark">
            <div class="flex-1 flex flex-col justify-center p-12 md:p-16">
              <h2 class="text-4xl font-serif font-bold text-white mb-2">Evaluación y Criterios</h2>
              <h3 class="text-xl text-brand-primary mb-6">Cómo medimos el éxito</h3>
              <p class="text-lg text-gray-300 mb-8 leading-relaxed">La calificación se divide en proceso y resultado. La participación activa es clave.</p>
              <ul class="space-y-4">
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>30% - Lista de Cotejo: Participación activa en dinámicas y exploración.</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>70% - Lista de Cotejo: Calidad y pertinencia del producto integrador.</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Requisito: Uso crítico de al menos 3 herramientas.</span>
                  </li>
                  <li class="flex items-start text-gray-300">
                      ${Icons.CheckCircle}
                      <span>Meta: Fomentar la autorregulación.</span>
                  </li>
              </ul>
            </div>
            <div class="flex-1 h-64 md:h-auto relative">
               <img src="https://picsum.photos/id/106/800/1200" alt="Visual" class="w-full h-full object-cover">
               <div class="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent opacity-50 md:opacity-100 md:w-24"></div>
            </div>
          </div>
        `
    },

    // 9. Call to Action
    {
        id: 'cd2-final',
        type: 'content',
        content: `
          <div class="flex flex-col items-center justify-center h-full text-center px-8 bg-brand-primary text-white relative overflow-hidden">
             <!-- Pattern bg simulated -->
             <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, #fff 10%, transparent 10%); background-size: 20px 20px;"></div>
             
             <div class="z-10 max-w-4xl relative">
               <h2 class="text-2xl opacity-90 mb-4">¿Están listos para transformar?</h2>
               <p class="text-xl mb-6 font-serif opacity-90">Estudio Independiente: 2 Horas</p>
               <h1 class="text-6xl md:text-8xl font-black mb-8 tracking-tight">MANOS A LA OBRA</h1>
               <p class="text-2xl md:text-3xl mb-12 font-serif italic opacity-90">
                 "Refinen su proyecto. Exploren herramientas avanzadas. Sean creativos. La tecnología es el vehículo, ustedes son los conductores."
               </p>
               <p class="mt-12 text-sm opacity-60">Cultura Digital II - Jose Mendoza</p>
             </div>
          </div>
        `
    }
];
