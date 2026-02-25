import React from 'react';
// @vitest-environment jsdom
import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { AuthContext } from '../../../pedidos/src/hook/auth/authContext';
import Header from '../component/layout/header/headerHome.jsx';



const renderHeader = (userValue) => {
  render(
    <AuthContext.Provider value={{ user: userValue, logout: vi.fn() }}>
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

test('Si el usuario es admin, debe ver "Administración"', () => {
  renderHeader({ name: 'Omar', rol: 'admin' });
  
  const link = screen.queryByText(/Administracion/i);
  
  expect(link).not.toBeNull();
});


