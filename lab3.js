const fs = require('fs');

function readJsonFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Помилка при зчитуванні файлу ${filename}: ${error.message}`);
        process.exit(1);
    }
}

function findMaxCurrencyRate(json) {
    let maxRate = 0;

    // Перевіряємо, чи json є масивом
    if (Array.isArray(json)) {
        for (const entry of json) {
            // Перевіряємо, чи entry є об'єктом
            if (typeof entry === 'object' && entry !== null) {
                const rate = entry.rate;
                // Перевіряємо, чи rate є числом
                if (typeof rate === 'number') {
                    if (rate > maxRate) {
                        maxRate = rate;
                    }
                }
            }
        }
    }

    return maxRate;
}

function writeResultToFile(filename, result) {
    const content = `Максимальний курс: ${result}`;
    fs.writeFileSync(filename, content, 'utf-8');
}

const inputFile = 'data.json';
const outputFile = 'output.txt';

const jsonData = readJsonFile(inputFile);
const maxRate = findMaxCurrencyRate(jsonData);

writeResultToFile(outputFile, maxRate);

console.log('Програма виконалася успішно.');
