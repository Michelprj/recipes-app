import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/index';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/profile';
import DoneRecipes from './pages/doneRecipes';
import FavoriteRecipes from './pages/favoriteRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from './pages/recipeDetails';
import RecipeInProgress from './pages/recipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Meals /> } />
      <Route path="/drinks" element={ <Drinks /> } />

      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />

      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />

      <Route path="/profile" element={ <Profile /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
    </Routes>
  );
}

export default App;
