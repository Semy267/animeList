import AnimeList from "@/components/animeList";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] mx-auto h-[100vh] dark:bg-[hsl(240,10%,3.9%)] bg-background-light">
      <Navbar />
      <Hero />
      <AnimeList
        title="Paling Populer"
        linkHref="/populer"
        fetchType="popular"
      />
      <AnimeList title="Anime Terbaru" linkHref="/anime/current" fetchType="recent" />
    </div>
  );
}
