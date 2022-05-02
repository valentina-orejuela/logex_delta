import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "styles/commons";
import { Clear } from 'svgs'

const HeaderButton = styled(Button)`
  font-size: 16px;
  height: 30px;
  background-color: transparent;
  font-weight: bold;
  color: var(--color-primary);
`;

type PropsQuickViewHeader = {
  expoId: string;
};

const Wrapper = styled.div`
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background-color: var(--color-main-bg);
`;

const QuickViewHeader = ({ expoId }: PropsQuickViewHeader) => {
  return (
    <Wrapper>
      <Link to={`/expo/${expoId}`}>
        <HeaderButton type="button">{expoId}</HeaderButton>
      </Link>
      <Link to="/">
        <Button type="button">
          <Clear />
        </Button>
      </Link>
    </Wrapper>
  );
};

export default QuickViewHeader;
