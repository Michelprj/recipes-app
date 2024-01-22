import '../pages/profile/style.css';

function ProfileCards() {
  return (
    <div>
      <div>
        <div className="container-profileCard">
          <a
            href="/done-recipes"
            data-testid="profile-done-btn"
          >
            <img src="/profileDone.svg" alt="Done" />
          </a>
        </div>
      </div>
      <div>
        <div>
          <a
            href="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            <img src="/profileFavorite.svg" alt="Favorite" />

          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileCards;
