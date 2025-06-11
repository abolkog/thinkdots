import '@testing-library/jest-dom';

// Mock ResizeObserver for headlessui/react Popover
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const useSoundMock = jest.fn().mockReturnValue({
  playBg: jest.fn(),
  stopBg: jest.fn(),
  playSetColor: jest.fn(),
  playGameOver: jest.fn(),
  playWin: jest.fn(),
  toggleBgMute: jest.fn(),
  isMuted: jest.fn(),
});

jest.mock('@hooks/useSound', () => ({
  useSound: useSoundMock,
}));
jest.mock('@util/envHelper', () => ({
  BASE_URL: '/',
}));
