 /**
 * A change function to as plugin to perform hot key actions.
 *
 * @param {Object} options
 */
function MarkHotkey(options) {
    const { type, key } = options
  
    return {
      onKeyDown(event, editor, next) {
        // If it doesn't match our `key`, let other plugins handle it.
        if (!event.ctrlKey || event.key != key) return next()
        event.preventDefault()  
        editor.toggleMark(type)
      },
    }
}

module.exports = MarkHotkey;