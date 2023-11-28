"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import AnimeCard, {
  AnimeProps,
} from "./AnimeCard";

import { fetchAnime } from "@/actions/anime.actions";

let page = 2;

const LoadMore = () => {
  const [data, setData] = useState<AnimeProps[]>(
    []
  );
  const { ref, inView } = useInView();

  /**
   * Fetches and appends anime data when the component is in view.
   * @param {boolean} inView - Flag indicating if the component is in view.
   * @param {Array<any>} data - Current state data.
   * @param {Function} setData - State update function.
   * @returns {void}
   * @description
   * Fetches additional anime data when the component is in view using `fetchAnime(page++)`.
   * Appends the fetched data to the existing component state using the `setData` function.
   * Cleans up to ensure safe state updates when the component is unmounted.
   */
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (inView) {
          const newData = await fetchAnime(
            page++
          );
          if (isMounted) {
            setData((prevData) => [
              ...prevData,
              ...newData,
            ]);
          }
        }
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map(
          (item: AnimeProps, index: number) => (
            <AnimeCard
              key={item.id}
              anime={item}
              index={index}
            />
          )
        )}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
};

export default LoadMore;
