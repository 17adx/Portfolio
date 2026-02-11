import React from 'react';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import Container from '../UI/Container';
import Logo from '../UI/Logo'; 

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:contact@anas.com", label: "Email" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer id='contact' className="relative bg-[#0b1121] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Background Ambient Effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand/5 via-[#0b1121] to-[#0b1121] opacity-50" />
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10">
        
        {/* --- 1. Main CTA Section --- */}
        <div className="flex flex-col items-center text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold font-heading text-text-primary mb-6 tracking-tight">
                Ready to engineer <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-400">
                    something great?
                </span>
            </h2>
            
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                Whether it's a complex embedded system or a scalable web app, 
                let's discuss how we can build it together.
            </p>

            <a 
                href="mailto:contact@anas.com" 
                className="
                    group relative inline-flex items-center gap-3 
                    px-8 py-4 text-lg font-bold text-[#0b1121] 
                    bg-brand rounded-full overflow-hidden
                    transition-all duration-300 
                    hover:scale-105 hover:bg-brand/90 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)]
                "
            >
                {/* Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] transition-all duration-1000 group-hover:animate-shine" />
                
                <span className="relative">Start a Project</span>
                <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* --- 2. Bottom Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
            {/* Logo */}
            <div className="hover:opacity-80 transition-opacity cursor-pointer">
                <Logo />
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
                {socialLinks.map((item, index) => (
                    <a 
                        key={index}
                        href={item.href} 
                        aria-label={item.label}
                        className="
                            group relative w-12 h-12 rounded-full 
                            bg-white/5 border border-white/5
                            flex items-center justify-center 
                            text-text-secondary 
                            transition-all duration-300 
                            hover:bg-brand hover:text-[#0b1121] hover:scale-110 hover:-translate-y-1 hover:border-brand
                        "
                    >
                        <item.icon size={20} strokeWidth={1.5} />
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <p className="text-text-secondary/60 text-sm font-code">
                © {new Date().getFullYear()} Anas Engineering.
            </p>

        </div>
      </Container>

      {/* Tailwind Animation Config required in tailwind.config.js for 'animate-shine' to work perfectly, 
          but the button will still look good without it. */}
      <style>{`
        @keyframes shine {
            0% { left: -100%; }
            100% { left: 200%; }
        }
        .animate-shine {
            animation: shine 1.5s infinite linear;
        }
      `}</style>
    </footer>
  )
}

export default Footer;