import React, { FC, useState } from "react";
import styled from "styled-components";
import { ButtonAct } from "styles/commons";

import CreateBookingForm from "components/booking/screens/create-booking-form/CreateBookingForm";

const BookingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--color-text-dominant);
`;

const BookingProcessOption = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  height: 100px;
  margin: 0 auto;
  background-color: var(--color-main-bg);

  > button {
    height: 50px;
  }
`;

export type BookingShippingProps = {
  expoId: string;
  customerId: string | undefined;
  shippingId: string | undefined;
};

enum BookingState {
  INIT,
  REQUESTING, // not anable yet, this will be used when sending email with the booking request
  CREATING,
}

const Booking: FC<BookingShippingProps> = ({
  expoId,
  customerId,
  shippingId,
}) => {
  const [step, setStep] = useState(BookingState.INIT);

  console.log("[booking] expoId shippingiD: ", expoId, shippingId);

  return (
    <BookingWrapper>
      <div>
        <h1>RESERVA</h1>
      </div>
      <div>
        {step === BookingState.INIT && (
          <BookingProcessOption>
            <ButtonAct
              type="button"
              onClick={() => setStep(BookingState.CREATING)}
            >
              INGRESAR RESERVA
            </ButtonAct>
            <ButtonAct
              type="button"
              onClick={() => setStep(BookingState.REQUESTING)}
              disabled
            >
              SOLICITAR RESERVA
            </ButtonAct>
          </BookingProcessOption>
        )}

        <div>
          {step === BookingState.CREATING && (
            <CreateBookingForm
              expoId={expoId}
              customerId={customerId}
              shippingId={shippingId}
            />
          )}
        </div>
      </div>
    </BookingWrapper>
  );
};

export default Booking;
