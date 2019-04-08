
function normalizeNode(node, editor, next) {
  const { nodes } = node
  console.log('node constrain working')

  if (node.object !== 'block') return next()
  if (nodes.size >= 3){ 
    return next();
  }
  if (nodes.first().object !== 'text') return next()
  if (nodes.last().object !== 'text') return next()
  return () => editor.removeNodeByKey(node.key)
}

module.exports = {
    document: {
      last: { type: 'paragraph' },
      normalize: normalizeNode,
    },
    blocks: {
      image: {
        isVoid: true,
      },
    },
  }
  