import { Route, Routes } from 'react-router';
import Game from '@pages/Game';
import Help from '@pages/Help';
import Home from '@pages/Home';
import SidePanel from '@components/ui/SidePanel';
import Modal from '@components/ui/Modal';
import CreateChallenge from '@pages/challenge/create';
import ValidateChallenge from '@pages/challenge/validate';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/help" element={<Help />} />
        <Route path="challenge">
          <Route path="create" element={<CreateChallenge />} />
          <Route path=":id" element={<ValidateChallenge />} />
        </Route>
      </Routes>
      <SidePanel />
      <Modal />
    </>
  );
}
