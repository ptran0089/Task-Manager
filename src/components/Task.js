import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import _ from 'lodash';

import { deleteTask, createTask, moveCard, insertPlaceholder } from '../actions';
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
  drop(props, monitor) {
    const item = monitor.getItem();
    const { sourceListId, sourceTaskId, sourceIndex } = item;
    const { boardId, listId, taskId, index } = props;
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(boardId, sourceListId, sourceTaskId, sourceIndex, listId, taskId, index);
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
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  connect(null, { deleteTask, createTask, moveCard, insertPlaceholder })
  )(Task);
