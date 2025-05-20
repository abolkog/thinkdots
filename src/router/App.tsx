import { useRoutes } from 'react-router';
import Home from '@pages/Home';
import Game from '@pages/Game';
import Help from '@pages/Help';

export default function router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/game',
      element: <Game />,
    },
    {
      path: '/help',
      element: <Help />,
    },
  ]);
  return routes;
}
