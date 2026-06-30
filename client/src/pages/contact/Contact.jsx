import React, { useState } from 'react';
import { Mail, Send, MessageSquareText } from 'lucide-react';
import Navbar from '../../components/common/Navbar.jsx';
import Footer from '../../components/common/Footer.jsx';
import apiClient from '../../services/apiClient.js';
import { API_ENDPOINTS } from '../../config/constants.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await apiClient.post(API_ENDPOINTS.CONTACT.SUBMIT, {
        email: formData.email,
        message: formData.message,
      });

      setStatus({
        type: 'success',
        message: response?.message || 'Your message has been sent successfully.',
      });
      setFormData({ email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error?.message || 'Unable to send your message right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="pt-24 px-6 pb-16">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <MessageSquareText size={16} />
              Contact SolarIQ
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
              We’re here to help.
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-8">
              Share your questions, feedback, or support needs. We’ll get back to you as soon as possible.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                <Mail className="mt-0.5 text-blue-600" size={18} />
                <div>
                  <p className="font-semibold text-slate-800">Email support</p>
                  <p className="text-sm text-slate-600">Messages are sent to the support address configured in your environment.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {status.message ? (
                <div className={`rounded-2xl px-4 py-3 text-sm ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {status.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={18} />
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
