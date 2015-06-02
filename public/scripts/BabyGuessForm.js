var React = require('react');
module.exports = React.createClass({
  getInitialState:function(){
    return {
      submitted : false,
      valid : false
    };
  },
  handleSubmit:function(e){
    e.preventDefault();

    var name = React.findDOMNode(this.refs.name);
    var dob = React.findDOMNode(this.refs.dob);
    var boy = React.findDOMNode(this.refs.boy);
    var girl = React.findDOMNode(this.refs.girl);
    var weight = React.findDOMNode(this.refs.weight);

    this.props.onSubmitted({
      who: name.value.trim(), 
      dob: new Date(dob.value.trim()),
      gender: boy.checked ? "M" : "F",
      weight: weight.value.trim(),
      submitted : new Date().toISOString()
    });
    
    this.setState({submitted:true});
  },
  validate:function(){
     var valid = true;
     valid &= React.findDOMNode(this.refs.name).value != '';
     valid &= React.findDOMNode(this.refs.dob).value != '';
     valid &= React.findDOMNode(this.refs.boy).checked || React.findDOMNode(this.refs.girl).checked;
     valid &= React.findDOMNode(this.refs.weight).value != '';
          
     this.setState({
        submitted: false,
        valid : valid
     });
  },

  render: function(){    
    return (
      <div className={'' + (this.state.submitted ? 'hidden' : 'visible')}>
        <h2 className="app-section-header">What&apos;s Your Guess?</h2>
        <form className="form-horizontal" onSubmit={this.handleSubmit} onChange={this.validate}>
          <div className="form-group">
            <label className="col-sm-2 control-label">Your name</label>
            <div className="col-sm-4">
              <input className="form-control" type="text" ref="name"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Baby&apos;s Birthday</label>
            <div className="col-sm-4">
              <input className="form-control" type="date" ref="dob"/>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Boy or Girl?</label>
            <div className="col-sm-4">
              <input className="form-control" type="radio" name="gender" ref="boy">Boy</input>
              <input className="form-control" type="radio" name="gender" ref="girl">Girl</input>
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Baby&apos;s Weight?</label>
            <div className="col-sm-4">
              <input className="form-control" type="number" ref="weight"/>
            </div>
          </div>

          <div className="">
            <input type="submit" value="Submit" className="btn btn-primary" disabled={!this.state.valid}/>
          </div>
        </form>
      </div>
    );
  }
});