export const GetNegativeColor = (color: 'white' | 'black' | null) => {
    return color === 'white' ? 'black' : 'white'
}