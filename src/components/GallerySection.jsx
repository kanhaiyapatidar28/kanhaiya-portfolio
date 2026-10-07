import React from 'react';
import CircularGallery from './CircularGallery';

export default function GallerySection() {
  const items = [
    { image: '/prayatn 3.0', text: '' },
    { image: '/Medicaps.jfif', text: '' },
    { image: '/clg.jfif', text: '', fit: 'contain' },
    { image: '/1774344851274.jfif', text: '' },
    { image: '/1775208874297.jfif', text: '' },
    { image: '/1775208874398.jfif', text: '' },
    { image: '/1775208882796.jfif', text: '' },
    { image: '/1779795105618.jfif', text: '' },
    { image: '/1779795105900.jfif', text: '' },
    { image: '/1779860213140.jfif', text: '' },
    { image: '/1779860214009.jfif', text: '' },
    { image: '/1780041589370.jfif', text: '' },
    { image: '/1780041592227.jfif', text: '' },
    { image: '/1780123393290.jfif', text: '' },
    { image: '/1790530894154.jfif', text: '' }
  ];

  return (
    <section id="gallery" className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white opacity-80 mix-blend-difference">
          MEMORIES
        </h2>
        <p className="text-right text-sm tracking-widest uppercase text-accent font-bold">
          Scroll/Drag to Explore
        </p>
      </div>
      <CircularGallery items={items} bend={3} textColor="#ffffff" borderRadius={0.05} />
    </section>
  );
}
