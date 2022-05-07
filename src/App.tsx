import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { auth } from "./firebase/firebase";

import { GlobalStyles } from "./styles/global";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { StateType } from "types/props.types";
import { useInitialLoadCollection, initFirebaseCollections } from "api";
import { getUser } from "api/users.api";
import { loadUser } from "actions/user.actions";

import LandingPage from "components/landing-page/LandingPage";
import Dashboard from "components/dashboard/Dashboard";
import Clientes from "components/clientes/Clientes";
// import Proveedores from "components/proveedores/Proveedores";
import SupplierPage from 'components/suppliers-page/SuppliersPage';
import Indicadores from "components/indicadores/Indicadores";
import Liquidaciones from "components/liquidaciones/Liquidaciones";
import Directorio from "components/directorio/Directorio";
import Expo from "components/expo-page/ExpoPage";
import CustomerPage from "components/customer-page/CustomerPage";
import Settings from "components/settings-page/Settings";
import { IUser } from "types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100%;
  /* overflow: hidden; */
`;

const Main = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #f6f7f9;
  height: 100%;
`;

function App() {
  const [authenticated, setAuth] = useState(false);
  const [showLandingPageOnly, setShowLandingPage] = useState(false);
  const companyId = useSelector(
    (state: StateType) => state.users.company_id
  );
  const loading = useInitialLoadCollection(companyId);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userData) => {
      if (userData?.uid) {
        const user: IUser = await getUser(userData.uid);
        if(user) {
          console.log("user after await: ", user);
          initFirebaseCollections(user.company_id);
          dispatch(loadUser(user));
          setAuth(true);
        } else {
          setAuth(false);
          setShowLandingPage(true);
        }
      } else {
        setAuth(false);
        setShowLandingPage(true);
      }
    });
  }, [dispatch]);

  if (loading && !showLandingPageOnly) {
    return <p>Loading ...</p>;
  }

  return (
    <Router>
      <Wrapper>
        <GlobalStyles />
        {!authenticated ? (
          <LandingPage />
        ) : (
          <>
            <Header />
            <Main>
              <Sidebar />
              <Switch>
                <Route exact path="/">
                  <Dashboard />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/clientes/:customerId">
                  <CustomerPage />
                </Route>
                <Route exact path="/clientes">
                  <Clientes />
                </Route>
                <Route path="/proveedores">
                  <SupplierPage />
                </Route>
                <Route path="/indicadores">
                  <Indicadores />
                </Route>
                <Route path="/liquidaciones">
                  <Liquidaciones />
                </Route>
                <Route path="/directorio">
                  <Directorio />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/expo/:expoId">
                  <Expo />
                </Route>
              </Switch>
            </Main>
          </>
        )}
      </Wrapper>
    </Router>
  );
}

export default App;
