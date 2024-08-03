import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [editableRecipeIndex, setEditableRecipeIndex] = useState(-1);

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIngredientNameChange = (e) => {
    setIngredientName(e.target.value);
  };

  const handleIngredientQuantityChange = (e) => {
    setIngredientQuantity(e.target.value);
  };

  const handleAddIngredient = () => {
    const newIngredient = { name: ingredientName, quantity: ingredientQuantity };
    setIngredients([...ingredients, newIngredient]);
    setIngredientName('');
    setIngredientQuantity('');
  };

  const handleCreateRecipe = () => {
    const newRecipe = { title, description, ingredients };
    setRecipes([...recipes, newRecipe]);
    setTitle('');
    setDescription('');
    setIngredients([]);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  const handleUpdateIngredient = (recipeIndex, ingredientIndex, updatedIngredient) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[recipeIndex].ingredients[ingredientIndex] = updatedIngredient;
    setRecipes(updatedRecipes);
  };

  const handleUpdateTitle = (index, updatedTitle) => {
    const updatedRecipes = [...recipes];
    updatedRecipes[index].title = updatedTitle;
    setRecipes(updatedRecipes);
  };

  const handleEditRecipe = (index) => {
    setEditableRecipeIndex(index);
  };

  const handleSaveRecipe = () => {
    setEditableRecipeIndex(-1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
          <label>
            Recipe Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <br />
          <label>
            Recipe Description:
            <textarea value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <label>
            Ingredient Name:
            <input type="text" value={ingredientName} onChange={handleIngredientNameChange} />
          </label>
          <label>
            Ingredient Quantity:
            <input type="text" value={ingredientQuantity} onChange={handleIngredientQuantityChange} />
          </label>
          <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
          <br />
          <button type="button" onClick={handleCreateRecipe}>Create Recipe</button>
        </form>
        <h2>Recipes:</h2>
        {recipes.map((recipe, recipeIndex) => (
          <div key={recipeIndex}>
            <h3>
              {editableRecipeIndex === recipeIndex ? (
                <input  
                  type="text"
                  value={recipe.title}
                  onChange={(e) => handleUpdateTitle(recipeIndex, e.target.value)}
                />
              ) : (
                recipe.title
              )}
            </h3>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ingredient, ingredientIndex) => (
                <li key={ingredientIndex}>
                  {editableRecipeIndex === recipeIndex ? (
                    <>
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) =>
                          handleUpdateIngredient(recipeIndex, ingredientIndex, {
                            ...ingredient,
                            name: e.target.value,
                          })
                        }
                      />
                      -
                      <input
                        type="text"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleUpdateIngredient(recipeIndex, ingredientIndex, {
                            ...ingredient,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </>
                  ) : (
                    `${ingredient.name} - ${ingredient.quantity}`
                  )}
                </li>
              ))}
            </ul>
            {editableRecipeIndex === recipeIndex ? (
              <button type="button" onClick={handleSaveRecipe}>Save</button>
            ) : (
              <button type="button" onClick={() => handleEditRecipe(recipeIndex)}>Edit</button>
            )}
            <button type="button" onClick={() => handleDeleteRecipe(recipeIndex)}>Delete Recipe</button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
