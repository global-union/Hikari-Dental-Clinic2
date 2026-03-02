const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');

let braces = 0;
let inComment = false;
let inString = false;
let stringChar = '';
let errs = 0;

const lines = css.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const c = line[j];
        const next = j + 1 < line.length ? line[j + 1] : '';
        const prev = j > 0 ? line[j - 1] : '';

        if (!inComment && !inString) {
            if (c === '/' && next === '*') {
                inComment = true;
                j++;
            } else if (c === '"' || c === "'") {
                inString = true;
                stringChar = c;
            } else if (c === '{') {
                braces++;
            } else if (c === '}') {
                braces--;
                if (braces < 0) {
                    console.log(`Negative braces at line ${i + 1}`);
                    braces = 0;
                    errs++;
                }
            }
        } else if (inComment) {
            if (c === '*' && next === '/') {
                inComment = false;
                j++;
            }
        } else if (inString) {
            if (c === stringChar && prev !== '\\') {
                inString = false;
            }
        }
    }
}

if (braces !== 0) {
    console.log(`Final braces count is non-zero: ${braces}`);
    errs++;
}
if (inComment) {
    console.log(`Unclosed comment at EOF`);
    errs++;
}
if (inString) {
    console.log(`Unclosed string at EOF`);
    errs++;
}

if (errs === 0) {
    console.log('No CSS syntax errors found.');
}
