export function isValidPenyelenggaraCd(cd: string) {
  // ^ dan $ memastikan string panjangnya tepat 15 digit
  const regex = /^\d{15}$/;
  return regex.test(cd);
}
