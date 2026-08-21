// Seed script - runs the SQL seed file against Supabase using the service role key
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jpblxlrxvicfhhwsnsjp.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  // Read from .env.local
  const envFile = fs.readFileSync(path.join(__dirname, '.env.local'), 'utf8');
  const match = envFile.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/);
  if (match) {
    process.env.SUPABASE_SERVICE_ROLE_KEY = match[1].trim();
  }
}

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function seed() {
  console.log('🌱 Seeding database...\n');

  // --- EVENTS ---
  const events = [
    {
      title: 'TECHNOVA 2026 - AI & Cybersecurity Workshop',
      slug: 'technova-2026',
      description: '# TECHNOVA 2026: AI & Cybersecurity Workshop\n\nJoin us for an intensive two-day workshop on Artificial Intelligence and Cybersecurity.',
      short_description: 'Two-day intensive workshop on AI fundamentals and cybersecurity essentials with hands-on sessions',
      category: 'workshop',
      event_date: '2026-09-15',
      start_time: '09:00',
      end_time: '17:00',
      venue: 'Department Auditorium, CSE Block',
      organizer: 'IONITIX Department',
      speaker: 'Dr. Sarah Chen, Prof. Michael Rodriguez',
      registration_enabled: true,
      registration_type: 'google-form',
      registration_display_mode: 'button',
      registration_deadline: '2026-09-10',
      contact_email: 'events@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    },
    {
      title: 'CODEFEST 2026 - Annual Hackathon',
      slug: 'codefest-2026',
      description: '# CODEFEST 2026: 36-Hour Hackathon\n\nThe biggest coding event of the year! Build innovative solutions, compete for amazing prizes.',
      short_description: '36-hour annual hackathon with multiple tracks, amazing prizes, and industry mentorship',
      category: 'hackathon',
      event_date: '2026-10-20',
      start_time: '10:00',
      end_time: '22:00',
      venue: 'Main Campus - Innovation Hub',
      organizer: 'IONITIX Student Chapter',
      speaker: 'Industry mentors from Google, Microsoft, Amazon',
      registration_enabled: true,
      registration_type: 'native',
      registration_display_mode: 'button',
      registration_deadline: '2026-10-15',
      contact_email: 'hackathon@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    },
    {
      title: 'CYBER SHIELD 2026 - Cybersecurity Competition',
      slug: 'cyber-shield-2026',
      description: '# CYBER SHIELD 2026: Capture The Flag Competition\n\nTest your cybersecurity skills in this intense CTF competition.',
      short_description: '48-hour Capture The Flag cybersecurity competition with 50+ challenges across multiple categories',
      category: 'competition',
      event_date: '2026-11-10',
      start_time: '00:00',
      end_time: '23:59',
      venue: 'Online Platform (CTFd)',
      organizer: 'Cybersecurity Club',
      speaker: 'CTF Platform Admins',
      registration_enabled: true,
      registration_type: 'external',
      registration_display_mode: 'button',
      registration_deadline: '2026-11-05',
      contact_email: 'cyber@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    },
    {
      title: 'AI INNOVATION SUMMIT 2026',
      slug: 'ai-innovation-summit-2026',
      description: '# AI INNOVATION SUMMIT 2026\n\nA premier conference bringing together AI researchers, industry leaders, and students.',
      short_description: 'Premier AI conference with world-renowned speakers, technical sessions, and industry networking',
      category: 'conference',
      event_date: '2026-12-05',
      start_time: '09:00',
      end_time: '18:00',
      venue: 'University Convention Center',
      organizer: 'IONITIX Department & AI Research Center',
      speaker: 'Dr. Andrew Ng, Prof. Fei-Fei Li, Dr. Yann LeCun',
      registration_enabled: true,
      registration_type: 'google-form',
      registration_display_mode: 'embedded',
      registration_deadline: '2026-11-30',
      contact_email: 'ai-summit@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    },
    {
      title: 'QUANTUM COMPUTING SEMINAR SERIES',
      slug: 'quantum-computing-seminar',
      description: '# Quantum Computing Seminar Series\n\nA weekly seminar series exploring the fundamentals and applications of quantum computing.',
      short_description: 'Weekly seminar series on quantum computing fundamentals and applications',
      category: 'seminar',
      event_date: '2026-08-25',
      start_time: '16:00',
      end_time: '17:30',
      venue: 'Seminar Hall, CSE Block',
      organizer: 'Quantum Computing Research Group',
      speaker: 'Dr. Priya Sharma',
      registration_enabled: false,
      registration_type: 'none',
      registration_display_mode: 'button',
      registration_deadline: null,
      contact_email: 'quantum@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    },
    {
      title: 'DATA SCIENCE WORKSHOP',
      slug: 'data-science-workshop-2026',
      description: '# Data Science Workshop: From Data to Insights\n\nA comprehensive workshop covering the complete data science pipeline.',
      short_description: 'Comprehensive hands-on workshop covering the complete data science pipeline from data to deployment',
      category: 'workshop',
      event_date: '2026-09-28',
      start_time: '10:00',
      end_time: '16:00',
      venue: 'Computer Lab 3, CSE Block',
      organizer: 'Data Science Club',
      speaker: 'Prof. Anita Desai',
      registration_enabled: true,
      registration_type: 'native',
      registration_display_mode: 'button',
      registration_deadline: '2026-09-23',
      contact_email: 'datascience@ionitix.edu',
      contact_phone: '+91-XXXXX-XXXXX',
      status: 'published'
    }
  ];

  const { data: eventsData, error: eventsErr } = await supabase.from('events').upsert(events, { onConflict: 'slug' }).select();
  if (eventsErr) console.error('❌ Events error:', eventsErr.message);
  else console.log(`✅ Inserted ${eventsData.length} events`);

  // --- ANNOUNCEMENTS ---
  const announcements = [
    {
      title: 'Registration Open for TECHNOVA 2026',
      slug: 'registration-open-technova-2026',
      description: 'We are excited to announce that registrations for TECHNOVA 2026 - AI & Cybersecurity Workshop are now open! Limited seats available. Register now!',
      published: true,
      published_at: '2026-08-01T10:00:00Z'
    },
    {
      title: 'CODEFEST 2026 Dates Announced',
      slug: 'codefest-2026-dates-announced',
      description: 'Mark your calendars! CODEFEST 2026, our annual 36-hour hackathon, will take place from October 20-22, 2026. Total prize pool worth ₹2,00,000+!',
      published: true,
      published_at: '2026-08-05T14:30:00Z'
    },
    {
      title: 'Semester Examination Schedule Released',
      slug: 'semester-examination-schedule',
      description: 'The examination schedule for the upcoming semester has been released. Please check the academic portal for your specific timetable.',
      published: true,
      published_at: '2026-08-10T09:00:00Z'
    },
    {
      title: 'New Research Grant Awarded to Faculty',
      slug: 'research-grant-faculty',
      description: 'Congratulations to Dr. Priya Sharma and her team for securing a ₹50 lakh research grant from DST for "Quantum-Resistant Cryptographic Protocols for IoT Networks".',
      published: true,
      published_at: '2026-08-12T11:00:00Z'
    },
    {
      title: 'Placement Drive - Tech Giants Visiting Campus',
      slug: 'placement-drive-tech-giants',
      description: 'Major tech companies including Google, Microsoft, Amazon, and Adobe will be visiting our campus for the 2026 placement season.',
      published: true,
      published_at: '2026-08-15T16:00:00Z'
    }
  ];

  const { data: annData, error: annErr } = await supabase.from('announcements').upsert(announcements, { onConflict: 'slug' }).select();
  if (annErr) console.error('❌ Announcements error:', annErr.message);
  else console.log(`✅ Inserted ${annData.length} announcements`);

  // --- FACULTY ---
  const faculty = [
    { name: 'Dr. Rajesh Kumar', designation: 'Professor & Head of Department', qualification: 'Ph.D. (Computer Science), M.Tech (CSE), B.Tech (CSE)', specialization: 'Artificial Intelligence, Machine Learning, Computer Vision', email: 'hod@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: 'Dr. Rajesh Kumar has over 20 years of experience in teaching and research. He has published 100+ research papers.' },
    { name: 'Dr. Priya Sharma', designation: 'Professor', qualification: 'Ph.D. (Quantum Computing), M.Tech (CSE), B.Tech (ECE)', specialization: 'Quantum Computing, Cryptography, Quantum Algorithms', email: 'priya.sharma@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: 'Dr. Priya Sharma is a leading researcher in quantum computing with focus on quantum algorithms and quantum-resistant cryptography.' },
    { name: 'Prof. Michael Rodriguez', designation: 'Associate Professor', qualification: 'Ph.D. (Cybersecurity), M.S. (Computer Science), B.S. (Computer Engineering)', specialization: 'Network Security, Penetration Testing, Digital Forensics', email: 'michael.rodriguez@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: 'Prof. Rodriguez brings industry experience from top cybersecurity firms.' },
    { name: 'Dr. Anita Desai', designation: 'Associate Professor', qualification: 'Ph.D. (Data Science), M.Tech (CSE), B.Tech (IT)', specialization: 'Data Science, Big Data Analytics, Machine Learning', email: 'anita.desai@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: 'Dr. Desai has extensive experience in data science and analytics.' },
    { name: 'Dr. Sarah Chen', designation: 'Assistant Professor', qualification: 'Ph.D. (AI & Robotics), M.S. (Robotics), B.E. (CSE)', specialization: 'Robotics, Reinforcement Learning, Human-Robot Interaction', email: 'sarah.chen@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: "Dr. Chen's research lies at the intersection of robotics and machine learning." },
    { name: 'Prof. James Wilson', designation: 'Assistant Professor', qualification: 'Ph.D. (Software Engineering), M.Tech (SE), B.Tech (CSE)', specialization: 'Software Architecture, DevOps, Cloud Computing', email: 'james.wilson@ionitix.edu', phone: '+91-XXXXX-XXXXX', bio: 'Prof. Wilson specializes in modern software engineering practices.' }
  ];

  const { data: facData, error: facErr } = await supabase.from('faculty').insert(faculty).select();
  if (facErr) console.error('❌ Faculty error:', facErr.message);
  else console.log(`✅ Inserted ${facData.length} faculty members`);

  // --- LABORATORIES ---
  const laboratories = [
    { name: 'AI & Machine Learning Lab', description: 'State-of-the-art laboratory for artificial intelligence and machine learning research.', equipment: ['NVIDIA DGX A100 (4x)', 'NVIDIA RTX 3090 Workstations (10x)', 'High-speed NVMe Storage (50TB)'], technologies: ['TensorFlow', 'PyTorch', 'JAX', 'Hugging Face', 'MLflow'] },
    { name: 'Cybersecurity Lab', description: 'Dedicated cybersecurity laboratory with isolated network infrastructure for penetration testing.', equipment: ['Isolated Network Racks (4x)', 'Malware Analysis Sandboxes', 'Hardware Security Modules', 'Forensic Workstations (8x)'], technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Ghidra'] },
    { name: 'IoT & Embedded Systems Lab', description: 'Laboratory for Internet of Things and embedded systems development.', equipment: ['Raspberry Pi Clusters (20x)', 'Arduino/ESP32 Kits (50x)', 'Sensor Arrays', 'LoRaWAN Gateway'], technologies: ['Arduino IDE', 'PlatformIO', 'ESP-IDF', 'AWS IoT', 'MQTT'] },
    { name: 'Computer Networks Lab', description: 'Advanced networking laboratory with enterprise-grade equipment.', equipment: ['Cisco Catalyst Switches', 'Cisco ISR Routers', 'Juniper EX Series', 'Network Simulators'], technologies: ['Cisco IOS', 'Juniper JunOS', 'BGP/OSPF/MPLS', 'SDN Controllers'] },
    { name: 'Programming & Development Lab', description: 'General-purpose programming laboratory with modern development environments.', equipment: ['High-Performance Workstations (60x)', 'Dual Monitor Setup', 'High-Speed Internet (1 Gbps)'], technologies: ['VS Code', 'Docker', 'Kubernetes', 'Git/GitHub', 'PostgreSQL'] },
    { name: 'Quantum Computing Research Lab', description: 'Specialized laboratory for quantum computing research.', equipment: ['Classical Simulation Cluster (128 cores)', 'Quantum Control Electronics', 'IBM Quantum Network Access'], technologies: ['Qiskit', 'Cirq', 'PennyLane', 'OpenQASM'] }
  ];

  const { data: labData, error: labErr } = await supabase.from('laboratories').insert(laboratories).select();
  if (labErr) console.error('❌ Labs error:', labErr.message);
  else console.log(`✅ Inserted ${labData.length} laboratories`);

  // --- ACHIEVEMENTS ---
  const achievements = [
    { title: 'National Smart India Hackathon 2025 Winners', description: 'Team "CodeBreakers" from IONITIX won 1st place at the Grand Finale of Smart India Hackathon 2025.', category: 'competition', date: '2025-08-15' },
    { title: 'Best Research Paper Award at ICML 2025', description: 'PhD student Arjun Patel won the Best Paper Award at ICML 2025 for "Quantum-Enhanced Variational Autoencoders".', category: 'research', date: '2025-07-20' },
    { title: 'Google PhD Fellowship 2025', description: 'PhD student Meera Krishnan awarded the prestigious Google PhD Fellowship in Machine Learning.', category: 'student', date: '2025-05-10' },
    { title: 'Faculty Excellence Award 2025', description: 'Prof. Michael Rodriguez received the University Faculty Excellence Award.', category: 'faculty', date: '2025-03-15' },
    { title: 'Microsoft Research Grant', description: 'Dr. Anita Desai and team awarded Microsoft Research Grant of $100,000.', category: 'research', date: '2025-02-28' },
    { title: 'ACM ICPC Regional Champions 2024', description: 'IONITIX programming team "Algorithm Avengers" won the ACM ICPC Asia Regional Championship 2024.', category: 'competition', date: '2024-12-20' },
    { title: 'AWS Certified Solutions Architect - Professional', description: '25 students from IONITIX achieved AWS Certified Solutions Architect - Professional certification.', category: 'certification', date: '2024-11-30' },
    { title: 'Best Innovation Award - TechExpo 2024', description: 'Student project "MediChain - Blockchain-based Medical Records System" won Best Innovation Award.', category: 'student', date: '2024-10-15' }
  ];

  const { data: achData, error: achErr } = await supabase.from('achievements').insert(achievements).select();
  if (achErr) console.error('❌ Achievements error:', achErr.message);
  else console.log(`✅ Inserted ${achData.length} achievements`);

  console.log('\n🎉 Database seeded successfully!');
}

seed().catch(err => console.error('Fatal error:', err));
