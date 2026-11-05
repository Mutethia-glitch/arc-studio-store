// Unsplash's image CDN serves compressed, cropped assets sized for each viewport.
// Sources and photographers are documented in README.md.
export function photoAt(url: string, width: number, height = width) {
  if (!url.startsWith('https://images.unsplash.com/')) return url
  const result = new URL(url)
  result.searchParams.set('w', String(width))
  result.searchParams.set('h', String(height))
  result.searchParams.set('q', '76')
  result.searchParams.set('auto', 'format')
  result.searchParams.set('fit', 'crop')
  return result.toString()
}
