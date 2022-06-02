import React, { Component } from "react";
import ReactDOM from "react-dom";

const MODAL_STYLE = {
  position: "fixed",
  top: "80px",
  left: "50%",
  backgroundColor: "#fff",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .4)",
};

class CartModal extends Component {
  render() {
    if (!this.props.display) return null;
    return ReactDOM.createPortal(
      <>
        <div style={OVERLAY_STYLE}>
          <div style={MODAL_STYLE}>
            <span>Text</span>

            <div>Test Portal</div>
            <button>Click</button>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  }
}

export default CartModal;
