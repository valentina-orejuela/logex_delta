import React, { FC, useState } from "react";
import styled from "styled-components";
import { useShippingSelection } from "api/customers.api";
import { createBooking } from "api/exportaciones.api";
import {
  IReserva,
  ModoTransporte,
  CiudadZarpe,
  PuertoZarpe,
} from "types";
import {
  FormHeader,
  FormCommands,
} from "styles/Form/form.styles";
import { ButtonAct } from "styles/commons";
import { StyledCreateBookingForm } from "components/booking/screens/create-booking-form/create_booking.styles";
import { BookingShippingProps } from "components/booking/Booking";
import SelectableShippingList from "components/shippings/selectable-shipping-list/SelectableShippingList";

const BookingFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ShippingSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > button {
    width: 180px;
    justify-content: center;
    margin: 0 auto;
  }
`;

// const initialState: IReserva = {
//   consignee: "",
//   notify: "",
//   shipping_company: "",
//   broker: "",
//   booking_number: "",
//   documento_transporte_id: "",
//   transport_mode: ModoTransporte.MARITIMO,
//   date_cierre_documental: Date.now(),
//   date_cierre_fisico: Date.now(),
//   ciudad_puerto_zarpe: OriginCityOptions.BUENAVENTURA,
//   puerto_zarpe: SailingPortOptions.SPRBUN,
//   eta: Date.now(),
//   etd: Date.now(),
//   eta_destino: Date.now(),
//   destination_country: "",
//   destination_city: "",
//   name_motonave: "",
//   voyage: "",
//   contenedores: [],
// };

const CreateBookingForm: FC<BookingShippingProps> = ({
  customerId,
  shippingId,
  expoId,
}) => {
  const [selectedShipping, setSelectShipping] = useState(shippingId);
  const { shippings, loading, error } = useShippingSelection(
    customerId,
    selectedShipping
  );

  const onCreateBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elementsArr = Array.from(e.currentTarget.elements) as (
      | HTMLInputElement
      | HTMLButtonElement
      | HTMLSelectElement
    )[];
    console.log("form elements: ", elementsArr);
    const data = elementsArr.reduce<{ [key: string]: string }>(
      (accum, input) => {
        if (input.name) {
          accum[input.name] = input.value;
        }
        return accum;
      },
      {}
    );

    const booking: IReserva = {
      consignee: data.consignee,
      notify: data.notify,
      shipping_company: data.shipping_company,
      broker: data.broker,
      booking_number: data.booking_number,
      documento_transporte_id: data.documento_transporte_id,
      transport_mode: data.transport_mode as ModoTransporte,
      date_cierre_documental: new Date(data.date_cierre_documental).getTime(),
      date_cierre_fisico: new Date(data.date_cierre_fisico).getTime(),
      ciudad_puerto_zarpe: CiudadZarpe[data.ciudad_puerto_zarpe],
      puerto_zarpe: PuertoZarpe[data.puerto_zarpe],
      eta: new Date(data.eta).getTime(),
      etd: new Date(data.etd).getTime(),
      eta_destino: new Date(data.eta_destino).getTime(),
      destination_country: data.destination_country,
      destination_city: data.destination_city,
      name_motonave: data.name_motonave,
      voyage: data.voyage,
      // contenedores: [],
    };
    console.log("form data: ", data);
    console.log("reserva: ", booking);
    createBooking(expoId, booking)
      .then((res) => {
        console.log("Booking created. ", res);
      })
      .catch((error) => {
        console.log("Error creating booking. ", error);
      });
  };

  const handleOnSelectShipping = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    console.log("ON SELECT ID:", e.currentTarget.id);
    setSelectShipping(e.currentTarget.id);
  };

  const handleOnClickBack = () => {
    setSelectShipping("");
  };

  if (loading) {
    return <p>Loading shipping</p>;
  }
  if (error) {
    return <p>No fue posible obtener datos de la shipping seleccionada</p>;
  }

  console.log("[booking] shipping: ", shippings, customerId, shippingId);

  let isShippingSelected = false;
  let shipping;

  if (selectedShipping && shippings[selectedShipping]) {
    isShippingSelected = true;
    shipping = shippings[selectedShipping];
  }

  return (
    <BookingFormWrapper>
      <FormHeader>
        <h3>Crear Reserva</h3>
      </FormHeader>

      {isShippingSelected ? (
        <>
          <StyledCreateBookingForm
            id="create-booking-form"
            onSubmit={onCreateBooking}
          >
            <div className="form-field booking-consignee">
              <label>Consignee</label>
              <input
                required
                name="consignee"
                id="consignee"
                defaultValue={shipping?.consignee || ""}
              ></input>
            </div>
            <div className="form-field booking-notify">
              <label>Notify</label>
              <input
                required
                name="notify"
                id="notify"
                defaultValue={shipping?.notify || ""}
              ></input>
            </div>
            <div className="form-field booking-broker">
              <label>Agente de carga</label>
              <input required name="broker" id="broker"></input>
            </div>
            <div className="form-field booking-shipping_company">
              <label>Naviera</label>
              <input
                required
                name="shipping_company"
                id="shipping_company"
              ></input>
            </div>
            <div className="form-field booking-booking_number">
              <label>Reserva No.</label>
              <input required name="booking_number" id="booking_number"></input>
            </div>
            <div className="form-field booking-documento_transporte_id">
              <label>Documento transporte No.</label>
              <input
                // required
                name="documento_transporte_id"
                id="documento_transporte_id"
              ></input>
            </div>

            <div className="form-field booking-transport_mode">
              <label>Modalidad</label>
              <select
                required
                defaultValue={
                  shipping?.transport_mode || ModoTransporte.MARITIMO
                }
                name="transport_mode"
              >
                <option value={ModoTransporte.AEREO}>Aereo</option>
                <option value={ModoTransporte.MARITIMO}>Marítimo</option>
                <option value={ModoTransporte.TERRESTRE}>Terrestre</option>
              </select>
            </div>

            <div className="form-field booking-date_cierre_documental">
              <label>Cierre documental</label>
              <input
                required
                type="date"
                name="date_cierre_documental"
                id="date_cierre_documental"
              ></input>
            </div>
            <div className="form-field booking-date_cierre_fisico">
              <label>Cierre físico</label>
              <input
                required
                type="date"
                name="date_cierre_fisico"
                id="date_cierre_fisico"
              ></input>
            </div>
            <div className="form-field booking-ciudad_puerto_zarpe">
              <label>Ciudad origen</label>
              <select required name="ciudad_puerto_zarpe">
                {Object.keys(CiudadZarpe).map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-field booking-puerto_zarpe">
              <label>Puerto origen</label>
              <select required name="puerto_zarpe">
                {Object.keys(PuertoZarpe).map((port) => (
                  <option key={port} value={port}>{port}</option>
                ))}
              </select>
            </div>
            <div className="form-field booking-eta">
              <label>ETA</label>
              <input required type="date" name="eta" id="eta"></input>
            </div>
            <div className="form-field booking-destination_country">
              <label>País destino</label>
              <input
                required
                name="destination_country"
                id="destination_country"
                defaultValue={shipping?.country || ""}
              ></input>
            </div>
            <div className="form-field booking-destination_city">
              <label>Ciudad destino</label>
              <input
                required
                name="destination_city"
                id="destination_city"
                defaultValue={shipping?.city || ""}
              ></input>
            </div>
            <div className="form-field booking-etd">
              <label>ETD</label>
              <input required type="date" name="etd" id="etd"></input>
            </div>
            <div className="form-field booking-eta_destino">
              <label>ETA destino</label>
              <input
                required
                type="date"
                name="eta_destino"
                id="eta_destino"
              ></input>
            </div>
            <div className="form-field booking-name_motonave">
              <label>Motonave</label>
              <input required name="name_motonave" id="name_motonave"></input>
            </div>
            <div className="form-field booking-voyage">
              <label>Viaje</label>
              <input required name="voyage" id="voyage"></input>
            </div>
          </StyledCreateBookingForm>
          <FormCommands>
            <ButtonAct onClick={handleOnClickBack}>Atrás</ButtonAct>
            {/* <ButtonAct onClick={onClose}>Cancelar</ButtonAct> */}
            <ButtonAct form="create-booking-form">Crear Reserva</ButtonAct>
          </FormCommands>
        </>
      ) : (
        <div>
          {Object.keys(shippings).length ? (
            <ShippingSelectionWrapper>
              <SelectableShippingList
                shippings={shippings}
                onSelectShipping={handleOnSelectShipping}
              />
            </ShippingSelectionWrapper>
          ) : (
            <div>
              <p>
                No existen instrucciones de despacho aún. Debe crear al menos
                una Shipping para proceder con el ingreso de la reserva
              </p>
            </div>
          )}
        </div>
      )}
    </BookingFormWrapper>
  );
};

export default CreateBookingForm;
