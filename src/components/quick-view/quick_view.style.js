import styled from "styled-components";

export const QuickViewWrapper = styled.div`
  border: 1px solid #eee;
  display: flex;
  flex-grow: 1;
`;

export const StyledQuickViewSidebarMenu = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 50px;
    background-color: #eee;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      /* border: 1px solid #eee; */
      height: 50px;

      &:hover {
        background-color: #ccc;
      }
    }
  }
`;

export const StyledQuickViewExpoContent = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0 12px; */
  padding-left: 6px;
  width: 100%;
  height: 100%;
`;
