import { useState } from 'react';
import '../pages/doneRecipes/style.css';

type ShareButtonProps = {
  index: number,
  type: string,
  id: string,
};

function ShareButton({ index, type, id }: ShareButtonProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = async () => {
    const path = (window.location.href).split('/');
    const newPath = `${path[0]}//${path[2]}/${type}s/${id}`;
    try {
      await navigator.clipboard.writeText(newPath);
      setClicked(true);
    } catch (error) {
      console.error('Erro ao copiar para a área de transferência:', error);
      setClicked(false);
    }
  };

  return (
    <>
      <button
        onClick={ handleClick }
        className="btn-share-button"
      >
        <img
          src="/buttonShare.svg"
          alt="share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <div className="text-link-copied-share">
        { clicked && <span>Link copied!</span>}
      </div>
    </>

  );
}

export default ShareButton;
