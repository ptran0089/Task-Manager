import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

import Task from './Task';
import { createTask, deleteTask } from '../actions/index';
import { ItemTypes } from './Constants';

const listTarget = {
	drop(props, monitor, component) {
		const { sourceListId, sourceIndex, text } = monitor.getItem();
	   const { boardId, listId } = props;

	   if (findDOMNode(component).children.length === 0) {	   	
	   	props.createTask(boardId, listId, text);
	   	props.deleteTask(boardId, sourceListId, sourceIndex);
	   }
	}
};

class List extends Component {
   render() {
	  	const { connectDropTarget, boardId, listId, handleTaskDelete, boards } = this.props;
	  	const tasks = boards[boardId]['lists'][listId].tasks;
		const cards = [];

		if (tasks) {
			tasks.forEach((task, i) => {
				cards.push(
					<Task
						key={i}
						index={i}
						task={task} 
						taskId={task.id}
						boardId={boardId} 
						listId={listId} 
						handleTaskDelete={handleTaskDelete}
					/>
				);
			});
		}
		
    	return connectDropTarget(
         <ul>
       		{cards}
         </ul>
    	);
   }
}

function mapStateToProps({ boards }) {
  return { boards };
}

export default flow(
  DropTarget(ItemTypes.TASK, listTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(mapStateToProps, { deleteTask, createTask })
  )(List);
