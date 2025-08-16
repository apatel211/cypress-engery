import testData from '../../fixtures/testData.json';

export function getRandomNmiSuffix() {
    return Math.floor(Math.random() * (999999999 - 10000000) + 10000000).toString();
}

export function getRandomUsage() {
    return Math.floor(Math.random() * 90 + 10).toString(); // 10–99
}

export function getRandomDropdownValue() {
    const values = testData.dropdownValues;
    return values[Math.floor(Math.random() * values.length)];
}