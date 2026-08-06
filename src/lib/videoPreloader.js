const preloaded = new Map()
const inflight = new Map()

export function isPreloaded(url) {
  return preloaded.get(url) === true
}

export function preloadVideo(url) {
  if (!url || preloaded.get(url) || inflight.get(url)) return inflight.get(url) || Promise.resolve()

  const p = new Promise((resolve) => {
    const v = document.createElement('video')
    v.preload = 'auto'
    v.muted = true
    v.playsInline = true
    v.src = url
    v.oncanplaythrough = () => {
      preloaded.set(url, true)
      inflight.delete(url)
      resolve(true)
    }
    v.onerror = () => {
      inflight.delete(url)
      resolve(false)
    }
    v.load()
  })

  inflight.set(url, p)
  return p
}

export function preloadAll(urls, { batchSize = 3, delayMs = 400 } = {}) {
  let i = 0
  function nextBatch() {
    if (i >= urls.length) return
    const batch = urls.slice(i, i + batchSize)
    i += batchSize
    batch.forEach((url) => preloadVideo(url))
    if (i < urls.length) {
      setTimeout(nextBatch, delayMs)
    }
  }
  nextBatch()
}
