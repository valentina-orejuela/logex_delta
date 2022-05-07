import React from "react";
import * as auth from "../../firebase/auth";
import { createUser } from "api/users.api";
// import { loadExpoSettings } from 'api/settings.api';
import { loadSettings } from 'api/settings.api';
import { IUser, RoleName } from "types";

import {
  SignUpForm,
  SignUpWrapper,
} from "components/landing-page/landing-page.styles";

import { FormCommands } from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";

const SignUp = () => {
  const onCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elementsArr = Array.from(e.currentTarget.elements) as (
      | HTMLInputElement
      | HTMLButtonElement
    )[];
    const formData = elementsArr.reduce<{ [key: string]: string }>(
      (accum, input) => {
        if (input.name) {
          accum[input.name] = input.value;
        }
        return accum;
      },
      {}
    );

    if (formData.password1 && formData.password1 === formData.password2) {
      const user: IUser = {
        email: formData.email,
        company_id: formData.company_id,
        company_name: formData.company_name,
        first_name: formData.company_name,
        second_name: formData.second_name,
        first_lastname: formData.first_lastname,
        second_lastname: formData.second_lastname,
        role: RoleName.ADMIN,
      };

      auth
        .createUserWithEmailAndPassword(formData.email, formData.password1)
        .then((userData) => {
          if (userData.user?.uid) {
            createUser(userData.user.uid, user).then(() => {
              console.log("user created: ", userData.user?.uid);
              loadSettings(user.company_id);
              // loadExpoSettings(user.company_id);
            });
          }
          // history.push(routes.DASHBOARD);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <SignUpWrapper>
      <SignUpForm id="create-user-form" onSubmit={onCreateUser}>
        <div className="form-field user-company_name">
          <label>Nombre de la empresa</label>
          <input required name="company_name"></input>
        </div>
        <div className="form-field user-company_id">
          <label>Nit de la empresa</label>
          <input required name="company_id"></input>
        </div>
        <div className="form-field user-first_name">
          <label>Primer nombre</label>
          <input required name="first_name"></input>
        </div>
        <div className="form-field user-second_name">
          <label>Segundo nombre</label>
          <input name="second_name"></input>
        </div>
        <div className="form-field user-first_lastname">
          <label>Primer apellido</label>
          <input required name="first_lastname"></input>
        </div>
        <div className="form-field user-second_lastname">
          <label>Segundo apellido</label>
          <input required name="second_lastname"></input>
        </div>
        <div className="form-field user-email">
          <label>Email</label>
          <input required type="email" name="email"></input>
        </div>
        <div className="form-field user-password1">
          <label>Contraseña</label>
          <input
            required
            type="password"
            minLength={4}
            name="password1"
          ></input>
        </div>
        <div className="form-field user-password2">
          <label>Confirmar contraseña</label>
          <input
            required
            type="password"
            minLength={4}
            name="password2"
          ></input>
        </div>
      </SignUpForm>
      <FormCommands>
        <ButtonAct form="create-user-form">Registrarse</ButtonAct>
      </FormCommands>
    </SignUpWrapper>
  );
};

export default SignUp;
