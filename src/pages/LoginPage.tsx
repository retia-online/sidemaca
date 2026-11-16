import React, { useState } from 'react';
import { SafeImage } from '../components/SafeImage';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFeedback('Por favor ingrese su correo electrónico y contraseña.');
      return;
    }
    setFeedback(
      'El acceso al portal de clientes está reservado para usuarios registrados de Sidema C.A. Contáctenos en ventas@sidemaca.com para solicitar credenciales.'
    );
  };

  return (
    <main className="bg-[#f9f9f9] py-16">
      <div className="sidema-container">
        <div className="mx-auto max-w-[380px] rounded border border-[#DEE2E6] bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <SafeImage
              src="/assets/sidema-logo.png"
              alt="SIDEMACA"
              className="mx-auto mb-3 h-14 w-auto object-contain"
            />
            <h1 className="font-headings text-xl font-bold text-[#003485]">
              Identificarse
            </h1>
          </div>

          {feedback && (
            <div className="mb-4 rounded border border-[#b6d4fe] bg-[#cfe2ff] px-3 py-2 text-sm text-[#084298]">
              {feedback}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1 block text-sm font-bold text-[#212529]">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@empresa.com"
                className="w-full rounded border border-[#CED4DA] bg-white px-3 py-2 text-sm text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-1 block text-sm font-bold text-[#212529]"
              >
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded border border-[#CED4DA] bg-white px-3 py-2 text-sm text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-full border border-[#003485] bg-[#003485] py-2 text-sm font-normal text-white transition-colors hover:bg-[#002c71]"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <a
              href="/contactus"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contactus');
              }}
              className="text-[#003485] hover:underline"
            >
              ¿Necesita asistencia? Contáctanos
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
