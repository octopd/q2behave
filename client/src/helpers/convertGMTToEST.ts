export const convertGMTToEST = (date: Date) => {
  date.setHours(date.getHours() - 4)

  return date
}