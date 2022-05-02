import React, { FC } from "react";
import styled from "styled-components";
import { Modal } from "styles/Modal/Modal";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 400px;
`;

type SupplierSmallViewProps = {
  supplierId: string | null;
  onClose: () => void;
  onDeleteSupplier: () => void;
  error: null | string;
};

const SupplierSmallView: FC<SupplierSmallViewProps> = ({
  supplierId,
  onClose,
  onDeleteSupplier,
  error,
}) => {
  return (
    <Modal open={!!supplierId} full onClose={() => onClose()}>
      <Wrapper>
        <h3>Eliminar proveedor</h3>

        <div>
          <button onClick={onDeleteSupplier}>ELIMINAR</button>
        </div>
        {error && (
          <div>
            <span style={{ color: "red" }}>
              Error al eliminar, intentar nuevamente
            </span>
          </div>
        )}
      </Wrapper>
    </Modal>
  );
};

export default SupplierSmallView;
