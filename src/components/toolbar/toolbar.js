import React from 'react';

function toolbar(props) {
    return (
        <div className="sToolbar">
            {props.children}
        </div>
    )
}

module.exports = toolbar;