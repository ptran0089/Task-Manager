import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createBoard } from '../actions';

class CreateNewBoard extends React.Component {
	renderInput(field) {
		const { meta: { touched, error } } = field;
		return (
			<div className="input">
				<input type="text" {...field.input} autoComplete="off" placeholder="Board name" />
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	onSubmit(values) {
		this.props.createBoard(values);
		this.props.reset();
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div className="create-board">
				<div className="create-header">
					<span>Creating a new board</span>
					<span><i className="fa fa-times-circle" aria-hidden="true"></i></span>
				</div>
				<div className="create-body">
					<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
						<Field name="name" component={this.renderInput}/>
						<button className="cancel">CANCEL</button>
						<button className="create" type="submit">CREATE</button>
					</form>
				</div>
			</div>
		);
	}
}

function validate(values) {

	const errors = {};

	if(!values.name) {
		errors.name = "Please enter a name";
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'CreateNewBoard'
})(
	connect(null, { createBoard })(CreateNewBoard)
);