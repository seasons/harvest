// Returns whether every character in the string is a digit (i.e. empty string returns true, but any spaces returns false)
export const isWholeNumber = (s: string) => {
    if (s.length == 0) {
        return true
    }

    const isDigit = (c: String) => c >= '0' && c <= '9'
    const reducer = (accumulator: boolean, currentValue: string) => accumulator && isDigit(currentValue)
    return Array.from(s).reduce(reducer, true)
}