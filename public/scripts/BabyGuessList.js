"use strict";

var React = require('react');
var ReactIntl = require('react-intl');
var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;

module.exports = React.createClass({  
  mixins: [IntlMixin],
  render: function(){   
    var rows = this.props.data.map(function(item, idx){
      return (
        <tr key={idx}>
          <td>{item.who}</td>
          <td>{item.gender}</td>
          <td>
            <FormattedDate value={item.dob} day="numeric" month="long" year="numeric"/>
          </td>
          <td>{item.weight} {item.weightUnit}</td>
          <td>
            <FormattedDate value={item.submitted}  day="numeric" month="long" year="numeric" hour="numeric" minute="numeric" second="numeric" />
          </td>
        </tr>
      );
    });    
    
    return (
      <div className={'app-section ' + this.props.className}>
        <h2 className="app-section-header">All Results</h2>
        <table className="table table-striped">
          <tr>
            <th>Who?</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Weight</th>
            <th>Submitted</th>
          </tr>
          {rows}
        </table>
      </div>
    );
  }
});