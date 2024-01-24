const getOnlyDateNow = () => {
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}

module.exports = { getOnlyDateNow }