export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#5C4E4E]/30 py-12 px-4 md:px-8 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-playfair text-2xl font-bold text-[#D1D0D0] mb-2">Budaya Nusantara</h2>
          <p className="font-sans text-[#988686] text-sm">Menembus batas waktu, menjelajahi warisan abadi.</p>
        </div>

        <div className="flex items-center gap-6 text-[#988686] text-sm font-sans">
          <a href="#" className="hover:text-[#D1D0D0] transition-colors">Tentang Kami</a>
          <a href="#" className="hover:text-[#D1D0D0] transition-colors">Kontak</a>
          <a href="#" className="hover:text-[#D1D0D0] transition-colors">Kebijakan Privasi</a>
        </div>

        <div className="flex items-center gap-4 text-[#D1D0D0]">
          {/* Simple Social Icons */}
          <a href="#" className="p-2 bg-[#5C4E4E]/20 border border-[#988686]/30 rounded-full hover:border-[#D1D0D0]/50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="#" className="p-2 bg-[#5C4E4E]/20 border border-[#988686]/30 rounded-full hover:border-[#D1D0D0]/50 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>

      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#5C4E4E]/30 text-center text-[#988686] text-xs font-sans">
        &copy; {new Date().getFullYear()} Budaya Nusantara. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
