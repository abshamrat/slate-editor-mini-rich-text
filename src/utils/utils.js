// Init Global variable
const DATA_TYPE = 'data-type';

function getCurrentBlockType (state) {
    const { value: { document, blocks } } = state
    if (blocks.size > 0) {
      let parent = document.getParent(blocks.first().key)
      if (parent && parent.type === 'list_item') {
        parent = document.getParent(parent.key);
        return parent && parent.type;
      }
      else if (parent && parent.type === 'paragraph') {
        return document.getParent(parent.key).type || parent.type;
      }
    }
    if (blocks && blocks.first().type === 'list_item') {
      let parent = document.getParent(blocks.first().key);
      return parent && parent.type;
    }
    return blocks && blocks.first().type;
};

module.exports = {
    hasUndo: (data) =>  {
        const undos = data.get('undos')
        return undos ? undos.size > 1 : false;
    },
    hasRedo: (data) => {
        const redos = data.get('redos')
        return redos ? redos.size > 0 : false;
    },
    hasBlock: (value, type) => {
      return value.blocks.some(node => node.type === type)
    },
    hasMark: (value, type) => {
      return value.activeMarks.some(mark => mark.type === type)
    },
    isList: function (state) {
      const type = getCurrentBlockType(state);
      return type === 'ol_list' || type === 'ul_list';
    },
    getActionType: (event) => {
      return event.target.getAttribute(DATA_TYPE);
    },
    getCurrentBlockType: getCurrentBlockType,
    getCurrentMarkType: (value) =>  {
      return value.activeMarks.some(mark => mark.type)      
    },
}