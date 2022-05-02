import React, { FC, useState } from "react";
import { StyledForm, InputField } from "styles/Form/form.styles";
import { createCustomer } from "api/customers.api";
import { ICliente } from "types";

type CreateCustomerProps = {
  onClose: () => void;
};

const EditCustomerForm: FC<CreateCustomerProps> = ({ onClose }) => {
  const [error, setError] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const onCreateCustomer = () => {
    const data: ICliente = {
      id,
      name,
      country,
      city,
      address,
      // shippings: [],
    };
    console.log("[createCustomer] data: ", data);
    createCustomer(data)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log("Error creating the new customer: ", error);
        setError(true);
      });
  };

  return (
    <div>
      <button type="button" onClick={onClose}>
        X
      </button>
      <h1>Editar cliente</h1>
      <StyledForm>
        <InputField>
          <label>Identificación</label>
          <input
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
            required
          ></input>
        </InputField>
        <InputField>
          <label>Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          ></input>
        </InputField>
        <InputField>
          <label>País</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.currentTarget.value)}
            required
          ></input>
        </InputField>
        <InputField>
          <label>Ciudad</label>
          <input
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            required
          ></input>
        </InputField>
        <InputField>
          <label>Dirección</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            required
          ></input>
        </InputField>
      </StyledForm>
      <div>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" onClick={() => onCreateCustomer()}>
          Crear cliente
        </button>
      </div>
      {error && (
        <div>
          <span>No se presentó un error. Por favor volver a intentar</span>
        </div>
      )}
    </div>
  );
};

export default EditCustomerForm;
