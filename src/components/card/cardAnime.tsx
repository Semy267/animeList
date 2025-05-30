"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Anime } from "@/types/anime";
import { Dot, Hash, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";

export default function CardAnime({ animes }: { animes: Anime[] }) {
  const defaultImage = "/default-image.png";
  const router = useRouter();



  const HandleDetail = (anime: Anime) => {
    const slug = slugify(anime.title);
    const id = anime.mal_id;
    router.push(`/anime/${id}?title=${slug}`);
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <>
      {animes.map((anime, index) => (
        <Card key={index}>
          <CardContent className="rounded-xl overflow-hidden flex gap-4 pt-6">
            <img
              src={anime.images?.jpg?.image_url || defaultImage}
              alt="poster"
              className="w-1/2 rounded-xl h-[250px]"
              onError={handleImageError}
            />
            <div className="space-y-4 w-1/2">
              <Button variant={"outline"}>{anime.status}</Button>
              <CardDescription>{anime.episodes} episodes</CardDescription>
              <CardTitle className="my-4 line-clamp-1">{anime.title}</CardTitle>
              <CardDescription className="flex items-center">
                {anime.season} {anime.year} <Dot /> {anime.type}
              </CardDescription>
              <div className="flex justify-between items-center">
                <div className="flex items-center flex-col">
                  <span className="flex items-center gap-1">
                    <Star className="w-5 h-5" /> {anime.score}
                  </span>
                  <CardDescription className="flex items-center gap-2 text-[11px]">
                    {anime.scored_by} users
                  </CardDescription>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Hash className="w-5 h-5" /> {anime.rank}
                  </div>
                  <CardDescription className="text-[11px]">
                    RANKING
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {anime.genres.slice(0, 1).map((genre, index) => (
                  <Button
                    key={index}
                    variant="secondary"
                    className="text-xs px-3 py-1 rounded-full"
                  >
                    {genre.name.length > 6
                      ? genre.name.slice(0, 5) + "..."
                      : genre.name}
                  </Button>
                ))}

                {anime.genres.length > 2 && (
                  <Button
                    variant="secondary"
                    className="text-xs px-3 py-1 rounded-full"
                  >
                    +{anime.genres.length - 2}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid grid-cols-2 place-items-center">
            <Button className="w-full col-span-2 self-end dark:bg-primary-dark bg-primary-light dark:text-text-dark text-text-light dark:hover:bg-accent-dark hover:bg-accent-light"
            onClick={() => HandleDetail(anime)}
            >
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
