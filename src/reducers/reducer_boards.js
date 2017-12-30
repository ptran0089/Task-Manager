import { CREATE_BOARD, DELETE_BOARD, CREATE_LIST, DELETE_LIST, CREATE_TASK, DELETE_TASK, MOVE_CARD } from '../actions';

export default function(state = {}, action) {
	const boards = {...state};
	const { values, key, boardId, listId, index } = action;
	const { sourceListId, sourceTaskId, sourceIndex, targetListId, targetTaskId, targetIndex } = action;
	
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
			if (!boards[boardId]['lists']) {
				boards[boardId]['lists'] = {};
			}
			boards[boardId]['lists'][key] = {id: key, listName: values.name};
			return boards;
		case DELETE_LIST:
			delete boards[boardId]['lists'][listId];
			return boards;
		case CREATE_TASK:
			let lists = boards[boardId]['lists'];

			if (!lists[listId]['tasks']) {
				lists[listId]['tasks'] = [];
			}
		 	lists[listId]['tasks'].push({
				id: key,
				text: values
			});
			return boards;
		case DELETE_TASK:
			boards[boardId]['lists'][listId]['tasks'].splice(index, 1);
			return boards;
		case MOVE_CARD:
			const targetList = boards[boardId]['lists'][targetListId]['tasks'];
			const sourceList = boards[boardId]['lists'][sourceListId]['tasks'];
			const sourceCard = sourceList.filter(card => card.id === sourceTaskId)[0];
			const sourceListIndexSearch = sourceList.indexOf(sourceCard);
			const targetListIndexSearch = targetList.indexOf(sourceCard);
			
			if (sourceListIndexSearch !== -1) {
				sourceList.splice(sourceListIndexSearch, 1);
				targetList.splice(targetIndex, 0, sourceCard);
			} 
			else if (targetListIndexSearch !== -1) {
				targetList.splice(targetListIndexSearch, 1);
				targetList.splice(targetIndex, 0, sourceCard);
			}
			return boards;
		default:
			return state;
	}
}