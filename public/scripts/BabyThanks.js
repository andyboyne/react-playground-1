var React = require('react');

module.exports = React.createClass({
	render:function(){
		return(
			<div className={'thank-you-container container ' + this.props.className}>
				<h1>Thank you!</h1>
			</div>
		);
	}
});