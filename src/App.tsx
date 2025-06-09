import { Route, Routes } from 'react-router';
import Game from '@pages/Game';
import Help from '@pages/Help';
import Home from '@pages/Home';
import SidePanel from '@components/ui/SidePanel';
import Modal from '@components/ui/Modal';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <SidePanel />
      <Modal />
    </>
  );
}
