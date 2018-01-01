import update from 'immutability-helper';

import { CREATE_BOARD, DELETE_BOARD, CREATE_LIST, DELETE_LIST, CREATE_TASK, DELETE_TASK, MOVE_CARD, REMOVE_CARD } from '../actions';

export default function(state = {}, action) {
	const boards = {...state};
	const { values, key, boardId, listId, index } = action;
	const { sourceListId, targetListId } = action;
	const { dragIndex, hoverIndex } = action;
	let newBoards;
	let lists;
	let tasks;
	if (boardId) {
		lists = boards[boardId]['lists'];

		if (!boards[boardId]['lists']) {
			boards[boardId]['lists'] = {};
		}

		if (listId) {
			tasks = lists[listId]['tasks'];
			if (!lists[listId]['tasks']) {
				lists[listId]['tasks'] = [];
			}
		} else if (sourceListId) {
			tasks = lists[sourceListId]['tasks'];
			if (!lists[sourceListId]['tasks']) {
				lists[sourceListId]['tasks'] = [];
			}
		}
	}

	switch(action.type) {
		case CREATE_BOARD:
			boards[key] = {
				id: key,
				boardName: values.name,
			}; 
			return boards;
		case DELETE_BOARD:
			delete boards[boardId];
			return boards;
		case CREATE_LIST:
			boards[boardId]['lists'][key] = {id: key, listName: values.name};
			return boards;
		case DELETE_LIST:
			delete boards[boardId]['lists'][listId];
			return boards;
		case CREATE_TASK:
		 	lists[listId]['tasks'].push({
				id: key,
				text: values
			});
			return boards;
		case DELETE_TASK:
			boards[boardId]['lists'][listId]['tasks'].splice(index, 1);
			return boards;
		case MOVE_CARD:
			if (sourceListId === targetListId) {
				const dragCard = tasks[dragIndex];
				newBoards = update(boards, {
					[boardId]: {
						lists: {
							[sourceListId]: {
								tasks: {
									$splice: [
										[dragIndex, 1],
										[hoverIndex, 0, dragCard]
									]
								}
							}
						}
					}
				});
			} else if (sourceListId !== targetListId) {
				const dragCard = tasks[dragIndex];
				lists[sourceListId]['tasks'].splice(dragIndex, 1);
				lists[targetListId]['tasks'].splice(hoverIndex, 0, dragCard);
			}
			return newBoards;
		case REMOVE_CARD:
			newBoards = update(boards, {
				[boardId]: {
					lists: {
						[listId]: {
							tasks: {
								$splice: [
									[index, 1]
								]
							}
						}
					}
				}
			});
			console.log(boardId, listId, index);
			return newBoards;
		default:
			return state;
	}
}