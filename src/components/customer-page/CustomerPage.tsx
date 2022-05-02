import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { ICliente } from "types";
import { CustomerParams, StateType } from "types/props.types";

import { PageWrapper, PageHeader, PageContent, BtnIcon } from "styles/commons";
import { MoreHorizontal } from "svgs";
import { Modal } from "styles/Modal/Modal";

import ShippingInstructionList from "components/shippings/ShippingInstructionList";
import PurchaseOrders from "components/orders/PurchaseOrders";
import CustomerActionModal from "components/customer-page/screens/customer-action-modal/CustomerActionModal";
import EditCustomerForm from "components/customer-page/screens/edit-customer-form/EditCustomerForm";
import CreateShippingForm from "components/shippings/create-shipping-form/CreateShippingForm";

const CustomerLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-left: 20px;
`;

const CustomerName = styled.div`
  color: var(--color-primary);
  margin-bottom: 20px;
  h2 {
    margin: 0;
  }
`;

const Section = styled.div`
  min-height: 150px;
  margin-bottom: 30px;
`;

const ShippingSection = styled(Section)`
  min-height: 200px;
`;

const GeneralInfo = styled.div`
  display: flex;
`;

const SectionHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--color-text-dominant);
  margin-bottom: 20px;
  border-bottom: 1px solid var(--color-text-light);
`;

const SectionContent = styled.div`
  display: flex;
  justify-content: center;
`;

const CustomerRightColumn = styled.div`
  display: flex;
  width: 30%;
  background-color: var(--color-main-bg);
  padding: 10px;
`;

export const DataContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  > label {
    font-size: 12px;
    color: var(--color-primary);
    margin-bottom: 3px;
  }

  > span {
    font-size: 14px;
    font-family: "Roboto";
    text-transform: uppercase;
  }
`;

enum FormType {
  EditCustomer = "EditCustomer",
  CreateShipping = "CreateShipping",
  CreateOrder = "CreateOrder",
}

const CustomerPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [formType, setForm] = useState<FormType>(FormType.CreateShipping);
  const [isMenuOpened, setMenu] = useState(false);
  const { customerId } = useParams<CustomerParams>();

  const customer: ICliente = useSelector(
    (state: StateType) => state.customers[customerId]
  );

  const handleEditCustomer = () => {
    setMenu(false);
    setOpen(true);
    setForm(FormType.EditCustomer);
  };
  const handleCreateShipping = () => {
    setMenu(false);
    setOpen(true);
    setForm(FormType.CreateShipping);
  };

  const renderFormType = (type: FormType) => {
    switch (type) {
      case FormType.EditCustomer:
        return <EditCustomerForm onClose={() => setOpen(false)} />;
      case FormType.CreateShipping:
        return (
          <CreateShippingForm
            onClose={() => setOpen(false)}
            customerId={customerId}
          />
        );
      case FormType.CreateOrder:
        return null;
      default:
        return <EditCustomerForm onClose={() => setOpen(false)} />;
    }
  };

  return (
    <PageWrapper>
      <Modal open={isOpen} full>
        {renderFormType(formType)}
      </Modal>
      <PageHeader>
        <div>
          <span>
            <Link to="/clientes">clientes</Link>
          </span>
          <span>{` / ${customer.name.toLowerCase()}`}</span>
        </div>
        <div>
          <BtnIcon onClick={() => setMenu((menuState) => !menuState)}>
            <MoreHorizontal />
          </BtnIcon>
        </div>
        <CustomerActionModal
          isVisible={isMenuOpened}
          onEditCustomer={handleEditCustomer}
          onCreateShipping={handleCreateShipping}
        />
      </PageHeader>
      <PageContent>
        <CustomerLeftColumn>
          <CustomerName>
            <h2>{customer.name}</h2>
          </CustomerName>
          <Section>
            <SectionHeader>
              <span>Información general </span>
            </SectionHeader>
            <GeneralInfo>
              <DataContent>
                <label>Identificación</label>
                <span>{customer.id}</span>
              </DataContent>
              <DataContent>
                <label>País</label>
                <span>{customer.country}</span>
              </DataContent>
              <DataContent>
                <label>Ciudad</label>
                <span>{customer.city}</span>
              </DataContent>
              <DataContent>
                <label>Dirección</label>
                <span>{customer.address}</span>
              </DataContent>
            </GeneralInfo>
          </Section>

          <ShippingSection>
            <SectionHeader>
              <span>Shipping instructions</span>
            </SectionHeader>
            <SectionContent>
              <ShippingInstructionList customerId={customerId} />
            </SectionContent>
          </ShippingSection>

          <Section>
            <SectionHeader>
              <span>Ordenes de compra</span>
            </SectionHeader>
            <SectionContent>
              <PurchaseOrders />
            </SectionContent>
          </Section>
        </CustomerLeftColumn>

        <CustomerRightColumn>CONTACTOS</CustomerRightColumn>
      </PageContent>
    </PageWrapper>
  );
};

export default CustomerPage;
