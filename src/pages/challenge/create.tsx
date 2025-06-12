import { useState } from 'react';
import { NavLink } from 'react-router';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

import Dot from '@components/game/Dot';
import Button from '@components/ui/Button';
import { COLORS_PER_ROW } from '@util/common';
import { BASE_URL } from '@util/envHelper';

export default function CreateChallenge() {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  const handleSetColor = (idx: number, color: string) => {
    const newCode = [...code];
    newCode[idx] = color;
    setCode(newCode);
  };

  const isCodeValid = code.every(Boolean) && new Set(code).size === COLORS_PER_ROW;

  const handleCreate = () => {
    const encoded = btoa(code.join(','));
    const params = new URLSearchParams();
    params.set('code', encoded);

    if (name) params.set('name', btoa(name));
    if (message) params.set('message', btoa(message));

    const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
    const fullUrl = `${window.location.origin}${base}#/challenge/validate?${params.toString()}`;
    setLink(fullUrl);
  };

  return (
    <section className="max-w-2xl ">
      <div className="flex justify-end">
        <NavLink to="/" className="flex items-center text-yellow-400 hover:text-yellow-500 transition-colors">
          Back to Home
          <ArrowUturnLeftIcon className="w-4 ml-2" />
        </NavLink>
      </div>
      <h2 className="text-xl font-bold mb-4 text-blue-400">Create a Secret Code</h2>

      <p className="text-gray-400 mb-4">
        Pick your secret colors! Can your friend crack your code, or will they be left guessing forever?
      </p>

      <div className="grid grid-cols-4 gap-2">
        {code.map((_, idx) => (
          <Dot
            key={`color_${idx}`}
            disabled={false}
            position={idx}
            onSetColor={(value) => handleSetColor(idx, value)}
          />
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <label htmlFor="email" className="block text-sm/6 font-medium text-blue-400">
            Your name
          </label>
          <span id="email-optional" className="text-sm/6 text-gray-300">
            Optional
          </span>
        </div>
        <div className="mt-2">
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between">
          <label htmlFor="email" className="block text-sm/6 font-medium text-blue-400">
            Message
          </label>
          <span id="email-optional" className="text-sm/6 text-gray-300">
            Optional
          </span>
        </div>
        <div className="mt-2">
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            cols={50}
            placeholder="Enter a message for your friend"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-400 sm:text-sm/6"
          />
        </div>
        <p className="mt-2 text-sm text-yellow-400">
          This message will be displayed to your friend when they try to break your code.
        </p>
      </div>

      <Button onClick={handleCreate} disabled={!isCodeValid} cssClass="w-full rounded-lg text-lg font-semibold mt-10">
        Generate Challenge Link
      </Button>

      {isCodeValid && link && (
        <div className="mt-4 text-sm text-gray-400">
          <span>Share this link with your friend:</span>
          <div className="break-all bg-black-400 p-2 rounded mt-2 text-wrap text-lg font-semibold">{link}</div>
        </div>
      )}
    </section>
  );
}
