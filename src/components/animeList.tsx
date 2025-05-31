"use client";
import { useEffect, useState } from "react";
import type { Anime } from "@/types/anime";
import Link from "next/link";
import CardAnime from "./card/cardAnime";
import { getRecentAnime, getTopAnime } from "@/lib/api";
import { link } from "fs";
type FetchType = "popular" | "recent";

type AnimeListProps = {
  title: string;
  linkHref: string;
  fetchType: FetchType;
};

export default function AnimeList({
  title,
  linkHref,
  fetchType,
}: AnimeListProps) {
  const [topAnimes, setTopAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        fetchType === "popular" ? await getTopAnime() : await getRecentAnime();
      setTopAnimes(data);
    };

    fetchData();
  }, [fetchType]);

  return (
    <div className="px-4 max-w-[1200px] mx-auto pt-[80px]">
      <div className="flex justify-between mb-5 items-center relative h-fit">
        <h1 className="text-2xl font-bold before:absolute before:w-1 before:rounded-md before:h-full before:bg-white pl-6 before:left-3">
          {title}
        </h1>
        {linkHref && (
          <Link
            href={linkHref}
            className="text-primary hover:underline hover:text-zinc-300 transition-all duration-100"
          >
            Lihat Semua
          </Link>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <CardAnime animes={topAnimes} />
      </div>
    </div>
  );
}
