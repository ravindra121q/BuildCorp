import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import AnimatedText from '../components/ui/AnimatedText';
import Reveal from '../components/ui/Reveal';
import Container from '../components/ui/Container';
import EditableBlock from '../components/ui/EditableBlock';
import api from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/project_detail');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);
  
  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load project details", err);
        navigate('/projects');
      }
    };
    
    fetchProjectDetail();
  }, [id, navigate]);

  if (loading || !project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-brand-800 border-t-accent-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <PageTransition>
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-end pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent"></div>
        </div>
        
        <Container size="xl" className="relative z-10 w-full">
          <Reveal delay={0.2}>
            <span className="text-accent-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              {project.category}
            </span>
          </Reveal>
          <EditableBlock
            model="project"
            projectId={project._id}
            section="title"
            defaultHtml={project.title}
            className="text-white text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9]"
          />
        </Container>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div className="lg:col-span-4 space-y-8">
              <Reveal delay={0.1}>
                <div className="border-t border-foreground/10 pt-4">
                  <span className="block text-xs uppercase tracking-widest opacity-50 font-bold mb-2">Client</span>
                  <EditableBlock
                    model="project"
                    projectId={project._id}
                    section="client"
                    defaultHtml={project.client}
                    className="text-lg font-medium"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="border-t border-foreground/10 pt-4">
                  <span className="block text-xs uppercase tracking-widest opacity-50 font-bold mb-2">Location</span>
                  <EditableBlock
                    model="project"
                    projectId={project._id}
                    section="location"
                    defaultHtml={project.location}
                    className="text-lg font-medium"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="border-t border-foreground/10 pt-4">
                  <span className="block text-xs uppercase tracking-widest opacity-50 font-bold mb-2">Year</span>
                  <EditableBlock
                    model="project"
                    projectId={project._id}
                    section="year"
                    defaultHtml={project.year}
                    className="text-lg font-medium"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="border-t border-foreground/10 pt-4">
                  <span className="block text-xs uppercase tracking-widest opacity-50 font-bold mb-2">Scope</span>
                  <EditableBlock
                    model="project"
                    projectId={project._id}
                    section="scope"
                    defaultHtml={project.scope}
                    className="text-lg font-medium"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal delay={0.4}>
                <EditableBlock
                  model="project"
                  projectId={project._id}
                  section="description"
                  defaultHtml={project.description}
                  className="text-2xl md:text-4xl font-light leading-snug text-brand-300"
                />
              </Reveal>
            </div>

          </div>
        </Container>
      </section>

      <section className="pb-32 bg-background">
        <Container size="xl" className="space-y-16 md:space-y-32">
          {project.gallery.map((img, idx) => (
            <Reveal key={imgUrl} width="100%" delay={0.1}>
              <div className={`w-full overflow-hidden ${idx % 2 === 0 ? 'md:w-[80%] ml-auto' : 'md:w-[70%]'}`}>
                <img 
                  src={img} 
                  alt={`Project Detail ${idx + 1}`}
                  className="w-full h-[50vh] md:h-[80vh] object-cover"
                />
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-brand-950 py-32 md:py-48 text-center border-t border-brand-900">
        <Container>
          <Reveal>
            <EditableBlock 
              page="project_detail"
              section="cta_subheading"
              defaultHtml={content.cta_subheading?.contentHtml || "Continue Exploring"}
              className="text-accent-500 font-bold tracking-[0.3em] uppercase text-xs mb-8 block"
            />
            <Link to="/projects" className="group inline-block cursor-none">
              <EditableBlock 
                page="project_detail"
                section="cta_heading"
                defaultHtml={content.cta_heading?.contentHtml || "All Projects"}
                className="text-5xl md:text-8xl font-heading font-bold tracking-tighter text-white group-hover:text-accent-400 transition-colors duration-500"
              />
            </Link>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}
