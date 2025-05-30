"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "../ui/button";
import { Heart, Star } from "lucide-react";
import { Anime } from "@/types/anime";

type Props = {
  animes: Anime[];
  setActiveIndex: (index: number) => void;
};

export function CardHero({ animes, setActiveIndex }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const handleSelect = (embla: any) => {
    const index = embla.selectedScrollSnap();
    setActiveIndex(index);
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={(api) => {
        if (api) {
          setActiveIndex(api.selectedScrollSnap());
          api.on("select", () => handleSelect(api));
        }
      }}
      className="w-full h-full max-h-[80vh] md:max-h-[500px]"
    >
      <CarouselContent>
        {animes.map((anime, index) => (
          <CarouselItem key={anime.mal_id} className="basis-full">
            <div className="p-1">
              <Card className="bg-transparent border-none shadow-none">
                <CardContent className="flex h-full w-full items-center p-6 px-24">
                  <div className="space-y-10 w-1/2">
                    <Button>#{anime.rank} Most Favorited Anime</Button>
                    <div>
                      <h1 className="text-5xl font-bold">{anime.title}</h1>
                      <p className="line-clamp-1">
                        ({anime.title_japanese} / {anime.title_english})
                      </p>
                    </div>

                    <div>
                      <p className="line-clamp-3">
                        {anime.synopsis}
                      </p>
                    </div>

                    <div className="flex gap-5 items-center">
                      <div className="flex gap-1">
                        <Star className="text-yellow-400" />
                        <p className="text-yellow-400 mr-2">{anime.score}</p>
                        <p>({anime.scored_by} users)</p>
                      </div>
                      <div className="flex gap-1">
                        <Heart className="text-pink-600" />
                        <p className="">{anime.favorites}</p>
                      </div>
                    </div>

                    <div className="flex gap-5 items-center">
                      <Button>Watch Now</Button>
                      <Button variant={"outline"}>More Info</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Custom position tombol */}
      <CarouselPrevious className="!absolute !left-4 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none" />
      <CarouselNext className="!absolute !right-4 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none" />
    </Carousel>
  );
}
