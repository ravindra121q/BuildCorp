import React, { useState, useEffect } from 'react';
import { Heading, Text } from '../components/ui/Typography';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import { Link } from 'react-router-dom';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

export default function Projects() {
  const [content, setContent] = useState({});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/projects');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await api.get('/projects');
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load live architecture projects", err);
        setLoading(false);
      }
    };
    
    fetchLiveProjects();
  }, []);

  return (
    <PageTransition>
      <div className="w-full pt-20 min-h-screen pb-20">
        <Section className="pb-4 pt-4">
          <Reveal delay={0.1}>
            <EditableBlock 
              page="projects"
              section="subheading"
              defaultHtml={content.subheading?.contentHtml}
              className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs mb-2 block"
            />
          </Reveal>
          <EditableBlock 
            page="projects"
            section="heading"
            defaultHtml={content.heading?.contentHtml}
            className="text-6xl md:text-8xl font-heading font-semibold tracking-tighter mb-4"
          />
          <Reveal delay={0.8}>
            <EditableBlock 
              page="projects"
              section="description"
              defaultHtml={content.description?.contentHtml}
              className="max-w-3xl mt-6 border-l-2 border-accent-500 pl-6 text-brand-300 text-xl"
            />
          </Reveal>
        </Section>

        <Section className="pt-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              {projects.map((project, index) => {
                const isLarge = index === 0 || index === 3;
                const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4';
                const imgHeight = isLarge ? 'h-[60vh] md:h-[80vh]' : 'h-[50vh] md:h-[60vh] mt-0 md:mt-24';
                
                return (
                  <div key={project._id} className={`${colSpan} w-full`}>
                    <Reveal delay={0.2} width="100%">
                      <Link to={`/projects/${project._id}`} className="block">
                        <Card className="p-0 overflow-hidden group cursor-none border-0 shadow-none bg-transparent">
                          <div className={`relative ${imgHeight} overflow-hidden`}>
                            <img 
                              src={project.heroImage} 
                              alt={project.title} 
                              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-brand-950/0 transition-colors duration-700"></div>
                          </div>
                          <div className="py-8 bg-transparent">
                            <span className="text-xs font-bold text-accent-500 uppercase tracking-widest mb-3 block">{project.category}</span>
                            <Heading level={3} className="group-hover:text-accent-500 transition-colors text-4xl">{project.title}</Heading>
                          </div>
                        </Card>
                      </Link>
                    </Reveal>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>
    </PageTransition>
  );
}
