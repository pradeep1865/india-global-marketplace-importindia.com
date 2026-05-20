export function EmitrixLogo() {
  return (
    <span className="flex items-center gap-2" aria-label="Emitrix home">
      <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-[#071832] shadow-lg shadow-blue-900/20">
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,159,28,0.95),rgba(42,213,255,0.85)_48%,rgba(11,31,77,0.95))]" />
        <span className="absolute inset-[3px] rounded-[14px] bg-[#071832]" />
        <span className="absolute h-7 w-7 rounded-full border-2 border-[#2ad5ff]" />
        <span className="absolute h-5 w-5 rotate-45 rounded-md border-2 border-[#ff9f1c]" />
        <span className="relative text-sm font-black text-white">E</span>
      </span>
      <span className="hidden leading-none sm:block">
        <span className="block text-xl font-black text-[#0b1f4d]">Emitrix</span>
        <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Global Trade Grid</span>
      </span>
    </span>
  );
}
