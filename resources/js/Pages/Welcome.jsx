import React, { useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

function WelcomePage() {
  const { auth } = usePage().props;

  useEffect(() => {
    const particles = [];
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const colors = ['#d1d5db', '#9ca3af', '#6b7280']; // Tonos grises

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    function initParticles() {
      for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, radius, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo animado */}
      <canvas
        id="particleCanvas"
        className="absolute inset-0 z-0"
      ></canvas>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Bienvenido a <span className="text-gray-600">SGPSOTO</span>
        </h1>
        <p className="text-lg mb-6 text-gray-600">
          Plataforma de control de pagos <br />
          <span className="italic text-gray-500">
            Inspirada en la estética del Museo de Arte Moderno Jesús Soto
          </span>
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            {!auth.user ? (
              <>
                <Link
                  href={route('login')}
                  className="px-6 py-2 rounded-full bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href={route('register')}
                  className="px-6 py-2 rounded-full border border-gray-700 text-gray-700 font-semibold hover:bg-gray-700 hover:text-white transition"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <Link
                href={route('dashboard')}
                className="px-6 py-2 rounded-full bg-gray-700 text-white font-semibold hover:bg-gray-600 transition"
              >
                Ir al Inicio
              </Link>
            )}
          </div>

          {/* Botón para descargar manual */}
          <a
            href={route('download.manual')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-400 transition flex items-center space-x-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <span>Descargar Manual</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;