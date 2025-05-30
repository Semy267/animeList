import { AnimeResponse, Anime, GetAnimeByIdResponse } from "@/types/anime";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTopAnime = async (): Promise<Anime[]> => {
  try {
    const popAnime = await axios.get<AnimeResponse>(
      `${baseUrl}/top/anime?limit=6`
    );
    return popAnime.data.data;
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
};

export const getRecentAnime = async (): Promise<Anime[]> => {
  try {
    const recentAnime = await axios.get<AnimeResponse>(
      `${baseUrl}/seasons/now?limit=6`
    );
    return recentAnime.data.data;
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
};

export const getSearchAnime = async (slug: string): Promise<Anime[]> => {
  try {
    const recentAnime = await axios.get<AnimeResponse>(
      `${baseUrl}/anime?q=${encodeURIComponent(slug)}`
    );
    return recentAnime.data.data;
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
};

export const getAnimeById = async (id: number): Promise<Anime[]> => {
  try {
    const animeById = await axios.get<GetAnimeByIdResponse>(
      `${baseUrl}/anime/${id}`
    );
    return [animeById.data.data];
  } catch (error) {
    console.error("Failed to fetch anime:", error);
    return [];
  }
  console.log(id);
};
