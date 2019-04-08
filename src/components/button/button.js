import React from 'react';
import {Button, Tooltip} from 'antd';

function button(props) {
    return (
        <Tooltip key={props.index} placement="top" title={props.tooltipText}>
            <Button 
                data-type={props.type}
                size="small"  
                style={{color: props.isActive? '#000': '#aaa', border:0}} 
                className='sButton'
                onMouseDown={props.onMouseDown}>
                {props.children}
            </Button>
        </Tooltip>
    )
}

module.exports = button;