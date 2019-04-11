import { Value, Point } from 'slate';
import { Editor } from 'slate-react';
import React from 'react';
import { Modal, notification} from 'antd';
import { isKeyHotkey } from 'is-hotkey'
import ls from 'local-storage';
import download from 'downloadjs';
import Menu from '../components/menu/menu';
import Image from '../components/image/image' 
import Toolbar from '../components/toolbar/toolbar';
import FileModal from '../components/modal/fileModal';
import FileThumbnail from '../components/file/fileThumbnail';
import MarkHotkey from '../plugins/markHotKey';
import DefaultActions from '../plugins/defaultActions';
import TopLevelNodes from '../plugins/topLevelNodes';
import MenuItems from '../../resources/menus/defaultMenu'
import initialValue from '../../resources/values/defaultValue'
import schema from '../../resources/schemas/defaultSchema'
import {hasBlock, getCurrentBlockType, getActionType} from '../utils/utils'

/**
 * Define the default node type.
 *
 * @type {String}
 */
const DEFAULT_NODE = 'paragraph';
/**
 * Define the content save key.
 *
 * @type {String}
 */
const CONTENT_SAVE_KEY= 'slateData';

const confirm = Modal.confirm;
const isBackedTAb = isKeyHotkey('Shift+Tab')
const isTAb = isKeyHotkey('Tab');
const isDel = isKeyHotkey('Del');
const isEnter = isKeyHotkey('Enter');
const NODE_LIMIT = 10;

/**
 * Define the top-level node limits.
 *
 * @type {String}
 */
const topLevelNodesLimit = TopLevelNodes({limit: NODE_LIMIT});
/**
 * Define the plugins.
 *
 * @type {Array}
 */
const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: '`', type: 'code' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
  DefaultActions(),
  topLevelNodesLimit
]

class Index extends React.Component {
  state = {
    value: Value.fromJSON(initialValue),
    modal: {
      visible: false,
      isImageModal: false,
      title: false
    }
  }
  constructor(props) {
      super(props);
      this.onFilePickOkClick = this.onFilePickOkClick.bind(this);
  }
  componentWillMount() {
    const persistData = ls.get(CONTENT_SAVE_KEY);
    if (persistData) {
      this.setState({
        value: Value.fromJSON(JSON.parse(persistData)) 
      })
    }
  }

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */
  ref = editor => {
    this.editor = editor;
  }

