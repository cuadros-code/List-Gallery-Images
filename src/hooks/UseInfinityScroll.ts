import { useEffect, useRef, useState, useCallback } from 'react';
import { ImageResponse } from '../interfaces/images.interface';
import { getImages } from '../services/get-images';

export const useInfiniteScroll = () => {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<null | string>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const getDataImages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getImages(page, 10);
      setImages((prevImages) => [...prevImages, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError("Error al cargar las imágenes");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        getDataImages();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [getDataImages, isLoading]);

  return { images, isLoading, bottomRef, error };
};
