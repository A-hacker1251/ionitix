-- Seed data for IONITIX
-- Run this after migrations

-- Insert sample events
INSERT INTO events (title, slug, description, short_description, category, event_date, start_time, end_time, venue, organizer, speaker, registration_enabled, registration_type, registration_display_mode, registration_deadline, contact_email, contact_phone, status) VALUES
(
    'TECHNOVA 2026 - AI & Cybersecurity Workshop',
    'technova-2026',
    '# TECHNOVA 2026: AI & Cybersecurity Workshop\n\nJoin us for an intensive two-day workshop on Artificial Intelligence and Cybersecurity. This hands-on workshop will cover:\n\n## Day 1: AI Fundamentals\n- Machine Learning Basics\n- Neural Networks Introduction\n- Practical AI Applications\n- Ethics in AI\n\n## Day 2: Cybersecurity Essentials\n- Network Security Fundamentals\n- Threat Detection & Prevention\n- Secure Coding Practices\n- Incident Response\n\n**Prerequisites:** Basic programming knowledge (Python preferred)\n**Target Audience:** Students, faculty, and industry professionals\n\nCertificates will be provided to all participants who complete both days.',
    'Two-day intensive workshop on AI fundamentals and cybersecurity essentials with hands-on sessions',
    'workshop',
    '2026-09-15',
    '09:00',
    '17:00',
    'Department Auditorium, CSE Block',
    'IONITIX Department',
    'Dr. Sarah Chen, Prof. Michael Rodriguez',
    true,
    'google-form',
    'button',
    '2026-09-10',
    'events@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
),
(
    'CODEFEST 2026 - Annual Hackathon',
    'codefest-2026',
    '# CODEFEST 2026: 36-Hour Hackathon\n\nThe biggest coding event of the year! Build innovative solutions, compete for amazing prizes, and network with industry leaders.\n\n## Tracks\n- **AI/ML Innovation** - Build intelligent applications\n- **FinTech Solutions** - Revolutionize financial technology\n- **Healthcare Tech** - Improve healthcare accessibility\n- **Sustainability** - Code for a greener future\n- **Open Innovation** - Bring your own idea\n\n## Prizes\n- 🥇 1st Place: ₹1,00,000 + Internship opportunities\n- 🥈 2nd Place: ₹50,000 + Mentorship\n- 🥉 3rd Place: ₹25,000 + Swag\n- Special prizes for best UI/UX, best use of AI, best social impact\n\n## Schedule\n- **Day 1:** Registration, Opening Ceremony, Hacking begins\n- **Day 2:** Continuous hacking, workshops, mentoring sessions\n- **Day 3:** Final submissions, judging, closing ceremony\n\n**Team Size:** 2-4 members\n**Registration:** Free for all students',
    '36-hour annual hackathon with multiple tracks, amazing prizes, and industry mentorship',
    'hackathon',
    '2026-10-20',
    '10:00',
    '22:00',
    'Main Campus - Innovation Hub',
    'IONITIX Student Chapter',
    'Industry mentors from Google, Microsoft, Amazon',
    true,
    'native',
    'button',
    '2026-10-15',
    'hackathon@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
),
(
    'CYBER SHIELD 2026 - Cybersecurity Competition',
    'cyber-shield-2026',
    '# CYBER SHIELD 2026: Capture The Flag Competition\n\nTest your cybersecurity skills in this intense CTF competition designed for students and professionals.\n\n## Categories\n- **Web Exploitation** - Find and exploit web vulnerabilities\n- **Binary Exploitation** - Reverse engineering and pwn challenges\n- **Cryptography** - Break encryption and analyze protocols\n- **Forensics** - Digital investigation and evidence analysis\n- **OSINT** - Open source intelligence gathering\n- **Miscellaneous** - Unique challenges requiring creative thinking\n\n## Format\n- **Jeopardy-style CTF** with 50+ challenges\n- **48-hour** competition window\n- **Real-time scoreboard**\n- **Live commentary** and walkthroughs\n\n## Eligibility\n- Open to all undergraduate and graduate students\n- Teams of 1-3 members\n- No prior CTF experience required\n\n## Prizes\n- Cash prizes worth ₹75,000\n- Exclusive cybersecurity training subscriptions\n- Direct interview opportunities with sponsor companies',
    '48-hour Capture The Flag cybersecurity competition with 50+ challenges across multiple categories',
    'competition',
    '2026-11-10',
    '00:00',
    '23:59',
    'Online Platform (CTFd)',
    'Cybersecurity Club',
    'CTF Platform Admins',
    true,
    'external',
    'button',
    '2026-11-05',
    'cyber@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
),
(
    'AI INNOVATION SUMMIT 2026',
    'ai-innovation-summit-2026',
    '# AI INNOVATION SUMMIT 2026\n\nA premier conference bringing together AI researchers, industry leaders, and students to explore the future of artificial intelligence.\n\n## Keynote Speakers\n- **Dr. Andrew Ng** - "The Future of AI Education"\n- **Prof. Fei-Fei Li** - "Human-Centered AI"\n- **Dr. Yann LeCun** - "Self-Supervised Learning"\n\n## Technical Sessions\n- Large Language Models & Generative AI\n- Computer Vision Advances\n- Reinforcement Learning Applications\n- AI Ethics & Responsible AI\n- AI in Healthcare & Life Sciences\n- Edge AI & IoT Integration\n\n## Panel Discussions\n- "AI Regulation: Innovation vs Safety"\n- "Building AI Careers in 2026"\n- "Academia-Industry Collaboration"\n\n## Networking\n- Research poster session\n- Industry exhibition\n- Career fair with top AI companies\n- Student research showcase',
    'Premier AI conference with world-renowned speakers, technical sessions, and industry networking',
    'conference',
    '2026-12-05',
    '09:00',
    '18:00',
    'University Convention Center',
    'IONITIX Department & AI Research Center',
    'Dr. Andrew Ng, Prof. Fei-Fei Li, Dr. Yann LeCun',
    true,
    'google-form',
    'embedded',
    '2026-11-30',
    'ai-summit@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
),
(
    'QUANTUM COMPUTING SEMINAR SERIES',
    'quantum-computing-seminar',
    '# Quantum Computing Seminar Series\n\nA weekly seminar series exploring the fundamentals and applications of quantum computing.\n\n## Schedule\n- **Week 1:** Quantum Mechanics Refresher\n- **Week 2:** Qubits and Quantum Gates\n- **Week 3:** Quantum Algorithms (Shor, Grover)\n- **Week 4:** Quantum Error Correction\n- **Week 5:** NISQ Devices and Applications\n- **Week 6:** Quantum Machine Learning\n\n## Format\n- 90-minute sessions (60 min talk + 30 min Q&A)\n- Hybrid format (in-person + live stream)\n- Reading materials provided weekly\n- Hands-on labs with IBM Quantum Experience\n\n## Speakers\n- Dr. Priya Sharma (Quantum Algorithms)\n- Prof. Robert Kim (Quantum Hardware)\n- Dr. Lisa Wang (Quantum ML)\n\n**No registration required** - Open to all interested students and faculty',
    'Weekly seminar series on quantum computing fundamentals and applications',
    'seminar',
    '2026-08-25',
    '16:00',
    '17:30',
    'Seminar Hall, CSE Block',
    'Quantum Computing Research Group',
    'Dr. Priya Sharma',
    false,
    'none',
    'button',
    null,
    'quantum@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
),
(
    'DATA SCIENCE WORKSHOP',
    'data-science-workshop-2026',
    '# Data Science Workshop: From Data to Insights\n\nA comprehensive workshop covering the complete data science pipeline.\n\n## Modules\n1. **Data Collection & Cleaning** - Web scraping, APIs, data preprocessing\n2. **Exploratory Data Analysis** - Visualization, statistical analysis\n3. **Feature Engineering** - Selection, transformation, creation\n4. **Model Building** - Regression, classification, clustering\n5. **Model Evaluation** - Metrics, cross-validation, hyperparameter tuning\n6. **Deployment** - Model serving, monitoring, MLOps basics\n\n## Tools\n- Python (pandas, numpy, scikit-learn, matplotlib, seaborn)\n- Jupyter Notebooks\n- Git for version control\n- Docker for containerization\n\n## Project\nParticipants will work on a real-world dataset to build and deploy a complete ML pipeline.\n\n**Prerequisites:** Basic Python programming\n**Certificate:** Provided upon project completion',
    'Comprehensive hands-on workshop covering the complete data science pipeline from data to deployment',
    'workshop',
    '2026-09-28',
    '10:00',
    '16:00',
    'Computer Lab 3, CSE Block',
    'Data Science Club',
    'Prof. Anita Desai',
    true,
    'native',
    'button',
    '2026-09-23',
    'datascience@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample announcements
INSERT INTO announcements (title, slug, description, image, published, published_at) VALUES
(
    'Registration Open for TECHNOVA 2026',
    'registration-open-technova-2026',
    'We are excited to announce that registrations for TECHNOVA 2026 - AI & Cybersecurity Workshop are now open! This two-day intensive workshop will cover machine learning fundamentals, neural networks, network security, and secure coding practices. Limited seats available. Register now to secure your spot!',
    null,
    true,
    '2026-08-01 10:00:00+00'
),
(
    'CODEFEST 2026 Dates Announced',
    'codefest-2026-dates-announced',
    'Mark your calendars! CODEFEST 2026, our annual 36-hour hackathon, will take place from October 20-22, 2026. This year we have amazing tracks including AI/ML Innovation, FinTech Solutions, Healthcare Tech, and Sustainability. Total prize pool worth ₹2,00,000+! Registration opens September 1st.',
    null,
    true,
    '2026-08-05 14:30:00+00'
),
(
    'Semester Examination Schedule Released',
    'semester-examination-schedule',
    'The examination schedule for the upcoming semester has been released. Please check the academic portal for your specific timetable. Important: All students must clear their dues before collecting admit cards. Practical examinations will be conducted from December 1-15, 2026.',
    null,
    true,
    '2026-08-10 09:00:00+00'
),
(
    'New Research Grant Awarded to Faculty',
    'research-grant-faculty',
    'Congratulations to Dr. Priya Sharma and her team for securing a ₹50 lakh research grant from DST for their project on "Quantum-Resistant Cryptographic Protocols for IoT Networks". This prestigious grant will fund PhD students and research infrastructure for the next 3 years.',
    null,
    true,
    '2026-08-12 11:00:00+00'
),
(
    'Placement Drive - Tech Giants Visiting Campus',
    'placement-drive-tech-giants',
    'Major tech companies including Google, Microsoft, Amazon, and Adobe will be visiting our campus for the 2026 placement season. Pre-placement talks begin next week. Students are advised to update their profiles on the placement portal and prepare for technical interviews.',
    null,
    true,
    '2026-08-15 16:00:00+00'
)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample faculty
INSERT INTO faculty (name, designation, qualification, specialization, email, phone, bio) VALUES
(
    'Dr. Rajesh Kumar',
    'Professor & Head of Department',
    'Ph.D. (Computer Science), M.Tech (CSE), B.Tech (CSE)',
    'Artificial Intelligence, Machine Learning, Computer Vision',
    'hod@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Dr. Rajesh Kumar has over 20 years of experience in teaching and research. He has published 100+ research papers in reputed journals and conferences. His research interests include deep learning, computer vision, and AI applications in healthcare. He has guided 15 PhD scholars and 50+ M.Tech students.'
),
(
    'Dr. Priya Sharma',
    'Professor',
    'Ph.D. (Quantum Computing), M.Tech (CSE), B.Tech (ECE)',
    'Quantum Computing, Cryptography, Quantum Algorithms',
    'priya.sharma@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Dr. Priya Sharma is a leading researcher in quantum computing with focus on quantum algorithms and quantum-resistant cryptography. She has received multiple international awards and leads the Quantum Computing Research Group at IONITIX.'
),
(
    'Prof. Michael Rodriguez',
    'Associate Professor',
    'Ph.D. (Cybersecurity), M.S. (Computer Science), B.S. (Computer Engineering)',
    'Network Security, Penetration Testing, Digital Forensics',
    'michael.rodriguez@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Prof. Rodriguez brings industry experience from top cybersecurity firms. He specializes in network security, ethical hacking, and incident response. He runs the Cybersecurity Lab and mentors students for CTF competitions.'
),
(
    'Dr. Anita Desai',
    'Associate Professor',
    'Ph.D. (Data Science), M.Tech (CSE), B.Tech (IT)',
    'Data Science, Big Data Analytics, Machine Learning',
    'anita.desai@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Dr. Desai has extensive experience in data science and analytics. She has collaborated with industry on multiple data-driven projects and teaches the popular Data Science specialization. Her research focuses on scalable ML algorithms.'
),
(
    'Dr. Sarah Chen',
    'Assistant Professor',
    'Ph.D. (AI & Robotics), M.S. (Robotics), B.E. (CSE)',
    'Robotics, Reinforcement Learning, Human-Robot Interaction',
    'sarah.chen@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Dr. Chen''s research lies at the intersection of robotics and machine learning. She has worked on autonomous navigation and human-robot collaboration. She teaches AI, Robotics, and Reinforcement Learning courses.'
),
(
    'Prof. James Wilson',
    'Assistant Professor',
    'Ph.D. (Software Engineering), M.Tech (SE), B.Tech (CSE)',
    'Software Architecture, DevOps, Cloud Computing',
    'james.wilson@ionitix.edu',
    '+91-XXXXX-XXXXX',
    'Prof. Wilson specializes in modern software engineering practices. He has industry experience building scalable cloud systems and teaches Cloud Computing, DevOps, and Software Architecture. He mentors the Student Developer Club.'
)
ON CONFLICT DO NOTHING;

-- Insert sample laboratories
INSERT INTO laboratories (name, description, equipment, technologies, image) VALUES
(
    'AI & Machine Learning Lab',
    'State-of-the-art laboratory for artificial intelligence and machine learning research. Equipped with high-performance GPU clusters for deep learning training and inference.',
    ARRAY['NVIDIA DGX A100 (4x)', 'NVIDIA RTX 3090 Workstations (10x)', 'High-speed NVMe Storage (50TB)', '100 Gbps InfiniBand Network'],
    ARRAY['TensorFlow', 'PyTorch', 'JAX', 'Hugging Face', 'MLflow', 'Kubeflow', 'Ray', 'Weights & Biases'],
    null
),
(
    'Cybersecurity Lab',
    'Dedicated cybersecurity laboratory with isolated network infrastructure for penetration testing, malware analysis, and security research.',
    ARRAY['Isolated Network Racks (4x)', 'Malware Analysis Sandboxes', 'Hardware Security Modules', 'SDR Equipment (HackRF, BladeRF)', 'Forensic Workstations (8x)'],
    ARRAY['Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Volatility', 'IDA Pro', 'Ghidra', 'CTFd Platform'],
    null
),
(
    'IoT & Embedded Systems Lab',
    'Laboratory for Internet of Things and embedded systems development with diverse hardware platforms and sensor networks.',
    ARRAY['Raspberry Pi Clusters (20x)', 'Arduino/ESP32 Development Kits (50x)', 'Sensor Arrays (Environmental, Motion, Biometric)', 'LoRaWAN Gateway', '5G Test Bed', 'FPGA Development Boards (10x)'],
    ARRAY['Arduino IDE', 'PlatformIO', 'ESP-IDF', 'Zephyr RTOS', 'AWS IoT', 'Azure IoT', 'Node-RED', 'MQTT Brokers'],
    null
),
(
    'Computer Networks Lab',
    'Advanced networking laboratory with enterprise-grade equipment for network design, simulation, and protocol research.',
    ARRAY['Cisco Catalyst Switches (9000 Series)', 'Cisco ISR Routers', 'Juniper EX Series', 'Network Simulators (GNS3, EVE-NG)', 'Traffic Generators (Spirent, IXIA)'],
    ARRAY['Cisco IOS/IOS-XE', 'Juniper JunOS', 'BGP/OSPF/MPLS', 'SDN Controllers (ONOS, OpenDaylight)', 'Network Automation (Ansible, Python)'],
    null
),
(
    'Programming & Development Lab',
    'General-purpose programming laboratory with modern development environments for coursework, projects, and hackathons.',
    ARRAY['High-Performance Workstations (60x)', 'Dual Monitor Setup', 'Mechanical Keyboards', 'Ergonomic Chairs', 'High-Speed Internet (1 Gbps)'],
    ARRAY['VS Code', 'IntelliJ IDEA', 'Docker', 'Kubernetes', 'Git/GitHub', 'CI/CD Pipelines', 'PostgreSQL', 'MongoDB', 'Redis'],
    null
),
(
    'Quantum Computing Research Lab',
    'Specialized laboratory for quantum computing research with access to quantum hardware and simulation platforms.',
    ARRAY['Classical Simulation Cluster (128 cores)', 'Quantum Control Electronics', 'Cryogenic Test Setup', 'IBM Quantum Network Access', 'D-Wave Leap Access'],
    ARRAY['Qiskit', 'Cirq', 'PennyLane', 'OpenQASM', 'QuTiP', 'Julia/QuantumOptics', 'Quantum ML Libraries'],
    null
)
ON CONFLICT DO NOTHING;

-- Insert sample achievements
INSERT INTO achievements (title, description, category, image, date) VALUES
(
    'National Smart India Hackathon 2025 Winners',
    'Team "CodeBreakers" from IONITIX won 1st place at the Grand Finale of Smart India Hackathon 2025 with their project "AgriSense - AI-powered Crop Disease Detection System". The team received ₹1,00,000 and incubation support.',
    'competition',
    null,
    '2025-08-15'
),
(
    'Best Research Paper Award at ICML 2025',
    'PhD student Arjun Patel under the guidance of Dr. Priya Sharma won the Best Paper Award at ICML 2025 for "Quantum-Enhanced Variational Autoencoders for Anomaly Detection".',
    'research',
    null,
    '2025-07-20'
),
(
    'Google PhD Fellowship 2025',
    'PhD student Meera Krishnan (advised by Dr. Rajesh Kumar) awarded the prestigious Google PhD Fellowship in Machine Learning for her work on "Federated Learning for Edge Devices".',
    'student',
    null,
    '2025-05-10'
),
(
    'Faculty Excellence Award 2025',
    'Prof. Michael Rodriguez received the University Faculty Excellence Award for his outstanding contributions to cybersecurity education and research, including establishing the Cybersecurity Lab and mentoring 50+ students in CTF competitions.',
    'faculty',
    null,
    '2025-03-15'
),
(
    'Microsoft Research Grant',
    'Dr. Anita Desai and team awarded Microsoft Research Grant of $100,000 for "Scalable Graph Neural Networks for Large-Scale Social Network Analysis".',
    'research',
    null,
    '2025-02-28'
),
(
    'ACM ICPC Regional Champions 2024',
    'IONITIX programming team "Algorithm Avengers" won the ACM ICPC Asia Regional Championship 2024, qualifying for the World Finals. Team members: Rahul Sharma, Sneha Reddy, Vikram Singh.',
    'competition',
    null,
    '2024-12-20'
),
(
    'AWS Certified Solutions Architect - Professional',
    '25 students from IONITIX achieved AWS Certified Solutions Architect - Professional certification through the department Cloud Computing program.',
    'certification',
    null,
    '2024-11-30'
),
(
    'Best Innovation Award - TechExpo 2024',
    'Student project "MediChain - Blockchain-based Medical Records System" won Best Innovation Award at TechExpo 2024. Developed by final year B.Tech students under Prof. James Wilson.',
    'student',
    null,
    '2024-10-15'
)
ON CONFLICT DO NOTHING;