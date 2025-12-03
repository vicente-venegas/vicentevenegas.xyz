import { ExternalLink } from "lucide-react";

import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

const skills = [
  "UX/UI",
  "Service Design",
  "Brand Identity",
  "Front-End Development",
  "Creative Coding",
  "Digital Fabrication",
  "User Research",
  "Prototyping",
];

const socialLinks = [
  { label: "Resume",
    href: "/files/Vicente_Venegas_Resume.pdf",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vicentevenegas/",
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    label: "GitHub",
    href: "https://github.com/leddd",
    rel: "noopener noreferrer",
    target: "_blank",
  },
];

export default function AboutSection() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <section className="min-h-[80vh] px-6 md:px-12 lg:px-[220px] pb-20 grid-overlay">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Text */}
            <div>
              <div
                className="text-[#00CE93] uppercase tracking-wider text-xs md:text-sm mb-4 label-glow"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                About
              </div>
              <h1 className="text-[#EDEDED] mb-6 text-4xl md:text-4xl leading-tight">
                Designer & Creative Technologist
              </h1>
              <div className="space-y-4">
                <p className="vv-body">
                  Designer working across UX/UI, service design, and visual systems, with experience in innovation, branding, and user research. I’ve developed inclusive, evidence based solutions in the public sector and contributed to brand strategy and digital consistency in private and agency contexts. 
                </p>
                <p className="vv-body">
                  My background in engineering and web development allows me to bridge design and implementation, ensuring coherence from concept and prototyping to design QA with developers. Alongside this, I explore design’s experimental edge through creative technology and digital fabrication projects, including interactive installations and unconventional interfaces that merge the digital and physical.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-[#EDEDED] mb-4 text-l">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 border border-[#00CE93]/30 text-[#00CE93] text-xs md:text-sm hover:border-[#00CE93]/60 hover:mint-glow transition-all duration-300"
                      style={{ fontFamily: "Space Mono, monospace" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[#00CE93] hover:text-[#4FFFC5] transition-colors duration-200"
                    style={{ fontFamily: "Space Mono, monospace" }}
                  >
                    <span className="uppercase tracking-wider text-xs md:text-sm">{link.label}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="order-first lg:order-last">
              <div className="aspect-[1] overflow-hidden bg-[#1D3C31] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                <ImageWithFallback
                  src="/images/about/me.jpg"
                  alt="Vicente Venegas"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
