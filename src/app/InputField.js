/* eslint-disable react/jsx-no-bind */

import React from 'react';

import AllergenList from './AllergenList';
import RecipeResultsButton from './RecipeResultsButton';

import superagent from 'superagent';

class InputField extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      allergenList: [],
      appID: $notHere,
      appKey: $notHere,
      baseAPIurl: 'https://api.edamam.com/search',
      commonAllergens: [],
      commonAllergenValues: {
      },
      userFacingCommonAllergens: {
        'Dairy-Free': 'Dairy',
        'Gluten-Free': 'Gluten',
        'Egg-Free': 'Eggs',
        'Peanut-Free': 'Peanuts',
        'Tree-Nut-Free': 'Tree Nuts',
        'Soy-Free': 'Soy',
        'Fish-Free': 'Fish',
        'Shellfish-Free': 'Shellfish'
      },
      newAllergen: '',
      noResults: false,
      receiveInput: true,
      recipeSearchString: '',
      recipesWithAllergens: [],
      recipesWithoutAllergens: []
    };
  }

  // add boolean values for common allergies
  handleAddCommonAllergen(event) {
    const list = this.state.commonAllergenValues;
    const key = event.target.value;
    const bool = event.target.checked;
    list[key] = bool;
    this.setState({commonAllergenValues: list});
  }

  handleOnChange(event) {
    event.onChange.bind(event);
  }

  filterCommonAllergens() {
    const commonAllergensToAvoid = [];
    for (const key in this.state.commonAllergenValues) {
      if (this.state.commonAllergenValues[key] === true) {
        commonAllergensToAvoid.push(key);
      }
    }
    this.setState(
      {commonAllergens: commonAllergensToAvoid},
      // function() {
      //   return;
      // }
    );
  }

  findAllergenInRecipes() {
    const that = this;
    const allergenRecipes = [];
    const noAllergenRecipes = [];
    this.state.searchResultRecipes.forEach(recipe => {
      for (let x = 0; x < that.state.commonAllergens.length; x++) {
        if (recipe.healthLabels.indexOf(that.state.commonAllergens[x]) === -1) {
          recipe.allergenFound = true;
          recipe.allergens.push(that.state.userFacingCommonAllergens[that.state.commonAllergens[x]]);
          that.state.searchResultRecipes.allergenFound = true;
        }
      }
      for (let x = 0; x < that.state.allergenList.length; x++) {
        const allergen = that.state.allergenList[x].toLowerCase();
        if (recipe.ingredients.indexOf(allergen) !== -1) {
          recipe.allergens.push(allergen);
          recipe.allergenFound = true;
          that.state.searchResultRecipes.allergenFound = true;
        }
      }
      if (recipe.allergenFound) {
        allergenRecipes.push(recipe);
      } else {
        noAllergenRecipes.push(recipe);
      }
    });
    this.setState({recipesWithAllergens: allergenRecipes, recipesWithoutAllergens: noAllergenRecipes});
  }

  getCompressedResultsList() {
    const compressedRecipeList = [];
    for (let x = 0; x < 10; x++) {
      const currentRecipe = this.state.searchResults[x];
      const ingredients = currentRecipe.recipe.ingredients.map(x => {
        return x.food;
      });
      const compressedRecipe = {
        ingredients,
        name: currentRecipe.recipe.label,
        healthLabels: currentRecipe.recipe.healthLabels,
        url: currentRecipe.recipe.url,
        allergens: []
      };
      compressedRecipeList.push(compressedRecipe);
    }
    this.setState({searchResultRecipes: compressedRecipeList});
  }

  handleQuery(event) {
    event.preventDefault();
    this.filterCommonAllergens();
    if (this.state.recipeSearchString.length > 0) {
      this.sendRecipeQuery()
        .then(
          response => {
            this.setState({searchResults: response.hits});
            this.processSearchResults();
          },
          err => {
            console.log(err);
            this.setState({noResults: true});
          }).then(() => {
            this.findAllergenInRecipes();
          }).then(() => {
            this.setState({receiveInput: false});
          });
    }
  }

  // alter newAllergen to reflect the value of the input field
  onChange(event) {
    this.setState({newAllergen: event.target.value});
  }

  handleOnRecipeChange(event) {
    this.setState({recipeSearchString: event.target.value});
  }

  processSearchResults() {
    if (this.state.searchResults.length === 0) {
      this.setState({noResults: true});
    } else {
      this.getCompressedResultsList();
    }
  }

  handleRecordAllergen(event) {
    event.preventDefault();
    this.state.allergenList.push(this.state.newAllergen);
    this.setState({newAllergen: ''});
  }

  sendRecipeQuery() {
    return new Promise((resolve, reject) => {
      superagent.get(this.state.baseAPIurl)
      // const url = this.state.baseAPIurl;
      .query({
        q: this.state.recipeSearchString,
        app_id: this.state.appID,
        app_key: this.state.appKey
      })
      .end((err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
    });
  }

  reset() {
    this.setState({
      allergenList: [],
      commonAllergens: [],
      commonAllergenValues: {
      },
      newAllergen: '',
      noResults: false,
      receiveInput: true,
      recipeSearchString: '',
      recipesWithAllergens: [],
      recipesWithoutAllergens: []
    });
  }

  render() {
    let input;
    if (this.state.receiveInput) {
      let customAllergenList;
      if (this.state.allergenList.length > 0) {
        customAllergenList = (
          <AllergenList allergens={this.state.allergenList}/>
        );
      } else {
        customAllergenList = null;
      }

      input = (
        <div>
          <h4>Common Allergens (Check any or none)</h4>
          <form className="flex-row-to-column allergen-list-form">
            <label><input type="checkbox" value="Dairy-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Dairy</label>
            <label><input type="checkbox" value="Gluten-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Gluten</label>
            <label><input type="checkbox" value="Egg-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Eggs</label>
            <label><input type="checkbox" value="Peanut-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Peanuts</label>
            <label><input type="checkbox" value="Tree-Nut-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Tree Nuts</label>
            <label><input type="checkbox" value="Soy-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Soy</label>
            <label><input type="checkbox" value="Fish-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Fish</label>
            <label><input type="checkbox" value="Shellfish-Free" onChange={this.handleAddCommonAllergen.bind(this)}/>Shellfish</label><br/>
          </form>
          <div>
            <h4>Add Additional Allergens:</h4>
            <form onSubmit={this.handleRecordAllergen.bind(this)} className="flex-row-to-column centered">
              <input className="emphatic-border text-field" type="text" placeholder="Type in an allergen" onChange={this.onChange.bind(this)} value={this.state.newAllergen}/>
              <input className="btn" type="submit" value="Add an allergen"/>
            </form>
            {customAllergenList}
          </div>
          <div>
            <h4>Search</h4>
            <form onSubmit={this.handleQuery.bind(this)} className="flex-row-to-column centered">
              <input className="emphatic-border text-field" type="text" placeholder="Type in a recipe name" onChange={this.handleOnRecipeChange.bind(this)} value={this.state.recipeSearchString}/>
              <input className="btn" type="submit" value="Search!"/>
            </form>
          </div>
        </div>
      );
    } else {
      input = null;
    }
    const resetButton = (
      <button className="btn big" onClick={this.reset.bind(this)}>Search Again</button>
    );
    let resultField;
    if (!this.state.receiveInput && !this.state.noResults) {
      resultField = (
        <div>
          <h4>You searched for: {this.state.recipeSearchString}</h4>
          <RecipeResultsButton recipesWithoutAllergens={this.state.recipesWithoutAllergens} recipesWithAllergens={this.state.recipesWithAllergens}/>
          {resetButton}
        </div>
      );
    } else {
      resultField = null;
    }
    let noResultsMessage;
    if (this.state.noResults) {
      noResultsMessage = (
        <div>
          <h4 className="msg msg-warning">No results! Try again!</h4>
          {resetButton}
        </div>
      );
    } else {
      noResultsMessage = null;
    }

    return (
      <div>
        {input}
        {resultField}
        {noResultsMessage}
      </div>
    );
  }
}

export default InputField;
