"use client";
import CardAnime from "@/components/card/cardAnime";
import Navbar from "@/components/navbar";
import { getSearchAnime } from "@/lib/api";
import { deslugify } from "@/lib/deslugify";
import { Anime } from "@/types/anime";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeSearch() {
  const searchParams = useSearchParams();
  const query = deslugify(searchParams.get('q') || '');
  const [searchAnimes, setSearchAnimes] = useState<Anime[]>([]);
  useEffect(() => {
    if (query) {
      getSearchAnime(query).then(setSearchAnimes);
    }
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="px-4 max-w-[1200px] mx-auto pt-[80px]">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-3">
            Hasil pencarian untuk "{query}"
          </h1>
          <div 
          className="text-primary font-bold mb-5 cursor-pointer hover:text-zinc-300 transition-colors duration-500 flex items-center justify-center"
          onClick={() => history.back()}
          >
            <ChevronLeft className="w-4 h-4" />{" "}
            <span className="pb-1">Kembali</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <CardAnime animes={searchAnimes} />
        </div>
      </div>
    </>
  );
}
