'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Indonesia from '@react-map/indonesia';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, NavbarButton, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Peta Budaya", link: "#map-section" },
  { name: "Artikel", link: "#cards-section" },
];

const FRAME_COUNT = 240;
const currentFrame = (index: number) => `/frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

const provinceRegionMap: Record<string, string> = {
  'Aceh': 'gayo', 'Sumatera Utara': 'gayo', 'Sumatera Barat': 'gayo', 'Riau': 'gayo', 'Kepulauan Riau': 'gayo', 'Jambi': 'gayo', 'Bengkulu': 'gayo', 'Sumatera Selatan': 'gayo', 'Bangka Belitung': 'gayo', 'Lampung': 'gayo',
  'Banten': 'jawa', 'Jakarta Raya': 'jawa', 'Jawa Barat': 'jawa', 'Jawa Tengah': 'jawa', 'Yogyakarta': 'jawa', 'Jawa Timur': 'jawa',
  'Kalimantan Barat': 'dayak', 'Kalimantan Tengah': 'dayak', 'Kalimantan Selatan': 'dayak', 'Kalimantan Timur': 'dayak', 'Kalimantan Utara': 'dayak',
  'Bali': 'sumba', 'Nusa Tenggara Barat': 'sumba', 'Nusa Tenggara Timur': 'sumba',
  'Sulawesi Utara': 'sulawesi', 'Gorontalo': 'sulawesi', 'Sulawesi Tengah': 'sulawesi', 'Sulawesi Barat': 'sulawesi', 'Sulawesi Selatan': 'sulawesi', 'Sulawesi Tenggara': 'sulawesi',
  'Maluku': 'banda', 'Maluku Utara': 'banda', 'Papua Barat': 'baliem', 'Papua': 'baliem',
};
const nonIndonesian = ['Sabah', 'Sarawak', 'Brunei Darussalam', 'Timor-Leste'];

const cultures = [
  { id: "gayo", title: "Gayo, Aceh", desc: "Sejuknya kabut tanah Gayo, pesona Tari Saman, dan aroma kopi yang mendunia.", yt: "https://www.youtube.com/embed/qnBvXXIhMGMo", top: "25%", left: "15%", image: "/assets/images/MasjidAceh.jpg" },
  { id: "dayak", title: "Dayak Kenyah", desc: "Kedalaman magis hutan Kalimantan, ukiran khas, dan kearifan lokal menjaga alam.", yt: "https://www.youtube.com/embed/IzOo7XdbqFU", top: "45%", left: "40%", image: "/assets/images/Kaltim.jpg" },
  { id: "sumba", title: "Sumba, NTT", desc: "Hamparan sabana liar, kuda Sandalwood, dan tenun ikat Marapu yang melegenda.", yt: "https://www.youtube.com/embed/QsMZhytMebE", top: "70%", left: "55%", image: "/assets/images/Sumba.jpg" },
  { id: "banda", title: "Banda Neira", desc: "Pusaran sejarah rempah dunia, benteng kuno peninggalan Eropa, dan keindahan laut.", yt: "https://www.youtube.com/embed/ciEIKY9zOoA", top: "55%", left: "75%", image: "/assets/images/Banda.jpg" },
  { id: "baliem", title: "Lembah Baliem", desc: "Keheningan lembah eksotis, tradisi bakar batu, dan pesona magis Suku Dani.", yt: "https://www.youtube.com/embed/PaEhtx1jlV0", top: "65%", left: "90%", image: "/assets/images/Papua.jpg" }
];

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setImagesLoaded(true);
        if (i === 1 && canvasRef.current) drawFrame(0);
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  const drawFrame = (frameIndex: number) => {
    if (!canvasRef.current || !imagesRef.current[frameIndex]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = imagesRef.current[frameIndex];
    if (!img.complete) return;

    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const [activeSection, setActiveSection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
    requestAnimationFrame(() => drawFrame(frameIndex));

    if (latest < 0.15) setActiveSection(1);
    else if (latest >= 0.18 && latest < 0.35) setActiveSection(2);
    else if (latest >= 0.38 && latest < 0.55) setActiveSection(3);
    else if (latest >= 0.58 && latest < 0.75) setActiveSection(4);
    else if (latest >= 0.78) setActiveSection(5);
    else setActiveSection(0); // Gap
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollYProgress.get() * FRAME_COUNT));
        drawFrame(frameIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollYProgress]);

  // Unused: const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getCityColors = () => {
    const colors: Record<string, string> = {};
    Object.keys(provinceRegionMap).forEach((province) => {
      const regionId = provinceRegionMap[province];
      colors[province] = hoveredRegion === regionId ? '#FFFFE0' : '#44541c';
    });
    nonIndonesian.forEach(t => colors[t] = '#1f1d10');
    return colors;
  };

  const handleProvinceHover = (province: string | null) => {
    if (!province || nonIndonesian.includes(province)) setHoveredRegion(null);
    else setHoveredRegion(provinceRegionMap[province] || null);
  };

  const activeCulture = cultures.find(c => c.id === hoveredRegion);

  return (
    <div className="bg-[#000000] min-h-screen relative selection:bg-[#44541c]/30 selection:text-[#000000] scroll-smooth">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" onClick={() => router.push('/budaya/gayo')}>
              Mulai Jelajah
            </NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen}>
            {navItems.map((item, idx) => (
              <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-[#D1D0D0] text-lg font-medium">
                {item.name}
              </a>
            ))}
            <NavbarButton variant="primary" className="w-full mt-4" onClick={() => { router.push('/budaya/gayo'); setIsMobileMenuOpen(false); }}>
              Mulai Jelajah
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]">
          <div className="text-[#FFFFE0] font-playfair text-2xl animate-pulse">Memuat Perjalanan...</div>
        </div>
      )}

      <div ref={containerRef} className="h-[500vh] relative w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#000000] via-transparent to-[#000000] pointer-events-none" />

          {/* HTML Text Overlays controlled by State to guarantee NO overlap */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            {activeSection === 1 && (
              <div className="flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-700">
                <h1 className="font-playfair text-6xl md:text-8xl font-bold text-[#D1D0D0] drop-shadow-2xl mb-6">Pesona Nusantara.</h1>
                <p className="font-sans text-xl md:text-2xl text-[#988686] font-light drop-shadow-lg">Menembus batas waktu, menjelajahi warisan abadi.</p>
              </div>
            )}
            {activeSection === 2 && (
              <div className="flex flex-col justify-center px-8 md:px-32 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-10 duration-700">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#D1D0D0] mb-6 drop-shadow-2xl">Akar Tradisi.</h2>
                <p className="font-sans text-lg md:text-xl text-[#988686] leading-relaxed font-light drop-shadow-lg max-w-2xl">Dari sejuknya kabut tanah Gayo hingga kedalaman magis hutan Kalimantan. Sebuah harmoni antara manusia dan alam.</p>
              </div>
            )}
            {activeSection === 3 && (
              <div className="flex flex-col justify-center items-end text-right px-8 md:px-32 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-10 duration-700">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#D1D0D0] mb-6 drop-shadow-2xl">Jejak Rempah Dunia.</h2>
                <p className="font-sans text-lg md:text-xl text-[#988686] leading-relaxed font-light drop-shadow-lg max-w-2xl">Pusaran sejarah di kepulauan Maluku. Keindahan laut Banda yang menyimpan ribuan cerita dari masa lampau.</p>
              </div>
            )}
            {activeSection === 4 && (
              <div className="flex flex-col justify-center px-8 md:px-32 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-10 duration-700">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#D1D0D0] mb-6 drop-shadow-2xl">Leluhur yang Bernapas.</h2>
                <p className="font-sans text-lg md:text-xl text-[#988686] leading-relaxed font-light drop-shadow-lg max-w-2xl">Keheningan Lembah Baliem dan hamparan sabana liar Sumba. Warisan yang tak lekang oleh pusaran zaman.</p>
              </div>
            )}
            {activeSection === 5 && (
              <div className="flex flex-col items-center text-center px-4 animate-in fade-in zoom-in duration-700">
                <h2 className="font-playfair text-5xl md:text-7xl font-bold text-[#D1D0D0] drop-shadow-2xl mb-6">Tanah Air Mahakarya Kita.</h2>
                <p className="font-sans text-xl md:text-2xl text-[#988686] font-light mb-8 mx-auto drop-shadow-lg">Saksikan keberagaman dari Sabang hingga Merauke di bawah ini.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <section id="map-section" className="w-full min-h-screen bg-[#000000] relative z-30 pt-32 pb-20 px-4 md:px-8 border-t border-[#5C4E4E]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#D1D0D0] mb-4">Peta Persebaran Budaya</h2>
            <p className="text-[#988686] font-sans text-lg max-w-2xl mx-auto">Jelajahi keragaman warisan bangsa dari Sabang hingga Merauke.</p>
          </div>

          {/* Scrollable Container for Mobile Map */}
          <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
            <div className="relative min-w-[800px] md:min-w-full aspect-[2/1] bg-[#5C4E4E]/20 rounded-xl overflow-hidden shadow-2xl border border-[#5C4E4E]/50 flex items-center justify-center p-2 mx-auto">
              {/* Indonesia Map */}
              <div className="w-full max-w-5xl cursor-pointer z-20 relative"
                onMouseLeave={() => setHoveredRegion(null)}
                onMouseOver={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.tagName.toLowerCase() === 'path' && target.id) {
                    handleProvinceHover(target.id.split('-')[0]);
                  }
                }}
              >
                <Indonesia type="select-single" size={1100} mapColor="#5C4E4E" strokeColor="#000000" strokeWidth={1} hoverColor="#D1D0D0" cityColors={getCityColors()} onSelect={(p) => p && !nonIndonesian.includes(p) && router.push(`/budaya/${provinceRegionMap[p]}`)} disableHover={true} />

                {/* SVG overlay for island name labels — positioned over the map */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-30"
                  viewBox="0 0 1100 550"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sumatera */}
                  <text x="135" y="220" textAnchor="middle" fill="#D1D0D0" fontSize="14" fontFamily="serif" fontWeight="bold" opacity="0.9" style={{ textShadow: '0 1px 4px #000' }}>Sumatera</text>
                  {/* Jawa */}
                  <text x="420" y="370" textAnchor="middle" fill="#D1D0D0" fontSize="13" fontFamily="serif" fontWeight="bold" opacity="0.9">Jawa</text>
                  {/* Kalimantan */}
                  <text x="490" y="220" textAnchor="middle" fill="#D1D0D0" fontSize="14" fontFamily="serif" fontWeight="bold" opacity="0.9">Kalimantan</text>
                  {/* Sulawesi */}
                  <text x="665" y="240" textAnchor="middle" fill="#D1D0D0" fontSize="13" fontFamily="serif" fontWeight="bold" opacity="0.9">Sulawesi</text>
                  {/* Bali & NTT */}
                  <text x="560" y="390" textAnchor="middle" fill="#D1D0D0" fontSize="11" fontFamily="serif" fontWeight="bold" opacity="0.9">Bali &amp; NTT</text>
                  {/* Maluku */}
                  <text x="790" y="270" textAnchor="middle" fill="#D1D0D0" fontSize="12" fontFamily="serif" fontWeight="bold" opacity="0.9">Maluku</text>
                  {/* Papua */}
                  <text x="960" y="250" textAnchor="middle" fill="#D1D0D0" fontSize="14" fontFamily="serif" fontWeight="bold" opacity="0.9">Papua</text>
                </svg>
              </div>

              {/* Hover tooltip */}
              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#000000]/90 backdrop-blur-md border border-[#988686]/30 px-8 py-4 rounded-xl shadow-2xl pointer-events-none transition-all duration-500 z-40 ${activeCulture ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                {activeCulture && (
                  <div className="text-center">
                    <h3 className="font-playfair text-[#D1D0D0] text-2xl tracking-wide">{activeCulture.title}</h3>
                    <p className="font-sans text-[#988686] text-sm mt-1">{activeCulture.desc}</p>
                    <p className="font-sans text-[#988686]/60 text-xs mt-2 uppercase tracking-widest">Klik untuk membaca sejarah</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#5C4E4E]" />
              <span className="text-[#988686] text-xs font-sans uppercase tracking-wider">Wilayah Budaya</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-[#D1D0D0]" />
              <span className="text-[#988686] text-xs font-sans uppercase tracking-wider">Wilayah Aktif</span>
            </div>
          </div>

        </div>
      </section>

      {/* CARDS SECTION (Redesigned to Light Theme Grid from Screenshot) */}
      <section id="cards-section" className="w-full bg-[#D1D0D0] text-[#000000] relative z-30 py-32 px-4 md:px-8">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Melestarikan Kekayaan<br /> Budaya Kepulauan Nusantara</h2>
            <p className="font-sans text-sm md:text-base text-[#5C4E4E] max-w-2xl mx-auto mt-6">
              Mulailah perjalanan yang telah dikurasi melalui warisan yang kaya, tekstil kuno, dan tradisi mendalam Indonesia. Temukan kisah-kisah yang terjalin dalam setiap aspek budaya kita.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Row: 2 Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
              {cultures.slice(0, 2).map((culture) => (
                <div key={culture.id} onClick={() => router.push(`/budaya/${culture.id}`)} className="group cursor-pointer relative overflow-hidden bg-[#988686]">
                  <img src={culture.image} alt={culture.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <h3 className="absolute bottom-6 left-8 font-playfair text-3xl text-[#D1D0D0] font-bold">{culture.title.split(',')[0]}</h3>
                  <div className="absolute bottom-6 right-8 text-[#D1D0D0] font-sans text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex items-center gap-2">
                    Jelajahi <span className="text-lg">→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row: 3 Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[350px]">
              {cultures.slice(2, 5).map((culture) => (
                <div key={culture.id} onClick={() => router.push(`/budaya/${culture.id}`)} className="group cursor-pointer relative overflow-hidden bg-[#988686]">
                  <img src={culture.image} alt={culture.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <h3 className="absolute bottom-6 left-8 font-playfair text-2xl text-[#D1D0D0] font-bold">{culture.title.split(',')[0]}</h3>
                  <div className="absolute bottom-6 right-8 text-[#D1D0D0] font-sans text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 flex items-center gap-2">
                    Jelajahi <span className="text-lg">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Footer />

    </div>
  );
}
