import React, { useEffect, useState, useRef } from 'react';
import { Download, User, FolderGit2, Mail, Terminal, Wrench } from 'lucide-react';
import Logo from '../UI/Logo';
import Container from '../UI/Container';
import { TubelightNavbar } from '../UI/TubelightNavbar';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("Anas");
    const isAutoScrolling = useRef(false);

    // Navigation Items Configuration
    const navItems = [
        { name: "Anas", url: "#", icon: Terminal }, 
        { type: 'separator' }, 
        { name: "About", url: "#about", icon: User },
        { name: "Projects", url: "#projects", icon: FolderGit2 }, 
        { name: "Skills", url: "#skills", icon: Wrench },         
        { name: "Contact", url: "#contact", icon: Mail },
        { type: 'separator' },
        { name: "Resume", url: "/Anas_Resume.pdf", icon: Download }, 
    ];

    // Main Scroll Handler
    const handleScrollTo = (e, url) => {
        if (!url.startsWith('#')) return;
        e.preventDefault();
        
        const targetId = url.replace('#', '');
        const element = targetId === '' ? document.body : document.getElementById(targetId);

        if (element) {
            isAutoScrolling.current = true; 

            const sectionName = navItems.find(item => item.url === url)?.name;
            if(sectionName) setActiveSection(sectionName);

            // Use Lenis if available, otherwise fallback to native smooth scroll
            if (window.lenis) {
                window.lenis.scrollTo(element, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    onComplete: () => { isAutoScrolling.current = false; }
                });
            } else {
                element.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isAutoScrolling.current = false; }, 1000);
            }
        }
    };

    // Scroll Spy & Navbar Appearance Logic
    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);

            if (isAutoScrolling.current) return;

            // Force "Anas" active when at the top
            if (window.scrollY < 50) {
                setActiveSection("Anas");
                return;
            }

            // Force "Contact" active when at the bottom
            if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 50) {
                setActiveSection("Contact");
                return;
            }

            const sections = [
                { id: 'about', name: 'About' },
                { id: 'projects', name: 'Projects' }, 
                { id: 'skills', name: 'Skills' },     
                { id: 'contact', name: 'Contact' }
            ];

            const scrollPosition = window.scrollY + 300; 

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.name);
                    }
                } 
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const transitionClass = "transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]";

    return (
        <>
            <nav 
                className={`
                    fixed w-full top-0 z-50 border-b ${transitionClass}
                    ${!isScrolled 
                        ? "opacity-100 translate-y-0 bg-transparent border-transparent py-6 delay-0 pointer-events-auto" 
                        : "opacity-0 -translate-y-10 bg-transparent border-transparent py-4 pointer-events-none"
                    }
                `}
            >
                <Container>
                    <div className='flex justify-between items-center'>
                        <Logo />
                        
                        {/* Desktop Navigation Links */}
                        <div className='hidden md:flex justify-between items-center'>
                            <ul className='flex justify-between items-center gap-8'>
                                {['About', 'Projects', 'Skills', 'Contact'].map((item) => {
                                    const url = `#${item.toLowerCase()}`; 
                                    return (
                                        <li key={item}>
                                            <a 
                                                href={url}
                                                onClick={(e) => handleScrollTo(e, url)}
                                                className={`text-sm font-medium transition-colors cursor-pointer ${
                                                    activeSection === item ? "text-brand" : "text-text-secondary hover:text-brand"
                                                }`}
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Resume Button */}
                        <div>
                            <a 
                                href="/Anas_Resume.pdf" 
                                download="Anas_Resume.pdf" 
                                className="px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-text-primary hover:bg-brand/10 hover:border-brand hover:text-brand transition-all flex items-center gap-2 font-medium text-sm"
                            >
                                My Resume <Download size={16} />
                            </a>
                        </div>
                    </div>
                </Container>
            </nav>

            {/* Floating Navbar (Tubelight) */}
            {isMounted && (
                <TubelightNavbar 
                    items={navItems} 
                    onItemClick={handleScrollTo}
                    activeTab={activeSection}
                    className={`
                        ${transitionClass}
                        fixed left-1/2 -translate-x-1/2 bottom-auto z-50
                        ${isScrolled 
                            ? "top-4 opacity-100 pointer-events-auto delay-100" 
                            : "top-[-100px] opacity-0 pointer-events-none"
                        }
                    `}
                />
            )}
        </>
    );
}

export default Navbar;