import * as StorageService from '@services/storage';

describe('Storage tests', () => {
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Save value to locale storage', () => {
    StorageService.setItem('mock', 'value');
    expect(setItemSpy).toHaveBeenCalledWith(`${StorageService.STORAGE_PREFIX}mock`, 'value');
  });

  it('Get value from locale storage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    StorageService.getItem('value');
    expect(getItemSpy).toHaveBeenCalledWith(`${StorageService.STORAGE_PREFIX}value`);
  });

  it('use fallback/default value when nothing found in localstorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    const defaultValue = 'default';
    const result = StorageService.getItem('value', defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('Remove value from locale storage', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    StorageService.removeItem('value');
    expect(removeItemSpy).toHaveBeenCalledWith(`${StorageService.STORAGE_PREFIX}value`);
  });
});
