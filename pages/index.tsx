import { FC } from 'react'
import Home from '../src/pages/Home';
import { HomeContextProvider } from '../src/pages/Home/context';

const HomePage: FC = () => (
  <HomeContextProvider>
    <Home />
  </HomeContextProvider>
);

export default HomePage;
