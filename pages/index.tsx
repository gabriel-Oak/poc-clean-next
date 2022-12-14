import { FC } from 'react'
import Home from '../src/pages/home';
import { HomeContextProvider } from '../src/pages/home/context';

const HomePage: FC = () => (
  <HomeContextProvider>
    <Home />
  </HomeContextProvider>
);

export default HomePage;
