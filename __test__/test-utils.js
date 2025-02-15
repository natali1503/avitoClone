import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { rootReducer } from '../src/store';

const store = ({ preloadedState } = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

function render(ui, { initialState, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store({ preloadedState: initialState })}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render };
export { store };
