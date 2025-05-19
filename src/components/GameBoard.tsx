import GuessRow from './GuessRow';

export default function GameBoard() {
  return (
    <div className='grid gap-4 mb-6'>
      {[...Array(6)].map((_, i) => (
        <GuessRow key={i} />
      ))}
    </div>
  );
}
