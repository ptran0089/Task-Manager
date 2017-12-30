import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import reducers from './reducers';
import AllBoards from './components/AllBoards';
import ActiveBoard from './components/ActiveBoard';
import './css/main.css';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(throttle(() => {
	saveState(store.getState());
}, 1000));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/boards/:boardId" component={ActiveBoard} />
					<Route path="/" component={AllBoards} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>
, document.querySelector('#main'));