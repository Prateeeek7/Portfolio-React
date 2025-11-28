import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Personal, Social } from '../types';

interface ContactProps {
  personal: Personal;
  social: Social;
}

const Contact = ({ personal, social }: ContactProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-dark dark:bg-black-light">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-10 sm:mb-16 bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-cream">Let's Connect</h3>
            
            {[
              { icon: '📧', label: 'Email', value: personal.email },
              { icon: '📱', label: 'Phone', value: personal.phone },
              { icon: '📍', label: 'Location', value: personal.location },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex gap-4 items-start group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-blue dark:text-blue-light mb-1">{item.label}</h4>
                  <p className="text-black/70 dark:text-cream/70">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-6">
              <h4 className="text-xl font-semibold text-black dark:text-cream mb-4">Follow Me</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'LinkedIn', href: social.linkedin },
                  { label: 'GitHub', href: social.github },
                  { label: 'Twitter', href: social.twitter },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-cream dark:bg-black border-2 border-blue-light/30 rounded-lg text-black dark:text-cream font-medium hover:border-blue hover:bg-blue-light/10 dark:hover:bg-blue/20 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            className="bg-cream dark:bg-black p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <motion.input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-blue-light/30 rounded-lg bg-cream-dark dark:bg-black-light text-black dark:text-cream focus:outline-none focus:border-blue transition-colors touch-manipulation"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-blue-light/30 rounded-lg bg-cream-dark dark:bg-black-light text-black dark:text-cream focus:outline-none focus:border-blue transition-colors touch-manipulation"
                required
                whileFocus={{ scale: 1.02 }}
              />
            </div>
            <motion.input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 text-base border-2 border-blue-light/30 rounded-lg bg-cream-dark dark:bg-black-light text-black dark:text-cream focus:outline-none focus:border-blue transition-colors touch-manipulation"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 text-base border-2 border-blue-light/30 rounded-lg bg-cream-dark dark:bg-black-light text-black dark:text-cream focus:outline-none focus:border-blue transition-colors resize-none"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-primary text-cream font-semibold rounded-lg shadow-lg shadow-blue/30 hover:shadow-xl hover:shadow-blue/40 transition-all min-h-[48px] touch-manipulation text-base"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitted ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block"
                >
                  ✓ Sent!
                </motion.span>
              ) : (
                'Send Message'
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;