  /**
   * A change function to save the new `value`.
   *
   * @param {Editor} editor
   */
  onChange = (change) => {
    this.setState({ value: change.value })
  }
  /**
   * A change function to handle mark actions.
   *
   * @param {Event} event
   */
  onMarkClick = (event) => {
    const type = getActionType(event);
    this.editor.toggleMark(type)
  }
  /**
   * A change function to handle general block actions.
   *
   * @param {Event} event
   */
  onClickGeneralBlock = (event) => {
    const type = getActionType(event);
    const isActive = hasBlock(this.state.value, type);
    if (isActive) {
      this.editor
      .setBlocks(DEFAULT_NODE)
    } else {
      this.editor
      .setBlocks(type)
      // it replace existing block with the given one
    }
  }
  /**
   * A change function to handle image modal.
   *
   * @param {Event} event
   */
  onClickImageMenu = (event) => {
    this.setState({
      modal: {
        isImageModal: true,
        title: "Upload Image",
        visible: true
      }
    })
  }
  /**
   * A change function to handle file modal.
   *
   * @param {Event} event
   */
  onClickFileMenu = (event) => {
    this.setState({
      modal: {
        isImageModal: false,
        title: "Upload File",
        visible: true
      }
    })
  }
  /**
   * A change function to handle save content.
   *
   * @param {Event} event
   */
  showSaveConfirm = (event) => {
    const context = this;
    if (!this.editor.isNodeLimitOverflows(this.state.value)) {
      confirm({
        title: 'Do you Want to save it?',
        content: 'It will save your content to your browser local storage.',
        onOk() {
          console.log('OK');
          ls(CONTENT_SAVE_KEY, JSON.stringify(context.state.value));
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    else {
      const args = {
        message: `Unable to Save`,
        description: `You have crossed the top-level node limits. You can't add more that ${NODE_LIMIT} top-level nodes`,
        duration: 4,
      };
      notification.open(args);
    }
  }
  /**
   * A change function to handle Cancel editting.
   *
   * @param {Event} event
   */
  showCancelConfirm = (event) =>{
    const context = this;
    confirm({
      title: 'Are you sure cancel edit?',
      content: 'All data will be restored to default if you cancel it.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        context.setState({
          value: Value.fromJSON(initialValue)
        });
        ls.remove(CONTENT_SAVE_KEY);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * A change function to handle list menu click.
   *
   * @param {Event} event
   */
  onClickListMenu = (event) => {
    event.preventDefault();
    const actionType = getActionType(event);
    const type = getCurrentBlockType(this.state)
    this.editor.addListBlock({actionType: actionType, currentType: type});
  }
  /**
   * A change function to handle undo redo action.
   *
   * @param {Event} event
   */
  onClickRedoUndo = (event) => {
    event.preventDefault()
    const actionType = getActionType(event);
    this.editor[actionType]()
  }
  /**
   * A change function to shift right.
   *
   * @param {Event} event
   */
  onClickShiftRight = (event) => {
    event.preventDefault();
    const type = getCurrentBlockType(this.state)
    this.editor.shiftRight(this.state.value, type);
  }
  /**
   * A change function to sheft left click.
   *
   * @param {Event} event
   */
  onClickShiftLeft = (event) => {
    event.preventDefault();
    this.editor.shiftLeft(this.state.value);
  }

  render() {
    return (
      <div>
        <div>
          <Toolbar>
            <Menu
              context={this}
              items={MenuItems}
            />
          </Toolbar>
        </div>
        <div style={{padding: 20}}>
          <Editor
              spellCheck
              autoFocus
              ref={this.ref}
              schema={schema}
              plugins = {plugins}
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderNode={this.renderNode}
              renderMark={this.renderMark}
              placeholder="Enter some text..."
            />
        </div>
        <div>
          <FileModal
            title={this.state.modal.title}
            visible={this.state.modal.visible}
            isImageModal = {this.state.modal.isImageModal}
            onFilePick = {this.onFilePickOkClick}
            onCancel={this.handleModalCancel}
          />
        </div>
      </div>
    )
  }
  /**
   * A change function to handle file pick.
   *
   * @param {Object} file
   * @param {Event} event
   */
  onFilePickOkClick = (file, event) => {
    event.preventDefault();
    if (this.state.modal.isImageModal && file.url) {
      this.editor.insertImage(file.url);
    } else if (!this.state.modal.isImageModal && file.url) {
      this.editor.insertFile(file);
    }
    setTimeout(() => {
      this.setState({
        modal: Object.assign(this.state.modal, {visible:false})
      });
    }, 100);
  }
  /**
   * A change function to handle modal cancel.
   *
   * @param {Event} event
   */
  handleModalCancel = (event) => {
    this.setState({
      modal: Object.assign(this.state.modal, {visible:false})
    });
  }
  /**
   * A change function to handle file download.
   *
   * @param {Event} event
   */
  handleFileDownload = (event) => {
    event.preventDefault();
    const dataUrl = event.target.getAttribute('data-url');
    const dataName = event.target.getAttribute('data-name');
    confirm({
      title: 'Do you want to download this file?',
      okText: 'Yes',
      okType: 'primary',
      cancelText: 'No',
      onOk() {
        download(dataUrl, dataName);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }
   /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */
  renderNode = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props
    switch (node.type) {
      case 'block_quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'heading_one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading_two':
        return <h2 {...attributes}>{children}</h2>
      case 'ul_list':
        return <ul {...attributes}>{children}</ul>
      case 'ol_list':
        return <ol {...attributes}>{children}</ol>
      case 'list_item':
        return <li {...attributes}>{children}</li>
      case 'file':
        const url = node.data.get('url');
        const name = node.data.get('name');
        const isPdf = node.data.get('ext') === 'pdf';
        return  <FileThumbnail url={url} name={name} isPdf={isPdf} onFileClick={this.handleFileDownload} selected={isFocused} {...attributes}> {children}</FileThumbnail>
      case 'image': 
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
        
      default:
        return next()
    }
  }
  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */
  onKeyDown = (event, editor, next) => {
    let mark
    if (isBackedTAb(event)) {
      this.onClickShiftLeft(event);      
    } else if (isTAb(event)) {
      this.onClickShiftRight(event);
    } else if (isDel(event)) {
      const type = getCurrentBlockType(this.state);
      if (type === 'file') {
        editor.setBlocks(DEFAULT_NODE);
      }
    } else if (isEnter(event)) {
      const type = getCurrentBlockType(this.state);
      if (type === 'file') {
        editor.insertBlock(DEFAULT_NODE);
      } else if(type === 'ol_list' || type === 'ul_list') {
        const {blocks} = this.state.value;
        const listText = blocks.first().getText().trim();
        if (listText) {
          return next();
        } else {
          editor.shiftLeft(this.state.value);
        }
      }
      else {
        return next()
      }
    } else {
      return next()
    }
  }
}

export default Index;