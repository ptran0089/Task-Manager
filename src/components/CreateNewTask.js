import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createTask } from '../actions';

class CreateNewTask extends React.Component {
	renderInput(field) {
		const { meta: { touched, error } } = field;
		return (
			<div>
				<input type="text" {...field.input} placeholder="Enter task" />
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		const { boardId, listId } = this.props;
		this.props.createTask(boardId, listId, values[`task${listId}`]);
		this.props.reset();
	}

	render() {
		const { handleSubmit, listId } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field name={`task${listId}`} component={this.renderInput}/>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.task) {
		errors.task = "Please enter a task";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateNewTask'
})(
	connect(null, { createTask })(CreateNewTask)
);