import Ej1 from './Ej1'
import Ej2 from './Ej2'
import Ej3 from './Ej3'
import Ej4 from './Ej4'
import Ej5 from './Ej5'
import Ej6 from './Ej6'
import Ej7 from './Ej7'

export default function App() {
  return (
    <main className="app-container">
      <h1 className="app-title">Ejercicios Básicos de React + TypeScript</h1>

      <section className="ejercicio-section">
        <h2>Ejercicio 1 — Tarjetas de producto (Props)</h2>
        <Ej1 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 2 — Contador con límites (useState)</h2>
        <Ej2 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 3 — Mostrar y ocultar (Condicionales)</h2>
        <Ej3 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 4 — Conversor de temperatura (Inputs controlados)</h2>
        <Ej4 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 5 — Lista de compras (Listas y estado)</h2>
        <Ej5 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 6 — Buscador (Filtrado)</h2>
        <Ej6 />
      </section>

      <section className="ejercicio-section">
        <h2>Ejercicio 7 — Tipar con TypeScript</h2>
        <Ej7 />
      </section>
    </main>
  )
}
