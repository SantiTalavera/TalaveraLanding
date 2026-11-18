import { faqs } from '../../data/content'
import './FAQSection.css'

export default function FAQSection() {
  return <section id="preguntas-frecuentes" className="faq" aria-labelledby="faq-title"><div><p className="section-label">Información</p><h2 id="faq-title">Preguntas frecuentes.</h2><p className="faq__intro">Una primera aproximación a la forma de trabajar de TALAVERA.</p></div><div className="faq__list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
}
