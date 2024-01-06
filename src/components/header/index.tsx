import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import { HeaderType } from '../../types';
import SearchContext from '../../context/SearchContext';
import './style.css';
import SearchBar from '../../pages/search/index';

function Header({ children, iconPage,
  endIngredients, endName, endFirstLetter }: HeaderType) {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useContext(SearchContext);

  const searchView = () => {
    const path = location.pathname;
    if (path === '/profile'
      || path === '/done-recipes'
      || path === '/favorite-recipes') {
      return true;
    }
  };

  return (
    <div>
      <div className="container-header">
        <img src="/logoHeader.svg" alt="Logo Header" />

        <div className="container-icons">
          {
        !searchView()
        && (
          <button onClick={ () => setShowSearch(!showSearch) }>
            <img
              src="/iconSearch.svg"
              data-testid="search-top-btn"
              alt="search"
            />

          </button>
        )
      }
          <button onClick={ () => navigate('/profile') }>
            <img
              src="/iconProfile.svg"
              data-testid="profile-top-btn"
              alt="profile"
            />

          </button>
        </div>
      </div>

      <div className="container-title">
        <img src={ iconPage } alt="Icon page" />
        <h1 data-testid="page-title">{children}</h1>
      </div>
      {
        showSearch
        && (
          <div className="container-search">
            <Form.Control
              type="text"
              data-testid="search-input"
              onChange={ handleChange }
              value={ values.search }
              placeholder="Search"
              name="search"
              autoComplete="off"
              className="input-search"
            />

            <SearchBar
              endIngredients={ endIngredients }
              endName={ endName }
              endFirstLetter={ endFirstLetter }
            />
          </div>
        )
      }
    </div>
  );
}

export default Header;
