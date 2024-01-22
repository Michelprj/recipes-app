import { useState } from 'react';
import { DoneRecipeType } from '../../types';
import ShareButton from '../../components/ShareButton';
import Header from '../../components/header/index';
import './style.css';

function DoneRecipes() {
  const getDoneRecipes: DoneRecipeType[] = JSON
    .parse(localStorage.getItem('doneRecipes') || '[]');

  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>(getDoneRecipes);

  const mealOrDrink = (recipe: DoneRecipeType, index: any) => {
    if (recipe.type === 'meal') {
      return (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}` }
        </p>
      );
    } if (recipe.type === 'drink') {
      return (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </p>
      );
    }
  };

  const path = (window.location.href).split('/');

  const result = doneRecipes.map((recipe, index) => (
    <div key={ recipe.id } className="container-done-recipes">
      <section>
        <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            className="img-recipe-done"
          />
        </a>
        <div className="done-recipes-name">
          <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
            <h1
              data-testid={ `${index}-horizontal-name` }
              className="title-recipe"
            >
              { recipe.name }
            </h1>
          </a>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>
          {mealOrDrink(recipe, index)}
        </div>

        <ShareButton index={ index } type={ recipe.type } id={ recipe.id } />

        {/* {recipe.tags.map((tag, indexx) => (
          <a
            key={ indexx }
            href={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </a>
        ))} */}

      </section>
    </div>
  ));

  const filter = (whichType: string) => {
    const filtered = doneRecipes.filter((recipe) => (
      recipe.type === whichType
    ));
    console.log(filtered);
    setDoneRecipes(filtered);
    return filtered;
  };

  return (
    <>
      <Header
        endFirstLetter=""
        endName=""
        endIngredients=""
        iconPage="/iconDone.svg"
      >
        Done Recipes

      </Header>
      <div className="container-button-done">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setDoneRecipes(getDoneRecipes) }
        >
          <img src="/doneAll.svg" alt="All Icon" />
        </button>

        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => filter('meal') }
        >
          <img src="/doneFood.svg" alt="All Icon" />
        </button>

        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filter('drink') }
        >
          <img src="/doneDrinks.svg" alt="All Icon" />
        </button>
      </div>
      <div className="container-content-done">
        {result}
      </div>
    </>
  );
}

export default DoneRecipes;
