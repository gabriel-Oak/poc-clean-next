import { FC } from 'react'
import Home from '../src/pages/Home';
import { HomeProvider } from '../src/pages/Home/HomeContext/context';
import { FilterProvider } from '../src/pages/Home/Filter/context';

const HomePage: FC = () => (
  <HomeProvider>
    <FilterProvider>
      <Home />
    </FilterProvider>
  </HomeProvider>
);

export default HomePage;
