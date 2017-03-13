/* eslint-disable react/prop-types */
import React from 'react';

class AllergenItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergens: []
    };
  }

  render() {
    return (
      <li>{this.props.data}</li>
    );
  }
}

export default AllergenItem;
