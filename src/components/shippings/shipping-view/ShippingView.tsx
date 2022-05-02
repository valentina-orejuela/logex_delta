import React, { FC, useState, useEffect } from "react";
import { IShipping } from "types";
import { EditShippingProps } from "types/props.types";
import { getShipping } from "api/customers.api";
import { BtnIcon } from "styles/commons";
import {
  FormWrapper,
  FormHeader,
  StyledForm,
  CloseFormIconWrapper,
} from "styles/Form/form.styles";
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

const ShippingView: FC<EditShippingProps> = ({
  onClose,
  customerId,
  shippingId,
}) => {
  const [error, setError] = useState(false);
  const [state, setState] = useState(initialFormData);

  useEffect(() => {
    if (shippingId) {
      getShipping(customerId, shippingId)
        .then((doc) => {
          if (doc.exists) {
            const shipping: IShipping = doc.data();
            setState((state) => ({ ...state, ...shipping }));
          }
        })
        .catch((error) => {
          console.log("Error fetching the shipping data. ", error);
          setError(true);
        });
    }
  }, [customerId, shippingId]);

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
      <StyledForm>
        <div className="form-field consignee">
          <label>Consignee</label>
          <input
            disabled
            name="consignee"
            id="consignee"
            value={state.consignee}
          ></input>
        </div>
        <div className="form-field notify">
          <label>Notify</label>
          <input
            disabled
            name="notify"
            id="notify"
            value={state.notify}
          ></input>
        </div>
        <div className="form-field country">
          <label>País destino</label>
          <input
            disabled
            name="country"
            id="country"
            value={state.country}
          ></input>
        </div>
        <div className="form-field city">
          <label>Ciudad ingreso aduana</label>
          <input
            disabled
            name="city"
            id="city"
            value={state.city}
          ></input>
        </div>
        <div className="form-field transport-mode">
          <label>Modalidad</label>
          <input
            disabled
            name="transport_mode"
            id="transport_mode"
            value={state.transport_mode}
          ></input>
        </div>
        <div className="form-field address">
          <label>Dirección</label>
          <input
            disabled
            name="address"
            id="address"
            value={state.address}
          ></input>
        </div>
        <div className="form-field contact-name">
          <label>Nombre contacto</label>
          <input
            disabled
            name="contact"
            id="contact"
            value={state.contact}
          ></input>
        </div>
        <div className="form-field email">
          <label>Email</label>
          <input
            disabled
            name="email"
            id="email"
            value={state.email}
          ></input>
        </div>
        <div className="form-field phone">
          <label>Teléfono</label>
          <input
            disabled
            name="phone"
            id="phone"
            value={state.phone}
          ></input>
        </div>
        <div className="form-field observations">
          <label>Observaciones</label>
          <textarea
            disabled
            name="obs"
            id="obs"
            value={state.obs}
          ></textarea>
        </div>
      </StyledForm>
      {error && (
        <div>
          <p>
            Se presentó un error con la base de datos. Por el momento no es
            posible visualizar los datos de la shipping
          </p>
        </div>
      )}
    </FormWrapper>
  );
};

export default ShippingView;
