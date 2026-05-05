import { InfiniteMovingCards } from './ui/infinite-moving-cards';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Mengenal budaya Nusantara berarti mengumpulkan serpihan identitas kita yang tercerai berai oleh laju zaman.",
      name: "Dr. Sapardi Riyadi",
      title: "Budayawan"
    },
    {
      quote: "Setiap tarikan garis malam pada kain batik bukanlah sekadar menghias ruang kosong, melainkan menenun untaian doa.",
      name: "Ni Wayan Artini",
      title: "Seniman Tari & Kriya"
    },
    {
      quote: "Kalimantan bukanlah sebatas paru-paru dunia; ia adalah perpustakaan peradaban yang memegang rahasia keseimbangan alam.",
      name: "Prof. Muhammad Amin",
      title: "Peneliti Universitas Indonesia"
    }
  ];

  return (
    <section className="py-24 bg-[#000000] border-t border-[#5C4E4E]/30 overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-16 px-6">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-[#D1D0D0] mb-4">
            Suara Pelintas Waktu
          </h2>
          <div className="w-16 h-1 bg-[#988686] mx-auto mt-6" />
        </div>

        <div className="flex flex-col items-center justify-center relative w-full">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
