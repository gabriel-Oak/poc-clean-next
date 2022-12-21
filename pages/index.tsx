import { FC } from 'react'
import Home from '../src/pages/Home';
import { FilterProvider } from '../src/pages/Home/Filter/FilterContext';
import { HomeProvider } from '../src/pages/Home/HomeContext';

const HomePage: FC = () => (
  <HomeProvider>
    <FilterProvider>
      <Home />
    </FilterProvider>
  </HomeProvider>
);

export default HomePage;
