//Check for Alphabetical/Backspace/Enter
export const isAlphabetical = (input) => /^[a-zA-Z\b\r\n]*$/.test(input);