export const markerTypes: string[] = ["triangle", "circle", "square", "cross"]

export const assignMarker = (deviceId: string) => {

    const index: number = Number(deviceId.slice(-2))

    let markerType: string = ''
    if (index < markerTypes.length) {
        markerType = markerTypes[index]
    } else {
        markerType = markerTypes[index % markerTypes.length]
    }

    return markerType
}