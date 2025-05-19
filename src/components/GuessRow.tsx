import Dot from './Dot';
import Feedback from './Feedback';

export default function GuessRow() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='flex space-x-2'>
        {[...Array(4)].map((_, i) => (
          <Dot key={i} />
        ))}
      </div>
      <Feedback />
    </div>
  );
}
