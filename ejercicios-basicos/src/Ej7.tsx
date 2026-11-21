interface ProductoProps {
  nombre: string
  precio: number
  stock: number
  oferta?: boolean
}

function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <div className="card">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      {stock === 0 ? (
        <p className="sin-stock">Sin stock</p>
      ) : (
        <p>Stock: {stock} unidades</p>
      )}
      {oferta && <span className="badge-oferta">¡Oferta!</span>}
    </div>
  )
}

export default function Ej7() {
  return (
    <div className="cards-grid">
      <Producto nombre="Auriculares" precio={62000} stock={8} oferta={true} />
      <Producto nombre="Webcam" precio={49000} stock={5} />
    </div>
  )
}
