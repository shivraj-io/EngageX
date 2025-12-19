const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./src/models/Project.model');
const Client = require('./src/models/Client.model');
const Contact = require('./src/models/Contact.model');
const Newsletter = require('./src/models/Newsletter.model');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/engagex';

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with advanced product filtering, shopping cart, payment integration, and admin dashboard. Features real-time inventory management and order tracking.',
    category: 'Web Application',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
    imageId: 'sample-1',
    liveUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
    status: 'active',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative project management tool with drag-and-drop kanban boards, team collaboration features, real-time updates, and progress tracking.',
    category: 'Productivity Tool',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    imageId: 'sample-2',
    liveUrl: 'https://taskmanager.example.com',
    githubUrl: 'https://github.com/example/taskmanager',
    featured: true,
    status: 'active',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Comprehensive analytics dashboard featuring data visualization, engagement metrics, audience insights, and automated reporting capabilities.',
    category: 'Analytics Platform',
    technologies: ['Vue.js', 'Python', 'FastAPI', 'Redis', 'Chart.js'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    imageId: 'sample-3',
    status: 'active',
  },
  {
    title: 'Weather Tracking App',
    description: 'Beautiful weather application with 7-day forecasts, location-based weather alerts, interactive maps, and detailed meteorological data.',
    category: 'Mobile App',
    technologies: ['React Native', 'Firebase', 'Google Maps API'],
    imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800',
    imageId: 'sample-4',
    status: 'draft',
  },
];

const sampleClients = [
  {
    name: 'Sarah Johnson',
    position: 'CEO & Founder',
    company: 'TechVision Inc.',
    testimonial: 'Working with EngageX has been an absolute game-changer for our business. Their team delivered exceptional results, exceeded our expectations, and provided ongoing support throughout the entire project. Highly recommended!',
    rating: 5,
    imageUrl: 'https://i.pravatar.cc/300?img=1',
    imageId: 'client-1',
    featured: true,
    status: 'active',
  },
  {
    name: 'Michael Chen',
    position: 'CTO',
    company: 'Digital Innovations Ltd',
    testimonial: 'The level of professionalism and technical expertise displayed by EngageX is outstanding. They transformed our vision into reality with cutting-edge solutions. A pleasure to work with!',
    rating: 5,
    imageUrl: 'https://i.pravatar.cc/300?img=12',
    imageId: 'client-2',
    featured: true,
    status: 'active',
  },
  {
    name: 'Emily Rodriguez',
    position: 'Product Manager',
    company: 'StartupHub',
    testimonial: 'EngageX helped us build a robust platform from scratch. Their attention to detail and commitment to quality is remarkable. They truly understand the needs of modern businesses.',
    rating: 4,
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    imageId: 'client-3',
    status: 'active',
  },
  {
    name: 'David Thompson',
    position: 'Director of Operations',
    company: 'Enterprise Solutions Group',
    testimonial: 'Exceptional service and innovative solutions. The team was responsive, professional, and delivered on time. Looking forward to future collaborations!',
    rating: 5,
    imageUrl: 'https://i.pravatar.cc/300?img=15',
    imageId: 'client-4',
    status: 'active',
  },
];

const sampleContacts = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Interested in your services',
    message: 'Hi, I came across your portfolio and I am very impressed with your work. I would like to discuss a potential project for my startup. Could we schedule a call this week?',
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.a@company.com',
    subject: 'Partnership Opportunity',
    message: 'Hello, we are looking for a reliable development partner for our upcoming e-commerce platform. Your portfolio showcases exactly the kind of expertise we need. Let\'s connect!',
  },
  {
    name: 'Robert Williams',
    email: 'rwilliams@tech.com',
    subject: 'Project Quote Request',
    message: 'Good day! We need a mobile app developed for our business. Can you provide a quote and timeline for a project similar to the task management app in your portfolio?',
  },
];

const sampleNewsletters = [
  { email: 'subscriber1@example.com', status: 'active' },
  { email: 'subscriber2@example.com', status: 'active' },
  { email: 'subscriber3@example.com', status: 'active' },
  { email: 'subscriber4@example.com', status: 'active' },
  { email: 'subscriber5@example.com', status: 'active' },
  { email: 'unsubscribed@example.com', status: 'unsubscribed' },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Contact.deleteMany({});
    await Newsletter.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert sample projects
    console.log('\n📁 Inserting sample projects...');
    const projects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${projects.length} projects`);

    // Insert sample clients
    console.log('\n👥 Inserting sample clients...');
    const clients = await Client.insertMany(sampleClients);
    console.log(`✅ Inserted ${clients.length} clients`);

    // Insert sample contacts
    console.log('\n📧 Inserting sample contacts...');
    const contacts = await Contact.insertMany(sampleContacts);
    console.log(`✅ Inserted ${contacts.length} contact messages`);

    // Insert sample newsletter subscribers
    console.log('\n📬 Inserting sample newsletter subscribers...');
    const newsletters = await Newsletter.insertMany(sampleNewsletters);
    console.log(`✅ Inserted ${newsletters.length} newsletter subscribers`);

    console.log('\n🎉 Sample data seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Clients: ${clients.length}`);
    console.log(`   - Contacts: ${contacts.length}`);
    console.log(`   - Subscribers: ${newsletters.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
