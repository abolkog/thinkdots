import { COLORS_PER_ROW } from '../util/common';
import Dot from './Dot';
import Feedback from './Feedback';

export default function GuessRow() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='flex space-x-2'>
        {[...Array(COLORS_PER_ROW)].map((_, i) => (
          <Dot key={i} position={i} />
        ))}
      </div>
      <Feedback />
    </div>
  );
}
