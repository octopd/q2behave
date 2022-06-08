export const colors: string[] = [
    '#6929c4',
    '#1192e8',
    '#005d5d',
    '#9f1853',
    '#fa4d56',
    '#520408',
    '#198038',
    '#002d9c',
    '#ee5396',
    '#b28600',
    '#009d9a',
    '#012749',
]

export const assignColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];

    return color
}