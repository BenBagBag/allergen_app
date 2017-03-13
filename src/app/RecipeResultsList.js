/* eslint-disable react/prop-types */
import React from 'react';

import RecipeItem from './RecipeItem';

class RecipeResultsList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergens: []
    };
  }

  render() {
    return (
      <div>
        <h4>We found these recipes {this.props.allergenStatement}:</h4>
        <h6>(Click on a recipe name to see the full recipe)</h6>
        <ul className="noDecoration">
          {this.props.recipes.map((result, i) => {
            return <RecipeItem key={i} recipe={result}/>;
          })}
        </ul>
      </div>
    );
  }
}

export default RecipeResultsList;
