// El prototipo solo se habilita por una opción explícita de compilación.
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'
// La recepción real requiere backend, privacidad y verificación antes de habilitarse.
export const CONTACT_AVAILABLE = DEMO_MODE
