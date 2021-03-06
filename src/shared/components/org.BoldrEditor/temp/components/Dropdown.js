import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

import DropdownItem from "./DropdownItem";
import icons from "../icons";


export default class Dropdown extends Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired
      })
    ),
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleDocumentClick = ::this.handleDocumentClick;
    this.toggleDropDown = ::this.toggleDropDown;
    this.preventSelection = ::this.preventSelection;
    this.renderItem = ::this.renderItem;
  }

  onChange(selected) {
    this.props.onChange(selected);
  }

  renderItem(item) {
    return(
      <li key={item.key}>
        <DropdownItem item={item}
          className="dropdown__option"
          onClick={() => this.onChange(item.key)} />
      </li>
    );
  }

  preventSelection(event) {
    event.preventDefault();
  }

  toggleDropDown(event) {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.setState({isOpen: false});
    }
  }

  componentDidMount () {
    document.addEventListener("click", this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener("click", this.handleDocumentClick, false);
  }

  render() {

    if (!this.props.items || this.props.items && this.props.items.length <= 0) {
      return null;
    }

    const selectedItem = this.props.items.filter(
      (obj) => {return obj.key === this.props.selected;}
    )[0];

    const {isOpen} = this.state;

    const wrapperClassName = classNames("dropdown__wrapper", {
      "dropdown__wrapper--open": isOpen
    });

    const dropdownClassName = classNames("dropdown", {
      "dropdown--open": isOpen
    });

    const arrowClassName = classNames("dropdown__arrow", {
      "dropdown__arrow--open": isOpen
    });

    return(
      <div className={wrapperClassName} onClick={this.toggleDropDown}>
        <DropdownItem
          item={selectedItem}
          className="dropdown__item--selected"
          onMouseDown={this.preventSelection}>

          <icons.DropdownArrow className={arrowClassName} />
        </DropdownItem>

        <ul className={dropdownClassName}>
          {this.props.items.map(this.renderItem)}
        </ul>
      </div>
    );
  }
}
