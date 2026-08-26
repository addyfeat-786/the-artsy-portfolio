'use client';

export default function HeroSculpture() {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
