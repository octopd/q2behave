export const axisYIndex = (name: string) => {
    let value = 0

    switch (name) {
        case "Magno_X":
        case "Magno_Y":
        case "Magno_Z":
            value = 0
            break;
        case "Gyro_X":
        case "Gyro_Y":
        case "Gyro_Z":
            value = 1
            break;
        case "Accel_X":
        case "Accel_Y":
        case "Accel_Z":
            value = 2
            break;
        case "AudioLevel":
            value = 3
            break;
        case "HeartRate":
            value = 4
            break;
        default:
            value = 0
            break;
    }

    return value
}