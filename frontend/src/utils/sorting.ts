/* General purpose sorting functions */

// Sorts strings by their characters.
// Implements the Array.sort compareFunction spec.
export const stringSorter = (a: string, b: string) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0;
};