
const inputRange = '0123456789abcdefghijjklmnopqrstuvwxyz';
const inputChars = inputRange.split('');
const upperLimit = inputChars.length;

const TOO_SHORT = 'length can not be less than 1!';
const TOO_LONG = 'length can not exceed 24!';

export const generatorService = {
    generate,
};

export const generatorServiceExceptions = {
    tooShort: TOO_SHORT,
    tooLong: TOO_LONG
};

function generate(
    length: number,
) {
    if (length < 1)
    {
        throw new Error(TOO_SHORT);
    }
    if (length > 24)
    {
        throw new Error(TOO_LONG);
    }
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
