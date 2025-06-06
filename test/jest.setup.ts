import '@testing-library/jest-dom';

// Mock ResizeObserver for headlessui/react Popover
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock('@hooks/useSound', () => ({
  useSound: () => ({
    playBg: jest.fn(),
    stopBg: jest.fn(),
    playSetColor: jest.fn(),
    playGameOver: jest.fn(),
    playWin: jest.fn(),
  }),
}));

jest.mock('@util/envHelper', () => ({
  BASE_URL: '/',
}));
