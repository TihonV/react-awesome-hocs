import React, { Component } from "react";
import PropTypes from "prop-types";

import { makeDebounced } from "../fields";

const DebouncedField = makeDebounced(p => <input {...p} />);
DebouncedField.displayName = "CustomDebouncedField";

export default class extends Component {
  static displayName = `Story(${DebouncedField.displayName || "Component"})`;
  static getDerivedStateFromProps({ value }, { externalValue }) {
    return { externalValue: externalValue };
  }

  constructor(props) {
    super(props);

    this.state = {
      externalValue: `${props.value}`
    };
  }

  render() {
    const { externalValue } = this.state;

    return (
      <div>
        <h1>Current value: {externalValue || '"Not found"'}</h1>
        <DebouncedField
          value={externalValue}
          onChange={(e, v) => {
            this.setState({ externalValue: v }, this.props.onChange);
          }}
          type="text"
        />
        <button
          onClick={() => {
            this.setState({ externalValue: "default" }, this.props.onChange);
          }}
        >
          Set default
        </button>
      </div>
    );
  }
}
