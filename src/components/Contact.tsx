import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Personal, Social } from '../types';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface ContactProps {
  personal: Personal;
  social: Social;
}

const Contact = ({ personal, social }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'box');
      formDataToSend.append('_subject', 'New Contact Form Submission from Portfolio');
      
      const response = await fetch('https://formsubmit.co/ajax/pratik2002singh@gmail.com', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        alert('Telemetry transmission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Telemetry transmission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-transparent bg-grid relative overflow-hidden border-t border-zinc-900 select-none">
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section title */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-tech text-zinc-500 tracking-widest block uppercase">COMMUNICATION PIPELINE</span>
          <h2 className="text-3xl sm:text-5xl font-serif-display font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Coordinates & details */}
          <motion.div
            className="space-y-8 text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h3 className="text-xl font-serif-display font-bold text-white">Let's Connect</h3>
              <p className="text-[11px] sm:text-xs font-tech text-zinc-400 leading-relaxed max-w-md">
                Transmit logs, project inquiries, or design briefs directly through the telemetry portal. Clocks and coordinate tracking remain operational.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                { icon: FaEnvelope, label: 'EMAIL LOGS', value: personal.email, href: `mailto:${personal.email}` },
                { icon: FaPhoneAlt, label: 'PHONE LINK', value: personal.phone, href: `tel:${personal.phone}` },
                { icon: FaMapMarkerAlt, label: 'GEO COORDINATE', value: personal.location, href: null },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="flex gap-4 items-start p-4 bg-zinc-950/40 border border-zinc-900 rounded-lg hover:border-zinc-800 transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded bg-zinc-900 border border-zinc-850 text-cyan-400 mt-0.5 shrink-0">
                      <Icon className="text-xs" />
                    </span>
                    <div>
                      <h4 className="text-[9px] font-tech text-zinc-500 tracking-widest uppercase mb-0.5">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-xs sm:text-sm font-tech text-zinc-300 hover:text-white transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm font-tech text-zinc-300">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social profiles */}
            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <h4 className="text-[10px] font-tech text-zinc-500 tracking-widest uppercase">ROUTING ENDPOINTS</h4>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'LINKEDIN', href: social.linkedin },
                  { label: 'GITHUB', href: social.github },
                  { label: 'TWITTER', href: social.twitter },
                ].map((soc, idx) => (
                  <motion.a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-950 border border-zinc-900 rounded text-[10px] font-tech text-zinc-400 hover:text-white hover:border-zinc-700 transition-all select-none"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.15 }}
                  >
                    {soc.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Console Form */}
          <motion.form
            className="bg-zinc-950/40 border border-zinc-900 p-6 sm:p-8 rounded-lg space-y-4 hover:border-zinc-800 transition-all"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[9px] font-tech text-zinc-500 tracking-wider block uppercase">TRANSMITTER NAME</label>
                <input
                  type="text"
                  name="name"
                  placeholder="NAME_ID"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs font-tech border border-zinc-900 rounded bg-black/60 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/80 transition-colors pointer-events-auto"
                  required
                />
              </div>
              <div className="space-y-1.5 text-left">
                <label className="text-[9px] font-tech text-zinc-500 tracking-wider block uppercase">RETURN IP_ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL@DOMAIN"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 text-xs font-tech border border-zinc-900 rounded bg-black/60 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/80 transition-colors pointer-events-auto"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5 text-left">
              <label className="text-[9px] font-tech text-zinc-500 tracking-wider block uppercase">TRANSMISSION SUBJECT</label>
              <input
                type="text"
                name="subject"
                placeholder="LOG_SUBJECT"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 text-xs font-tech border border-zinc-900 rounded bg-black/60 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/80 transition-colors pointer-events-auto"
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[9px] font-tech text-zinc-500 tracking-wider block uppercase">PAYLOAD MESSAGE</label>
              <textarea
                name="message"
                placeholder="TYPE TELEMETRY LOG MESSAGE HERE..."
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 text-xs font-tech border border-zinc-900 rounded bg-black/60 text-white placeholder-zinc-700 focus:outline-none focus:border-cyan-400/80 transition-colors resize-none pointer-events-auto"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-3 bg-white hover:bg-zinc-200 text-black text-xs font-tech font-bold rounded-lg transition-colors flex items-center justify-center pointer-events-auto disabled:opacity-50 select-none"
            >
              {loading ? (
                'TRANSMITTING...'
              ) : submitted ? (
                '✓ PAYLOAD TRANSMITTED'
              ) : (
                'TRANSMIT PAYLOAD'
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
