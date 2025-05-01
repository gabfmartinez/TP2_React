import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Registro() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Registro</h1>
      <form className="flex flex-col gap-2 w-1/3">
        <input className="border p-2" type="text" placeholder="Nombre" />
        <input className="border p-2" type="email" placeholder="Email" />
        <input className="border p-2" type="password" placeholder="Contraseña" />
        <button className="bg-blue-500 text-white p-2 rounded">Registrarse</button>
      </form>
    </div>
  );
}

function Login() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form className="flex flex-col gap-2 w-1/3">
        <input className="border p-2" type="email" placeholder="Email" />
        <input className="border p-2" type="password" placeholder="Contraseña" />
        <button className="bg-green-500 text-white p-2 rounded">Ingresar</button>
      </form>
    </div>
  );
}

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Productos</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p>{product.description.substring(0, 100)}...</p>
            <p className="font-semibold">${product.price}</p>
            <Link className="text-blue-600 underline" to={`/producto/${product.id}`}>
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data))
      .catch((err) => console.error("Error cargando detalle:", err));
  }, [id]);

  if (!producto) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{producto.title}</h1>
      <p className="mb-2">{producto.description}</p>
      <p className="font-semibold text-lg mb-4">Precio: ${producto.price}</p>
      <button className="bg-purple-500 text-white p-2 rounded">Comprar</button>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/registro">Registro</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </Router>
  );
}
