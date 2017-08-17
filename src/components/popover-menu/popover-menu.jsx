import React from 'react';

export default class PopoverMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const itemName = event.target.textContent;
    this.props.menuItems[itemName]();
    this.props.closeAction();
  }

  render() {
    const menuItems = Object.keys(this.props.menuItems).map(item => <li onClick={this.handleClick}>{item}</li>);
    return (
      <div className="popover-menu">
        <ul>
          {menuItems}
        </ul>
      </div>
    );
  }
}
