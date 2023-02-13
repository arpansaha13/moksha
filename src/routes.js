import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import DefaultLayout from './layouts/default'
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import LoginPage from "./pages/auth/login";
import SignUpPage from "./pages/auth/signup";

/** Pass in the page component and get the page back with its layout. */
function getPage(PageComponent) {
  const getLayout = PageComponent.getLayout ?? (page => <DefaultLayout>{page}</DefaultLayout>)
  return getLayout(<PageComponent />)
}

function routes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={getPage(Home)} />
        <Route exact path="/timeline" element={getPage(Timeline)} />
        <Route exact path="/auth/login" element={getPage(LoginPage)} />
        <Route exact path="/auth/signup" element={getPage(SignUpPage)} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
