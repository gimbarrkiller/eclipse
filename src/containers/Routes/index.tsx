import React from 'react';
import {
  Routes as RoutesDom,
  Route,
} from 'react-router-dom';

import { PathName } from 'appConstants';
import { useScrollToTop } from 'hooks';

import { WelcomeLayout, MainLayout } from 'layouts';
import {
  ForgotPasswordPage,
  HomePage,
  RegistrationPage,
  SignInPage,
  ProfilePage,
  PartnerPage,
  TransactionsPage,
  SupportPage,
  SupportMyTicketsPage,
  SupportTicketPage,
  NotFoundPage,
  StatusPage,
  PoolPage,
  NewsPage,
  NewsItemPage,
  InstrumentsPage,
} from 'pages';

export const Routes = () => {
  useScrollToTop();
  return (
    <RoutesDom>
      <Route
        path={PathName.Home}
        element={<WelcomeLayout />}
      >
        <Route
          path={PathName.Home}
          element={<HomePage />}
        />
        <Route
          path={PathName.HomeFooter}
          element={<HomePage goingFooter />}
        />
        <Route
          path={PathName.Registration}
          element={<RegistrationPage />}
        />
        <Route
          path={PathName.SignIn}
          element={<SignInPage />}
        />
        <Route
          path={PathName.ForgotPassword}
          element={<ForgotPasswordPage />}
        />
      </Route>
      <Route
        path={PathName.Cabinet}
        element={<MainLayout />}
      >
        <Route
          path={PathName.Profile}
          element={<ProfilePage />}
        />
        <Route
          path={PathName.Partner}
          element={<PartnerPage />}
        />
        <Route
          path={PathName.Status}
          element={<StatusPage />}
        />
        <Route
          path={PathName.Pool}
          element={<PoolPage />}
        />
        <Route
          path={PathName.Transactions}
          element={<TransactionsPage />}
        />
        <Route
          path={PathName.News}
          element={<NewsPage />}
        />
        <Route
          path={PathName.NewsItem}
          element={<NewsItemPage />}
        >
          <Route
            path={PathName.ItemId}
            element={<NewsItemPage />}
          />
        </Route>
        <Route
          path={PathName.Instruments}
          element={<InstrumentsPage />}
        />
        <Route
          path={PathName.Support}
          element={<SupportPage />}
        />
        <Route
          path={PathName.SupportMyTickets}
          element={<SupportMyTicketsPage />}
        />
        <Route
          path={PathName.SupportMyTickets}
          element={<SupportTicketPage />}
        >
          <Route
            path={PathName.ItemId}
            element={<SupportTicketPage />}
          />
        </Route>
        <Route
          element={<NotFoundPage />}
          path="*"
        />
      </Route>
      <Route
        element={<NotFoundPage />}
        path="*"
      />
    </RoutesDom>
  );
};
