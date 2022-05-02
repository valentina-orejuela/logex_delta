import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import styled from 'styled-components'

import Home from './Home';
import HomeNavbar from './HomeNavbar';
import SignUp from './SignUp';
import SignIn from './SignIn';
// import ReservaUnauthorizedProvider from './Unauthorized/UnauthorizedReserva';

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  background-color: #FCFCFC;
  color: #32325D;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  padding: 1em 0 10px;
`

export default class LandingPage extends Component {
  render() {
    return (
      <Wrapper>
        <HomeNavbar />
        <Switch>
          <Container>
            <Route exact path='/' component={Home} />
            <Route path='/signup' component={SignUp}/>
            <Route path='/signin' component={SignIn}/>
            {/* <Route path='/reservas/:reservaId' component={ReservaUnauthorizedProvider}/> */}
          </Container>
        </Switch>
      </Wrapper>
    )
  }
}