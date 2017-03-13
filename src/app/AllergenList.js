/* eslint-disable react/prop-types */
import React from 'react';

import AllergenItem from './AllergenItem';

class AllergenList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergens: []
    };
  }
  render() {
    return (
      <div>
        <h4>Your allergens are:</h4>
        <div>
          <ul>
            {this.props.allergens.map((result, i) => {
              return <AllergenItem key={i} data={result}/>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default AllergenList;
