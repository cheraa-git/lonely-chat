export function nickValidation(nick: string) {
  return /^[a-zA-Z0-9_.]{4,30}$/.test(nick.trim())
}

export function formatDate(date: string) {
  let fDate = new Date(date).toLocaleString().slice(0, 17).replace(',', ' at')
  const nDate = new Date().toLocaleString().slice(0, 17).replace(',', ' at')
  if (fDate.slice(3, 10) === nDate.slice(3, 10)) {
    if (fDate.slice(0, 2) === nDate.slice(0, 2)) {
      fDate = fDate.replace(fDate.slice(0, 10), 'today')
    } else if (Number(nDate.slice(0, 2)) - Number(fDate.slice(0, 2)) === 1) {
      fDate = fDate.replace(fDate.slice(0, 10), 'yesterday')
    }
  }
  return fDate
}
