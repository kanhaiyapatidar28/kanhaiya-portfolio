import React from 'react';
import Folder from './Folder';

export default function CertificatesSection() {
  const certificates = [
    '/certificate 2.jfif',
    '/certificate 3.jfif',
    '/certificate 4.jfif',
    '/certificate 5.jfif',
    '/certificate 6.jfif',
    '/certificate 7.jfif',
    '/certificate 8.jfif',
    '/certificate 9.jfif'
  ];

  return (
    <section id="certificates" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="section-header-bar mb-10 md:mb-16">
          <span className="section-num text-accent">04</span>
          <span className="section-title-label">Certifications</span>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[60vh] mt-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-center text-white relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
              My Certifications
            </span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full opacity-50 blur-[2px]"></div>
          </h2>
          
          <p className="text-text-secondary text-sm md:text-base text-center max-w-xl mx-auto mb-[180px] md:mb-[350px]">
            A collection of my professional certifications and achievements. Interact with the folder to view them.
          </p>

          <div className="relative w-full flex justify-center pb-32 transform scale-[0.9] sm:scale-125 md:scale-[2.1] lg:scale-[2.3] z-20">
            <Folder size={1} color="#10b981" items={certificates} />
          </div>
        </div>
      </div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent opacity-[0.03] rounded-full blur-[100px] pointer-events-none z-0"></div>
    </section>
  );
}
