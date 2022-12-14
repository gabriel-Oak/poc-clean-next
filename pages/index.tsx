import { FC } from 'react'
import Home from '../src/pages/Home';
import { HomeProvider } from '../src/pages/Home/context';

const HomePage: FC = () => (
  <HomeProvider>
    <Home />
  </HomeProvider>
);

export default HomePage;
