import { useEffect, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

import { classNames } from '@util/gameUtil';
import { useGameContext } from '@hooks/useGameContext';
import { colorClasses, COLORS } from '@util/common';
import { useSound } from '@hooks/useSound';

type DotProps = {
  position: number;
  disabled: boolean;
  onSetColor: (color: string, position: number) => void;
};

export default function Dot({ position, disabled, onSetColor }: DotProps) {
  const { state } = useGameContext();
  const { playSetColor } = useSound();
  const { secret } = state;
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    setColor('');
  }, [secret]);

  const handleClick = (value: string) => {
    playSetColor();
    setColor(value);
    onSetColor(value, position);
  };

  return (
    <Popover className="relative">
      <PopoverButton disabled={disabled} className={classNames(disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
        <div
          className={classNames(
            'w-10 h-10 rounded-full border-2 transition-transform',
            colorClasses[color],
            disabled ? 'border-gray-400 ' : 'border-white hover:ring-2 hover:scale-105'
          )}
        />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className=" bg-gray-300 rounded-lg p-2 mt-1 grid grid-cols-3 gap-1">
        {COLORS.map((colorName) => (
          <button
            key={colorName}
            className={classNames(
              'w-10 h-10 rounded-full border-2 border-gray-400 hover:ring-2 hover:scale-105 transition-transform cursor-pointer mx-1',
              colorClasses[colorName]
            )}
            onClick={() => handleClick(colorName)}
          />
        ))}
      </PopoverPanel>
    </Popover>
  );
}
