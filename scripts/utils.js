//Check for Alphabetical/Backspace/Enter
export const isValid = (input) => (input.length === 1 && /^[a-zA-Z\b\r\n]*$/.test(input)) || (input==="enter" || input==="backspace");

export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}