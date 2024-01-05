import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { HeaderType } from '../../types';
import SearchContext from '../../context/SearchContext';
import './style.css';

function Header({ children }: HeaderType) {
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
          <button onClick={ () => navigate('/profile') }>
            <img
              src="/iconProfile.svg"
              data-testid="profile-top-btn"
              alt="profile"
            />

          </button>
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
        </div>
      </div>
      <h1 data-testid="page-title">{children}</h1>
      {
        showSearch
        && <input
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
          value={ values.search }
          name="search"
        />
      }
    </div>
  );
}

export default Header;
