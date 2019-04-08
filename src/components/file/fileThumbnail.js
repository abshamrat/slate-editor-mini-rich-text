import React from 'react';

import pdfThumb from '../../../public/assets/img/pdf-thumbails.webp';
import txtThumb from '../../../public/assets/img/txt-thumbnails.png';

function fileThumbnails(props) {
    return (
        <div className="file-thumbnail" data-url={props.url} data-name={props.name} onClick={props.onFileClick} selected={props.selected}>
            <img className="file-thumbnail-image" src={props.isPdf ? pdfThumb : txtThumb} />
            <a>
                {props.name}
                {props.children}
            </a>
        </div>
    )
}

module.exports = fileThumbnails;