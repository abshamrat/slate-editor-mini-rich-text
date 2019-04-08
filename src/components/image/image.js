import React from 'react';

function image(props) {
    return (
        <img src={props.src} style={{boxShadow: (props.selected ? '0 0 0 2px blue' : 'none')}} className='sImage' />
    )
}

module.exports = image;