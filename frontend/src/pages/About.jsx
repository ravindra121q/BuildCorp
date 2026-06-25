import React, { useState, useEffect } from 'react';
import { Text } from '../components/ui/Typography';
import Section from '../components/ui/Section';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

export default function About() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/about');
        setContent(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);
    if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-950">
      <div className="w-16 h-16 border-4 border-brand-800 border-t-accent-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <PageTransition>
      <div className="w-full pt-32 min-h-screen pb-20">
        <Section className="pb-10 pt-10">
          <Reveal delay={0.1}>
            <EditableBlock 
              page="about"
              section="subheading"
              defaultHtml={content.subheading?.contentHtml}
              className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
            />
          </Reveal>
          <EditableBlock 
            page="about"
            section="heading"
            defaultHtml={content.heading?.contentHtml}
            className="text-5xl md:text-8xl font-heading font-semibold tracking-tighter mb-16 leading-[0.9] max-w-5xl"
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5 md:col-start-7">
              <Reveal delay={0.8}>
                <EditableBlock 
                  page="about"
                  section="paragraph_1"
                  defaultHtml={content.paragraph_1?.contentHtml}
                  className="text-xl text-brand-300 leading-relaxed font-light"
                />
              </Reveal>
              <Reveal delay={1.0}>
                <EditableBlock 
                  page="about"
                  section="paragraph_2"
                  defaultHtml={content.paragraph_2?.contentHtml}
                  className="text-xl text-brand-300 leading-relaxed font-light mt-8"
                />
              </Reveal>
            </div>
          </div>
        </Section>

        <div className="w-full h-[60vh] md:h-[90vh] overflow-hidden my-10 relative">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop" 
            alt="Construction Details" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-brand-950/20 mix-blend-multiply"></div>
        </div>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <Reveal>
              <EditableBlock 
                page="about"
                section="philosophy_heading"
                defaultHtml={content.philosophy_heading?.contentHtml}
                className="text-4xl md:text-6xl font-heading font-bold tracking-tighter"
              />
            </Reveal>
            <div>
              <Reveal>
                <EditableBlock 
                  page="about"
                  section="philosophy_text"
                  defaultHtml={content.philosophy_text?.contentHtml}
                  className="text-lg text-brand-300 leading-relaxed mb-8"
                />
              </Reveal>
            </div>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
