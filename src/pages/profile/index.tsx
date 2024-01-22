import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/index';
import Header from '../../components/header/index';
import ProfileCards from '../../components/ProfileCards';
import './style.css';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header
        endFirstLetter=""
        endName=""
        endIngredients=""
        iconPage="/iconProfilePage.svg"
      >
        Profile

      </Header>
      <div className="container-profile-itens">
        <span data-testid="profile-email">{userEmail}</span>
        <ProfileCards />
        <button
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className="btn-logout-profile"
        >
          <img src="/profileLogout.svg" alt="Logout" />
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
