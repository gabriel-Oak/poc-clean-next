import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import Character from '../../../features/character/models/character';
import { CharacterFilters } from '../../../features/character/types/character-filter';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import { CustomError } from '../../../utils/custom-error';
import { PaginatedInfo, PaginatedResult } from '../../../utils/types/request';
import { HomeContextProps } from './types';

let scrollTimeout: NodeJS.Timeout;

export const useHomeController = (getCharacters: IGetCharatersUsecase): HomeContextProps => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([] as Character[]);
  const [pagination, setPagination] = useState(null as unknown as PaginatedInfo);
  const [errorState, setErrorState] = useState(null as CustomError | null);

  const form = useForm<CharacterFilters>();
  const filters = form.watch();

  const search = async (args?: {
    filters?: CharacterFilters;
    page?: number;
  }) => {
    if (isLoading) return;
    setIsLoading(true);

    const result = await getCharacters.execute(args);
    if (result.isRight) {
      const isFirstpage = Number(args?.page) === 1;

      setCharacters(!isFirstpage
        ? characters.concat(result.success.results)
        : result.success.results);
      setPagination(result.success.info);
      setPage(args?.page || page);

      if (isFirstpage) window.scrollTo({ top: 0 });
      if (errorState) setErrorState(null);
    } else {
      setErrorState(result.error);      
    }
    setIsLoading(false);
  }

  const onScroll = () => {
    setIsScrolled(window?.pageYOffset > 400);
    if (isLoading) return;
    const scrolledToBottom =
      window?.innerHeight + Math.ceil(window?.pageYOffset) + 800 >=
      document?.body.offsetHeight;

    if (scrolledToBottom && !scrollTimeout) {

      scrollTimeout = setTimeout(() => {
        search({ page: page + 1, filters });
        scrollTimeout = clearTimeout(scrollTimeout) as unknown as NodeJS.Timeout;
      }, 100);
    }
  }

  const backToTop = () => {
    window?.scroll(0, 0);
  }

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
      form,
      isScrolled,
      errorState,
    },
    search,
    backToTop,
  };
}