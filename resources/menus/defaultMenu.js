module.exports = [
    {
      icon: "format_bold",
      type: "bold",
      tooltipText: "Bold",
      onClick: "onMarkClick"
    },
    {
      icon: "format_italic",
      type: "italic",
      tooltipText: "Italic",
      onClick: "onMarkClick"
    },
    {
      icon: "format_underlined",
      type: "underlined",
      tooltipText: "Underlined",
      onClick: "onMarkClick"
    },
    {
      icon: "code",
      type: "code",
      tooltipText: "Code",
      onClick: "onMarkClick"
    },
    {
      icon: "looks_one",
      type: "heading_one",
      tooltipText: "Heading One",
      onClick: "onClickGeneralBlock"
    },
    {
      icon: "looks_two",
      type: "heading_two",
      tooltipText: "Heading Two",
      onClick: "onClickGeneralBlock"
    },
    {
      icon: "format_quote",
      type: "block_quote",
      tooltipText: "Quote",
      onClick: "onClickGeneralBlock"
    },
    {
      icon: "format_list_numbered",
      type: "ol_list",
      tooltipText: "Numbered List",
      onClick: "onClickListMenu"
    },
    {
      icon: "format_list_bulleted",
      type: "ul_list",
      tooltipText: "Bulleted List",
      onClick: "onClickListMenu"
    },
    {
      icon: "format_indent_increase",
      type: "shift_right",
      tooltipText: "Shift Right",
      onClick: "onClickShiftRight"
    },
    {
      icon: "format_indent_decrease",
      type: "shift_left",
      tooltipText: "Shift Left",
      onClick: "onClickShiftLeft"
    },
    {
      icon: "image",
      type: "image",
      tooltipText: "Image",
      onClick: "onClickImageMenu"
    },
    {
      icon: "attach_file",
      type: "file",
      tooltipText: "Attach File",
      onClick: "onClickFileMenu"
    },
    {
      icon: "undo",
      type: "undo",
      tooltipText: "Undo",
      onClick: "onClickRedoUndo"
    },
    {
      icon: "redo",
      type: "redo",
      tooltipText: "Redo",
      onClick: "onClickRedoUndo"
    },
    {
      icon: "save",
      type: "save",
      tooltipText: "Save",
      onClick: "showSaveConfirm"
    },
    {
      icon: "cancel",
      type: "cancel",
      tooltipText: "Cancel",
      onClick: "showCancelConfirm"
    }
  ]