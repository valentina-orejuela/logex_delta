import React from "react";
import styled from "styled-components";

import {
  StyledMain,
  StyledContent,
  StyledSubHeader,
  SunHeaderContent,
} from "styles/commons";

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  padding: 40px 12px;
`;

const Liquidaciones = () => {
  return (
    <StyledMain>
      <StyledSubHeader>
        <SunHeaderContent>
          <span>Página temporal para pruebas de desarrollo</span>
        </SunHeaderContent>
      </StyledSubHeader>
      <StyledContent fullview>
        <Wrapper>{/* content here */}</Wrapper>
      </StyledContent>
    </StyledMain>
  );
};

export default Liquidaciones;
