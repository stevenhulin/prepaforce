export default function HaloBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Orb principale */}
      <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[68rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(127,0,255,0.18),transparent)] blur-2xl animate-halo" />

      {/* Orbe secondaire (droite) */}
      <div className="absolute right-[-10%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(180,120,255,0.14),transparent)] blur-2xl animate-halo-slow" />

      {/* Orbe tertiaire (gauche bas) */}
      <div className="absolute left-[-8%] bottom-[-8%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(110,0,230,0.16),transparent)] blur-2xl animate-halo-rev" />
    </div>
  );
}
