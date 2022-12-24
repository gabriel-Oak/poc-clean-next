import { FC } from 'react';
import Character from '../../src/pages/Character';
import { CharacterProvider } from '../../src/pages/Character/CharacterContext';


const CharacterPage: FC = () => (
  <CharacterProvider>
    <Character />
  </CharacterProvider>
)

export default CharacterPage;