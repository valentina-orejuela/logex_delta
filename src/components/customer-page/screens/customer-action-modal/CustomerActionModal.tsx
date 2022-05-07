import React, { FC } from "react";
import styled from "styled-components";
import { AddIcon, EditIcon } from "svgs";
import { List } from 'styles/List/list.styles';

type StyleProps = {
  isVisible: boolean;
}

type Props = {
  onEditCustomer: () => void;
  onCreateShipping: () => void;
}

const Wrapper = styled.div<StyleProps>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  position: absolute;
  top: 38px;
  left: calc(100% - 200px);
  width: 200px;
  box-shadow: 2px 2px 5px 0px var(--color-text-dominant);
  background-color: var(--color-main);
`;


const CustomerActionModal: FC<Props & StyleProps> = ({isVisible, onEditCustomer, onCreateShipping}) => {
  return (
    <Wrapper isVisible={isVisible}>
      <List>
        <li onClick={onEditCustomer}>
          <span>
            <EditIcon />
          </span>
          <span>Editar cliente</span>
        </li>
        <li onClick={onCreateShipping}>
          <span>
            <AddIcon />
          </span>
          <span>Crear shipping</span>
        </li>
        <li>
          <span>
            <AddIcon />
          </span>
          <span>Crear order de compra</span>
        </li>
      </List>
    </Wrapper>
  );
};

export default CustomerActionModal;
