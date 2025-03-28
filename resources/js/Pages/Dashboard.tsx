import { Head, usePage, Link } from '@inertiajs/react';
import { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import Dropdown from '@/Components/Dropdown';

/* ----------------------------------------------------------------
   Tipos / Interfaces
---------------------------------------------------------------- */
interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  email_verified_at?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Opinion {
  id?: number;
  user_id: number;
  content: string;
  rating: number;
}

type ActiveSection =
  | 'inicio'
  | 'compras'
  | 'foro'
  | 'perfil'
  | 'agregarProducto'
  | 'subscripciones';

/* ----------------------------------------------------------------
   Función fetchWithRetry: reintentos y siempre con credentials
---------------------------------------------------------------- */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 3,
  delay = 1000
): Promise<Response> => {
  // Aseguramos que en todas las peticiones se incluyan cookies (sesión)
  options.credentials = 'include';

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      // Espera 'delay' ms antes del siguiente reintento
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new Error('Unexpected error in fetchWithRetry');
};

/* ----------------------------------------------------------------
   Componente HeroBanner
---------------------------------------------------------------- */
const HeroBanner: React.FC = () => (
  <motion.div
    className="w-full h-80 bg-cover bg-center flex items-center justify-center relative rounded-xl shadow-lg"
    style={{ backgroundImage: "url('/imagenes/new-hero.jpg')" }} // Ajusta si tu imagen está en otra carpeta
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2 }}
  >
    <div className="absolute inset-0 bg-black/40"></div>
    <div className="relative z-10 text-center px-4">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
        Imagina descubrir un mundo sin fronteras
      </h1>
      <p className="mt-4 text-xl text-gray-200">
        Donde cada paso te conecta con la cultura y el conocimiento.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 px-8 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition duration-300"
      >
        Descubre Más
      </motion.button>
    </div>
  </motion.div>
);

