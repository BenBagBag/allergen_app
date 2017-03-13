/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */

import React from 'react';

import RecipeResultsList from './RecipeResultsList';

class RecipeResultsButton extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergens: [],
      listType: '',
      shouldDisplayList: false
    };
  }

  displayList(event) {
    event.preventDefault();
    this.setState({shouldDisplayList: true, listType: event.target.value});
  }

  render() {
    let allergenFound;
    if (this.props.recipesWithAllergens.length > 0) {
      allergenFound = (
        <button onClick={this.displayList.bind(this)} value="allergens" className="btn big green">See Recipes With Allergens</button>
      );
    } else {
      allergenFound = null;
    }

    let allergenFree;
    if (this.props.recipesWithoutAllergens.length > 0) {
      allergenFree = (
        <button onClick={this.displayList.bind(this)} value="noAllergens" className="btn big blue">See Recipes Without Allergens</button>
      );
    } else {
      allergenFree = null;
    }

    let recipeList;
    if (this.state.shouldDisplayList && this.state.listType === 'allergens') {
      recipeList = (
        <div>
          <RecipeResultsList recipes={this.props.recipesWithAllergens} allergenStatement="with allergens"/>
        </div>
      );
    } else if (this.state.shouldDisplayList) {
      recipeList = (
        <div>
          <RecipeResultsList recipes={this.props.recipesWithoutAllergens} allergenStatement="without allergens"/>
        </div>
      );
    } else {
      recipeList = null;
    }

    return (
      <div>
        {allergenFree}
        {allergenFound}
        {recipeList}
      </div>
    );
  }
}

export default RecipeResultsButton;
