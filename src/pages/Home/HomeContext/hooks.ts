import { useState } from 'react';
import Character from '../../../features/character/models/character';
import { IGetCharatersUsecase } from '../../../features/character/usecases/get-characters/types';
import { PaginatedInfo } from '../../../utils/types/request';
import { HomeState } from './types';

export const useHomeState = (getCharacters: IGetCharatersUsecase): HomeState => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [characters, setCharacters]=  useState([] as Character[]);
  const [pagination, setPagination] =  useState(null as unknown as PaginatedInfo);
  const [scrollTimeout, setScrollTimeout] =  useState(null as unknown as NodeJS.Timeout);

  return {

  };
}