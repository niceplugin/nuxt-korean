const headingTagPattern = /^h[1-6]$/

function normalizeCustomAnchor(raw: string) {
  const trimmed = raw.trim()
  const normalized = trimmed.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')
  return normalized || trimmed
}

function stripCustomAnchorTokens(node: any[], state: { slug?: string }) {
  for (let i = node.length - 1; i >= 2; i--) {
    const child = node[i]
    if (typeof child === 'string') {
      const regex = /\s*%\{([A-Za-z0-9_-]+)\}%/gi
      const cleaned = child.replace(regex, (_, slug) => {
        if (!state.slug) {
          state.slug = normalizeCustomAnchor(slug)
        }
        return ''
      })
      if (cleaned.length) {
        node[i] = cleaned
      } else {
        node.splice(i, 1)
      }
      continue
    }
    if (Array.isArray(child)) {
      stripCustomAnchorTokens(child, state)
    }
  }
}

function updateTocLinks(links: Array<{ id: string, children?: any[] }>, slugMap: Map<string, string>) {
  if (!Array.isArray(links)) {
    return
  }
  for (const link of links) {
    const mapped = slugMap.get(link.id)
    if (mapped) {
      link.id = mapped
    }
    if (link.children?.length) {
      updateTocLinks(link.children, slugMap)
    }
  }
}

export function applyCustomHeadingAnchors(body: any) {
  if (!body || body.type !== 'minimark' || !Array.isArray(body.value)) {
    return
  }
  const replacements: Array<{ oldId?: string, newId: string }> = []
  const visit = (nodes: any[]) => {
    for (const node of nodes) {
      if (!Array.isArray(node) || node.length < 2) {
        continue
      }
      const [tag] = node
      if (typeof tag === 'string' && headingTagPattern.test(tag)) {
        const slugState: { slug?: string } = {}
        stripCustomAnchorTokens(node, slugState)
        if (slugState.slug) {
          const props = node[1] ?? (node[1] = {})
          const oldId = props.id
          props.id = slugState.slug
          replacements.push({ oldId, newId: slugState.slug })
        }
      }
      const children = node.slice(2)
      if (children.length) {
        visit(children)
      }
    }
  }
  visit(body.value)
  if (replacements.length && body.toc?.links) {
    const slugMap = new Map<string, string>()
    for (const { oldId, newId } of replacements) {
      const key = oldId || newId
      slugMap.set(key, newId)
    }
    updateTocLinks(body.toc.links, slugMap)
  }
}
