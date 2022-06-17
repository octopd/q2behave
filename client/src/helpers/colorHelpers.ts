export const colors: string[] = [
    '#8a3ffc',
    '#007d79',
    '#ff7eb6',
    '#fa4d56',
    '#fff1f1',
    '#6fdc8c',
    '#4589ff',
    "#d12771",
    '#d2a106',
    '#08bdba',
    '#bae6ff',
    '#009d9a',
    '#ba4e00',
]

export const assignColor = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];

    return color
}