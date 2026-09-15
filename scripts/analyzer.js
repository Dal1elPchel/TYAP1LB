const keywords = new Set([
    'VAR',
    'LOGICAL',
    'BEGIN',
    'END',
    'READ',
    'IF',
    'THEN',
    'ELSE',
    'END_IF',
    'WRITE',
]);

const operators = new Set([
    '.NOT.',
    '.AND.',
    '.OR.',
    '.EQU.',
]);

const specialSymbols = new Set([
    ';',
    ':',
    ',',
    '(',
    ')',
    '=',
    '.',
]);

const constants = new Set([
    '0',
    '1',
]);

const identifiers = new Set();


function recognizeLexeme(lexeme) {
    if (keywords.has(lexeme)) {
        return {
            type: 'КЛЮЧЕВОЕ СЛОВО',
            value: lexeme,
        };
    }

    if (operators.has(lexeme)) {
        return {
            type: 'ОПЕРАТОР',
            value: lexeme,
        };
    }

    if (specialSymbols.has(lexeme)) {
        return {
            type: 'СПЕЦИАЛЬНЫЙ СИМВОЛ',
            value: lexeme,
        };
    }

    if (constants.has(lexeme)) {
        return {
            type: 'КОНСТАНТА',
            value: lexeme,
        };
    }

    if (/^[A-Za-z][A-Za-z0-9_]*$/.test(lexeme)) {
        identifiers.add(lexeme);

        return {
            type: 'ИДЕНТИФИКАТОР',
            value: lexeme,
        };
    }

    return {
        type: 'ОШИБКА: НЕИЗВЕСТНОЕ ВЫРАЖЕНИЕ',
        value: lexeme,
    };
}


export function analyze(source) {
    const tokens = [];

    let i = 0;

    while (i < source.length) {
        const char = source[i];

        if (/\s/.test(char)) {
            i++;
            continue;
        }

        if (char === '.') {
            let lexeme = '';

            while (i < source.length && source[i] !== ' ') {
                lexeme += source[i];
                i++;

                if (lexeme.endsWith('.')) {
                    break;
                }
            }

            if (operators.has(lexeme)) {
                tokens.push(recognizeLexeme(lexeme));
                continue;
            }

            tokens.push(recognizeLexeme('.'));
            continue;
        }

        if (/[A-Za-z]/.test(char)) {
            let lexeme = '';

            while (
                i < source.length &&
                /[A-Za-z0-9_]/.test(source[i])
                ) {
                lexeme += source[i];
                i++;
            }

            tokens.push(recognizeLexeme(lexeme));
            continue;
        }

        if (/[01]/.test(char)) {
            tokens.push(recognizeLexeme(char));
            i++;
            continue;
        }

        if (specialSymbols.has(char)) {
            tokens.push(recognizeLexeme(char));
            i++;
            continue;
        }

        tokens.push({
            type: 'ОШИБКА: НЕИЗВЕСТНОЕ ВЫРАЖЕНИЕ',
            value: char,
        });

        i++;
    }

    return tokens;
}