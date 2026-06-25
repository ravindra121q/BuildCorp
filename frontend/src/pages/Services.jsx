import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

const servicesMap = [
  {
    title: 'Commercial Construction',
    description: 'End-to-end development of high-rise office buildings, retail complexes, and mixed-use spaces. We manage everything from excavation to the final structural steel framing.',
  },
  {
    title: 'Luxury Residential',
    description: 'Bespoke residential towers and ultra-luxury private estates. Focused on premium materials, perfect finishes, and integrated smart-home architectural tech.',
  },
  {
    title: 'Infrastructure',
    description: 'Large-scale civil engineering projects including bridges, tunnels, and urban logistics hubs. Built to withstand the test of time and heavy capacity loads.',
  },
  {
    title: 'Renovation & Restoration',
    description: 'Careful preservation and modernization of historical landmarks and existing structures, bringing them up to modern LEED sustainability standards.',
  }
];

export default function Services() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/services');
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
        <Section className="pb-20 pt-10">
          <Reveal delay={0.1}>
            <EditableBlock 
              page="services"
              section="subheading"
              defaultHtml={content.subheading?.contentHtml}
              className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
            />
          </Reveal>
          <EditableBlock 
            page="services"
            section="heading"
            defaultHtml={content.heading?.contentHtml}
            className="text-6xl md:text-8xl font-heading font-semibold tracking-tighter mb-10"
          />
          <Reveal delay={0.8}>
            <EditableBlock 
              page="services"
              section="description"
              defaultHtml={content.description?.contentHtml}
              className="text-xl md:text-2xl text-brand-300 font-light max-w-3xl leading-relaxed"
            />
          </Reveal>
        </Section>

        <section className="w-full">
          {servicesMap.map((service, idx) => (
            <div key={service.title} className="border-t border-foreground/10 group hover:bg-foreground/5 transition-colors duration-500">
              <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
                <div className="md:col-span-5">
                  <Reveal>
                    <span className="text-accent-500 font-bold text-sm tracking-widest mb-4 block">0{idx + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tight group-hover:text-accent-500 transition-colors duration-500">
                      {service.title}
                    </h3>
                  </Reveal>
                </div>
                <div className="md:col-span-6 md:col-start-7 pt-2 md:pt-10">
                  <Reveal delay={0.2}>
                    <EditableBlock 
                      page="services"
                      section={`service_${idx + 1}`}
                      defaultHtml={content[`service_${idx + 1}`]?.contentHtml || service.description}
                      className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light"
                    />
                  </Reveal>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-foreground/10"></div>
        </section>
      </div>
    </PageTransition>
  );
}
