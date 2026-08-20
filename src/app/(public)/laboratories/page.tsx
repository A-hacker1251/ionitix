import { Metadata } from "next"
import {
  FlaskConical,
  Cpu,
  Shield,
  Database,
  Wifi,
  Code,
  Monitor,
  Search,
  Users,
  MapPin,
  GraduationCap,
  Clock,
  Globe,
  Award,
  BookOpen,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { MotionDiv, MotionH1, MotionP } from "../motion-wrapper"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Laboratories - IONITIX",
  description:
    "Explore state-of-the-art laboratories at IONITIX Department of Computer Science & Engineering.",
}

const laboratories = [
  {
    name: "Artificial Intelligence & Machine Learning Lab",
    shortName: "AI/ML Lab",
    description:
      "Cutting-edge facility for research and development in artificial intelligence, machine learning, deep learning, computer vision, and natural language processing.",
    image: "/images/labs/ai-ml-lab.jpg",
    equipment: [
      "NVIDIA DGX A100 Systems (4x)",
      "NVIDIA RTX A6000 GPUs (16x)",
      "High-performance compute servers (8x)",
      "Data annotation workstations (20x)",
      "Robotics platforms (TurtleBot, Franka Emika)",
      "VR/AR development kits (Meta Quest, HoloLens)",
    ],
    technologies: [
      "TensorFlow",
      "PyTorch",
      "JAX",
      "Hugging Face",
      "OpenCV",
      "YOLO",
      "Transformers",
      "LangChain",
      "MLflow",
      "Kubeflow",
      "Weights & Biases",
      "Ray",
    ],
    researchAreas: [
      "Computer Vision & Image Recognition",
      "Natural Language Processing",
      "Reinforcement Learning",
      "Generative AI & LLMs",
      "Robotics & Autonomous Systems",
      "Explainable AI & Ethics",
    ],
    capacity: "40 students",
    inCharge: "Dr. Priya Sharma",
    location: "Block A, 3rd Floor, Room 301",
  },
  {
    name: "Cybersecurity & Digital Forensics Lab",
    shortName: "Cyber Lab",
    description:
      "Specialized laboratory for cybersecurity research, penetration testing, digital forensics, cryptography, and secure software development.",
    image: "/images/labs/cyber-lab.jpg",
    equipment: [
      "Isolated network testbed (air-gapped)",
      "Hardware security modules (HSMs)",
      "FPGA development boards for side-channel analysis",
      "Digital forensics workstations (EnCase, FTK)",
      "Wireless security testing equipment (SDRs, WiFi Pineapple)",
      "Malware analysis sandbox (Cuckoo, Joe Sandbox)",
    ],
    technologies: [
      "Metasploit",
      "Burp Suite",
      "Wireshark",
      "Nmap",
      "Volatility",
      "IDA Pro",
      "Ghidra",
      "Radare2",
      "Hashcat",
      "John the Ripper",
      "OpenSSL",
      "Scapy",
    ],
    researchAreas: [
      "Network Security & Intrusion Detection",
      "Cryptography & Post-Quantum Crypto",
      "Digital Forensics & Incident Response",
      "IoT & Embedded Security",
      "Blockchain & Smart Contract Security",
      "Privacy-Preserving Technologies",
    ],
    capacity: "30 students",
    inCharge: "Dr. Amit Patel",
    location: "Block B, 2nd Floor, Room 205",
  },
  {
    name: "Internet of Things & Embedded Systems Lab",
    shortName: "IoT Lab",
    description:
      "State-of-the-art facility for IoT prototyping, embedded systems development, wireless sensor networks, and edge computing research.",
    image: "/images/labs/iot-lab.jpg",
    equipment: [
      "Arduino/Raspberry Pi/ESP32 development kits (50+)",
      "Industrial IoT gateways and sensors",
      "LoRaWAN, Zigbee, NB-IoT testbeds",
      "3D printers and PCB fabrication equipment",
      "Oscilloscopes, logic analyzers, spectrum analyzers",
      "Edge computing nodes (NVIDIA Jetson, Google Coral)",
    ],
    technologies: [
      "FreeRTOS",
      "Zephyr",
      "Arduino IDE",
      "PlatformIO",
      "MQTT",
      "CoAP",
      "LoRaWAN",
      "Matter/Thread",
      "AWS IoT",
      "Azure IoT",
      "Google Cloud IoT",
      "TensorFlow Lite",
      "Edge Impulse",
      "OpenCV",
    ],
    researchAreas: [
      "Wireless Sensor Networks",
      "Edge AI & TinyML",
      "Smart Cities & Infrastructure",
      "Industrial IoT (IIoT)",
      "Wearable Technology",
      "Energy Harvesting & Low-Power Design",
    ],
    capacity: "35 students",
    inCharge: "Dr. Sneha Reddy",
    location: "Block A, Ground Floor, Room 102",
  },
  {
    name: "High Performance Computing & Cloud Lab",
    shortName: "HPC/Cloud Lab",
    description:
      "Advanced computing facility for parallel programming, distributed systems, cloud computing, big data analytics, and scientific computing.",
    image: "/images/labs/hpc-lab.jpg",
    equipment: [
      "HPC Cluster (64 nodes, 2048 cores, 16TB RAM)",
      "GPU Compute Nodes (A100, V100, T4)",
      "High-speed interconnect (InfiniBand HDR)",
      "Parallel file system (Lustre, Ceph)",
      "Cloud orchestration platforms (OpenStack, Kubernetes)",
      "Data analytics workstations",
    ],
    technologies: [
      "MPI",
      "OpenMP",
      "CUDA",
      "OpenCL",
      "Kubernetes",
      "Docker",
      "Apache Spark",
      "Hadoop",
      "Slurm",
      "Kubeflow",
      "MLflow",
      "Dask",
      "Prometheus",
      "Grafana",
      "ELK Stack",
    ],
    researchAreas: [
      "Parallel & Distributed Algorithms",
      "Cloud-Native Applications",
      "Big Data Analytics",
      "Scientific Computing",
      "Green Computing & Energy Efficiency",
      "Serverless & Edge Computing",
    ],
    capacity: "25 students",
    inCharge: "Dr. Vikram Singh",
    location: "Block C, 1st Floor, Room 110",
  },
  {
    name: "Software Engineering & DevOps Lab",
    shortName: "SE/DevOps Lab",
    description:
      "Modern software development facility focusing on agile methodologies, CI/CD pipelines, microservices architecture, and collaborative development practices.",
    image: "/images/labs/se-lab.jpg",
    equipment: [
      "Collaborative development workstations (40x)",
      "CI/CD pipeline servers (GitLab, Jenkins, GitHub Actions)",
      "Container registry and artifact repositories",
      "Automated testing infrastructure (Selenium, Cypress, Playwright)",
      "Code quality and security scanning tools",
      "Agile planning and collaboration spaces",
    ],
    technologies: [
      "Git",
      "GitHub/GitLab/Bitbucket",
      "Jenkins",
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Helm",
      "ArgoCD",
      "SonarQube",
      "OWASP ZAP",
      "Snyk",
      "Dependabot",
      "Jira",
      "Confluence",
      "Slack",
      "Miro",
    ],
    researchAreas: [
      "Software Architecture & Design Patterns",
      "DevOps & Continuous Delivery",
      "Microservices & Service Mesh",
      "Software Testing & Quality Assurance",
      "Requirements Engineering",
      "Technical Debt & Refactoring",
    ],
    capacity: "50 students",
    inCharge: "Prof. Anjali Gupta",
    location: "Block A, 2nd Floor, Room 210",
  },
  {
    name: "Data Science & Analytics Lab",
    shortName: "Data Lab",
    description:
      "Specialized facility for data science, business intelligence, statistical analysis, data visualization, and predictive modeling.",
    image: "/images/labs/data-lab.jpg",
    equipment: [
      "High-memory analytics workstations (30x)",
      "Interactive visualization displays",
      "Statistical computing servers (R, Python, SAS)",
      "Data labeling and annotation stations",
      "Real-time streaming data platforms",
      "Collaborative analytics workspaces",
    ],
    technologies: [
      "Python",
      "R",
      "Julia",
      "SQL",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "XGBoost",
      "Tableau",
      "Power BI",
      "Apache Superset",
      "Plotly",
      "Apache Kafka",
      "Apache Flink",
      "dbt",
      "Airflow",
    ],
    researchAreas: [
      "Predictive Analytics & Forecasting",
      "Statistical Modeling & Inference",
      "Data Visualization & Storytelling",
      "Time Series Analysis",
      "Causal Inference",
      "Automated Machine Learning (AutoML)",
    ],
    capacity: "40 students",
    inCharge: "Dr. Rahul Mehta",
    location: "Block B, 3rd Floor, Room 315",
  },
]

