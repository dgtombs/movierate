import { stringSorter } from './sorting';

describe('stringSorter', () => {
    it('sorts years as expected', () => {
        expect(stringSorter('1926', '1927')).toBeLessThan(0);
        expect(stringSorter('1927', '1926')).toBeGreaterThan(0);
        expect(stringSorter('1916', '1916')).toEqual(0);
    })
});