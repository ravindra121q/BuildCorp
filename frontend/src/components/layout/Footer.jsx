import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { Heading, Text } from '../ui/Typography';
import EditableBlock from '../ui/EditableBlock';
import api from '../../services/api';

export default function Footer() {
  const [content, setContent] = useState({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content/footer');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContent();
  }, []);
  return (
    <footer className="bg-brand-950 text-white pt-24 pb-12 border-t border-brand-900">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-heading font-semibold tracking-tighter text-white mb-6 inline-block">
              BUILD<span className="text-accent-500">CORP</span>
            </Link>
            <EditableBlock
              page="footer"
              section="description"
              defaultHtml={content.description?.contentHtml || "Building the future with architectural precision, uncompromising quality, and a commitment to sustainable development."}
              className="text-brand-300 max-w-md text-sm md:text-base leading-relaxed"
            />
          </div>
          
          <div>
            <EditableBlock
              page="footer"
              section="company_heading"
              defaultHtml={content.company_heading?.contentHtml || "Company"}
              className="text-white mb-6 text-xl font-heading font-bold"
            />
            <ul className="space-y-4">
              <li><Link to="/about" className="text-brand-300 hover:text-accent-400 transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="text-brand-300 hover:text-accent-400 transition-colors">Our Projects</Link></li>
              <li><Link to="/services" className="text-brand-300 hover:text-accent-400 transition-colors">Services</Link></li>
              <li><Link to="/careers" className="text-brand-300 hover:text-accent-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <EditableBlock
              page="footer"
              section="contact_heading"
              defaultHtml={content.contact_heading?.contentHtml || "Contact"}
              className="text-white mb-6 text-xl font-heading font-bold"
            />
            <ul className="space-y-4">
              <li className="text-brand-300">
                <EditableBlock
                  page="footer"
                  section="address"
                  defaultHtml={content.address?.contentHtml || "123 Construction Blvd<br/>New York, NY 10001"}
                />
              </li>
              <li>
                <EditableBlock
                  page="footer"
                  section="email"
                  defaultHtml={content.email?.contentHtml || "info@buildcorp.com"}
                  className="text-brand-300 hover:text-accent-400 transition-colors inline-block"
                />
              </li>
              <li>
                <EditableBlock
                  page="footer"
                  section="phone"
                  defaultHtml={content.phone?.contentHtml || "+1 (212) 555-0199"}
                  className="text-brand-300 hover:text-accent-400 transition-colors inline-block"
                />
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs font-light space-y-4 md:space-y-0">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} BuildCorp. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-brand-300 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-brand-300 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
