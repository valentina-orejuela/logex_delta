import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { StyledMain, StyledContent, StyledSubHeader, ButtonAct, SunHeaderContent } from "styles/commons";
import { Modal } from "styles/Modal/Modal";
import { ICliente } from "types";
import { CustomerList, StateType } from "types/props.types";
import CreateCustomerForm from "components/clientes/screens/create-customer-form/CreateCustomerForm";
import { AddIcon } from 'svgs'

import {
  TableWrapper,
  ExpoTable,
  TableBody,
  Row,
  RowHeader,
  TableHeader,
} from "components/dashboard/screens/expo-table/expo_table.style";

const CustomerTableWrapper = styled(TableWrapper)`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const CustomerRowHeader = styled(RowHeader)`
  height: 40px;
`;

const CustomerRow = styled(Row)`
  height: 40px;

  &:hover {
    background-color: var(--color-main-bg);
    transition: background-color 0.3s;
  }
`;

const AddCustomerBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main)
  }
`

const Clientes = () => {
  const customers: CustomerList = useSelector(
    (state: StateType) => state.customers
  );  
  const [isOpen, setOpen] = useState(false);
  const { pathname } = useLocation()

  return (
    <StyledMain>
      <StyledSubHeader>
        <Modal open={isOpen} full>
          <CreateCustomerForm onClose={() => setOpen(false)} />
        </Modal>
        <SunHeaderContent>
            <AddCustomerBtn onClick={() => setOpen(true)}>
              <AddIcon />
              <span>CLIENTE</span>
            </AddCustomerBtn>
        </SunHeaderContent>
      </StyledSubHeader>
      <StyledContent fullview>
        <CustomerTableWrapper>
          <ExpoTable>
            <TableHeader>
              <CustomerRowHeader>
                <th>ID</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Dirección</th>
              </CustomerRowHeader>
            </TableHeader>

            <TableBody>
              {Object.keys(customers).map((customerId) => {
                const customer: ICliente = customers[customerId];
                return (
                  <CustomerRow key={customer.id}>
                    <td>{customer.id}</td>
                    <td>
                      <Link to={`${pathname}/${customer.id}`}>{customer.name}</Link>
                    </td>
                    <td>{customer.country}</td>
                    <td>{customer.city}</td>
                    <td>{customer.address}</td>
                  </CustomerRow>
                );
              })}
            </TableBody>
          </ExpoTable>
        </CustomerTableWrapper>
      </StyledContent>
    </StyledMain>
  );
};

export default Clientes;
