import React from 'react';
import PaperCrumple from './PaperCrumple';

export default function CrumpleSection() {
  return (
    <section id="crumple" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="section-header-bar mb-10 md:mb-16">
          <span className="section-num text-accent">08</span>
          <span className="section-title-label">Interactive</span>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[60vh] mt-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-center text-white relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">
              Crumple It!
            </span>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent rounded-full opacity-50 blur-[2px]"></div>
          </h2>
          
          <p className="text-text-secondary text-sm md:text-base text-center max-w-xl mx-auto mb-16">
            Hold and drag the image to crumple the paper. Release to restore it. This is a WebGL physics demo!
          </p>

          <div className="relative w-full flex justify-center pb-12 z-20 w-full max-w-[600px] mx-auto">
            <PaperCrumple
              src="/handwritten-note2.png"
              alt="A print to crumple"
              width={550}
              height={550}
              sceneHeight={650}
              releaseBehavior="restore"
              crumpleAmount={0.85}
              crumpleDuration={0.55}
              releaseDuration={0.4}
              foldCount={6}
              foldSharpness={0.6}
              wrinkleDepth={0.65}
              creaseStrength={0.18}
              paperColor="#f4f0e8"
              paperTexture={0.08}
              draggable
              returnToOrigin
              imageFit="contain"
              roughness={0.92}
              lightIntensity={1.8}
              lightAngle={-35}
              shadow
              shadowOpacity={0.16}
              dragRotation={10}
              dragRadius={180}
              rotation={0}
              seed={7}
              detail={64}
              disabled={false}
            />
          </div>
        </div>
      </div>
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent opacity-[0.03] rounded-full blur-[100px] pointer-events-none z-0"></div>
    </section>
  );
}
