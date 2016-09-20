import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import classNames from 'classnames';

class MultiSelect extends React.Component {
  constructor(defaultProps) {
    super();

    this.state = {
      showMultiSelectBox: false,
      selectedIndexes: defaultProps.initialSelectedIndexes,
      enabled: defaultProps.enabled,
      optionsData: defaultProps.optionsData,
      customEventListener: defaultProps.customEventListener
    };

    this._handleClick = this._handleClick.bind(this);
    this._selectedIndexesCallback = this._selectedIndexesCallback.bind(this);
    this._eventListeners = this._eventListeners.call(this);
  }
  _eventListeners() {
    if (this.state.customEventListener) {
      window.addEventListener(this.state.customEventListener, (event) => {
        this.setState({
          optionsData: event.detail.optionsData,
          enabled: event.detail.enabled,
          selectedIndexes: event.detail.selectedIndexes,
          showMultiSelectBox: event.detail.showMultiSelectBox
        });
      });
    }
  }
  _handleClick() {
    this.setState({
      showMultiSelectBox: !this.state.showMultiSelectBox
    });
  }
  _selectedIndexesCallback(selectedIndex) {
    if (this.state.selectedIndexes !== null) {
      let tmpselectedIndexes = (this.state.selectedIndexes.indexOf(selectedIndex) !== -1) ?
        this.state.selectedIndexes.filter((i) => {
          return i !== selectedIndex;
        }) : [...this.state.selectedIndexes, selectedIndex];

      this.setState(() => ({
        selectedIndexes: tmpselectedIndexes
      }), () => {
        if (typeof this.props.selectedOptionsCallback === 'function') {
          this.props.selectedOptionsCallback(this.state.selectedIndexes);
        }
      });
    }
  }
  _getOptions() {
    const optionsList = this.state.optionsData;
    if (optionsList !== undefined && optionsList !== null) {
      return optionsList.map((option, i) => {
        let selected = false;
        if (this.state.selectedIndexes !== null) {
          for (let j of this.state.selectedIndexes) {
            if (j === i) {
              selected = true;
            }
          }
        }
        return (
          <ListItem
            key={i}
            index={i}
            className='multi-select-box__item'
            value={option}
            selected={selected}
            selectedIndexesCallback={this._selectedIndexesCallback}
          />
        );
      });
    }
  }
  _generateLabel(options = []) {
    let labelArray = [];
    if (options.length > 0) {
      for (let option of options) {
        if (option.props.selected) {
          labelArray.push(option.props.value);
        }
      }
    }
    return labelArray.length > 0 ? labelArray.join(', ') : this.props.dropDownLabel;
  }
  render() {
    const options = this._getOptions();
    const label = this._generateLabel(options);
    const multiSelectBoxHtmlClasses = classNames('multi-select-box', {
      'multi-select-box--is-disabled': !this.state.enabled
    });
    const itemHtmlClasses = classNames('multi-select-box__dropdown', {
      'multi-select-box__dropdown--is-active': this.state.showMultiSelectBox
    });

    let multiSelectNodes;
    if (this.state.showMultiSelectBox) {
      multiSelectNodes = options;
    }

    return (
      <div className={multiSelectBoxHtmlClasses}>
        <div
          className={itemHtmlClasses}
          onClick={this._handleClick}>
          <span className="multi-select-box__label">{label}</span>
        </div>
        <i className="fa fa-chevron-down multi-select-box__icon"></i>
        <section className="multi-select-box__options">
          <ul>
            {multiSelectNodes}
          </ul>
        </section>
      </div>
    );
  }
}

MultiSelect.PropTypes = {
  label: PropTypes.string.isRequired,
  initialSelectedIndexes: PropTypes.array.isRequired,
  enabled: PropTypes.bool.isRequired,
  optionsData: PropTypes.array.isRequired
};

export default MultiSelect;
