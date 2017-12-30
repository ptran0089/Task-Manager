import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import CreateNewList from './CreateNewList';
import TaskList from './TaskList';
import { fetchLists, deleteList, deleteBoard } from '../actions';


class ActiveBoard extends React.Component {
	handleListDelete(listId) {
		const { boardId } = this.props.match.params;
		this.props.deleteList(boardId, listId);
	}

	renderLists() {
		const { boardId } = this.props.match.params;
		const { boards } = this.props;
		const lists = boards[boardId]['lists'];

		return _.map(lists, (list) => {
			return (
				<div className="list-container" key={list.id}>
					<h1>{list.listName}</h1>
					<button className="delete-list" onClick={() => this.handleListDelete(list.id)}><i className="fa fa-times-circle" aria-hidden="true"></i></button>
					<hr></hr>
					<TaskList boardId={boardId} listId={list.id} lists={lists} />
				</div>
			); 
		});
	}

	render() {
		const { boardId } = this.props.match.params;
		const { deleteBoard } = this.props;
		return (
			<div>
				<Link to='/boards/'>
					<button className='board-delete' onClick={() => deleteBoard(boardId)}>Delete board</button>
				</Link>
				<CreateNewList boardId={boardId} />
				{this.renderLists()}
			</div>
		);
	}
}

function mapStateToProps({ boards }) {
	return { boards };
}

ActiveBoard = DragDropContext(HTML5Backend)(ActiveBoard);
export default connect(mapStateToProps, { fetchLists, deleteList, deleteBoard })(ActiveBoard);