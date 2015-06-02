"use strict";

var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin     = ReactIntl.IntlMixin;
var FormattedNumber = ReactIntl.FormattedNumber;

module.exports = React.createClass({
  mixins:[IntlMixin],
  render: function(){
    var people = this.props.data.map(function(item, idx){
      return (
        <i className="glyphicon glyphicon-user" title={item.who} key={idx}/>
      );
    });

    var totals = this.props.data.reduce(function(result, current){
      current.gender == 'M' ? result.m++ : result.f++;      
      return result;
    }, {m:0, f:0});

    var percentageBoy = parseInt(totals.m / this.props.data.length * 100);
    var percentageGirl = parseInt(totals.f / this.props.data.length * 100);

    var runningTotal = 0;
    for(var i=0;i<this.props.data.length;i++){
      runningTotal += parseInt(this.props.data[i].weight);
    }
    var average = runningTotal / this.props.data.length;       

    var boyPctStyle = {width: percentageBoy + '%' };
    var girlPctStyle = {width: percentageGirl + '%' };


    return (
      <div className="container">            
        <label className="display-block">Guessed so far: </label><br/>
        {people}
        ({this.props.data.length})
        <hr/>
        <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={boyPctStyle}>
            {boyPctStyle.width} said boy
          </div>
        </div>

        <div className="progress">
          <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={girlPctStyle}>
            {girlPctStyle.width} said girl
          </div>
        </div>

      </div>
    );
  }
});