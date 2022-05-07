import React, { FC, useState, useEffect } from "react";
import { IShipping } from "types";
import { EditShippingProps } from "types/props.types";

import { getShipping } from "api/customers.api";

import { BtnIcon, ButtonAct } from "styles/commons";
import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
  FormCommands,
} from "styles/Form/form.styles";
import { editShipping } from "api/customers.api";
import { CloseIcon } from "svgs";

const initialFormData: IShipping = {
  consignee: "",
  notify: "",
  country: "",
  city: "",
  transport_mode: "",
  address: "",
  contact: "",
  email: "",
  phone: "",
  obs: "",
};

const EditShippingForm: FC<EditShippingProps> = ({
  onClose,
  customerId,
  shippingId,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  const [state, setState] = useState(initialFormData);

  useEffect(() => {
    if (shippingId) {
      getShipping(customerId, shippingId)
        .then((doc) => {
          if (doc.exists) {
            const shipping: IShipping = doc.data();
            console.log("shipping: ", shipping);
            setState((state) => ({ ...state, ...shipping }));
          }
        })
        .catch((error) => {
          console.log("Error fetching the shipping data. ", error);
          setError(true);
        });
    }
  }, [customerId, shippingId]);

  const handleOnChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const onEditShipping = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("onEditShipping: ", shippingId)
    if (shippingId) {
      editShipping(customerId, shippingId, state)
        .then(() => {
          onClose();
        })
        .catch((error: any) => {
          console.log("Error updating shipping: ", error);
          setError(true);
        });
    }
  };

  return (
    <FormWrapper>
      <CloseFormIconWrapper>
        <BtnIcon type="button" onClick={onClose}>
          <CloseIcon />
        </BtnIcon>
      </CloseFormIconWrapper>
      <FormHeader>
        <h3>Crear Shipping Instruction</h3>
      </FormHeader>
      <StyledForm id="edit-shipping-form" onSubmit={onEditShipping}>
        <div className="form-field consignee">
          <label>Consignee</label>
          <input
            required
            name="consignee"
            id="consignee"
            onChange={handleOnChange}
            value={state.consignee}
          ></input>
        </div>
        <div className="form-field notify">
          <label>Notify</label>
          <input
            required
            name="notify"
            id="notify"
            onChange={handleOnChange}
            value={state.notify}
          ></input>
        </div>
        <div className="form-field country">
          <label>País destino</label>
          <input
            required
            name="country"
            id="country"
            onChange={handleOnChange}
            value={state.country}
          ></input>
        </div>
        <div className="form-field city">
          <label>Ciudad ingreso aduana</label>
          <input
            required
            name="city"
            id="city"
            onChange={handleOnChange}
            value={state.city}
          ></input>
        </div>
        <div className="form-field transport-mode">
          <label>Modalidad</label>
          <input
            required
            name="transport_mode"
            id="transport_mode"
            onChange={handleOnChange}
            value={state.transport_mode}
          ></input>
        </div>
        <div className="form-field address">
          <label>Dirección</label>
          <input
            required
            name="address"
            id="address"
            onChange={handleOnChange}
            value={state.address}
          ></input>
        </div>
        <div className="form-field contact-name">
          <label>Nombre contacto</label>
          <input
            required
            name="contact"
            id="contact"
            onChange={handleOnChange}
            value={state.contact}
          ></input>
        </div>
        <div className="form-field email">
          <label>Email</label>
          <input
            required
            name="email"
            id="email"
            onChange={handleOnChange}
            value={state.email}
          ></input>
        </div>
        <div className="form-field phone">
          <label>Teléfono</label>
          <input
            required
            name="phone"
            id="phone"
            onChange={handleOnChange}
            value={state.phone}
          ></input>
        </div>
        <div className="form-field observations">
          <label>Observaciones</label>
          <textarea
            required
            name="obs"
            id="obs"
            onChange={handleOnChange}
            value={state.obs}
          ></textarea>
        </div>
      </StyledForm>
      <FormCommands>
        <ButtonAct onClick={onClose}>Cancelar</ButtonAct>
        <ButtonAct form="edit-shipping-form">Editar Shipping</ButtonAct>
      </FormCommands>
    </FormWrapper>
  );
};

export default EditShippingForm;
