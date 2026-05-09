'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';
import {
  Navbar, NavBody, NavItems, MobileNav,
  NavbarLogo, NavbarButton,
  MobileNavHeader, MobileNavToggle, MobileNavMenu,
} from '@/components/ui/resizable-navbar';

const FRAME_COUNT = 240;
// Dynamic frame helper
const getFramePath = (id: string, index: number) => {
  const folders: Record<string, string> = {
    'gayo': 'aceh',
    'dayak': 'dayak',
    'sumba': 'sumba',
  };
  const folder = folders[id] || 'v2';
  return `/${folder}/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
};

interface Artifact {
  img: string;
  title: string;
  subtitle: string;
}

interface CultureData {
  heroImg?: string;
  heroVideo?: string;
  heroTitle: string;
  heroSubtitle: string;
  contentTitle: string;
  contentText: string;
  contentImg: string;
  artifacts: [Artifact, Artifact, Artifact];
  videoTitle: string;
  ytUrl: string;
}

// ─── Culture Data ──────────────────────────────────────────────────────────────
const cultureDetails: Record<string, CultureData> = {
  gayo: {
    heroVideo: "/assets/videos/Aceh.mp4",
    heroTitle: "Gayo Harmoni Pegunungan",
    heroSubtitle: "Menyelami harmoni di mana kabut pegunungan memeluk erat tradisi leluhur, melahirkan mahakarya ritmis tubuh and simfoni cita rasa yang menyatukan peradaban.",
    contentTitle: "Kanvas Semesta dan Filosofi Ruang",
    contentText: `Tersembunyi di dalam pelukan sabuk pegunungan Bukit Barisan, Dataran Tinggi Gayo bukan sekadar lanskap geografis, melainkan rahim spiritual yang merawat keseimbangan hidup masyarakatnya. Udara dingin yang menyelimuti ketenangan Danau Laut Tawar dan rimbunnya hutan pinus membentuk karakter masyarakat Gayo yang tangguh, adaptif, namun bersahaja.

Filosofi alam ini terejawantahkan secara nyata dalam Kerawang Gayo seni sulam tradisional yang motifnya merupakan abstraksi dari elemen semesta dan tatanan sosial. Alam Gayo mengajarkan hukum keseimbangan yang mutlak: manusia mengambil secukupnya dari bumi, and bumi membalasnya dengan kelimpahan yang tak terhingga. Di sini, alam tidak hanya dihidupi, tetapi juga dihormati sebagai saksi bisu dari sejarah panjang perlawanan dan ketahanan budaya.`,
    contentImg: "/assets/images/gayoaceh1.jpg",
    artifacts: [
      { img: "/assets/images/gayoaceh3.jpg", title: "Ritual Didong Gayo", subtitle: "Seni tutur yang memadukan puisi, nyanyian, dan tepukan tangan kolektif sebagai wujud solidaritas." },
      { img: "/assets/images/gayoaceh2.jpg", title: "Perkebunan Kopi di Awan", subtitle: "Cita rasa kopi Arabika Gayo yang lahir dari ketinggian dan kesejukan alam pegunungan Aceh." },
      { img: "/assets/images/gayoaceh4.jpg", title: "Negeri di Atas Awan", subtitle: "Pemandangan perkebunan dan desa yang diselimuti kabut pagi yang magis di Dataran Tinggi Gayo." }
    ],
    videoTitle: "Menjelajahi Aceh Lebih Dalam",
    ytUrl: "https://www.youtube.com/embed/qnBvXXIhMGM"
  },
  dayak: {
    heroImg: "https://images.unsplash.com/photo-1616801962383-7d7274070a25?auto=format&fit=crop&q=80&w=2000",
    heroVideo: "/assets/videos/Dayak.mp4",
    heroTitle: "Dayak Spirit of Kalimantan",
    heroSubtitle: "Menyelami ritme kuno Borneo. Sebuah suaka bagi keanekaragaman hayati, warisan leluhur, and narasi suci yang teranyam erat dalam napas hutan hujan tropis.",
    contentTitle: "Sang Penjaga Kanopi dan Kehidupan Sungai",
    contentText: "Selama berabad-abad, labirin sungai yang membelah jantung Kalimantan telah menjadi urat nadi bagi komunitas Dayak Kenyah yang tangguh. Rumah Lamin, sebuah mahakarya arsitektur kayu yang megah, bukan sekadar tempat bernaung, melainkan episentrum budaya tempat nilai-nilai gotong royong, tarian magis, and filosofi hidup selaras dengan alam terus dirawat. Di sini, setiap ukiran and jalinan manik adalah doa yang diwariskan untuk menjaga keseimbangan semesta.",
    contentImg: "/assets/images/Dayak1.jpg",
    artifacts: [
      { img: "/assets/images/Dayak2.jpg", title: "Penjaga Rimba Kalimantan", subtitle: "Orangutan sebagai simbol keseimbangan alam and kelestarian hutan hujan tropis Borneo." },
      { img: "/assets/images/Dayak3.jpg", title: "Kemegahan Rumah Lamin", subtitle: "Arsitektur tradisional Dayak yang menjadi simbol kebersamaan and persaudaraan lintas generasi." },
      { img: "/assets/images/Dayak4.jpg", title: "Nadi Sungai Mahakam", subtitle: "Aliran air yang menjadi urat nadi kehidupan, transportasi, and sumber pangan bagi suku Dayak." }
    ],
    videoTitle: "Suara dari Jantung Borneo",
    ytUrl: "https://www.youtube.com/embed/IzOo7XdbqFU"
  },
  sumba: {
    heroImg: "https://images.unsplash.com/photo-1589139855581-80a5666da818?auto=format&fit=crop&q=80&w=2000",
    heroVideo: "/assets/videos/SumbaVid.mp4",
    heroTitle: "Sumba Tanah Marapu",
    heroSubtitle: "Sebuah dunia yang liar and magis, tempat legenda kuno berpadu dengan ritme kehidupan sehari-hari yang terjalin erat dalam setiap helai kain tenun.",
    contentTitle: "Jejak Para Leluhur",
    contentText: "Sumba adalah tanah di mana waktu seolah berhenti. Dari sabana yang luas hingga tradisi megalitik yang masih terjaga, pulau ini menawarkan perjalanan spiritual yang mendalam. Tenun Sumba bukan sekadar kain, melainkan kitab suci yang ditenun dengan doa and harapan bagi para leluhur.",
    contentImg: "/assets/images/Sumba1.jpg",
    artifacts: [
      { img: "/assets/images/Sumba.jpg", title: "Hamparan Sabana Purba", subtitle: "Bentang alam ikonik Sumba yang menjadi rumah bagi kuda-kuda sandelwood yang bebas berlari." },
      { img: "/assets/images/Sumba4.jpg", title: "Tradisi Berkuda Pasola", subtitle: "Upacara syukur and ketangkasan berkuda yang berakar kuat pada kepercayaan Marapu." },
      { img: "/assets/images/Sumba5.jpg", title: "Kampung Adat Ratenggaro", subtitle: "Desa dengan rumah atap menjulang tinggi, saksi bisu keteguhan menjaga tradisi megalitik." }
    ],
    videoTitle: "Perjalanan Melalui Savana and Lautan",
    ytUrl: "https://www.youtube.com/embed/QsMZhytMebE"
  },
  banda: {
    heroImg: "https://images.unsplash.com/photo-1581404169707-1c6e1db0dfd6?auto=format&fit=crop&q=80&w=2000",
    heroVideo: "/assets/videos/BANDANEIRA11.mp4",
    heroTitle: "Banda Jejak Jalur Rempah",
    heroSubtitle: "Sebuah konstelasi pulau yang pernah merombak peta dunia. Menyatukan memori sejarah yang pekat dengan magisnya lanskap vulkanik nusantara.",
    contentTitle: "Episentrum Semesta Rempah",
    contentText: "Banda Neira adalah saksi bisu perebutan rempah dunia. Namun di balik sejarahnya yang kelam, ia menyimpan keindahan bawah laut and tradisi yang tak lekang oleh waktu. Dari tarian Cakalele hingga perahu Kora-Kora, Banda adalah perpaduan antara keberanian and kedamaian.",
    contentImg: "/assets/images/Bandaneira1.jpg",
    artifacts: [
      { img: "/assets/images/Bandaneira2.jpg", title: "Pesisir Biru Banda", subtitle: "Keindahan pantai yang tenang dengan latar belakang Gunung Api Banda yang megah." },
      { img: "/assets/images/Bandaneira3.jpg", title: "Tarian Perang Cakalele", subtitle: "Ekspresi keberanian and penghormatan kepada pahlawan melalui gerak ritmik yang transendental." },
      { img: "/assets/images/Bandaneira4.jpg", title: "Dermaga Sejarah", subtitle: "Gerbang masuk menuju Kepulauan Banda yang menyimpan ribuan kisah perdagangan rempah masa lalu." }
    ],
    videoTitle: "Bisikan Kepulauan Rempah-rempah",
    ytUrl: "https://www.youtube.com/embed/ciEIKY9zOoA"
  },
  baliem: {
    heroImg: "https://images.unsplash.com/photo-1627557451016-17b07c8d9c22?auto=format&fit=crop&q=80&w=2000",
    heroVideo: "/assets/videos/PapuaVidio.mp4",
    heroTitle: "Papua Cahaya Timur",
    heroSubtitle: "Sebuah suaka peradaban di mana kabut abadi memeluk tebing raksasa, and tradisi manusia pegunungan berdetak selaras dengan napas bumi.",
    contentTitle: "Jantung Zamrud Jayawijaya",
    contentText: "Papua adalah permata terakhir Nusantara. Dengan hutan yang masih perawan and laut yang penuh kehidupan, ia adalah simbol dari keagungan alam. Kebudayaan Papua yang kaya, dari Noken hingga tarian adat, adalah bentuk syukur atas kelimpahan semesta yang tak terhingga.",
    contentImg: "/assets/images/PapuaBudaya1.jpg",
    artifacts: [
      { img: "/assets/images/PapuaBudaya2.jpg", title: "Labirin Karst Raja Ampat", subtitle: "Gugusan pulau karst yang membentuk formasi unik di tengah jernihnya laut biru toska." },
      { img: "/assets/images/PapuaBudaya3.jpg", title: "Surga di Ujung Timur", subtitle: "Keindahan alam yang menjadikannya salah satu titik biodiversitas tertinggi di dunia." },
      { img: "/assets/images/PapuaBudaya4.jpg", title: "Semangat Tarian Adat", subtitle: "Gerak komunal yang merayakan persatuan and hubungan harmonis masyarakat Papua dengan alam." }
    ],
    videoTitle: "Ritme Mistik dari Timur",
    ytUrl: "https://www.youtube.com/embed/PaEhtx1jlV0"
  }
};

const navItems = [
  { name: "Peta Budaya", link: "/#map-section" },
  { name: "Artikel", link: "/#cards-section" },
];

// ─── Page Component ────────────────────────────────────────────────────────────
export default function CultureDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(params.id, i);
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

    const baseScale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const scale = baseScale * 1.1; // Zoom in 10% to crop out the Veo watermark at the bottom right
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT));
    requestAnimationFrame(() => drawFrame(frameIndex));
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

  const cultureKeys = Object.keys(cultureDetails);
  const currentIndex = cultureKeys.indexOf(params.id);
  const prevId = currentIndex > 0 ? cultureKeys[currentIndex - 1] : null;
  const nextId = currentIndex >= 0 && currentIndex < cultureKeys.length - 1 ? cultureKeys[currentIndex + 1] : null;

  const data = cultureDetails[params.id];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center text-[#D1D0D0] font-playfair text-2xl">
        Budaya tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen relative flex flex-col text-[#D1D0D0] selection:bg-[#44541c]/30 selection:text-[#D1D0D0]">
      {!imagesLoaded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
          <div className="text-[#FFFFE0] font-playfair text-2xl animate-pulse">Memuat Perjalanan...</div>
        </div>
      )}

      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full object-cover z-0" />
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#000000] via-transparent to-[#000000] pointer-events-none opacity-60" />

      {/* ── Navbar ── */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="primary" onClick={() => router.push('/')}>
              ← Beranda
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
              <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-[#D1D0D0] text-base font-medium py-1">
                {item.name}
              </a>
            ))}
            <NavbarButton variant="primary" className="w-full mt-2" onClick={() => { router.push('/'); setIsMobileMenuOpen(false); }}>
              ← Beranda
            </NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* ── Hero ── */}
      <section className="relative z-10 w-full h-screen flex items-center justify-center text-center overflow-hidden">
        {data.heroVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src={data.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img src={data.heroImg} alt={data.heroTitle} className="absolute inset-0 w-full h-full object-cover -z-10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/20 to-transparent h-full" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#000000] to-transparent" />
        <div className="relative z-10 max-w-3xl px-4">
          <p className="font-sans text-[#988686] uppercase tracking-[0.3em] text-xs font-bold mb-4">BUDAYA NUSANTARA</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-[#D1D0D0] mb-6 drop-shadow-lg">{data.heroTitle}</h1>
          <p className="font-sans text-[#D1D0D0]/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {data.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Living History ── */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6 py-24 md:py-32 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <img src={data.contentImg} alt="Culture Element" className="w-full aspect-[4/5] object-cover shadow-2xl border border-[#5C4E4E]/30" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <p className="font-sans text-[#988686] uppercase tracking-widest text-xs font-bold mb-4">HISTORY</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#D1D0D0]">{data.contentTitle}</h2>
          <p className="font-sans text-[#D1D0D0]/80 leading-relaxed mb-8 text-sm md:text-base">
            {data.contentText}
          </p>
        </div>
      </section>

      {/* ── Curated Artifacts ── */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-24 md:pb-32">
        <div className="text-center mb-16">
          <p className="font-sans text-[#988686] uppercase tracking-widest text-xs font-bold mb-4">GALERI</p>
          <h2 className="font-playfair text-4xl font-bold text-[#D1D0D0]">Galeri Budaya</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px]">
          {/* Large Left */}
          <div className="w-full md:w-1/2 h-[400px] md:h-full relative group overflow-hidden bg-[#988686]">
            <img src={data.artifacts[0].img} alt={data.artifacts[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-[#D1D0D0]">
              <h3 className="font-playfair text-2xl font-bold mb-1">{data.artifacts[0].title}</h3>
              <p className="font-sans text-[#D1D0D0]/70 text-xs">{data.artifacts[0].subtitle}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 h-[500px] md:h-full">
            <div className="flex-1 relative group overflow-hidden bg-[#988686]">
              <img src={data.artifacts[1].img} alt={data.artifacts[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-[#D1D0D0]">
                <h3 className="font-playfair text-xl font-bold mb-1">{data.artifacts[1].title}</h3>
                <p className="font-sans text-[#D1D0D0]/70 text-xs">{data.artifacts[1].subtitle}</p>
              </div>
            </div>

            <div className="flex-1 flex gap-4">
              <div className="flex-1 relative group overflow-hidden bg-[#988686]">
                <img src={data.artifacts[2].img} alt={data.artifacts[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-[#D1D0D0]">
                  <h3 className="font-playfair text-base font-bold mb-0.5">{data.artifacts[2].title}</h3>
                  <p className="font-sans text-[#D1D0D0]/70 text-xs">{data.artifacts[2].subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prev / Next Navigation ── */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 flex justify-between items-center">
        {prevId ? (
          <button onClick={() => router.push(`/budaya/${prevId}`)}
            className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-[#D1D0D0] hover:bg-[#5C4E4E] transition-colors font-sans text-sm uppercase tracking-widest font-bold">
            ← Prev Culture
          </button>
        ) : <div />}
        {nextId ? (
          <button onClick={() => router.push(`/budaya/${nextId}`)}
            className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-[#D1D0D0] hover:bg-[#5C4E4E] transition-colors font-sans text-sm uppercase tracking-widest font-bold">
            Next Culture →
          </button>
        ) : <div />}
      </section>

      {/* ── Video Section ── */}
      <section className="relative z-10 w-full py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[#988686] uppercase tracking-widest text-xs font-bold mb-4">EXPERIENCE</p>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-12 text-[#D1D0D0]">{data.videoTitle}</h2>
          <div className="relative pt-[56.25%] w-full rounded-lg overflow-hidden shadow-2xl bg-[#5C4E4E]/20 border border-[#988686]/30">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={data.ytUrl}
              title={data.videoTitle}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
