module.exports = function topLevelNodes(options) {
    const {limit} = options
    return {
        queries: {
            isNodeLimitOverflows(editor, value) {
                const {document} = value;
                if (limit && document.nodes.size > limit) {
                    return true;
                }
                return false;
            }
        }
    }
}