# programacion4-react

Repositorio de ejercicios y prácticas de **React + TypeScript + Vite** para Programación 4.

## Estructura del repositorio

```text
programacion4-react/
├── .gitignore
├── README.md
├── ejercicios-basicos/          # Proyecto único Vite + React + TypeScript (Ej1 a Ej7)
│   └── src/
│       ├── Ej1.tsx
│       ├── Ej2.tsx
│       ├── Ej3.tsx
│       ├── Ej4.tsx
│       ├── Ej5.tsx
│       ├── Ej6.tsx
│       ├── Ej7.tsx
│       └── App.tsx
└── frontend-endpoints/          # 8 proyectos completos e incrementales
    ├── practica1/
    ├── practica2/
    ├── practica3/
    ├── practica4/
    ├── practica5/
    ├── practica6/
    ├── practica7/
    └── practica8/
```

---

## Parte 1: `ejercicios-basicos/`

Proyecto Vite + React + TypeScript que reúne los 7 ejercicios básicos en `App.tsx`:

1. **`Ej1.tsx` — Tarjetas de producto (Props):** componente `Producto` con desestructuración de props y estado `"Sin stock"` cuando `stock === 0`.
2. **`Ej2.tsx` — Contador con límites (`useState`):** rango `[0, 10]`, botones `-`, `+`, `Reiniciar`, deshabilitación en los extremos y mensaje `"Llegaste al máximo"`.
3. **`Ej3.tsx` — Mostrar y ocultar (Condicionales):** tarjeta de pregunta y respuesta con botón para alternar visibilidad.
4. **`Ej4.tsx` — Conversor de temperatura (Inputs controlados):** conversión en tiempo real de °C a °F (1 decimal) sin estado derivado y alerta `"Hace calor"` cuando supera los 30 °C.
5. **`Ej5.tsx` — Lista de compras (Listas y estado):** alta con `Date.now()` validando `.trim()`, eliminación inmutable con `filter` y mensaje de lista vacía.
6. **`Ej6.tsx` — Buscador (Filtrado):** filtrado en vivo case-insensitive sobre lenguajes de programación con contador de resultados.
7. **`Ej7.tsx` — Tipar con TypeScript:** componente `Producto` tipado con `interface ProductoProps` y prop opcional `oferta?: boolean`.

### Cómo ejecutar

```bash
cd ejercicios-basicos
npm install
npm run dev
```

---

## Parte 2: `frontend-endpoints/`

Ocho proyectos Vite + React + TypeScript completos e incrementales conectados al backend FastAPI con autenticación JWT en `localStorage`:

- **`practica1/`:** detalle de usuario al hacer clic (`GET /user/{id}` con `useEffect` dependiente del `id` seleccionado).
- **`practica2/`:** estados `loading` (`"Cargando..."`) y manejo de errores mostrando `detail` de la API.
- **`practica3/`:** buscador por nombre (`GET /user/search/{name}` con `encodeURIComponent`) y botón `"Limpiar"`.
- **`practica4/`:** saludo del usuario autenticado con sus roles (`Hola, {nombre} ({ROLES})`).
- **`practica5/`:** formulario de alta de usuario (`POST /user`) actualizando la lista sin recargar.
- **`practica6/`:** alternancia entre `"Todos"` (`GET /user`) y `"Solo mayores"` (`GET /user_mayores`).
- **`practica7/`:** borrado de usuario (`DELETE /user/{id}`) con `window.confirm`, actualización local con `.filter(...)` y manejo de permisos/errores.
- **`practica8/`:** manejo global de sesión vencida (`401`) mediante `onUnauthorized`, limpiando `localStorage` y volviendo al login con `"Tu sesión venció"`.

### Cómo ejecutar cualquier práctica

1. Copiar `.env.example` a `.env` dentro de la carpeta de la práctica elegida y configurar `VITE_API_URL` (por defecto `http://localhost:8000`).
2. Instalar dependencias y levantar el servidor de desarrollo:

```bash
cd frontend-endpoints/practica8
cp .env.example .env
npm install
npm run dev
```

### Build de producción

En cualquiera de los proyectos:

```bash
npm run build
```
