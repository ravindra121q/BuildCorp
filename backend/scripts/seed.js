import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/models/Project.js';
import PageContent from '../src/models/PageContent.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const dummyProjects = [
  {
    title: 'The Vertex Tower',
    category: 'Commercial',
    client: 'Global Finance Corp',
    location: 'New York, NY',
    year: '2024',
    scope: 'General Contracting & Design-Build',
    description: 'A 75-story ultra-luxury commercial skyscraper featuring LEED Platinum certification, a structural steel exoskeleton, and floor-to-ceiling smart glass. The Vertex Tower redefines the Manhattan skyline.',
    heroImage: 'https://images.unsplash.com/photo-1541888081682-1808620579de?q=80&w=2500&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2500&auto=format&fit=crop'
    ],
    status: 'Completed'
  },
  {
    title: 'Oceanic Residence',
    category: 'Residential',
    client: 'Private Estate',
    location: 'Malibu, CA',
    year: '2023',
    scope: 'Custom Home Construction',
    description: 'An architectural masterpiece cantilevered over the Pacific Ocean. Built with marine-grade steel and raw concrete, designed to withstand extreme coastal conditions while offering unparalleled luxury.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2500&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop'
    ],
    status: 'Completed'
  },
  {
    title: 'Nexus Transit Hub',
    category: 'Infrastructure',
    client: 'Department of Transportation',
    location: 'Chicago, IL',
    year: '2025',
    scope: 'Civil Engineering & Construction',
    description: 'A massive underground logistics and transit hub featuring vaulted concrete ceilings, complex subterranean excavation, and integration with existing subway lines.',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541888081682-1808620579de?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2500&auto=format&fit=crop'
    ],
    status: 'In Progress'
  },
  {
    title: 'Lumina Tech Park',
    category: 'Commercial',
    client: 'Lumina Innovations',
    location: 'Austin, TX',
    year: '2023',
    scope: 'Master Planned Commercial',
    description: 'A sprawling 50-acre corporate campus utilizing sustainable mass timber construction, solar-integrated roofing, and automated building management systems.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2500&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497215898129-052a9550cecb?q=80&w=2500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?q=80&w=2500&auto=format&fit=crop'
    ],
    status: 'Completed'
  }
];

const pageContentData = [
  {
    page: 'home',
    section: 'hero_title',
    contentHtml: "Architecting <br/><span class='text-accent-500'>Tomorrow.</span>"
  },
  {
    page: 'home',
    section: 'hero_subtitle',
    contentHtml: "We build the future with precision and sustainable innovation, delivering landmark projects across the globe."
  },
  {
    page: 'about',
    section: 'heading',
    contentHtml: "Building the Future Since 1988."
  },
  {
    page: 'about',
    section: 'paragraph_1',
    contentHtml: "BuildCorp started as a small general contractor with a simple vision: to construct buildings that outlast generations. Today, we are a global leader in high-end commercial and residential development."
  },
  {
    page: 'about',
    section: 'paragraph_2',
    contentHtml: "Our approach blends traditional craftsmanship with cutting-edge construction technology, ensuring that every project is not only an architectural marvel but also sustainable and structurally infallible."
  },
  {
    page: 'about',
    section: 'philosophy_heading',
    contentHtml: "Our Philosophy"
  },
  {
    page: 'about',
    section: 'philosophy_text',
    contentHtml: "We believe that the built environment shapes human experience. Therefore, we do not compromise on materials, safety, or design. We partner with the world's leading architects to turn visionary concepts into physical reality.<br/><br/>Every beam, every pane of glass, and every foundation is laid with the intention of perfection. We are builders for those who demand excellence."
  },
  {
    page: 'services',
    section: 'heading',
    contentHtml: "Our Services"
  },
  {
    page: 'services',
    section: 'description',
    contentHtml: "We offer comprehensive construction management and general contracting services, executing the most complex architectural designs in the world."
  },
  {
    page: 'services',
    section: 'service_1',
    contentHtml: "End-to-end development of high-rise office buildings, retail complexes, and mixed-use spaces. We manage everything from excavation to the final structural steel framing."
  },
  {
    page: 'services',
    section: 'service_2',
    contentHtml: "Bespoke residential towers and ultra-luxury private estates. Focused on premium materials, perfect finishes, and integrated smart-home architectural tech."
  },
  {
    page: 'services',
    section: 'service_3',
    contentHtml: "Large-scale civil engineering projects including bridges, tunnels, and urban logistics hubs. Built to withstand the test of time and heavy capacity loads."
  },
  {
    page: 'services',
    section: 'service_4',
    contentHtml: "Careful preservation and modernization of historical landmarks and existing structures, bringing them up to modern LEED sustainability standards."
  },
  {
    page: 'contact',
    section: 'heading',
    contentHtml: "Partner With Us"
  },
  {
    page: 'contact',
    section: 'description',
    contentHtml: "Whether you're planning a massive commercial development or an intricate architectural restoration, our team is ready to engineer your vision."
  },
  {
    page: 'contact',
    section: 'address',
    contentHtml: "123 Construction Blvd<br/>New York, NY 10001<br/>United States"
  },
  {
    page: 'contact',
    section: 'phone',
    contentHtml: "+1 (212) 555-0199"
  },
  {
    page: 'contact',
    section: 'email',
    contentHtml: "info@buildcorp.com"
  }
];

async function seedDB() {
  try {
    if (!MONGO_URI) {
      console.error('MONGO_URI is missing from .env');
      process.exit(1);
    }
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    
    await Project.deleteMany({});
    await PageContent.deleteMany({});
    console.log('Cleared existing projects and content');

    
    await Project.insertMany(dummyProjects);
    console.log(`Inserted ${dummyProjects.length} dummy projects`);

    await PageContent.insertMany(pageContentData);
    console.log(`Inserted ${pageContentData.length} page content blocks`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDB();
