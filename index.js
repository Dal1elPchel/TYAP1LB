import {analyze} from './scripts/analyzer.js';

const randomCodes = [
    "VAR A:LOGICAL;\n" +
    "BEGIN\n" +
    "    A = 1;\n" +
    "END",
    "VAR A,B,C:LOGICAL;\n" +
    "BEGIN\n" +
    "    A = 1;\n" +
    "    B = 0;\n" +
    "    C = A;\n" +
    "END",
    "VAR A,B:LOGICAL;\n" +
    "BEGIN\n" +
    "    READ(A,B);\n" +
    "END",
    "VAR A,B,C:LOGICAL;\n" +
    "BEGIN\n" +
    "    C = A .AND. B;\n" +
    "END",
    "VAR A,B,C,D:LOGICAL;\n" +
    "BEGIN\n" +
    "    A = B .AND. C;\n" +
    "    B = C .OR. D;\n" +
    "    C = A .EQU. D;\n" +
    "END",
    "VAR A,B:LOGICAL;\n" +
    "BEGIN\n" +
    "    IF A .EQU. 1 THEN\n" +
    "        B = 1;\n" +
    "    ELSE\n" +
    "        B = 0;\n" +
    "    END_IF;\n" +
    "END",
    "VAR A,B:LOGICAL;\n" +
    "BEGIN\n" +
    "    WRITE(A,B).\n" +
    "END",
];

const analyzeBtn = document.getElementById('analyzeButton');
const randCodeBtn = document.getElementById('randCodeButton');

const outputText = document.getElementById('resultOutput');
const inputText = document.getElementById('codeInput');

randCodeBtn.addEventListener('click', (e) => {
    inputText.value =
        randomCodes[Math.floor(Math.random() * randomCodes.length)];
});
analyzeBtn.addEventListener('click', () => clickAnalyse());


function clickAnalyse() {
    const userProgram = inputText.value;
    const tokens = analyze(userProgram);
    outputText.innerText = '';

    tokens.forEach(token => {
        const row = document.createElement('div');

        row.textContent = `${token.value} → ${token.type}`;
        if (token.type.startsWith("ОШИБКА")) row.style.color = "#EF4444";

        outputText.append(row);
    });
}