import React, { FC } from 'react';
import {
  BrowserRouter,
  Routes as RoutesDom,
  Route,
} from 'react-router-dom';

import { PathName } from 'appConstants';

import { MainLayout } from 'layouts';
import {
  HomePage,
} from 'pages';

const Routes: FC = () => (
  <BrowserRouter>
    <RoutesDom>
      <Route
        path={PathName.Home}
        element={<MainLayout />}
      >
        <Route
          path={PathName.Home}
          element={<HomePage />}
        />
      </Route>
    </RoutesDom>
  </BrowserRouter>
);

export { Routes };
