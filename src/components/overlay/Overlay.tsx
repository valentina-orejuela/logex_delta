import React, { FC } from "react";
import styled from "styled-components";

const OverlayWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Overlay: FC = ({ children }) => {
  return <OverlayWrapper>{children}</OverlayWrapper>;
};

export default Overlay;
