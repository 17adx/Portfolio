import React from 'react';
import { Cpu, Globe, Code2, Zap, GraduationCap } from 'lucide-react';
import Container from '../UI/Container';
import Avatar from '../../assets/me.png';

const About = () => {
  const stats = [
    { icon: GraduationCap, label: "B.Eng", value: "Electronics" },
    { icon: Code2, label: "Full Stack", value: "Developer" },
    { icon: Globe, label: "Web", value: "Architecture" },
  ];

  const floatingIcons = [
    { Icon: Code2, delay: '0s' },
    { Icon: Cpu, delay: '-2s' },
    { Icon: Globe, delay: '-4s' },
    { Icon: Zap, delay: '-6s' },
  ];

  return (
    <div id="about" className="w-full">
      <section className="relative w-full py-20 bg-[#040907] overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-green-900/10 rounded-full blur-[100px]" />
        </div>

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Avatar & Floating Icons */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-none">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                  
                  {/* Rotating Border Effect */}
                  <div className="
                      absolute inset-0 z-10
                      border-2 border-dashed border-brand/30 rounded-[2rem] 
                      bg-transparent backdrop-blur-sm 
                      transform transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                      rotate-3 
                      group-hover:rotate-0 group-hover:scale-105 
                      group-hover:border-solid group-hover:border-brand
                      group-hover:bg-brand/20 group-hover:shadow-[0_0_40px_rgba(52,211,153,0.2)]
                  "/>

                  {/* Main Image */}
                  <img 
                      src={Avatar} 
                      alt="Anas Memoji" 
                      className="
                          absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-auto 
                          object-contain drop-shadow-2xl z-30
                          transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                          group-hover:scale-110 group-hover:-translate-y-4
                      "
                  />

                  {/* Floating Icons Animation */}
                  <div className="absolute inset-0 z-40 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      {floatingIcons.map(({ Icon, delay }, index) => (
                          <div key={index} className="animate-border-walk" style={{ animationDelay: delay }}>
                              <div className="bg-[#0b1121] p-2 rounded-xl border border-brand/30 shadow-lg md:scale-100 scale-75">
                                 <Icon className="text-brand w-5 h-5" />
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            </div>

            {/* Right: Content & Stats */}
            <div className="flex flex-col gap-6 text-center lg:text-left order-2 lg:order-none z-10">
              <div className="inline-flex items-center gap-2 justify-center lg:justify-start">
                  <span className="w-8 h-[2px] bg-brand" />
                  <span className="text-brand font-code text-sm tracking-widest uppercase">About Me</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold font-heading text-text-primary leading-tight">
                  Not just code, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-500" style={{ 
            WebkitBackgroundClip: 'text', /* ده عشان Safari و Chrome */
            backgroundClip: 'text'        /* ده عشان باقي المتصفحات */
        }}>
                      It's Logic & Engineering.
                  </span>
              </h2>

              <div className="space-y-4 text-text-secondary text-lg leading-relaxed font-body">
                  <p>
                      I’m Anas, an engineer who loves peeling back the layers of technology. 
                      While many stop at the software level, I enjoy diving deeper into how 
                      <span className="text-white font-semibold"> bits flip</span> and <span className="text-white font-semibold"> electrons flow</span>.
                  </p>
                  <p>
                      My journey bridges the gap between high-level <span className="text-brand">Full Stack Development</span> and the precision of <span className="text-brand">Hardware Engineering</span>. I build systems that work seamlessly from the silicon up to the cloud.
                  </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="
                            group relative p-4 rounded-2xl 
                            bg-white/5 border border-white/10 
                            transition-all duration-500 ease-out 
                            hover:bg-brand hover:scale-105 hover:shadow-[0_10px_30px_rgba(52,211,153,0.3)] hover:border-brand
                            text-center lg:text-left
                        "
                    >
                        <stat.icon 
                            className="
                                w-8 h-8 mb-3 mx-auto lg:mx-0 
                                text-brand transition-all duration-300 
                                group-hover:text-[#0b1121] group-hover:scale-110 group-hover:rotate-3
                            " 
                            strokeWidth={1.5}
                        />
                        <h4 className="font-bold text-base text-text-primary transition-colors duration-300 group-hover:text-[#0b1121]">
                            {stat.label}
                        </h4>
                        <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-[#0b1121]/80">
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>

            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;