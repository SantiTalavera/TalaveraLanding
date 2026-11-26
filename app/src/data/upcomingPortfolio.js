import propertiesImage from '../assets/mock/portfolio-properties.svg'
import simulationImage from '../assets/mock/portfolio-simulation.svg'
import cclfImage from '../assets/mock/portfolio-cclf.svg'

// User-authorized previews. Coming soon does not enable commercial destinations.
export const upcomingPortfolio = [
  {
    id: 'administracion-propiedades', slug: 'administracion-propiedades', name: 'Administración de propiedades',
    category: 'Producto propio', headline: 'Todas tus propiedades. Una sola operación.',
    description: 'Un producto concebido para centralizar la información de propiedades, contratos, pagos y mantenimiento, facilitando el seguimiento de la operación patrimonial.',
    previewDevices: ['desktop', 'mobile'], image: propertiesImage, imageAlt: 'Mockup conceptual de gestión de inmuebles, contratos, pagos, mantenimiento y proveedores.',
    status: 'proyectado', comingSoon: true, visibility: 'public', authorized: true, landingEnabled: false,
  },
  {
    id: 'simulacion-atencion', slug: 'simulacion-atencion', name: 'Simulación de atención comercial',
    category: 'Proyecto aplicado', headline: 'Entender la operación antes de transformarla.',
    description: 'Modelización y simulación de consultas comerciales para evaluar escenarios de demanda, capacidad de atención y tiempos de respuesta, aportando fundamento a las decisiones operativas.',
    image: simulationImage, imageAlt: 'Diagrama conceptual de eventos discretos con consultas, espera, asesores y tiempos de atención.',
    status: 'proyecto', comingSoon: true, visibility: 'public', authorized: true, landingEnabled: false,
  },
  {
    id: 'cclf', slug: 'cclf', name: 'Comercialización de lotes',
    category: 'Proyecto colaborativo', headline: 'De la disponibilidad a la venta.',
    description: 'Sistema orientado a integrar la gestión de lotes, inmobiliarias, prioridades, reservas y ventas sobre una representación digital del desarrollo inmobiliario.',
    previewDevices: ['desktop', 'mobile'], image: cclfImage, imageAlt: 'Masterplan conceptual con lotes por estado y panel de comercialización.',
    status: 'colaborativo', comingSoon: true, visibility: 'public', authorized: true, landingEnabled: false,
  },
]
