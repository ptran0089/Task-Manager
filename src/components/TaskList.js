import React from 'react';
import { connect } from 'react-redux';

import List from './List';
import CreateNewTask from './CreateNewTask';
import { deleteTask, createTask, moveCard } from '../actions';

class TaskList extends React.Component {
	constructor() {
		super();
		this.state = {
			placeholderIndex: undefined,
			isOver: false
		};
		this.handleTaskDelete = this.handleTaskDelete.bind(this);
	}

	handleTaskDelete(index) {
		const { boardId, listId } = this.props;
		this.props.deleteTask(boardId, listId, index);
	}

	render() {
		const { lists, boardId, listId } = this.props;

		return (
			<div>
				<CreateNewTask boardId={this.props.boardId} listId={this.props.listId}/>
				<List
					handleTaskDelete={this.handleTaskDelete}
					boardId={boardId} 
					listId={listId} 
					lists={lists} > 
				</List>
			</div>
		);
	}
}

export default connect(null, { deleteTask, createTask, moveCard })(TaskList);