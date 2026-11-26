export const isSafeDestination = (value) => {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !!url.hostname && !url.username && !url.password
  } catch {
    return false
  }
}
export const selectClients = (items, demo) => items.filter((item) => item.logo && item.url && (demo || (item.authorized === true && isSafeDestination(item.url))))
export const selectPortfolio = (items, demo) => items.filter((item) => demo ? item.visibility === 'demo' || (item.visibility === 'public' && item.authorized === true) : item.visibility === 'public' && item.authorized === true)
export const hasStoryStage = (clients, portfolio) => clients.length > 0 && portfolio.length > 0
