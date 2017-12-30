import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CreateNewBoard from './CreateNewBoard';
import { fetchBoards, setLocalStorage } from '../actions';

class AllBoards extends React.Component {
	handleBoardDelete(boardId) {
		this.props.deleteBoard(boardId);
	}

	renderBoards() {
		return _.map(this.props.boards, (board) => {
			return (
				<Link className="board" to={`/boards/${board.id}`} key={board.id}>
					<div>
						<span>{board.boardName}</span>
					</div>
				</Link>
			); 
		});
	}

	render() {
		return (
			<div className="container">
				<CreateNewBoard />
				{this.renderBoards()}
			</div>
		);
	}
}

function mapStateToProps({ boards }) {
	return { boards };
}

export default connect(mapStateToProps, { fetchBoards, setLocalStorage })(AllBoards);