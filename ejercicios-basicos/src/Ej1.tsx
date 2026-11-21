function Producto({
  nombre,
  precio,
  stock,
}: {
  nombre: string
  precio: number
  stock: number
}) {
  return (
    <div className="card">
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      {stock === 0 ? (
        <p className="sin-stock">Sin stock</p>
      ) : (
        <p>Stock: {stock} unidades</p>
      )}
    </div>
  )
}

export default function Ej1() {
  return (
    <div className="cards-grid">
      <Producto nombre="Teclado" precio={45000} stock={12} />
      <Producto nombre="Mouse" precio={18000} stock={0} />
      <Producto nombre="Monitor" precio={320000} stock={3} />
    </div>
  )
}
