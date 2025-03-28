import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

/***************************************************
 * 1) NAVBAR TRANSPARENTE (SIN FONDO)
 ***************************************************/
function TransparentNavbar({ auth }: { auth: any }) {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes de animación para el menú móvil
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  return (
    <motion.header
      className="fixed w-full top-0 left-0 z-50 bg-transparent"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-2">
          <motion.img
            src="/imagenes/TRAVEL.png"
            alt="Travel Tunnel Logo"
            className="w-10 h-10 object-cover"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.span
            className="font-bold text-2xl uppercase tracking-wide text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Travel Tunnel
          </motion.span>
        </div>

        {/* Menú principal (desktop) */}
        <nav className="hidden md:flex space-x-6 text-white">
          <motion.a whileHover={{ scale: 1.1 }} href="#inicio" className="hover:text-gray-300 transition">
            INICIO
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="#paises" className="hover:text-gray-300 transition">
            PAÍSES
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="#popular" className="hover:text-gray-300 transition">
            POPULAR
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="#descubrir" className="hover:text-gray-300 transition">
            DESCUBRIR
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="#contacto" className="hover:text-gray-300 transition">
            CONTACTO
          </motion.a>
        </nav>

        {/* Botones Login / Register / Dashboard (o “Compras”) */}
        <div className="flex items-center space-x-4">
          {auth.user ? (
            <Link
              href={route('dashboard')}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition text-white"
            >
              Ir a Compras
            </Link>
          ) : (
            <>
              <Link
                href={route('login')}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition text-white"
              >
                Login
              </Link>
              <Link
                href={route('register')}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-700 transition text-white"
              >
                Register
              </Link>
            </>
          )}
          {/* Botón menú móvil */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden flex flex-col text-white px-4 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <a href="#inicio" className="py-2 hover:text-red-400 transition">INICIO</a>
            <a href="#paises" className="py-2 hover:text-red-400 transition">PAÍSES</a>
            <a href="#popular" className="py-2 hover:text-red-400 transition">POPULAR</a>
            <a href="#descubrir" className="py-2 hover:text-red-400 transition">DESCUBRIR</a>
            <a href="#contacto" className="py-2 hover:text-red-400 transition">CONTACTO</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/***************************************************
 * 2) HERO PRINCIPAL (#inicio)
 ***************************************************/
function HeroSection({ auth }: { auth: any }) {
  const images = [
    '/imagenes/im3.png',
    '/imagenes/img1.png',
    '/imagenes/img11.png',
  ];
  const [current, setCurrent] = useState(0);
  const length = images.length;

  // Rotar imágenes automáticamente
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <section
      id="inicio"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {images.map((img, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      {/* Texto central con animación */}
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido a TravelTunnel VR</h1>
        <p className="text-lg md:text-xl mb-8">Sumérgete en una experiencia de realidad virtual única.</p>
        <Link
          href={auth.user ? route('dashboard') : route('login')}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 transition rounded text-white text-lg"
        >
          {auth.user ? 'Ir a Compras' : 'Jugar Ahora'}
        </Link>
      </motion.div>
    </section>
  );
}

/***************************************************
 * 3) SECCIÓN PAÍSES (#paises)
 ***************************************************/
function PaisesSection() {
  const countryImages = [
    '/imagenes/ind.jpg',
    '/imagenes/ita.jpg',
    '/imagenes/jap.jpg',
    '/imagenes/mex.jpg',
  ];
  const [current, setCurrent] = useState(0);
  const length = countryImages.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  return (
    <motion.section
      id="paises"
      className="py-20 px-6 bg-gray-900 text-white"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-center mb-8">Explora Países Virtuales</h2>
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Flecha Izquierda */}
        <button
          onClick={() => setCurrent((current - 1 + length) % length)}
          aria-label="Anterior"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 z-10 hover:text-red-400 transition duration-300"
        >
          &#10094;
        </button>
        {/* Carrusel de imágenes */}
        {countryImages.map((img, index) => (
          <div
            key={index}
            className={`${index === current ? 'opacity-100 duration-1000 ease-in-out' : 'opacity-0 duration-1000 ease-in-out absolute inset-0'}`}
          >
            {index === current && (
              <img
                src={img}
                alt={`País ${index + 1}`}
                className="w-full h-96 object-cover rounded"
              />
            )}
          </div>
        ))}
        {/* Flecha Derecha */}
        <button
          onClick={() => setCurrent((current + 1) % length)}
          aria-label="Siguiente"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-3xl px-4 z-10 hover:text-red-400 transition duration-300"
        >
          &#10095;
        </button>
      </div>
      <p className="text-center text-gray-300 mt-4 max-w-2xl mx-auto">
        Descubre paisajes y culturas de todo el mundo a través de nuestro entorno virtual.
      </p>
    </motion.section>
  );
}

/***************************************************
 * 4) SECCIÓN “ELEMENTOS DE LA EXPERIENCIA” (#popular)
 ***************************************************/
function ElementosExperienciaSection() {
  const elementos = [
    {
      id: 1,
      titulo: 'NOBI',
      image: '/imagenes/nobi.png',
      descripcion: 'Nuestro robot guía que te da la bienvenida y te acompaña en cada túnel.',
    },
    {
      id: 2,
      titulo: 'TÚNELES',
      image: '/imagenes/tunel.png',
      descripcion: 'Accede a culturas como México, Japón e India de forma inmersiva.',
    },
    {
      id: 3,
      titulo: 'PUZZLES',
      image: '/imagenes/piezas.png',
      descripcion: 'Desafíos interactivos que estimulan el ingenio y promueven el aprendizaje activo.',
    },
    {
      id: 4,
      titulo: 'ESCENARIOS',
      image: '/imagenes/puente.png',
      descripcion: 'Espacios temáticos que evocan tradiciones y festividades de cada cultura.',
    },
  ];

  return (
    <motion.section
      id="popular"
      className="py-16 px-4 bg-gradient-to-r from-black to-[#0b1f40] text-white"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Elementos de la experiencia
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {elementos.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: item.id * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={item.image}
                alt={item.titulo}
                className="w-full h-64 md:h-72 lg:h-80 object-cover rounded shadow-lg"
              />
              <h3 className="text-xl font-bold mt-4 uppercase">{item.titulo}</h3>
              <p className="text-gray-200 text-center mt-2 text-sm">
                {item.descripcion}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/***************************************************
 * 5) SECCIÓN DESCUBRIR (#descubrir)
 ***************************************************/
function DescubrirSection() {
  return (
    <motion.section
      id="descubrir"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#151515]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <video
        src="/imagenes/videos/videoplayback.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-3xl"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Descubre la Experiencia</h2>
        <p className="text-lg md:text-xl mb-4">
          Vive mundos interactivos, participa en aventuras increíbles y comparte tus logros con amigos de todo el mundo.
          ¡La realidad virtual nunca fue tan real!
        </p>
      </motion.div>
    </motion.section>
  );
}

/***************************************************
 * 6) SECCIÓN CONTACTO + FOOTER (#contacto)
 ***************************************************/
function Footer() {
  return (
    <motion.section
      id="contacto"
      className="bg-gray-900 text-white py-16 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-8"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Contáctanos
      </motion.h2>
      <motion.p
        className="text-center text-gray-400 max-w-2xl mx-auto mb-12"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Si tienes alguna pregunta o deseas más información, completa el siguiente formulario o utiliza nuestros datos de contacto.
      </motion.p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Información de Contacto */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-2 text-red-500">Información de Contacto</h3>
          <p className="mb-1">
            <strong>Teléfono:</strong> +52 (614) 123 4567
          </p>
          <p className="mb-1">
            <strong>Email:</strong> info@traveltunnel.com
          </p>
          <p className="mb-1">
            <strong>Dirección:</strong> Chihuahua, Chihuahua, México
          </p>
          <p className="text-gray-300">
            Travel Tunnel es una plataforma de realidad virtual que te permite explorar
            destinos alrededor del mundo sin salir de casa.
          </p>
        </motion.div>

        {/* Formulario de Contacto */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-2 text-red-500">Envíanos un Mensaje</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-red-500"
            />
            <input
              type="email"
              placeholder="Tu Email"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-red-500"
            />
            <textarea
              placeholder="Tu Mensaje"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-red-500"
              rows={5}
            />
           
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Enviar
            </button>
          </form>
        </motion.div>

        {/* Ubicación (Map) */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-2 text-red-500">Nuestra Ubicación</h3>
          <div className="rounded overflow-hidden h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.057529139689!2d-106.06454052501594!3d28.64247168240581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86f1ab77b8b43f2d%3A0xa6d1a98e7f24c953!2sChihuahua%2C%20Chih.%2C%20M%C3%A9xico!5e0!3m2!1ses!2s!4v1677724773134!5m2!1ses!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      {/* Sección secundaria */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
        {/* Newsletters */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-red-500">Nuestros Newsletters</h3>
          <p className="text-gray-400 text-sm">
            Suscríbete para recibir las últimas novedades y ofertas exclusivas.
          </p>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Tu Email"
              className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:border-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
            >
              Suscribirse
            </button>
          </form>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-red-500">Navegación</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="#inicio" className="hover:text-white transition">Inicio</a></li>
            <li><a href="#paises" className="hover:text-white transition">Países</a></li>
            <li><a href="#popular" className="hover:text-white transition">Popular</a></li>
            <li><a href="#descubrir" className="hover:text-white transition">Descubrir</a></li>
            <li><a href="#contacto" className="hover:text-white transition">Contacto</a></li>
          </ul>
        </motion.div>

        {/* Work Hours */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-red-500">Horario de Trabajo</h3>
          <ul className="space-y-1 text-gray-400">
            <li>Lunes - Viernes: 9:00 AM - 5:00 PM</li>
            <li>Sábado: 9:00 AM - 2:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-red-500">Redes Sociales</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">YouTube</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-gray-600 mt-12">
        &copy; 2025 Travel Tunnel. Todos los derechos reservados.
      </div>
    </motion.section>
  );
}

/***************************************************
 * 7) SECCIÓN INFORMACIÓN LEGAL Y FAQ
 * Esta sección integra los Términos y Condiciones y el FAQ,
 * incluye un buscador funcional y utiliza animaciones para su transición.
 * El diseño es contrastante (fondo claro y tipografía oscura) para diferenciarla.
 ***************************************************/
function LegalFAQSection() {
  const [activeTab, setActiveTab] = useState<'terms' | 'faq'>('terms');
  const [query, setQuery] = useState('');

  // Información de Términos y Condiciones (dividida en párrafos)
  const termsText = `TÉRMINOS Y CONDICIONES DE USO DE TRAVELTUNNEL

1. Información General y Aceptación
Bienvenido a TravelTunnel. El presente documento establece los Términos y Condiciones (en adelante, “Términos”) que regulan el acceso y uso de la plataforma, así como la adquisición de productos de realidad virtual ofrecidos en el sitio web. Al acceder o utilizar nuestros servicios, el usuario acepta sin reservas estos Términos. Si no está de acuerdo, deberá abstenerse de utilizar la plataforma.

2. Definiciones
Plataforma: Sitio web y/o aplicación de TravelTunnel donde se ofrecen los productos y servicios.
Usuario: Toda persona que accede o utiliza la plataforma, ya sea de forma anónima o registrada.
Cuenta: Perfil creado por el usuario para acceder a servicios adicionales, como participar en el foro.
Productos: Bienes de realidad virtual que se ofrecen a la venta.
Foro: Espacio dentro de la plataforma destinado a la generación y difusión de comentarios y discusiones entre usuarios registrados.

3. Descripción de Servicios
TravelTunnel se especializa en la venta de productos de realidad virtual. Los productos ofrecidos podrán incluir dispositivos, accesorios y software relacionado, presentados a través de la plataforma en línea. La disponibilidad de productos está sujeta a cambios sin previo aviso.

4. Requisitos de Uso y Registro
Edad: El acceso y uso de la plataforma están reservados para personas mayores de 16 años.
Registro: Algunos servicios, como la participación en el foro y el proceso de compra, requieren que el usuario cree una cuenta. El usuario es responsable de mantener la confidencialidad de su información de acceso.
Veracidad de la Información: El usuario se compromete a proporcionar información veraz y actualizada al momento del registro.

5. Proceso de Compra y Pagos
Carrito de Compras: Todas las transacciones se realizan mediante el sistema de carrito de compras de la plataforma.
Métodos de Pago: Se aceptarán los métodos de pago que se encuentren disponibles y habilitados en la plataforma al momento de la compra.
Confirmación de Pedido: Una vez realizado el pago, se enviará al usuario una confirmación electrónica. Esta confirmación no implica la aceptación definitiva del pedido, la cual quedará sujeta a la disponibilidad del producto.
Política de Reembolso: Actualmente, TravelTunnel no cuenta con una política de reembolso formalizada.

6. Foro y Contenido Generado por el Usuario
Participación en el Foro: Solo los usuarios registrados podrán participar en el foro, publicando comentarios, reseñas y otros contenidos.
Responsabilidad del Contenido: Cada usuario es responsable del contenido que publica. TravelTunnel se reserva el derecho de eliminar o moderar cualquier contenido que no cumpla con las normas de la comunidad o que infrinja derechos de terceros.
Política de Moderación: Se espera que los usuarios mantengan un comportamiento respetuoso y eviten contenido ofensivo, difamatorio o ilegal.
Licencia de Uso del Contenido: Al publicar en el foro, el usuario otorga a TravelTunnel una licencia no exclusiva para utilizar, reproducir, modificar y distribuir dicho contenido en la plataforma.

7. Propiedad Intelectual y Derechos de Autor
Contenido de la Plataforma: Todos los textos, gráficos, logotipos, imágenes, videos y software presentes en TravelTunnel son propiedad de TravelTunnel o de terceros que han autorizado su uso.
Uso Limitado: Los usuarios se comprometen a no reproducir, distribuir, modificar o utilizar el contenido de la plataforma para fines comerciales sin consentimiento expreso.
Marcas Registradas: Las marcas y logotipos presentes son propiedad de TravelTunnel u otros titulares.

8. Responsabilidad, Garantías y Limitaciones
Errores Técnicos y Bugs: TravelTunnel se compromete a corregir errores y fallas técnicas que afecten el funcionamiento del sitio.
Otras Causas: Para situaciones derivadas de causas ajenas al funcionamiento técnico, TravelTunnel atenderá incidencias sin asumir responsabilidad por daños.
Garantías Limitadas: Los productos se ofrecen “tal cual” y sin garantías adicionales, salvo las expresamente establecidas.
Uso del Sitio: El usuario utiliza la plataforma bajo su propio riesgo.

9. Privacidad y Protección de Datos
Recopilación de Datos: Se recopila información personal necesaria para el registro, proceso de compra y participación en el foro.
Uso de la Información: Los datos serán utilizados para la gestión de la cuenta, pagos, atención al cliente y mejora de servicios.
Política de Privacidad: Se publicarán futuras actualizaciones donde se especificarán las medidas de protección de datos.
Consentimiento: Al utilizar la plataforma, el usuario consiente el uso de sus datos conforme a estos Términos.

10. Modificaciones y Actualizaciones
Actualización de Términos: TravelTunnel se reserva el derecho de modificar estos Términos en cualquier momento.
Notificaciones: Las modificaciones serán publicadas en la plataforma y entrarán en vigor desde su publicación.
Continuidad del Uso: El uso continuado de la plataforma implica aceptación de los nuevos Términos.

11. Legislación Aplicable y Jurisdicción
Marco Legal: Estos Términos se regirán por las leyes vigentes en México.
Jurisdicción: Las partes se someten a la jurisdicción de los tribunales competentes de México.

12. Contacto y Soporte
Soporte Técnico: Para reportar incidencias, el usuario puede contactar al equipo de desarrollo.
Consultas Legales o Comerciales: Las dudas relacionadas con estos Términos se pueden dirigir al equipo de atención al cliente.
13. Disposiciones Finales
Acuerdo Completo: Estos Términos constituyen el acuerdo completo entre el usuario y TravelTunnel.
Invalidez Parcial: Si alguna cláusula es inválida, no afectará la validez del resto del documento.
Contacto Directo: Para reclamaciones o sugerencias, contacte a TravelTunnel a través de los medios indicados.`;

  // Información de FAQ
  const faqText = `*Preguntas Frecuentes (FAQ)*

*General*
1. ¿Qué es Travel Tunnel?
Travel Tunnel es una experiencia de realidad virtual que permite explorar culturas de diferentes países a través de escenarios inmersivos e interactivos.

2. ¿Para qué público está dirigido?
Está dirigido a estudiantes, docentes y cualquier persona interesada en aprender sobre culturas del mundo de manera interactiva y entretenida.

3. ¿En qué plataformas estará disponible?
Travel Tunnel será compatible con dispositivos de realidad virtual y eventualmente podrá ejecutarse en PC y otras plataformas compatibles.

4. ¿Es un videojuego o una herramienta educativa?
Es una aplicación educativa con mecánicas de exploración y gamificación para hacer el aprendizaje más inmersivo y dinámico.

*Uso y Experiencia*
5. ¿Cómo funciona Travel Tunnel?
Los usuarios navegan por un túnel principal con acceso a diferentes túneles secundarios, cada uno representando un país. Para desbloquear los escenarios culturales, deben resolver pequeños puzzles dentro de cada túnel.

6. ¿Qué países están disponibles?
Inicialmente, México es el país desbloqueado. Otros países como Japón, India e Italia estarán disponibles en futuras expansiones.

7. ¿Qué tipo de interacciones ofrece cada escenario?
Cada escenario ofrece interacciones basadas en la cultura del país, como la creación de un altar en el Día de Muertos, lanzar linternas en Diwali o participar en juegos de feria en el Natsusu Matsuri (Japón).

*Acceso y Requisitos*
8. ¿Necesito un visor de realidad virtual para jugar?
Sí, se recomienda el uso de un visor de realidad virtual compatible para una experiencia completa.
9. ¿Qué requisitos mínimos necesita mi equipo para ejecutar Travel Tunnel?
Requerirá un equipo con buen rendimiento gráfico y un visor de VR compatible.
10. ¿Travel Tunnel es gratuito?
El contenido base es gratuito, con posibles expansiones de pago.

*Desarrollo y Futuro*
11. ¿Quién está desarrollando Travel Tunnel?
Es un proyecto integrador desarrollado por estudiantes de Tecnologías de la Información en la Universidad Tecnológica de Chihuahua.
12. ¿Habrá más países en el futuro?
Sí, se agregarán nuevos escenarios con culturas adicionales en futuras actualizaciones.
13. ¿Cómo puedo seguir el desarrollo del proyecto?
A través de las redes sociales y la página web, donde se publican avances y noticias.`;

  // Separar en párrafos (dividiendo por dos saltos de línea)
  const termsParagraphs = termsText.split('\n\n').map((p) => p.trim()).filter(Boolean);
  const faqParagraphs = faqText.split('\n\n').map((p) => p.trim()).filter(Boolean);

  // Función para filtrar párrafos según la query (en minúsculas)
  const filterParagraphs = (paragraphs: string[]) =>
    paragraphs.filter((p) => p.toLowerCase().includes(query.toLowerCase()));

  const displayedParagraphs = activeTab === 'terms'
    ? filterParagraphs(termsParagraphs)
    : filterParagraphs(faqParagraphs);

  return (
    <section className="py-16 px-4 bg-white text-black">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-center mb-8">Información Legal y Preguntas Frecuentes</h2>
        
        {/* Tabs para cambiar entre Términos y FAQ */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 mx-2 rounded ${activeTab === 'terms' ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'} transition`}
          >
            Términos y Condiciones
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 mx-2 rounded ${activeTab === 'faq' ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'} transition`}
          >
            Preguntas Frecuentes
          </button>
        </div>

        {/* Buscador funcional */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por palabras clave..."
            className="w-full max-w-md p-2 border border-gray-400 rounded focus:outline-none focus:border-red-600 transition"
          />
        </div>

        {/* Contenido con animación */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {displayedParagraphs.length > 0 ? (
              displayedParagraphs.map((para, index) => (
                <motion.p key={index} className="mb-4" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: index * 0.1 }}>
                  {para}
                </motion.p>
              ))
            ) : (
              <p className="text-center text-gray-600">No se encontraron resultados.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/***************************************************
 * 8) PÁGINA PRINCIPAL WELCOME
 ***************************************************/
export default function Welcome({ auth }: PageProps) {
  return (
    <>
      <Head>
        <title>Travel Tunnel VR - Página de Inicio</title>
        {/* Script de reCAPTCHA */}
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      </Head>
      <div className="bg-black text-white min-h-screen flex flex-col">
        <TransparentNavbar auth={auth} />
        <div className="pt-16" />
        <HeroSection auth={auth} />
        <PaisesSection />
        <ElementosExperienciaSection />
        <DescubrirSection />
        <Footer />
        {/* Sección de Información Legal y FAQ con diseño contrastante y buscador */}
        <LegalFAQSection />
      </div>
    </>
  );
}
