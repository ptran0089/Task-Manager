import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BoardsReducer from './reducer_boards';

const rootReducer = combineReducers({
	boards: BoardsReducer,
	form: formReducer
});

export default rootReducer;