import React from "react";
import { useState } from "react";



export default function Main(){
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = React.useState([])
    const [newIngredient , setNewIngredient] = React.useState([])
    const ingredientListItems = ingredients.map((ingredient)=>{
        return(
            <li key={ingredient}>{ingredient}</li>
        )
    })

    function handleInputChange(event){
      setNewIngredient(event.target.value)
    }

    function addIngredient(event){
        event.preventDefault();
        //const Ingredient = formData("ingredient")
        //const newIngredient = FormData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients , newIngredient])
        setNewIngredient("");
    }




    async function fetchRecipe() {
      setLoading(true);
      setRecipe(null);
  
      const inputIngredients = ingredients.join(", ");
      try {
        const response = await fetch("https://api-inference.huggingface.co/models/flax-community/t5-recipe-generation", {
          method: "POST",
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: `Ingredients: ${inputIngredients}. Suggest a recipe.` }),
        });
  
        const result = await response.json();
        if (response.ok && result) {
          setRecipe(result[0]?.generated_text || "No recipe found.");
        } else {
          setRecipe("Error fetching the recipe. Please try again.");
        }
      } catch (error) {
        setRecipe("Error fetching the recipe. Please try again.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    function resetForm() {
      setIngredients([]);
      setNewIngredient("");
      setRecipe(null);
    }










  return (
    <main className="main">
      <form onSubmit={addIngredient} className="ingredient-form">
        <input
          type="text"
          placeholder="eg flour: also make sure to be as clear as you can"
          arial-label="add your ingredients"
          name="ingredient"
          value={newIngredient}
          onChange={handleInputChange}
        />
        <button className="submit">Add Ingredients</button>
        
      </form>
      
      {ingredients.length>0 &&<section>
        <h2>Here are the ingredients you have suggested:</h2>
        <ul>
            {ingredientListItems}
      </ul>
        {ingredients.length > 0 && <div className="obtain-recipe">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe for your list of ingredients</p>
          </div>
          <button className="fetch-button" onClick={fetchRecipe} disabled={loading}>
          {loading ? "Fetching..." : "Get Your Recipe"}
          </button>
        </div>}
        {recipe && (
            <div className="recipe-output">
             
              <h3>Suggested Recipe:</h3>
              <p>{recipe}</p>
              <button className="reset-button" onClick={resetForm}>
                Start Over
              </button>
              
            </div>
          )}
      </section>}
    </main>
  );
}