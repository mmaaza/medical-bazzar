import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[250px] md:min-h-[350px] overflow-hidden">
      {/* Background Image - Full width and height */}
      <img
        src="https://placehold.co/1920x1080?text=Medical+Supplies"
        alt="Medical Supplies"
        className="w-full h-full object-cover absolute inset-0"
      />
      
      {/* Gradient Overlay - Using design system's gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"
      />
    </section>
  );
};

export default Hero;