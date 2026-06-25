import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../components/ui/Typography';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

export default function Contact() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/contact');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    // Simulated API call
    setTimeout(() => {
      setStatus('Message sent successfully. Our team will contact you shortly.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="w-full pt-24 min-h-screen">
      <Section className="pb-10">
        <EditableBlock 
          page="contact"
          section="subheading"
          defaultHtml={content.subheading?.contentHtml || "Get In Touch"}
          className="text-accent-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
        />
        <EditableBlock 
          page="contact"
          section="heading"
          defaultHtml={content.heading?.contentHtml || "Partner With Us"}
          className="text-6xl md:text-8xl font-heading font-semibold tracking-tighter mb-10"
        />
        <Reveal delay={0.8}>
          <EditableBlock 
            page="contact"
            section="description"
            defaultHtml={content.description?.contentHtml || "Whether you're planning a massive commercial development or an intricate architectural restoration, our team is ready to engineer your vision."}
            className="max-w-3xl leading-relaxed text-brand-300 font-light text-xl"
          />
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-12">
              <Reveal delay={0.1} width="100%">
                <div className="mb-12">
                  <label htmlFor="contact_name" className="block text-sm uppercase tracking-widest font-bold opacity-50 mb-4">01. Full Name</label>
                  <div className="relative group">
                    <input 
                      id="contact_name"
                      type="text" 
                      required
                      placeholder="John Doe"
                      aria-label="Full Name"
                      className="w-full border-b-2 border-foreground/20 bg-transparent py-4 text-2xl md:text-4xl font-light placeholder:opacity-20 focus:outline-none focus:border-accent-500 transition-colors" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2} width="100%">
                <div>
                  <label htmlFor="contact_email" className="block text-sm uppercase tracking-widest font-bold opacity-50 mb-4">02. Corporate Email</label>
                  <input 
                    id="contact_email"
                    type="email" 
                    required
                    placeholder="john@company.com"
                    aria-label="Corporate Email"
                    className="w-full border-b-2 border-foreground/20 bg-transparent py-4 text-2xl md:text-4xl font-light placeholder:opacity-20 focus:outline-none focus:border-accent-500 transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </Reveal>
              <Reveal delay={0.3} width="100%">
                <div className="mb-16">
                  <label htmlFor="contact_message" className="block text-sm uppercase tracking-widest font-bold opacity-50 mb-4">03. Project Details</label>
                  <div className="relative group">
                    <textarea 
                      id="contact_message"
                      required
                      rows="3" 
                      placeholder="Tell us about your project..."
                      aria-label="Project Details"
                      className="w-full border-b-2 border-foreground/20 bg-transparent py-4 text-xl md:text-3xl font-light placeholder:opacity-20 focus:outline-none focus:border-accent-500 transition-colors resize-none"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                    <div className="absolute bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-500 group-hover:w-full"></div>
                  </div>
                </div>
              </Reveal>
              
              <Reveal delay={0.4}>
                <Button type="submit" variant="primary" size="lg" className="mt-8 px-12 py-6 text-xl">
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </Button>
              </Reveal>
              {status && <p className="mt-4 text-accent-600 font-medium">{status}</p>}
            </form>
          </div>
          
          <div className="lg:col-span-4 space-y-8 pt-4">
            <Card hover={false} className="border-0 bg-brand-50/50 dark:bg-brand-900/50 p-10">
              <EditableBlock 
                page="contact"
                section="hq_heading"
                defaultHtml={content.hq_heading?.contentHtml || "Global Headquarters"}
                className="text-accent-500 font-bold tracking-widest uppercase text-xs mb-6 block"
              />
              <p className="text-xl font-light leading-relaxed mb-10">
                <EditableBlock 
                  page="contact"
                  section="address"
                  defaultHtml={content.address?.contentHtml || "123 Construction Blvd<br/>New York, NY 10001<br/>United States"}
                />
              </p>
              <div className="space-y-4">
                <EditableBlock 
                  page="contact"
                  section="phone"
                  defaultHtml={content.phone?.contentHtml || "+1 (212) 555-0199"}
                  className="block text-2xl font-light hover:text-accent-500 transition-colors"
                />
                <EditableBlock 
                  page="contact"
                  section="email"
                  defaultHtml={content.email?.contentHtml || "info@buildcorp.com"}
                  className="block text-2xl font-light hover:text-accent-500 transition-colors"
                />
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
