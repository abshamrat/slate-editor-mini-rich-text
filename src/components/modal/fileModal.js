import React from 'react';
import isUrl from 'is-url'; 
import ls from 'local-storage';
import {Modal, Divider} from 'antd';
import imageExtensions from 'image-extensions'; 

function readAsDataURL(file, result) {
    const reader = new FileReader();
    reader.onloadend = () => {
        result(reader.result)
    }
    reader.readAsDataURL(file)
}

class fileModal  extends React.Component {
    state = {
        file: '',
        invalidImg: false,
        invalidFile: false,
        fileDataURL:'',
        fileName: '',
        fileExt: ''
    }
    constructor(props) {
        super(props);
    }
    isImage = ({url, fileName}) => {
        if(url) {
            return imageExtensions.includes(this.getExtensionFromUrl(url))
        }
        return imageExtensions.includes(this.getExtensionFromFile(fileName))
    }
    
    getExtensionFromUrl= (url) => {
        if (isUrl(url.trim())) {
            return new URL(url).pathname.split('.').pop()
        }
        return false;
    }
      
    getExtensionFromFile= (fileName) => {
        return fileName.split('.').pop()
    }

    handleImageUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (!this.isImage({fileName: file.name})) {
            this.setState(
                {
                    fileDataURL: false,
                    invalidImg: true
                }
            )
        } else {
            readAsDataURL(file, (result) => {
                this.setState({
                    fileDataURL: result,
                    fileName: file.name,
                    invalidImg: false,
    
                  });
            })
        }
    }
    handleImageUrl = (event) => {
        event.preventDefault();
        if (!this.isImage({url: event.target.value})) {
            this.setState(
                {
                    fileDataURL: false,
                    invalidUrl: true
                }
            );
        } else {
            this.setState({
                invalidUrl: false,
                fileDataURL: event.target.value,
            });
        }
    }
    handleFileUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const fileExt = this.getExtensionFromFile(file.name);
        if (fileExt.toLowerCase() !== 'pdf' && fileExt.toLowerCase() !== 'txt') {
            this.setState(
                {
                    fileDataURL: false,
                    invalidFile: true
                }
            )
        } else {
            readAsDataURL(file, (result) => {
                this.setState({
                    fileDataURL: result,
                    fileName: file.name,
                    fileExt: fileExt,
                    invalidFile: false
                });
            })
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.props.onFilePick.bind(this, {url: this.state.fileDataURL, name: this.state.fileName, ext: this.state.fileExt})}
                    confirmLoading={this.props.confirmLoading}
                    onCancel={this.props.onCancel}>
                    {
                        this.props.isImageModal && 
                            <div>
                                <div className="upload-by-url">
                                    <input type="text" onChange={this.handleImageUrl} placeholder="https:// upload by URL" />
                                    {
                                        this.state.invalidUrl && <span className="invalid-alert">Invalid image url.</span>
                                    }
                                </div>
                                <Divider>OR</Divider>
                                <div className="upload-file-area">
                                    <input type="file" name="image" onChange={this.handleImageUpload} placeholder="Brows image" />
                                    <br/>
                                    {
                                        this.state.invalidImg && <span className="invalid-alert">Invalid image type cannot be inserted</span>
                                    }
                                </div>
                            </div>
                    }
                    { 
                        !this.props.isImageModal && 
                            <div>
                                  <div className="upload-file-area">
                                        <input type="file" name="file" onChange={this.handleFileUpload} placeholder="Brows file" />
                                        <br/>
                                        {
                                            this.state.invalidFile && <span className="invalid-alert">Invalid file type cannot be inserted. (only pdf and txt allowed)</span>
                                        }        
                                    </div>
                            </div>
                    }
                </Modal>
            </div>
        )
    }
}

module.exports = fileModal;