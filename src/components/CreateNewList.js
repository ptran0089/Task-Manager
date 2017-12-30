import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createList } from '../actions';

class CreateNewList extends React.Component {
	renderInput(field) {
		const { meta: { touched, error } } = field;
		return (
			<div>
				<input type="text" {...field.input} placeholder="Enter a name for your list" />
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createList(this.props.boardId, values);
		this.props.reset();
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div className="create-list">
				<button><i className="fa fa-times-circle" aria-hidden="true"></i></button>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field name="name" component={this.renderInput}/>
				</form>
			</div>
		);
	}
}

function validate(values) {

	const errors = {};

	if(!values.name) {
		errors.name = "Please enter a list name";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateNewList'
})(
	connect(null, { createList })(CreateNewList)
);