const labIcons: Record<string, any> = {
  "AI/ML Lab": Cpu,
  "Cyber Lab": Shield,
  "IoT Lab": Wifi,
  "HPC/Cloud Lab": Database,
  "SE/DevOps Lab": Code,
  "Data Lab": Monitor,
}

export default function LaboratoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="section-padding hero-gradient">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Badge variant="secondary" className="text-sm px-3 py-1">
                <FlaskConical className="h-3 w-3 mr-1" />
                Our Laboratories
              </Badge>
            </MotionDiv>

            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              State-of-the-Art Laboratories
            </MotionH1>

            <MotionP
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              12+ advanced laboratories equipped with cutting-edge technology
              for hands-on learning and research.
            </MotionP>
          </div>
        </div>
      </section>

      {/* Laboratories */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="space-y-8">
            {laboratories.map((lab, index) => (
              <MotionDiv
                key={lab.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-accent flex items-center justify-center">
                      {(() => {
                        const Icon = labIcons[lab.shortName] || FlaskConical
                        return <Icon className="h-24 w-24 text-primary/50" />
                      })()}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <Badge variant="secondary" className="text-sm">
                        {lab.shortName}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-0">
                    <CardTitle className="text-2xl">
                      {lab.name}
                    </CardTitle>

                    <p className="text-muted-foreground mt-2">
                      {lab.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <Accordion
                      type="multiple"
                      className="w-full space-y-4"
                    >
                      <AccordionItem value={`${lab.shortName}-equipment`}>
                        <AccordionTrigger className="flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          Equipment & Infrastructure
                        </AccordionTrigger>

                        <AccordionContent className="pt-2">
                          <div className="grid sm:grid-cols-2 gap-2">
                            {lab.equipment.map((item) => (
                              <Badge
                                key={item}
                                variant="outline"
                                className="text-sm h-auto py-1.5 flex items-center gap-1"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value={`${lab.shortName}-technologies`}>
                        <AccordionTrigger className="flex items-center gap-2">
                          <Code className="h-4 w-4" />
                          Technologies & Tools
                        </AccordionTrigger>

                        <AccordionContent className="pt-2">
                          <div className="flex flex-wrap gap-2">
                            {lab.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-sm"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value={`${lab.shortName}-research`}>
                        <AccordionTrigger className="flex items-center gap-2">
                          <FlaskConical className="h-4 w-4" />
                          Research Focus Areas
                        </AccordionTrigger>

                        <AccordionContent className="pt-2">
                          <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                            {lab.researchAreas.map((area) => (
                              <li key={area}>{area}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>Capacity: {lab.capacity}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Monitor className="h-4 w-4" />
                        <span>In-charge: {lab.inCharge}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{lab.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-heading mb-4">
              Laboratory Access & Resources
            </h2>

            <p className="section-subheading mx-auto">
              Supporting hands-on learning and cutting-edge research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: GraduationCap,
                title: "Student Access",
                description:
                  "All labs accessible during scheduled lab hours and for project work with faculty approval",
              },
              {
                icon: Clock,
                title: "Extended Hours",
                description:
                  "Selected labs open 24/7 for research scholars and final-year project students",
              },
              {
                icon: Globe,
                title: "Remote Access",
                description:
                  "VPN and cloud-based access to HPC, cloud, and development environments",
              },
              {
                icon: Award,
                title: "Certifications",
                description:
                  "Industry certification programs (AWS, Azure, NVIDIA, Cisco) offered through labs",
              },
              {
                icon: Users,
                title: "Industry Projects",
                description:
                  "Sponsored labs and joint research projects with leading technology companies",
              },
              {
                icon: BookOpen,
                title: "Workshops & Training",
                description:
                  "Regular hands-on workshops, hackathons, and skill-building sessions",
              },
            ].map((item, index) => (
              <MotionDiv
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass-card rounded-xl text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-heading font-semibold mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading mb-4">
              Explore Our Research
            </h2>

            <p className="section-subheading mx-auto mb-8 text-primary-foreground/80">
              Discover ongoing research projects, publications, and
              collaboration opportunities.
            </p>

            <Button size="xl" variant="secondary" asChild>
              <a href="/achievements">
                View Research Achievements
              </a>
            </Button>
          </MotionDiv>
        </div>
      </section>
    </div>
  )
}