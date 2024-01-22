import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeDetailsContext from '../../context/RecipeDetailsContext';
import '../recipeDetails/style.css';
import './style.css';

function RecipeInProgress() {
  const path = window.location.pathname;
  const type = path.split('/')[1];
  const { id }: any = useParams();
  const navigate = useNavigate();
  const newPath = path.slice(1);
  const indexCaractere = newPath.indexOf('/');
  const pathNameForStorage = newPath.slice(0, indexCaractere - 1);
  const { ingredients, measure, pageDrinks, pageMeals, recipe,
    handleCopyClick, copyLink } = useContext(RecipeDetailsContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipesInProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes')
    || JSON.stringify({ meals: {}, drinks: {} }));
  const thisRecipe = recipesInProgress[`${type}`][`${id}`] || [];
  const [ingredientsDone, setIngredientsDone] = useState<string[]>([]);

  const teste = () => {
    const filteredIngredients = ingredients
      .filter((ingredient) => ingredient !== null && ingredient.length > 0);
    return (filteredIngredients.length === ingredientsDone.length);
  };
  if (thisRecipe.length === 0) {
    const newRecipeInProgress = {
      ingredientsDone: [],
    };
    const newStorage = JSON.parse(JSON.stringify(recipesInProgress));
    newStorage[`${type}`][`${id}`] = newRecipeInProgress;
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }
  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}/in-progress`) {
        pageMeals(id);
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        getFavorite
          .forEach((recipeFavorite: any) => {
            if (recipeFavorite.id.includes(id)) {
              setIsFavorite(true);
            }
          });
      }
      if (path === `/drinks/${id}/in-progress`) {
        pageDrinks(id);
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        getFavorite
          .forEach((recipeFavorite: any) => {
            if (recipeFavorite.id.includes(id)) {
              setIsFavorite(true);
            }
          });
      }
    };
    requestApi();
    setIngredientsDone(JSON.parse(localStorage.getItem(id) || '[]'));
  }, []);
  useEffect(() => {
    if (thisRecipe && thisRecipe.length > 0) {
      const newIngredientsDone = thisRecipe;
      console.log('aqui2');
      setIngredientsDone(newIngredientsDone);
    } else {
      const newIngredientsDone = ingredients
        .filter((ingredient) => ingredient !== null && ingredient.length > 0);
      console.log(newIngredientsDone);
    }
  }, [ingredients]);
  const handleFavorite = () => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavorite = {
      id,
      type: pathNameForStorage,
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    };
    if (isFavorite) {
      const removeStorage = getFavorite
        .filter((recipeFavorite: any) => (
          !recipeFavorite.id.includes(id)
        ));
      setIsFavorite(false);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(removeStorage));
    } else {
      setIsFavorite(true);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...getFavorite, newFavorite]));
    }
  };
  const handleRecipeDone = () => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipe = {
      id,
      nationality: recipe[0].strArea || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      category: recipe[0].strCategory || '',
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
      tags: recipe[0].strTags?.split(',') || [],
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      type: pathNameForStorage,
      doneDate: new Date().toISOString(),
    };
    const removeStorage = recipesInProgress[`${type}`];
    delete removeStorage[`${id}`];
    localStorage
      .setItem('inProgressRecipes', JSON
        .stringify({ ...recipesInProgress, [`${type}`]: removeStorage }));
    localStorage
      .setItem('doneRecipes', JSON.stringify([...getDoneRecipes, newDoneRecipe]));
    navigate('/done-recipes');
  };
  console.log(recipe);
  return (
    <>
      {
        recipe.map((item) => (
          <div key={ id }>
            <div className="container-header-recipes">
              <img
                src={ item.strMealThumb || item.strDrinkThumb }
                alt="recipe"
                data-testid="recipe-photo"
                style={ { width: '100vw', height: 'auto' } }
              />
              <h1 data-testid="recipe-title">{item.strMeal || item.strDrink}</h1>
              {
          path === `/meals/${id}/in-progress`
            ? <p data-testid="recipe-category">{item.strCategory}</p>
            : <p data-testid="recipe-category">{item.strAlcoholic}</p>
          }
              <img
                src="/barRecipes.svg"
                alt="Barra Categoria / Alcoólica"
                className="bar-recipes-detais"
              />
              <img
                src={ path === `/meals/${id}/in-progress`
                  ? '/categoryRecipe.svg'
                  : '/categoryRecipeDrink.svg' }
                alt="Category"
                className="image-category-recipe"
              />
            </div>
            <div className="container-ingredients-recipes">
              <h2>Ingredients</h2>
              <div className="list-container-progress">
                <ul>
                  {
                ingredients.map((ingredient, index) => (
                  ingredient !== null && ingredient.length > 0
                    ? (
                      <label key={ index } className="container-list-progress">
                        <input
                          type="checkbox"
                          name={ ingredient }
                          value={ ingredients }
                          onChange={ () => {
                            let newIngredientsDone = [...ingredientsDone];
                            if (!newIngredientsDone.includes(ingredient)) {
                              newIngredientsDone = [...ingredientsDone, ingredient];
                            } else {
                              newIngredientsDone = newIngredientsDone
                                .filter((element) => element !== ingredient);
                            }
                            setIngredientsDone(newIngredientsDone);
                            let newStorage = recipesInProgress[`${type}`][`${id}`];
                            newStorage = newIngredientsDone;
                            localStorage
                              .setItem('inProgressRecipes', JSON
                                .stringify(
                                  { ...recipesInProgress,
                                    [`${type}`]:
                                      { ...recipesInProgress[`${type}`],
                                        [`${id}`]: newStorage } },
                                ));
                          } }
                          checked={ ingredientsDone.includes(ingredient) }
                        />
                        <li
                          data-testid={ `${index}-ingredient-step` }
                          style={
                              { textDecoration: ingredientsDone.includes(ingredient)
                                ? 'line-through solid rgb(0, 0, 0)' : 'none' }
                        }
                        >
                          {`${ingredient} ${measure[index]}`}

                        </li>
                      </label>
                    ) : null
                ))
          }
                </ul>
              </div>
            </div>
            <div className="container-instruction-recipes">
              <h2>Instructions</h2>
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>
            <button
              data-testid="finish-recipe-btn"
              className="btn-start-or-continue"
              onClick={ handleRecipeDone }
              disabled={ !teste() }
            >
              Finish Recipe
            </button>
            <div className="container-fullButton-and-text">
              <div className="container-buttons-recipes">
                <button
                  data-testid="share-btn"
                  style={ { marginBottom: '10vh' } }
                  onClick={ handleCopyClick }
                >
                  <img src="/buttonShare.svg" alt="Share" />
                </button>
                <button
                  onClick={ handleFavorite }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ !isFavorite ? '/likeDisable.png' : '/likeActive.svg' }
                    alt={ !isFavorite ? 'FavoriteWhite' : 'FavoriteBlack' }
                  />
                </button>
                <div className="text-link-copied">
                  {
            copyLink && <span>Link copied!</span>
            }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
}
export default RecipeInProgress;
