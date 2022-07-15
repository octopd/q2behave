export const getTimezoneOffset = (n: Date) => {
    function z(n: any) { return (n < 10 ? '0' : '') + n }
    var offset = new Date().getTimezoneOffset();
    var sign = offset < 0 ? '+' : '-';
    offset = Math.abs(offset);
    return sign + z(offset / 60 | 0) + z(offset % 60);
}