import '@testing-library/jest-dom';

// Mock ResizeObserver for headlessui/react Popover
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
