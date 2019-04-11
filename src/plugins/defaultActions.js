const DEFAULT_NODE = 'paragraph';
const LIST_ITEM = 'list_item';
const LIST_TYPE = {
  'ol_list': 'ul_list',
  'ul_list': 'ol_list',
};
module.exports = function defaultActions(options){
    return {
        queries: {
            getActiveListItem(editor) {
                console.log('editor is calling');
                editor.normalize();
            }
        },
        commands: {
            /**
             * A change function to add list block.
             *
             * @param {Editor} editor
             * @param {Object} options
             */
            addListBlock(editor, options) {
                if (options.currentType === LIST_TYPE[options.actionType]) {
                  editor
                  .unwrapBlock(LIST_TYPE[options.actionType])
                  .wrapBlock(LIST_TYPE[options.currentType])
                }
                else if (LIST_TYPE[options.currentType] && options.currentType === options.actionType) {
                  editor
                  .setBlocks(DEFAULT_NODE)
                  .unwrapBlock(options.actionType)
                }
                else {
                  editor
                  .setBlocks(LIST_ITEM)
                  .wrapBlock(options.actionType)
                } 
            },
            /**
             * A change function to standardize inserting images.
             *
             * @param {Editor} editor
             * @param {String} src
             */
            insertImage(editor, src) {
                editor.insertBlock({
                  type: 'image',
                  data: { src },
                }).insertBlock({
                  type:'paragraph'
                });
            },
            /**
             * A change function to insert files.
             *
             * @param {Editor} editor
             * @param {Object} file
             */              
            insertFile(editor, file) {
                editor.insertBlock({
                  type:'file',
                  data: { url: file.url, name: file.name, ext: file.ext },
                }).insertBlock({
                  type:'paragraph'
                });
            },
            /**
             * A change function to shift right the list.
             *
             * @param {Editor} editor
             * @param {Object} value
             * @param {String} type
             */
            shiftRight(editor, value, type) {
                const { document, blocks }  = value;
                const prevSibling = document.getPreviousSibling(blocks.first().key);
                const prevType = prevSibling && prevSibling.type;
                if (prevType && prevType === LIST_ITEM) {
                  if (type === Object.keys(LIST_TYPE)[1]) {
                    editor
                    .unwrapBlock(LIST_ITEM)
                    .wrapBlock(Object.keys(LIST_TYPE)[1])
                  }
                  else if (type === Object.keys(LIST_TYPE)[0]) {
                    editor
                    .unwrapBlock(LIST_ITEM)
                    .wrapBlock(Object.keys(LIST_TYPE)[0])
                  }
                }
            },
            /**
             * A change function to shift left the list.
             *
             * @param {Editor} editor
             * @param {object} value
             */
            shiftLeft(editor, value) {
                const { document, blocks } = value;
                const parent = document.getParent(blocks.first().key);
                const thatParent = document.getParent(parent.key);
                if (!thatParent.type) {
                  editor
                  .setBlocks(DEFAULT_NODE)
                  .unwrapBlock(parent.type);
                }
                else if (parent && parent.type === Object.keys(LIST_TYPE)[1]) {
                    editor
                    .unwrapBlock(Object.keys(LIST_TYPE)[1])
                }
                else if (parent && parent.type === Object.keys(LIST_TYPE)[0]) {
                    editor
                    .unwrapBlock(Object.keys(LIST_TYPE)[0])
                }
            }
        }
    }
}