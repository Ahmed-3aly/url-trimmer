
const inputRange = '0123456789abcdefghijjklmnopqrstuvwxyz';
const inputChars = inputRange.split('');
const upperLimit = inputChars.length;

export const generatorService = {
    generate,
};

function generate(
    length: number,
) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const random = Math.floor(
            Math.random() * upperLimit
        );
        result += inputChars[
            random
        ];
    }
    return result;
}
