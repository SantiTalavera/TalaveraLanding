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

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Diagnostico />
        <Tesis />
        <Filtro />
        <Proposito />
        <Soluciones />
        <Principios />
        <CTAFinal />
      </main>
      <Footer />
    </>
  )
}
