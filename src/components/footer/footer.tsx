import Link from "next/link"
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube } from "lucide-react"
import { NAV_ITEMS } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quickLinks: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/academics", label: "Academics" },
      { href: "/events", label: "Events" },
      { href: "/announcements", label: "Announcements" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" },
    ],
    resources: [
      { href: "/academics", label: "Curriculum" },
      { href: "/faculty", label: "Faculty" },
      { href: "/laboratories", label: "Laboratories" },
      { href: "/achievements", label: "Achievements" },
    ],
    contact: [
      { icon: Mail, text: "info@ionitix.edu", href: "mailto:info@ionitix.edu" },
      { icon: Phone, text: "+91 XXXX XXXXXX", href: "tel:+91XXXXXXXXXX" },
      { icon: MapPin, text: "Department of CSE, University Campus", href: "#" },
    ],
    social: [
      { icon: Github, href: "https://github.com/ionitix", label: "GitHub" },
      { icon: Twitter, href: "https://twitter.com/ionitix", label: "Twitter" },
      { icon: Linkedin, href: "https://linkedin.com/school/ionitix", label: "LinkedIn" },
      { icon: Youtube, href: "https://youtube.com/@ionitix", label: "YouTube" },
    ],
  }

  return (
    <footer className="bg-secondary/50 border-t border-[hsl(276_30%_20%_/_0.3)]">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-heading font-bold text-foreground mb-4">
              <span className="gradient-text">IONITIX</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Department of Computer Science & Engineering. Innovating, building, and shaping the future of technology through excellence in education and research.
            </p>
            <div className="flex gap-4 mt-6">
              {footerLinks.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address aria-label="Contact information">
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className="mt-12 pt-8 border-t border-[hsl(276_30%_20%_/_0.3)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} IONITIX. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}