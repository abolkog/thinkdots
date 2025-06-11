import { useState } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import { useSound } from '@hooks/useSound';

const MuteToggle: React.FC = () => {
  const { toggleBgMute, isMuted } = useSound();
  const [checked, setChecked] = useState(isMuted());

  const handleChange = () => {
    toggleBgMute();
    setChecked(isMuted());
  };
  return (
    <Field className="flex items-center justify-center mb-5">
      <Switch
        checked={checked}
        onChange={handleChange}
        className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-1 focus:ring-blue-400 focus:ring-offset-2 focus:outline-hidden data-checked:bg-blue-400"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
        />
      </Switch>
      <Label as="span" className="ml-3 text-lg">
        <span className="font-bold text-blue-400">Mute Music</span>
      </Label>
    </Field>
  );
};

export default MuteToggle;
