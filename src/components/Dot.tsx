import { useState } from 'react';
import { colorClasses, COLORS } from '../util/gameUtil';
import { useGameContext } from '../hooks/useGameContext';
import { AppActions } from '../context/reducer';

type DotProps = {
  position: number;
};

export default function Dot({ position }: DotProps) {
  const { dispatch } = useGameContext();
  const [colorIndex, setColorIndex] = useState<number>(-1);

  const handleClick = () => {
    const newIndex = (colorIndex + 1) % COLORS.length;
    const colorName = COLORS[newIndex];
    setColorIndex(newIndex);
    dispatch({
      type: AppActions.SET_GUESS,
      payload: { position, color: colorName },
    });
  };
  const color = colorIndex >= 0 ? COLORS[colorIndex] : '';

  return (
    <button
      className={`w-10 h-10 rounded-full border-2 border-gray-400  cursor-pointer hover:ring-2 hover:scale-105 transition-transform ${colorClasses[color]}`}
      onClick={handleClick}
    />
  );
}
