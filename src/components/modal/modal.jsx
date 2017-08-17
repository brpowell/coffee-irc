import React from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  if (!this.props.show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <button onClick={this.props.onClose}>X</button>
        </div>
        {this.props.children}
      </div>
    </div>
  );
};

export default Modal;
