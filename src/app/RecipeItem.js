/* eslint-disable react/prop-types */
import React from 'react';

class RecipeItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergens: []
    };
  }
  render() {
    let allergensList;
    if (this.props.recipe.allergenFound) {
      const formattedAllergens = this.props.recipe.allergens.join(', ');
      allergensList = (
        <li className="bold-green">Allergens found: {formattedAllergens}</li>
      );
    } else {
      allergensList = null;
    }
    const ingredientsListFormatted = this.props.recipe.ingredients.join(', ');
    return (
      <li>
        <a href={this.props.recipe.url} target="_blank" rel="noopener noreferrer">{this.props.recipe.name}</a>
        <ul>
          {allergensList}
          <li>Ingredients: {ingredientsListFormatted}</li>
        </ul>
      </li>
    );
  }
  }

export default RecipeItem;
