import { COLORS_PER_ROW } from '../util/common';

export default function Feedback() {
  return (
    <div className='grid grid-cols-2 gap-1 w-6 h-6'>
      {[...Array(COLORS_PER_ROW)].map((_, i) => (
        <div
          key={i}
          className='w-3 h-3 rounded-full border border-gray-400 bg-white'
        />
      ))}
    </div>
  );
}
