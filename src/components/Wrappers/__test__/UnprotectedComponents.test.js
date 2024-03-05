import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from '../../../context/AppContext';
import UnprotectedComponents from '../UnprotectedComponents';

describe('UnprotectedComponents component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <UnprotectedComponents>
            <div>Child Component</div>
          </UnprotectedComponents>
        </AppContextProvider>
      </Router>
    );
  });

  it('renders children components correctly', () => {
    render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <UnprotectedComponents>
            <div>Child 1</div>
            <div>Child 2</div>
          </UnprotectedComponents>
        </AppContextProvider>
      </Router>
    );

    const child1 = screen.getByText('Child 1');
    const child2 = screen.getByText('Child 2');

    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
  });

  

  it('does not log a message when user is not authenticated', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    consoleSpy.mockImplementation(() => {});

    render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <UnprotectedComponents>
            <div>Child Component</div>
          </UnprotectedComponents>
        </AppContextProvider>
      </Router>
    );

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('renders nested components when user is not authenticated', () => {
    render(
      <Router>
        <AppContextProvider value={{ state: { currentAuthUser: null } }}>
          <UnprotectedComponents>
            <div>
              <h1>Nested Component</h1>
            </div>
          </UnprotectedComponents>
        </AppContextProvider>
      </Router>
    );

    const nestedComponent = screen.getByText('Nested Component');
    expect(nestedComponent).toBeInTheDocument();
  });
});
