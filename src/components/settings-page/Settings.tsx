import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import {
  StyledMain,
  StyledContent,
  StyledSubHeader,
  SunHeaderContent,
  ContentWrapper
} from "styles/commons";

import SettingsMenu from "components/settings-page/screens/settings-menu/SettingsMenu";
import ActivityListSettings from "components/settings-page/pages/activity-list/ActivityListSettings";
import Users from "components/settings-page/pages/users/Users";
import Roles from "components/settings-page/pages/roles/Roles";

const Wrapper = styled(ContentWrapper)`
  grid-template-columns: auto 1fr;
`

const Content = styled.div`
  display: flex;
  padding: 20px 12px 0 50px;
  overflow-x: auto;
`;

const Settings = () => {
  return (
    <StyledMain>
      <StyledSubHeader>
        <SunHeaderContent>
          <span>Configuraciones</span>
        </SunHeaderContent>
      </StyledSubHeader>
      <StyledContent>
        <Wrapper className="settings-wrapper">
          <SettingsMenu />

          <Content className="settings-content">
            <Switch>
              <Route exact path="/settings/">
                <ActivityListSettings />
              </Route>
              <Route path="/settings/checklist">
                <ActivityListSettings />
              </Route>
              <Route path="/settings/users">
                <Users />
              </Route>
              <Route path="/settings/roles">
                <Roles />
              </Route>
            </Switch>
          </Content>
        </Wrapper>
      </StyledContent>
    </StyledMain>
  );
};

export default Settings;
