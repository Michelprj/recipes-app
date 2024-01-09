import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category, DrinkType, MealType, Recipe } from '../types';

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // --
  const sizeRecipes = Math.min(12, filteredRecipes.length);
  const sizeCategories = Math.min(5, categories.length);
  const location = useLocation();
  const path = location.pathname;
  // --

  useEffect(
    () => {
      const fetchMeals = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals } = await response.json();
        const simplifiedMeals = meals.map((meal: MealType) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
        const response2 = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const { meals: category } = await response2.json();
        setRecipes(simplifiedMeals);
        setCategories(category);
        setFilteredRecipes(simplifiedMeals);
      };
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const { drinks } = await response.json();
        const simplifiedDrinks = drinks.map((drink: DrinkType) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
        const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const { drinks: category } = await response2.json();
        setRecipes(simplifiedDrinks);
        setCategories(category);
        setFilteredRecipes(simplifiedDrinks);
      };
      // setLoading(true);
      if (path === '/meals') fetchMeals();
      if (path === '/drinks') fetchDrinks();
    // setLoading(false);
    },
    [path],
  );

  useEffect(
    () => {
      const filterMeals = async () => {
        if (filteredCategories.length === 0) {
          setFilteredRecipes(recipes);
          return;
        }
        const cat = filteredCategories[0].strCategory;
        console.log(cat);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const { meals } = await response.json();
        const simplifiedMeals = meals.map((meal: MealType) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
        console.log(meals);
        setFilteredRecipes(simplifiedMeals);
      };
      const filterDrinks = async () => {
        if (filteredCategories.length === 0) {
          setFilteredRecipes(recipes);
          return;
        }
        const cat = filteredCategories[0].strCategory;
        console.log(cat);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const { drinks } = await response.json();
        const simplifiedDrinks = drinks.map((drink: DrinkType) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
        console.log(drinks);
        setFilteredRecipes(simplifiedDrinks);
      };
      setLoading(true);
      if (path === '/meals') filterMeals();
      if (path === '/drinks') filterDrinks();
      setLoading(false);
    },
    [filteredCategories],
  );
  // --

  const resetFilters = () => {
    setFilteredCategories([]);
  };
  if (loading) return <div>Loading...</div>;

  const handleIcons = (category: string) => {
    switch (category) {
      case 'Beef':
        return '/beefIcon.svg';

      case 'Breakfast':
        return '/breakfastIcon.svg';

      case 'Chicken':
        return '/chickenIcon.svg';

      case 'Dessert':
        return '/dessertIcon.svg';

      case 'Goat':
        return '/goatIcon.svg';

      case 'Ordinary Drink':
        return '/ordinaryIcon.svg';

      case 'Cocktail':
        return '/cocktailIcon.svg';

      case 'Shake':
        return '/shakeIcon.svg';

      case 'Other / Unknown':
        return '/otherIcon.svg';

      case 'Cocoa':
        return '/cocoaIcon.svg';

      default:
        return 'icons';
    }
  };

  return (
    <div>
      <div className="container-iconsCategory">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ resetFilters }
          className="icon-category"
        >
          <img
            src={ path === '/meals'
              ? '/allIcon.svg'
              : '/allDrinksIcon.svg' }
            alt="All Icon"
          />
        </button>
        { categories.slice(0, sizeCategories).map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => {
              if (filteredCategories.includes(category)) {
                setFilteredCategories(filteredCategories
                  .filter((cat) => cat !== category));
              } else {
                setFilteredCategories([category]);
              }
            } }
            className="icon-category"
          >
            <img
              src={ handleIcons(category.strCategory) }
              alt="Icon Category"
            />
          </button>
        ))}
      </div>
      <div className="container-all-recipes">
        { filteredRecipes.slice(0, sizeRecipes).map((recipe, index) => (
          <Link
            key={ index }
            to={ `${path}/${recipe.id}` }
            data-testid={ `${index}-recipe-card` }
          >
            <div className="container-card-category">
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
