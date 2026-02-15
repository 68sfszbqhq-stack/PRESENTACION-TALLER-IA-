import { SlideData, SlideType } from './types.ts';

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.TITLE,
    title: "Cultura Digital II",
    subtitle: "Colaboración Digital: Resolviendo el Futuro Hoy",
    footer: "Docente: Jose Mendoza | 2º Semestre",
    image: "https://picsum.photos/id/1/1920/1080" // Laptop/coding vibe
  },
  {
    id: 2,
    type: SlideType.BIG_QUOTE,
    title: "El Problema Invisible",
    highlightText: "\"Falta de habilidades para la comunicación efectiva y el trabajo colaborativo.\"",
    subtitle: "Problemática Comunitaria Identificada",
    content: "En un mundo hiperconectado, paradójicamente nos cuesta resolver conflictos juntos.",
    image: "https://picsum.photos/id/1015/1920/1080" // Landscape nature/bridge
  },
  {
    id: 3,
    type: SlideType.SPLIT_IMAGE_RIGHT,
    title: "La Dinámica: El Teléfono Descompuesto Digital",
    subtitle: "Inicio - 45 Minutos",
    content: "¿Qué pasa cuando intentamos resolver un problema complejo con mensajes simples? Vamos a experimentar los desafíos de la comunicación digital y cómo los malentendidos afectan nuestra convivencia escolar.",
    image: "https://picsum.photos/id/3/800/1200", // Tech abstract
    bullets: [
      "Formar equipos pequeños",
      "Comunicar un mensaje complejo usando solo chat",
      "Comparar el resultado final",
      "Reflexionar sobre la claridad y herramientas"
    ]
  },
  {
    id: 4,
    type: SlideType.GRID_CARDS,
    title: "Nuestro Arsenal Digital",
    subtitle: "Más de 20 herramientas para dominar",
    content: "No son solo apps, son superpoderes de productividad.",
    cards: [
      {
        title: "Gestión",
        description: "Organización y seguimiento de tareas.",
        icon: "Layout",
        tools: [
          {
            name: "Trello",
            explanation: "Gestión de proyectos visual basada en tableros Kanban. Ideal para visualizar el flujo de trabajo.",
            benefits: ["Fácil de usar", "Visual e intuitivo", "Integraciones poderosas"],
            url: "https://trello.com"
          },
          {
            name: "Miro",
            explanation: "Pizarra blanca infinita colaborativa para brainstorming y planificación visual.",
            benefits: ["Colaboración en tiempo real", "Plantillas versátiles", "Libertad creativa"],
            url: "https://miro.com"
          },
          {
            name: "Notion",
            explanation: "Espacio de trabajo todo en uno para notas, bases de datos y gestión de proyectos.",
            benefits: ["Altamente personalizable", "Bases de datos relacionales", "Documentación centralizada"],
            url: "https://notion.so"
          },
          {
            name: "Asana",
            explanation: "Plataforma para gestionar el trabajo en equipo, proyectos y tareas.",
            benefits: ["Vistas de cronograma", "Gestión de carga de trabajo", "Automatización de procesos"],
            url: "https://asana.com"
          }
        ]
      },
      {
        title: "Creación",
        description: "Herramientas para producir contenido.",
        icon: "Edit3",
        tools: [
          {
            name: "Google Docs",
            explanation: "Procesador de texto colaborativo en la nube.",
            benefits: ["Edición simultánea", "Historial de versiones", "Comentarios en tiempo real"],
            url: "https://docs.google.com"
          },
          {
            name: "Canva",
            explanation: "Herramienta de diseño gráfico simplificado para no diseñadores.",
            benefits: ["Miles de plantillas", "Interfaz arrastrar y soltar", "Recursos gráficos gratuitos"],
            url: "https://canva.com"
          },
          {
            name: "Slides",
            explanation: "Creación de presentaciones efectivas y colaborativas.",
            benefits: ["Accesible desde cualquier lugar", "Fácil de compartir", "Modo presentador"],
            url: "https://google.com/slides"
          }
        ]
      },
      {
        title: "Comunicación",
        description: "Mantener al equipo conectado.",
        icon: "MessageSquare",
        tools: [
          {
            name: "Slack",
            explanation: "Plataforma de mensajería basada en canales para equipos.",
            benefits: ["Organización por temas", "Búsqueda potente", "Menos correos electrónicos"],
            url: "https://slack.com"
          },
          {
            name: "Microsoft Teams",
            explanation: "Hub de trabajo en equipo que combina chat, videollamadas y archivos.",
            benefits: ["Integración con Office 365", "Videoconferencias robustas", "Seguridad empresarial"],
            url: "https://teams.microsoft.com"
          }
        ]
      },
      {
        title: "Interacción",
        description: "Gamificación y participación.",
        icon: "Zap",
        tools: [
          {
            name: "Kahoot!",
            explanation: "Plataforma de aprendizaje basada en juegos y trivias.",
            benefits: ["Aumenta el compromiso", "Evaluación divertida", "Feedback inmediato"],
            url: "https://kahoot.com"
          },
          {
            name: "Padlet",
            explanation: "Muro digital colaborativo para compartir ideas y recursos.",
            benefits: ["Fácil de publicar", "Soporta multimedia", "Diseño atractivo"],
            url: "https://padlet.com"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    type: SlideType.SPLIT_IMAGE_LEFT,
    title: "Aprendizaje Basado en Proyectos (ABP)",
    subtitle: "Metodología Activa",
    content: "No vamos a memorizar. Vamos a investigar, proponer y crear. El objetivo es identificar una problemática real (Salud, Convivencia, Psicosocial) y abordarla.",
    bullets: [
      "Formar equipos de 3-4 integrantes",
      "Elegir una problemática del PAEC",
      "Planificar una solución innovadora",
      "Usar al menos 3 herramientas digitales"
    ],
    image: "https://picsum.photos/id/314/800/1200" // People planning/map
  },
  {
    id: 6,
    type: SlideType.STATISTIC,
    title: "¿Por qué hacemos esto?",
    highlightText: "Soft Skills",
    subtitle: "El mercado laboral actual",
    content: "Las empresas buscan comunicación, negociación y empatía digital. Al usar Trello o Slack hoy, estás entrenando para tu puesto de trabajo mañana.",
    footer: "Transferencia al ámbito laboral y social"
  },
  {
    id: 7,
    type: SlideType.BULLET_POINTS,
    title: "La Misión: Producto Integrador",
    subtitle: "Desarrollo - 180 Minutos",
    content: "Su equipo debe entregar una solución tangible que evidencie el proceso colaborativo.",
    bullets: [
      "Tablero de proyecto inicial (Miro/Trello)",
      "Documento colaborativo de investigación (Google Docs)",
      "Evidencia gráfica de colaboración (Capturas, fotos)",
      "Cartel de difusión o presentación final (Canva/Slides)"
    ],
    image: "https://picsum.photos/id/445/1920/1080" // Camera/Tech
  },
  {
    id: 8,
    type: SlideType.SPLIT_IMAGE_RIGHT,
    title: "Evaluación y Criterios",
    subtitle: "Cómo medimos el éxito",
    content: "La calificación se divide en proceso y resultado. La participación activa es clave.",
    bullets: [
      "30% - Lista de Cotejo: Participación activa en dinámicas y exploración.",
      "70% - Lista de Cotejo: Calidad y pertinencia del producto integrador.",
      "Requisito: Uso crítico de al menos 3 herramientas.",
      "Meta: Fomentar la autorregulación."
    ],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" // Checklist/Meeting
  },
  {
    id: 9,
    type: SlideType.CALL_TO_ACTION,
    title: "¿Están listos para transformar?",
    subtitle: "Estudio Independiente: 2 Horas",
    content: "Refinen su proyecto. Exploren herramientas avanzadas. Sean creativos. La tecnología es el vehículo, ustedes son los conductores.",
    highlightText: "MANOS A LA OBRA",
    footer: "Cultura Digital II - Jose Mendoza"
  }
];