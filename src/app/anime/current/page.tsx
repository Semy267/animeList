import AnimeList from "@/components/animeList";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <>
        <Navbar />
        <AnimeList title="Anime Terbaru" linkHref="" fetchType="recent" />
        
        </>
    )
}