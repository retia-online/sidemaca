import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/sidemaData';

interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  description: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  phone: '',
  email: '',
  company: '',
  subject: '',
  description: '',
};

export const ContactUsPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.description.trim()) {
      setErrorMsg('Por favor complete todos los campos obligatorios marcados con *.');
      return;
    }
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailValid) {
      setErrorMsg('Por favor ingrese un correo electrónico válido.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          subject: form.subject.trim(),
          description: form.description.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No se pudo enviar su mensaje. Intente nuevamente.');
      }
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error de conexión al enviar el formulario.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* Top Banner */}
      <section className="relative overflow-hidden bg-black/50 py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url("/assets/banner-contact.jpg")',
            backgroundPosition: '50% 0%',
          }}
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="sidema-container relative z-10">
          <h1 className="font-headings mb-0 text-[calc(1.5125rem+3.15vw)] font-bold leading-[1.2] text-white">
            Contáctanos
          </h1>
        </div>
      </section>

      {/* Form + Contact Info Section */}
      <section className="py-10">
        <div className="sidema-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <p className="mb-6 text-[1rem] leading-[1.5] text-[#212529]">
                Contáctenos sobre cualquier cosa relacionada con nuestra empresa o servicios.
                <br />
                Haremos todo lo posible para llamarte lo antes posible.
              </p>

              {submitted ? (
                <div className="rounded border border-[#dee2e6] bg-[#f9f9f9] p-8 text-[#212529]">
                  <div className="mb-3 flex items-center gap-2 text-[#003485]">
                    <CheckCircle2 className="h-6 w-6" />
                    <h3 className="font-headings mb-0 text-xl font-bold">
                      ¡Gracias por contactarnos!
                    </h3>
                  </div>
                  <p className="mb-4 text-[1rem]">
                    Su mensaje ha sido recibido correctamente. Nuestro equipo de atención al cliente
                    se comunicará con usted a la brevedad posible.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(INITIAL_FORM);
                      setSubmitted(false);
                    }}
                    className="rounded-full border border-[#003485] bg-[#003485] px-[1.35rem] py-[0.45rem] text-[1rem] text-white transition-colors hover:bg-[#002c71]"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-1">
                  {errorMsg && (
                    <div
                      role="alert"
                      className="mb-4 rounded border border-[#f5c2c7] bg-[#f8d7da] px-4 py-3 text-sm text-[#842029]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  {/* Nombre */}
                  <div className="py-2 sm:flex sm:items-center">
                    <label
                      htmlFor="contact1"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pr-3"
                    >
                      Nombre <span className="text-[#212529]">*</span>
                    </label>
                    <input
                      id="contact1"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Número de teléfono */}
                  <div className="py-2 sm:flex sm:items-center">
                    <label
                      htmlFor="contact2"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pr-3"
                    >
                      Número de teléfono
                    </label>
                    <input
                      id="contact2"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Correo electrónico */}
                  <div className="py-2 sm:flex sm:items-center">
                    <label
                      htmlFor="contact3"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pr-3"
                    >
                      Correo electrónico <span className="text-[#212529]">*</span>
                    </label>
                    <input
                      id="contact3"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Empresa */}
                  <div className="py-2 sm:flex sm:items-center">
                    <label
                      htmlFor="contact4"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pr-3"
                    >
                      Empresa
                    </label>
                    <input
                      id="contact4"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Asunto */}
                  <div className="py-2 sm:flex sm:items-center">
                    <label
                      htmlFor="contact5"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pr-3"
                    >
                      Asunto <span className="text-[#212529]">*</span>
                    </label>
                    <input
                      id="contact5"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Pregunta */}
                  <div className="py-2 sm:flex sm:items-start">
                    <label
                      htmlFor="contact6"
                      className="mb-1 block text-[1rem] text-[#212529] sm:mb-0 sm:w-[200px] sm:shrink-0 sm:pt-1.5 sm:pr-3"
                    >
                      Pregunta <span className="text-[#212529]">*</span>
                    </label>
                    <textarea
                      id="contact6"
                      name="description"
                      rows={3}
                      required
                      value={form.description}
                      onChange={handleChange}
                      className="w-full rounded border border-[#CED4DA] bg-white px-3 py-1.5 text-[1rem] text-[#212529] focus:border-[#003485] focus:outline-none focus:ring-2 focus:ring-[#003485]/25"
                    />
                  </div>

                  {/* Submit */}
                  <div className="py-2 sm:flex">
                    <div className="hidden sm:block sm:w-[200px] sm:shrink-0" />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-block cursor-pointer rounded-full border border-[#003485] bg-[#003485] px-[1.8rem] py-[0.6rem] text-[1.25rem] font-normal leading-[1.5] text-white transition-colors hover:border-[#002a6a] hover:bg-[#002c71] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? 'Enviando...' : 'Enviar'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Sidebar Info */}
            <div className="lg:col-span-4">
              <ul className="m-0 list-none space-y-2 pl-2 text-[1rem] text-[#212529]">
                <li className="font-normal">{COMPANY_INFO.legalName}</li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#212529]" />
                  <span>{COMPANY_INFO.address}</span>
                </li>
                <li className="flex items-center gap-2 tabular-nums">
                  <Phone className="h-4 w-4 shrink-0 text-[#212529]" />
                  <span>{COMPANY_INFO.contactPagePhone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#212529]" />
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-[#212529] no-underline hover:text-[#003485] hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
