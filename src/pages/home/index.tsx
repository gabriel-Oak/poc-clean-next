import React, { FC } from 'react';
import { useHomeState } from './context';

const Home: FC = () => {
  const { data } = useHomeState();

  return (
    <main>
      <div>
        {String(data.isLoading)}
      </div>

      <ul>
        {data.characters?.map((character) => (
          <div key={character.id}>
            {character.name}
          </div>
        ))}
      </ul>
    </main>
  );
}

export default Home;