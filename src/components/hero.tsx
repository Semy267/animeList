"use client";
import { useEffect, useState } from "react";
import { Anime } from "@/types/anime";
import { getTopAnime } from "@/lib/api";
import { CardHero } from "./card/cardHero";

export default function Hero() {

  const [animes, setAnimes] = useState<Anime[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const data = await getTopAnime();
      setAnimes(data);
    };
    fetch();
  }, []);

  const backgroundImage = animes[activeIndex]?.images.jpg.large_image_url || "/default-image.png";

    return (
        <div   
        className="bg-zinc-800 w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Overlay gelap di seluruh background */}
            <div className="absolute inset-0 dark:bg-[hsl(240,10%,3.9%)]/60 z-0" />
            {/* Gradasi bagian bawah agar menyatu ke section berikutnya */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-b from-transparent dark:to-[hsl(240,10%,3.9%)] to-white z-10" />

            {/* Konten Hero */}
            <div className="pt-[80px] z-20 px-4 max-w-[1200px] mx-auto flex items-center h-full">
                <CardHero animes={animes} setActiveIndex={setActiveIndex} />
            </div>
        </div>
    )
}