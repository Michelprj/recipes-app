import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import TotalProvider from './TotalProvider';

const renderWithProviderTotal = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);
  return {
    user: userEvent.setup(),
    ...render(
      <TotalProvider>
        <BrowserRouter>
          {ui}
        </BrowserRouter>
      </TotalProvider>,
    ),
  };
};

export default renderWithProviderTotal;
