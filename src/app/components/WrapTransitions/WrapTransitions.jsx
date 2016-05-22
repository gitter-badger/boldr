import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class WrapTransitions extends Component {
  componentWillAppear(callback) {
    this._animateIn(callback);
  }

  _animateIn(callback) {
    const el = ReactDOM.findDOMNode(this);
    el.classList.remove('animated');
    el.classList.add('fadeIn');
    el.classList.add('animated');
    setTimeout(() => {
      callback();
    }, 2000);
  }

  _animateOut(callback) {
    const el = ReactDOM.findDOMNode(this);
    el.classList.remove('animated');
    el.classList.add('fadeOut');
    el.classList.add('animated');
    setTimeout(() => {
      callback();
    }, 2000);
  }

  componentWillEnter(callback) {
    this._animateIn(callback);
  }

  componentWillLeave(callback) {
    this._animateOut(callback);
  }
  getWrapClassName() {
    const className = [
      'bg-white'
    ];
    className.push('animated');
    if (this.props.out) {
      className.push(this.props.animateOut);
    } else {
      if (this.props.animateIn) {
        className.push(this.props.animateIn);
      }
    }
    return classNames(className);
  }
  render() {
    return (
      <div className={ this.getWrapClassName() }>
        {this.props.children}
      </div>
      );
  }
}

WrapTransitions.propTypes = {};
