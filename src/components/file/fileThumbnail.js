import React from 'react';

import pdfThumb from '../../../public/assets/img/pdf-thumbails.webp';
import txtThumb from '../../../public/assets/img/txt-thumbnails.png';

function fileThumbnails(props) {
    return (
        <div className="file-thumbnail" selected={props.selected} {...props.attributes}>
            <span onClick={props.onDeleteClick} data-file-key={props.attributes['data-key']} className="file-thumbnail-delete material-icons">cancel</span>
            <div className="file-thumbnail-container">
                <img className="file-thumbnail-image" src={props.isPdf ? pdfThumb : txtThumb} />
                <a>
                    {props.name}
                    {props.children}
                </a>
                <div className="file-thumbnail-overly">
                    <span data-url={props.url} data-name={props.name} onClick={props.onFileClick} className="material-icons">archive</span>
                </div>
            </div>
        </div>
    )
}

module.exports = fileThumbnails;