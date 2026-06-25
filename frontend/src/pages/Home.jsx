import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../components/ui/Typography';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

export default function Home() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/home');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);

  return (
    <PageTransition>
      <div className="w-full">
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888081682-1808620579de?q=80&w=2500&auto=format&fit=crop" 
              alt="Cinematic Construction Site" 
              className="w-full h-full object-cover scale-105 transform transition-transform duration-[30s] hover:scale-100"
            />
            <div className="absolute inset-0 bg-brand-950/70 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
          
          <Container size="xl" className="relative z-10 text-center mt-20 flex flex-col items-center">
            <Reveal width="100%" delay={0.2}>
              <EditableBlock 
                page="home"
                section="hero_subtitle_top"
                defaultHtml={content.hero_subtitle_top?.contentHtml || "Defining the Skyline"}
                className="text-accent-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-8 block"
              />
            </Reveal>
            
            <div className="max-w-6xl mx-auto mb-10 overflow-hidden">
              <Reveal width="100%">
                <div className="w-full md:w-3/4 mx-auto">
                  <EditableBlock 
                    page="home"
                    section="hero_title"
                    defaultHtml={content.hero_title?.contentHtml || "Architecting <br/><span class='text-accent-500'>Tomorrow.</span>"}
                    className="text-5xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.9] mb-8"
                  />
                </div>
              </Reveal>
            </div>
            
            <Reveal width="100%" delay={1.2}>
              <div className="max-w-2xl mx-auto mb-16">
                <EditableBlock 
                  page="home"
                  section="hero_subtitle"
                  defaultHtml={content.hero_subtitle?.contentHtml || "We build the future with precision and sustainable innovation, delivering landmark projects across the globe."}
                  className="text-lg md:text-2xl font-light text-brand-200 leading-relaxed"
                />
              </div>
            </Reveal>
            
            <Reveal width="100%" delay={1.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button variant="accent" size="lg" to="/projects">View Portfolio</Button>
                <Button variant="ghost" size="lg" to="/contact" className="text-white border border-white/20 hover:bg-white/10">Partner With Us</Button>
              </div>
            </Reveal>
          </Container>
        </section>

        <Section theme="dark" className="border-t border-brand-900/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <Reveal delay={0.1}>
              <EditableBlock page="home" section="stat_1_val" defaultHtml={content.stat_1_val?.contentHtml || "35+"} className="text-6xl md:text-7xl font-heading font-bold text-accent-500 mb-2" />
              <EditableBlock page="home" section="stat_1_label" defaultHtml={content.stat_1_label?.contentHtml || "Years Experience"} className="text-brand-300 font-medium uppercase tracking-[0.2em] text-xs" />
            </Reveal>
            <Reveal delay={0.2}>
              <EditableBlock page="home" section="stat_2_val" defaultHtml={content.stat_2_val?.contentHtml || "$4B+"} className="text-6xl md:text-7xl font-heading font-bold text-accent-500 mb-2" />
              <EditableBlock page="home" section="stat_2_label" defaultHtml={content.stat_2_label?.contentHtml || "Projects Delivered"} className="text-brand-300 font-medium uppercase tracking-[0.2em] text-xs" />
            </Reveal>
            <Reveal delay={0.3}>
              <EditableBlock page="home" section="stat_3_val" defaultHtml={content.stat_3_val?.contentHtml || "150+"} className="text-6xl md:text-7xl font-heading font-bold text-accent-500 mb-2" />
              <EditableBlock page="home" section="stat_3_label" defaultHtml={content.stat_3_label?.contentHtml || "Awards Won"} className="text-brand-300 font-medium uppercase tracking-[0.2em] text-xs" />
            </Reveal>
            <Reveal delay={0.4}>
              <EditableBlock page="home" section="stat_4_val" defaultHtml={content.stat_4_val?.contentHtml || "24/7"} className="text-6xl md:text-7xl font-heading font-bold text-accent-500 mb-2" />
              <EditableBlock page="home" section="stat_4_label" defaultHtml={content.stat_4_label?.contentHtml || "Safety Commitment"} className="text-brand-300 font-medium uppercase tracking-[0.2em] text-xs" />
            </Reveal>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
}
