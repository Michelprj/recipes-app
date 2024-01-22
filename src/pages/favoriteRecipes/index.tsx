import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../../components/header/index';
import ShareButton from '../../components/ShareButton';
import favoriteIconBlack from '../../images/blackHeartIcon.svg';
import './style.css';

type FavRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  name: string,
  alcoholicOrNot: string,
  image: string,
  tags: string[],
};

function FavoriteRecipes() {
  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const [favRecipes, setFavRecipes] = useState<FavRecipeType[]>(getFavorite);
  const [isFavorite, setIsFavorite] = useState<boolean[]>(favRecipes.map(() => false));

  const mealOrDrink = (recipe: FavRecipeType, index: any) => {
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

  const handleFavorite = (index: number) => {
    const updatedFavorites = [...favRecipes];
    updatedFavorites.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));

    const newIsFavorite = [...isFavorite];
    newIsFavorite.splice(index, 1);
    setIsFavorite(newIsFavorite);
    setFavRecipes(updatedFavorites);
  };

  const results = favRecipes.map((recipe, index) => (
    <div key={ recipe.id } className="container-done-recipes">
      <section>
        <Link
          key={ index }
          to={ `/${recipe.type}s/${recipe.id}` }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            className="img-recipe-done"
          />
        </Link>
        <div className="done-recipes-name">
          <Link
            key={ index }
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <h1 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h1>
          </Link>

          {mealOrDrink(recipe, index)}
        </div>

        <ShareButton index={ index } type={ recipe.type } id={ recipe.id } />

        <button
          onClick={ () => handleFavorite(index) }
          className="container-buttons-favorite"
        >
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src="/likeActive.svg"
            alt="FavoriteBlack"
          />
        </button>

        {/* {recipe.tags && recipe.tags.map((tag, indexx) => (
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
    const filtered = favRecipes.filter((recipe) => (
      recipe.type === whichType
    ));
    console.log(filtered);
    setFavRecipes(filtered);
    return filtered;
  };

  return (
    <>
      <Header
        endFirstLetter=""
        endName=""
        endIngredients=""
        iconPage="/iconFavorite.svg"
      >
        Favorite Recipes

      </Header>
      <div className="container-button-done">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFavRecipes(getFavorite) }
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
        {results}
      </div>
    </>
  );
}

export default FavoriteRecipes;
