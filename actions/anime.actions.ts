"use server";

import axios, { AxiosResponse } from "axios";

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

export const fetchAnime = async (
  page: number
) => {
  try {
    const response: AxiosResponse<AnimeData> =
      await axios.get<AnimeData>(
        `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
      );

    const animeData: AnimeData = response.data;

    return animeData;
  } catch (error: any) {
    throw new Error(
      `Failed fetching the data: ${error.message}`
    );
  }
};
