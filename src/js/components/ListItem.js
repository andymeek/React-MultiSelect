import React, { PropTypes } from 'react';
import classNames from 'classnames';

class ListItem extends React.Component {
  constructor(defaultProps) {
    super();
    this.state = {
      selected: defaultProps.selected
    };

    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    if (typeof this.props.selectedIndexesCallback === 'function') {
      this.props.selectedIndexesCallback(this.props.index);
    }
    this.setState(() => ({
      selected: !this.state.selected
    }));
  }
  render() {
    let itemHtmlClasses = classNames(this.props.className, {
      'multi-select-box__item--is-active': this.state.selected
    });
    return (
      <li
        onClick={this._handleClick}
        className={itemHtmlClasses}>
        {this.props.value}
      </li>
    );
  }
}

ListItem.PropTypes = {
  key: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  selectedIndexesCallback: PropTypes.func.isRequired
};

export default ListItem;