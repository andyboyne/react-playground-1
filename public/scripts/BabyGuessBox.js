"use strict";

var $ = require('jquery');
var React = require('react');

module.exports = React.createClass({
   getInitialState: function() {
    return {
      data: [],
      submitted : false
    };
  },
  fetchData: function() {    
    $.ajax({ 
      url: '/guesses',
      dataType: 'json',
      cache: false,
      success: function(data) {
        data.forEach(function(x){
          x.submitted = new Date(x.submitted);
        });

        data.sort(function(x,y){
          return x.submitted < y.submitted;
        });

        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  submitGuess:function(guess){    
    var guesses = this.state.data;
    guesses.unshift(guess);
    this.setState({
      data: guesses,
      submitted : true
    }, function(){
        $.ajax({
              url: '/guess',
              method: 'POST',
              dataType: 'json',
              cache: false,
              data : guess,
              success: function(data) {
                this.fetchData();
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
            });
    });     
  },
  componentDidMount: function() {
    this.fetchData();    
  },
  render: function() {    
    var BabyGuessDashboard = require('./BabyGuessDashboard');
    var BabyGuessForm = require('./BabyGuessForm');
    var BabyThanks = require('./BabyThanks');
    var BabyGuessList = require('./BabyGuessList');

    return (
      <div className="container">
        <h1 className="app-header">Guess the Baby!</h1>
        <BabyGuessDashboard data={this.state.data}/>
        <BabyGuessForm onSubmitted={this.submitGuess}/>        
        <BabyThanks className={this.state.submitted ? 'visible' : 'hidden'}/>
        <BabyGuessList data={this.state.data} className={this.state.submitted ? 'visible' : 'hidden'}/>
      </div>
    );
  }
});