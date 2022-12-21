import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Character from '../../../features/character/models/character';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import { PaginatedInfo, PaginatedResult } from '../../../utils/types/request';
import { HomeContextProps } from './types';



export const useHomeController = (getCharacters: IGetCharatersUsecase): HomeContextProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([] as Character[]);
  const [pagination, setPagination] = useState(null as unknown as PaginatedInfo);
  const [scrollTimeout, setScrollTimeout] = useState(null as unknown as NodeJS.Timeout);
  const form = useForm<CharacterFilters>();
  const filters = form.watch();

  const search = async (args?: {
    filters?: CharacterFilters;
    page?: number;
  }) => {
    if(isLoading) return;
    setIsLoading(true);
    const result = await getCharacters.execute(args);

    if (result instanceof PaginatedResult) {
      console.log(args);
      console.log(result.results);
      
      
      setCharacters(Number(args?.page) > 1
        ? characters.concat(result.results)
        : result.results);
      setPagination(result.info);
      setPage(args?.page || page);
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  }

  const onScroll = () => {
    if(isLoading) return;
    const scrolledToBottom =
      window?.innerHeight + Math.ceil(window?.pageYOffset) + 800 >=
      document?.body.offsetHeight;

    if (scrolledToBottom) {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      setScrollTimeout(setTimeout(() => {
        search({ page: page + 1, filters });
      }, 50))
    }
  };

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    window?.addEventListener('scroll', onScroll);
    return () => window?.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return {
    state: {
      isLoading,
      page,
      characters,
      pagination,
      scrollTimeout,
      form
    },
    search,
  };
}