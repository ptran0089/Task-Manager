import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import _ from 'lodash';

import { deleteTask, createTask, moveCard, insertPlaceholder, removeCard } from '../actions';
import { ItemTypes } from './Constants';

const taskSource = {
  beginDrag(props, monitor, component) {
    return {
      sourceIndex: props.index,
      sourceTaskId: props.task.id,
      sourceListId: props.listId,
      text: props.task.text
    };
  }
};

const cardTarget = {
  drop(props, monitor, component) {
    const { sourceListId, sourceIndex, text } = monitor.getItem();
    const { boardId, listId } = props;

    if (sourceListId !== listId) {
      props.createTask(boardId, listId, text);
      props.deleteTask(boardId, sourceListId, sourceIndex);
    }
  },

  hover(props, monitor, component) {
    const { boardId, listId } = props;
    const dragIndex = monitor.getItem().sourceIndex;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().sourceListId;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
 
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
 
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
 
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
 
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
 
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50% 
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
 
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
 
    // Time to actually perform the action
    if (sourceListId === listId) {
      props.moveCard(boardId, sourceListId, listId, dragIndex, hoverIndex);
      monitor.getItem().sourceIndex = hoverIndex;
      return;
    }
  }
}

class Task extends Component {
  render() {
    const { connectDropTarget, connectDragSource, handleTaskDelete, task, index } = this.props;

    return connectDragSource(
      connectDropTarget(
        <li id={task.id} data-index={index}>
          <span>{task.text}</span>
          <button onClick={() => handleTaskDelete(index)}><i className="fa fa-times" aria-hidden="true"></i></button>
        </li>
      )
    );
  }
}

export default flow(
  DropTarget(ItemTypes.TASK, cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })),
  DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource()
  })),
  connect(null, { deleteTask, createTask, moveCard, insertPlaceholder, removeCard })
  )(Task);
