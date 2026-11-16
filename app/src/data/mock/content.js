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
