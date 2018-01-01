export const CREATE_BOARD = 'create_board';
export const DELETE_BOARD = 'delete_board';
export const CREATE_LIST = 'create_list';
export const DELETE_LIST = 'delete_list';
export const CREATE_TASK = 'create_task';
export const DELETE_TASK = 'delete_task';
export const MOVE_CARD = 'move_card';
export const INSERT_PLACEHOLDER = 'insert_placeholder';
export const PUSH_CARD = 'push_card';
export const REMOVE_CARD = 'remove_card';

export function createBoard(values) {
	const timestamp = Date.now();
	const key = `board${timestamp}`;

	return dispatch => {
		dispatch({
			type: CREATE_BOARD,
			values,
			key
		});
	}
}

export function deleteBoard(boardId) {
	return dispatch => {
		dispatch({
			type: DELETE_BOARD,
			boardId
		});
	}
}

export function createList(boardId, values) {
	const timestamp = Date.now();
	const key = `list${timestamp}`;
	
	return dispatch => {
		dispatch({
			type: CREATE_LIST,
			values,
			key,
			boardId
		});
	}
}

export function deleteList(boardId, listId) {
	return dispatch => {
		dispatch({
			type: DELETE_LIST,
			boardId,
			listId
		});
	}
}

export function createTask(boardId, listId, values) {
	const timestamp = Date.now();
	const key = `task${timestamp}`;

	return dispatch => {
		dispatch({
			type: CREATE_TASK,
			values,
			key,
			boardId,
			listId
		});
	}
}

export function deleteTask(boardId, listId, index) {
	return dispatch => {
		dispatch({
			type: DELETE_TASK,
			boardId,
			listId,
			index
		});
	}
}

// export function moveCard(boardId, sourceListId, sourceTaskId, sourceIndex, targetListId, targetTaskId, targetIndex) {
// 	return dispatch => {
// 		dispatch({
// 			type: MOVE_CARD,
// 			boardId,
// 			sourceListId,
// 			sourceTaskId,
// 			sourceIndex,
// 			targetListId,
// 			targetTaskId,
// 			targetIndex
// 		});
// 	}
// }

export function moveCard(boardId, sourceListId, targetListId, dragIndex, hoverIndex) {
	return dispatch => {
		dispatch({
			type: MOVE_CARD,
			dragIndex,
			hoverIndex,
			boardId,
			sourceListId,
			targetListId
		});
	}
}

export function pushCard(boardId, listId, card) {
	return dispatch => {
		dispatch({
			type: PUSH_CARD,
			card,
			boardId,
			listId
		});
	}
}

export function removeCard(boardId, listId, index) {
	return dispatch => {
		dispatch({
			type: REMOVE_CARD,
			index	,
			boardId,
			listId
		});
	}
}

export function insertPlaceholder(boardId, sourceListId, sourceTaskId, sourceIndex, targetListId, targetTaskId, targetIndex) {
	return dispatch => {
		dispatch({
			type: INSERT_PLACEHOLDER,
			boardId,
			sourceListId,
			sourceTaskId,
			sourceIndex,
			targetListId,
			targetTaskId,
			targetIndex
		});
	}
}

