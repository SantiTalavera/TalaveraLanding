import logo1 from '../../assets/mock/client-1.svg'
import logo2 from '../../assets/mock/client-2.svg'
import logo3 from '../../assets/mock/client-3.svg'
import logo4 from '../../assets/mock/client-4.svg'
import logo5 from '../../assets/mock/client-5.svg'
import logo6 from '../../assets/mock/client-6.svg'
import logo7 from '../../assets/mock/client-7.svg'
import logo8 from '../../assets/mock/client-8.svg'
import logo9 from '../../assets/mock/client-9.svg'
import logo10 from '../../assets/mock/client-10.svg'
import hoaImage from '../../assets/mock/product-hoa.svg'
import developerImage from '../../assets/mock/product-developers.svg'
import assetsImage from '../../assets/mock/product-assets.svg'
import operationsImage from '../../assets/mock/product-operations.svg'
import propertiesImage from '../../assets/mock/portfolio-properties.svg'
import simulationImage from '../../assets/mock/portfolio-simulation.svg'
import cclfImage from '../../assets/mock/portfolio-cclf.svg'

const mockClients = [
  ['altovela', 'Altovela', logo1], ['norte-sur', 'Norte Sur', logo2],
  ['umbria', 'Umbría', logo3], ['terral', 'Terral Desarrollos', logo4],
  ['cauce', 'Cauce', logo5], ['valnera', 'Valnera', logo6],
  ['origen', 'Origen Distrito', logo7], ['senda', 'Senda', logo8],
  ['prisma', 'Prisma Hábitat', logo9], ['ladera', 'Ladera', logo10],
]
export const clients = mockClients.map(([id, name, logo]) => ({ id, name, logo, url: `#demo/organizaciones/${id}` }))

export const products = [
  { id: 'hoa', name: 'Sistema modular HOA', description: 'Comercialización, masterplan y administración en un sistema que conecta información, decisiones y operación.', image: hoaImage, landingUrl: '#demo/productos/hoa', status: 'active', category: 'Clubes de campo / HOA' },
  { id: 'desarrolladores', name: 'Plataforma para desarrolladores', description: 'Un espacio compartido para gestionar unidades, reservas y ventas a lo largo de cada desarrollo.', image: developerImage, landingUrl: '#demo/productos/desarrolladores', status: 'active', category: 'Desarrollo inmobiliario' },
  { id: 'activos', name: 'Gestión de activos inmobiliarios', description: 'Una visión estructurada del portfolio para consultar información, seguir su operación y acompañar decisiones.', image: assetsImage, landingUrl: '#demo/productos/activos', status: 'active', category: 'Portfolio / Activos' },
  { id: 'operaciones', name: 'Operaciones inmobiliarias', description: 'Coordina procesos, equipos y actores en una operación conectada, con contexto y trazabilidad.', image: operationsImage, landingUrl: '#demo/productos/operaciones', status: 'active', category: 'Procesos / Operación' },
]


// Portfolio provisional para el prototipo privado; no implica autorización pública.
export const portfolio = [
  {
    id: 'administracion-propiedades', slug: 'administracion-propiedades', name: 'Administración de propiedades',
    category: 'Producto propio', headline: 'Todas tus propiedades. Una sola operación.',
    description: 'Centralizá inmuebles, pagos, mantenimiento y proveedores en un sistema diseñado para operar con control y trazabilidad.',
    image: propertiesImage, imageAlt: 'Mockup conceptual de gestión de inmuebles, contratos, pagos, mantenimiento y proveedores.',
    ctaLabel: 'Conocer el producto', landingUrl: '#demo/portfolio/administracion-propiedades', status: 'proyectado', visibility: 'demo',
  },
  {
    id: 'simulacion-atencion', slug: 'simulacion-atencion', name: 'Simulación de atención comercial',
    category: 'Proyecto aplicado', headline: 'Entender la operación antes de transformarla.',
    description: 'Modelización de consultas entrantes y evaluación de escenarios operativos para identificar demoras, analizar capacidad y mejorar decisiones.',
    image: simulationImage, imageAlt: 'Diagrama conceptual de eventos discretos con consultas, espera, asesores y tiempos de atención.',
    ctaLabel: 'Explorar proyecto', landingUrl: '#demo/portfolio/simulacion-atencion', status: 'proyecto', visibility: 'demo',
  },
  {
    id: 'cclf', slug: 'cclf', name: 'CCLF — Comercialización de lotes',
    category: 'Proyecto colaborativo', headline: 'Cada lote. Cada decisión. Bajo control.',
    description: 'Una plataforma para estructurar la comercialización de lotes, coordinar actores y dar trazabilidad a reservas y ventas.',
    image: cclfImage, imageAlt: 'Masterplan conceptual con lotes por estado y panel de comercialización.',
    ctaLabel: 'Conocer el proyecto', landingUrl: '#demo/portfolio/cclf', status: 'colaborativo', visibility: 'demo',
  },
]

export const faqs = [
  ['¿Con qué tipo de organizaciones trabaja TALAVERA?', 'Trabajamos con organizaciones del sector inmobiliario que gestionan operaciones con múltiples actores, decisiones e información. El enfoque puede resultar útil para desarrolladores, administradores de activos y comunidades que buscan una estructura más clara.'],
  ['¿Desarrollás productos propios o soluciones a medida?', 'El modelo contempla productos propios y proyectos diseñados para necesidades específicas. La alternativa depende de la operación, su etapa y el alcance que se defina en conjunto.'],
  ['¿Qué comprende un diagnóstico estratégico?', 'Es una instancia inicial para conocer el contexto, identificar puntos de fricción y entender cómo circulan la información y las decisiones. A partir de esa conversación se pueden explorar oportunidades y posibles próximos pasos.'],
  ['¿Cómo comienza un proyecto?', 'Comienza con una conversación sobre la operación, sus objetivos y sus desafíos actuales.'],
  ['¿Es posible integrar sistemas existentes?', 'Las integraciones pueden evaluarse según las herramientas involucradas, sus capacidades técnicas y las prioridades del proyecto. Antes de definir una solución, es importante entender qué información debe compartirse y cómo se utiliza.'],
  ['¿TALAVERA también participa en proyectos como socio o consultor?', 'Sí, el modelo contempla consultoría, colaboraciones y posibles asociaciones. Cada oportunidad se analiza individualmente para determinar el tipo de participación y el alcance más adecuados.'],
]

export const navigation = [
  { label: 'Productos', href: '#productos' },
  { label: 'Soluciones', href: '#demo/soluciones' },
  { label: 'Recursos', href: '#demo/recursos' },
  { label: 'Soporte', href: '#demo/soporte' },
]
export const footerLinks = {
  Legales: [{ label: 'Términos y condiciones', href: '#demo/legales/terminos' }, { label: 'Política de privacidad', href: '#demo/legales/privacidad' }],
  Productos: [],
  Recursos: [{ label: 'Publicaciones', href: '#demo/recursos/publicaciones' }, { label: 'Perspectivas', href: '#demo/recursos/perspectivas' }],
  Soporte: [{ label: 'Centro de soporte', href: '#demo/soporte/centro' }],
}
export const socialLinks = [{ label: 'LinkedIn', href: '#demo/redes/linkedin' }, { label: 'Instagram', href: '#demo/redes/instagram' }]
