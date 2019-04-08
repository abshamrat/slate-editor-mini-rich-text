import React from 'react';
import Icon from '../icon/icon'
import Button from '../button/button'
import {hasUndo, hasRedo, hasMark, hasBlock, getCurrentBlockType} from '../../utils/utils'


function menuItem(context, item, index) {
    const { value:{ data } } = context.state
    let isActive = false;
    try {
        isActive = item.type === 'save';
        isActive = !isActive && item.type === 'cancel' || isActive;
        isActive = !isActive && item.type === 'shift_right' || isActive;
        isActive = !isActive && item.type === 'shift_left' || isActive;
        isActive = !isActive && hasMark(context.state.value, item.type) || isActive;
        isActive = !isActive && ((hasUndo(data) && item.type === 'undo') || (hasRedo(data) && item.type === 'redo')) || isActive;
        isActive = !isActive && getCurrentBlockType(context.state) === item.type || isActive;
    } catch (error) {}
    
    return (
        <Button
            type={item.type}
            key={index} 
            isActive={isActive} 
            tooltipText={item.tooltipText} 
            onMouseDown={context[item.onClick]}>
            <Icon>{item.icon}</Icon>
        </Button>
    )
}

function menu(props) {
    return (
        <div className="toolbarMenu">
            { 
                props.items.map((item, i) => (
                    menuItem(props.context, item, i)
                ))
            }
        </div>
    );
}

module.exports = menu;