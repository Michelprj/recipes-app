import { useContext } from 'react';
import Header from '../components/header/index';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import SearchContext from '../context/SearchContext';

function Meals() {
  const { values } = useContext(SearchContext);
  return (
    <>
      <Header
        iconPage="/iconDish.svg"
        endIngredients={ `https://www.themealdb.com/api/json/v1/1/filter.php?i=${values.search}` }
        endName={ `https://www.themealdb.com/api/json/v1/1/search.php?s=${values.search}` }
        endFirstLetter={ `https://www.themealdb.com/api/json/v1/1/search.php?f=${values.search}` }
      >
        Meals

      </Header>
      <Recipes />
      <Footer />
    </>
  );
}

export default Meals;
