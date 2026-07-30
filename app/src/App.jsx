import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Diagnostico from './components/Diagnostico/Diagnostico'
import Tesis from './components/Tesis/Tesis'
import Filtro from './components/Filtro/Filtro'
import Proposito from './components/Proposito/Proposito'
import Soluciones from './components/Soluciones/Soluciones'
import Principios from './components/Principios/Principios'
import CTAFinal from './components/CTAFinal/CTAFinal'
import Footer from './components/Footer/Footer'
import DiagnosticDialog from './components/DiagnosticDialog/DiagnosticDialog'

export default function App() {
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)

  const openDiagnostic = () => setIsDiagnosticOpen(true)
  const closeDiagnostic = () => setIsDiagnosticOpen(false)

  return (
    <>
      <Navbar onDiagnosticClick={openDiagnostic} />
      <main>
        <Hero />
        <Diagnostico />
        <Tesis />
        <Filtro />
        <Proposito />
        <Soluciones />
        <Principios />
        <CTAFinal onDiagnosticClick={openDiagnostic} />
      </main>
      <Footer onDiagnosticClick={openDiagnostic} />
      <DiagnosticDialog isOpen={isDiagnosticOpen} onClose={closeDiagnostic} />
    </>
  )
}
