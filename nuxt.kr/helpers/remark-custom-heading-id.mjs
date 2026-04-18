function visit(node, callback) {
  if (!node || typeof node !== 'object') {
    return
  }

  callback(node)

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      visit(child, callback)
    }
  }
}

const CUSTOM_HEADING_ID_RE = /\s*%\{#([^}]+)\}%\s*$/

export default function remarkCustomHeadingId() {
  return tree => visit(tree, (node) => {
    if (node.type !== 'heading' || !Array.isArray(node.children) || node.children.length === 0) {
      return
    }

    const lastChild = node.children.at(-1)
    if (!lastChild || lastChild.type !== 'text') {
      return
    }

    const match = lastChild.value.match(CUSTOM_HEADING_ID_RE)
    if (!match) {
      return
    }

    const [, id] = match
    const text = lastChild.value.replace(CUSTOM_HEADING_ID_RE, '')

    if (text) {
      lastChild.value = text
    } else {
      node.children.pop()
    }

    node.data ||= {}
    node.data.hProperties ||= {}
    node.data.hProperties.id = id
  })
}