/* ----------------------------------------------------------------
   Componente TopNavigation
---------------------------------------------------------------- */
interface TopNavigationProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  cartCount: number;
  auth: { user: User };
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  activeSection,
  setActiveSection,
  cartCount,
  auth,
}) => (
  <motion.nav
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full bg-white shadow sticky top-0 z-50"
  >
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        {/* Logo y título */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Link href="/">
            <img
              src="/imagenes/logo (2).png"
              alt="Mi Logo"
              className="h-10 w-10 drop-shadow-lg"
            />
          </Link>
          <motion.h1
            className="ml-2 text-xl text-gray-800 font-extrabold tracking-widest uppercase drop-shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Travel Tunnel VR
          </motion.h1>
        </motion.div>

        {/* Menú de navegación */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveSection('inicio')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === 'inicio'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveSection('compras')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === 'compras'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            Compras
          </button>
          <button
            onClick={() => setActiveSection('foro')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === 'foro'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            Foro
          </button>
          <button
            onClick={() => setActiveSection('perfil')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === 'perfil'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            Perfil
          </button>
          {auth.user.email === 'luisenriqueandazoladiazz@gmail.com' && (
            <button
              onClick={() => setActiveSection('agregarProducto')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'agregarProducto'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-800 hover:bg-blue-100'
              }`}
            >
              Agregar Producto
            </button>
          )}
          {/* Botón para Subscripciones */}
          <button
            onClick={() => setActiveSection('subscripciones')}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeSection === 'subscripciones'
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            }`}
          >
            Subscripciones
          </button>
        </div>

        {/* Menú de Usuario y Carrito */}
        <div className="flex items-center space-x-4">
          <Dropdown>
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md">
                <motion.button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-800 hover:bg-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {auth.user.name}
                  <svg
                    className="-mr-0.5 ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </span>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
              <Dropdown.Link href={route('logout')} method="post" as="button">
                Cerrar sesión
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>

          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
            onClick={() => setActiveSection('compras')}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.5 8.5h13a1 1 0 011 1v10a2 2 0 01-2 2h-11a2 2 0 01-2-2v-10a1 1 0 011-1z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 8.5v-1a3.5 3.5 0 017 0v1"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-1">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  </motion.nav>
);

/* ----------------------------------------------------------------
   Listado de Productos
---------------------------------------------------------------- */
interface ListadoProductosProps {
  products: Product[];
  onBuy?: (product: Product) => void;
  onDelete?: (id: number) => void;
}

const ListadoProductos: React.FC<ListadoProductosProps> = ({
  products,
  onBuy,
  onDelete,
}) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {products.map((product) => (
      <motion.div
        key={product.id}
        className="bg-white rounded-xl p-4 shadow transform transition duration-300 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <img
          src={product.image || '/images/default.png'}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg mb-3 shadow-md"
        />
        <h3 className="font-semibold text-xl text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
        {onBuy && (
          <motion.button
            onClick={() => onBuy(product)}
            whileHover={{ scale: 1.05 }}
            className="mt-3 w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Agregar al Carrito
          </motion.button>
        )}
        {onDelete && (
          <motion.button
            onClick={() => onDelete(product.id)}
            whileHover={{ scale: 1.05 }}
            className="mt-2 w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Eliminar
          </motion.button>
        )}
      </motion.div>
    ))}
  </div>
);

/* ----------------------------------------------------------------
   Sección INICIO
---------------------------------------------------------------- */
interface SeccionInicioProps {
  products: Product[];
  productsCount: number;
  cartCount: number;
  cartTotal: number;
  onBuy: (product: Product) => void;
}

const SeccionInicio: React.FC<SeccionInicioProps> = ({
  products,
  productsCount,
  cartCount,
  cartTotal,
  onBuy,
}) => (
  <div className="space-y-10">
    <HeroBanner />

    {/* Tarjetas de resumen */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Productos', value: productsCount },
        { label: 'En Carrito', value: cartCount },
        { label: 'Total ($)', value: `$${cartTotal.toFixed(2)}` },
        { label: 'Pendientes', value: cartCount },
      ].map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 text-center shadow"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">{item.value}</p>
        </motion.div>
      ))}
    </div>

    {/* Ofertas */}
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Ofertas del Día</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Ver Ofertas
        </motion.button>
      </div>
      <p className="mt-2 text-gray-600">
        Descuentos y promociones en productos seleccionados.
      </p>
    </div>

    {/* Catálogo de Productos */}
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Catálogo de Productos
      </h2>
      <ListadoProductos products={products} onBuy={onBuy} />
    </div>
  </div>
);

/* ----------------------------------------------------------------
   Sección COMPRAS
---------------------------------------------------------------- */
interface SeccionComprasProps {
  cart: CartItem[];
  onRemove: (productId: number) => void;
  onPurchase: () => void;
  compras: any[];
}

const SeccionCompras: React.FC<SeccionComprasProps> = ({
  cart,
  onRemove,
  onPurchase,
  compras,
}) => (
  <div className="space-y-10">
    {/* Carrito */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-gray-800">Tu Carrito</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 mt-4">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="text-gray-800 font-semibold">{item.name}</p>
                  <p className="text-gray-600">
                    {item.quantity} x ${item.price}
                  </p>
                </div>
                <motion.button
                  onClick={() => onRemove(item.id)}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </motion.button>
              </motion.li>
            ))}
          </ul>
          <motion.button
            onClick={onPurchase}
            whileHover={{ scale: 1.05 }}
            className="mt-6 w-full px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Realizar Compra
          </motion.button>
        </div>
      )}
    </div>

    {/* Historial de Compras */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-gray-800">Historial de Compras</h2>
      {compras.length === 0 ? (
        <p className="text-gray-600 mt-4">No has realizado compras.</p>
      ) : (
        compras.map((compra) => (
          <motion.div
            key={compra.id}
            whileHover={{ scale: 1.02 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Compra #{compra.id}
            </h3>
            <ul className="mt-2 list-disc list-inside text-gray-600">
              {compra.items.map((item: any, idx: number) => (
                <li key={idx}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold text-gray-800">
              Total: ${compra.total}
            </p>
          </motion.div>
        ))
      )}
    </div>
  </div>
);

/* ----------------------------------------------------------------
   Sección AGREGAR PRODUCTO
---------------------------------------------------------------- */
interface SeccionAgregarProductoProps {
  products: Product[];
  refreshProducts: () => void;
}

const SeccionAgregarProducto: React.FC<SeccionAgregarProductoProps> = ({
  products,
  refreshProducts,
}) => {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          image: newProduct.image,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${res.status} - ${errorText}`);
      }
      await res.json();
      alert('Producto creado correctamente');
      setNewProduct({ name: '', price: '', image: '' });
      refreshProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${res.status} - ${errorText}`);
      }
      alert('Producto eliminado');
      refreshProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800">Agregar Nuevo Producto</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md text-gray-800"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Precio</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
          <input
            type="text"
            name="image"
            value={newProduct.image}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full py-2 bg-blue-500 rounded-md text-white font-semibold hover:bg-blue-600"
        >
          Guardar Producto
        </motion.button>
      </form>

      <div>
        <h2 className="text-3xl font-bold text-gray-800 mt-8">
          Listado de Productos
        </h2>
        <ListadoProductos products={products} onDelete={handleDelete} />
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   Sección FORO
---------------------------------------------------------------- */
interface SeccionForoProps {
  opinions: Opinion[];
  addOpinion: (opinion: Opinion) => void;
  userId: number;
}

const SeccionForo: React.FC<SeccionForoProps> = ({
  opinions,
  addOpinion,
  userId,
}) => {
  const [localOpinion, setLocalOpinion] = useState('');
  const [localRating, setLocalRating] = useState(0);

  const handleOpinionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalOpinion(e.target.value);
  };

  const handleSubmitOpinion = () => {
    if (localOpinion.trim() && localRating > 0) {
      addOpinion({
        user_id: userId,
        content: localOpinion,
        rating: localRating,
      });
      setLocalOpinion('');
      setLocalRating(0);
    } else {
      alert('Escribe una opinión y selecciona un rating.');
    }
  };

  const renderRatingStars = () => (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          onClick={() => setLocalRating(star)}
          whileHover={{ scale: 1.2 }}
          className={`cursor-pointer text-2xl ${
            star <= localRating ? 'text-yellow-400' : 'text-gray-400'
          }`}
        >
          ★
        </motion.span>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Foro de Opiniones</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800">Deja tu Opinión</h3>
        <textarea
          value={localOpinion}
          onChange={handleOpinionChange}
          rows={4}
          className="w-full p-2 rounded bg-gray-100 text-gray-800 mt-2"
          placeholder="Escribe tu opinión..."
        ></textarea>
        <div className="mt-2 flex items-center">
          <span className="text-gray-800 font-medium mr-2">Tu Rating:</span>
          {renderRatingStars()}
        </div>
        <motion.button
          onClick={handleSubmitOpinion}
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Publicar
        </motion.button>
      </div>

      {opinions.length === 0 ? (
        <p className="text-gray-500">No hay opiniones aún.</p>
      ) : (
        <div className="space-y-4">
          {opinions.map((opinion, index) => (
            <motion.div
              key={opinion.id || index}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < opinion.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="text-gray-400 text-sm">
                  User ID: {opinion.user_id}
                </span>
              </div>
              <p className="text-gray-800 mt-2">{opinion.content}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ----------------------------------------------------------------
   Sección PERFIL
---------------------------------------------------------------- */
const SeccionPerfil = () => {
  const { auth } = usePage().props as { auth: { user: User } };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-3xl font-bold text-gray-800">Tu Perfil</h2>
      <p className="text-gray-800 font-semibold">Nombre: {auth.user.name}</p>
      <p className="text-gray-600">Correo: {auth.user.email}</p>
      <p className="text-gray-600">
        Miembro desde:{' '}
        {auth.user.created_at
          ? new Date(auth.user.created_at).toLocaleDateString()
          : 'No disponible'}
      </p>
      <p className="text-gray-600">
        Correo verificado:{' '}
        {auth.user.email_verified_at
          ? new Date(auth.user.email_verified_at).toLocaleDateString()
          : 'No verificado'}
      </p>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   Sección SUBSCRIPCIONES
---------------------------------------------------------------- */
const SeccionSubscripciones: React.FC = () => {
  const subscriptionPlans = [
    {
      name: 'Institucional Pequeña',
      price: '2,500 - 3,500 MXN/año',
      description:
        'Ideal para instituciones con hasta 50 alumnos. Acceso total a la experiencia (paquete: 1 país gratuito + 3 DLC) con actualizaciones, soporte y contenido educativo adicional.',
      features: [
        'Hasta 50 alumnos',
        'Costo por alumno: ~50-70 MXN/año',
        'Incluye actualizaciones y soporte',
      ],
    },
    {
      name: 'Institucional Mediana',
      price: '4,000 - 6,000 MXN/año',
      description:
        'Para instituciones de 50 a 200 alumnos. Tarifas escalonadas que permiten un costo por alumno inferior al de la compra individual.',
      features: [
        '50 a 200 alumnos',
        'Mayor economía de escala',
        'Acceso completo y contenido extra',
      ],
    },
    {
      name: 'Institucional Grande',
      price: 'Tarifa Personalizada',
      description:
        'Para instituciones con más de 200 alumnos. Ofrecemos planes a medida para garantizar el menor costo por alumno y beneficios adicionales.',
      features: [
        'Más de 200 alumnos',
        'Plan personalizado',
        'Beneficios exclusivos y descuentos adicionales',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-3xl font-bold text-gray-800">
        Modelo de Suscripción para Instituciones y Museos
      </h2>
      <p className="text-gray-700">
        Travel Tunnel transforma la educación cultural mediante una experiencia
        inmersiva en realidad virtual. Nuestra plataforma permite que
        instituciones, museos y escuelas ofrezcan a sus alumnos la posibilidad
        de explorar tradiciones y monumentos sin barreras geográficas o
        económicas.
      </p>
      <p className="text-gray-700">
        Mientras que al público en general se le ofrece la compra individual de
        DLC a 50 MXN cada uno, nuestros planes institucionales se basan en un
        modelo escalonado, que reduce significativamente el costo por alumno y
        ofrece acceso total a la experiencia (1 país gratuito + 3 DLC), junto
        con actualizaciones y soporte.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {subscriptionPlans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
            <p className="mt-2 text-gray-600">{plan.description}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <div className="mt-6">
                <span className="text-xl font-bold text-gray-800">
                  {plan.price}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Suscribirse
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   Componente Dashboard Principal
---------------------------------------------------------------- */
export default function Dashboard() {
  const { auth } = usePage().props as { auth: { user: User } };

  const [activeSection, setActiveSection] = useState<ActiveSection>('inicio');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [compras, setCompras] = useState<any[]>([]);

  /* ----------------------------------------------------------------
     Fetch de Productos
  ---------------------------------------------------------------- */
  const fetchAllProducts = () => {
    fetch('/api/products', {
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching products: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setAllProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  /* ----------------------------------------------------------------
     Fetch de Compras (Historial)
  ---------------------------------------------------------------- */
  const fetchCompras = () => {
    fetch('/compras', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching compras: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setCompras(data))
      .catch((error) => console.error('Error fetching compras:', error));
  };

  /* ----------------------------------------------------------------
     Efectos Iniciales
  ---------------------------------------------------------------- */
  useEffect(() => {
    fetchAllProducts();
    fetchCompras();
  }, []);

  const productsCount = allProducts.length;

  /* ----------------------------------------------------------------
     Fetch de Opiniones (Foro)
  ---------------------------------------------------------------- */
  useEffect(() => {
    fetch('/api/comentarios', {
      credentials: 'include',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching comentarios: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setOpinions(data))
      .catch((error) => console.error('Error fetching comentarios:', error));
  }, []);

  /* ----------------------------------------------------------------
     Agregar Opinión
  ---------------------------------------------------------------- */
  const addOpinion = async (opinion: Opinion) => {
    try {
      const res = await fetch('/api/comentarios', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(opinion),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error: ${res.status} - ${errorText}`);
      }
      const savedOpinion = await res.json();
      setOpinions((prev) => [...prev, savedOpinion]);
    } catch (error) {
      console.error('Error adding opinion:', error);
    }
  };

  /* ----------------------------------------------------------------
     Carrito de Compras
  ---------------------------------------------------------------- */
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      return existingItem
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const getCartTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /* ----------------------------------------------------------------
     Realizar Compra
  ---------------------------------------------------------------- */
  const handlePurchase = async () => {
    try {
      const response = await fetchWithRetry(
        '/compras',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ items: cart, total: getCartTotal() }),
        },
        3, // reintentos
        1000 // tiempo de espera entre reintentos
      );
      await response.json();
      alert('¡Compra realizada con éxito!');
      setCart([]);
      fetchCompras();
    } catch (error) {
      console.error('Error in purchase:', error);
      alert('Error al realizar la compra. Por favor, inténtalo nuevamente.');
    }
  };

  /* ----------------------------------------------------------------
     Render de Secciones
  ---------------------------------------------------------------- */
  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <SeccionInicio
            products={allProducts}
            productsCount={productsCount}
            cartCount={cart.length}
            cartTotal={getCartTotal()}
            onBuy={handleAddToCart}
          />
        );
      case 'compras':
        return (
          <SeccionCompras
            cart={cart}
            onRemove={handleRemoveFromCart}
            onPurchase={handlePurchase}
            compras={compras}
          />
        );
      case 'foro':
        return (
          <SeccionForo
            opinions={opinions}
            addOpinion={addOpinion}
            userId={auth.user.id}
          />
        );
      case 'perfil':
        return <SeccionPerfil />;
      case 'agregarProducto':
        return auth.user.email === 'luisenriqueandazoladiazz@gmail.com' ? (
          <SeccionAgregarProducto
            products={allProducts}
            refreshProducts={fetchAllProducts}
          />
        ) : (
          <div className="p-6 bg-red-200 text-red-700 rounded-md">
            No tienes permisos para esta sección.
          </div>
        );
      case 'subscripciones':
        return <SeccionSubscripciones />;
      default:
        return (
          <SeccionInicio
            products={allProducts}
            productsCount={productsCount}
            cartCount={cart.length}
            cartTotal={getCartTotal()}
            onBuy={handleAddToCart}
          />
        );
    }
  };

  /* ----------------------------------------------------------------
     Render Principal
  ---------------------------------------------------------------- */
  return (
    <>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gray-100 text-gray-800">
        <TopNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          cartCount={cart.length}
          auth={auth}
        />
        <main className="max-w-7xl mx-auto px-4 py-10">{renderSection()}</main>
      </div>
    </>
  );
}
