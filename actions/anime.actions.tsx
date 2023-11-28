"use server";

import AnimeCard, {
  AnimeProps,
} from "@/components/AnimeCard";
import axios from "axios";

interface AnimeData {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}

const MAX_LIMIT = 8;

export const fetchAnime = async (
  pageNumber: number
): Promise<AnimeData[]> => {
  try {
    const response = await axios.get(
      `https://shikimori.one/api/animes?page=${pageNumber}&limit=${MAX_LIMIT}&order=popularity`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      `Failed fetching the data: ${error.message}`
    );
  }
};
