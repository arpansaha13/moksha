/**
 *
 * @param istDateStr format: YYYY-MM-DD
 * @param istTimeStr format: hh:mm:ss
 */

export default function getDateFromIST(istDateStr: string, istTimeStr: string): Date {
  const istDate = new Date(`${istDateStr}T${istTimeStr}Z`)

  istDate.setHours(istDate.getHours() - 5)
  istDate.setMinutes(istDate.getMinutes() - 30)

  return istDate
}
