"use client";
import Navbar from "@/components/navbar";
import { getAnimeById } from "@/lib/api";
import { Anime } from "@/types/anime";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnimeDetails() {
  const defaultImage = "/default-image.png";
  const params = useParams();
  const slug = parseInt(params.slug as string);

  const [anime, setAnime] = useState<Anime[]>([]);
  useEffect(() => {
    const id = slug
    getAnimeById(id).then(setAnime);
  }, [slug]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <>
      <Navbar />
      <div className="px-4 max-w-[1200px] mx-auto pt-[80px]">
        <div className="border">
          <div
            className="text-primary font-bold mb-5 cursor-pointer hover:text-zinc-300 transition-colors duration-500 flex items-center justify-start"
            onClick={() => history.back()}
          >
            <ChevronLeft className="w-4 h-4" />{" "}
            <span className="pb-1">Kembali</span>
          </div>
          {anime.map((anime) => (
            <div className="border gap-5 flex justify-around" key={anime.mal_id}>
              <img
                src={anime.images?.jpg?.image_url || defaultImage}
                alt="poster"
                className="w-[250px] rounded-xl h-[300px]"
                onError={handleImageError}
              />
              <div className="pt-5 space-y-5">
                <h1 className="text-2xl font-bold">{anime.title}</h1>
                <p>{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
