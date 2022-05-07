import React, { FC, useState, useEffect, useCallback, MouseEvent } from "react";

import { deleteShipping } from "api/customers.api";
import { IShipping } from "types";
import { DeleteIcon, OpenInFullIcon, EditIcon } from "svgs";
import { Modal } from "styles/Modal/Modal";
import { List } from "styles/List/list.styles";
import EditShippingForm from "components/shippings/edit-shipping-form/EditShippingForm";
import ViewShipping from "components/shippings/shipping-view/ShippingView";

import { useShippingCollection } from "api/customers.api";

import {
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
} from "styles/Tables/table.styles";
import { OptionModal, ModalProps } from "styles/Modal/Modal";

import { BtnIcon } from "styles/commons";
import { MoreVertical } from "svgs";

type ShippingListProps = {
  customerId: string;
};

type ShippingFormProps = {
  onEditShipping: () => void;
  onViewShipping: () => void;
  onDeleteShipping: () => void;
};

type ShippingItemProps = {
  shipping: IShipping;
  onSelect: (event: MouseEvent) => void;
  index: string | null;
  isVisible: boolean;
};

type FormType = "edit" | "view";

const ShippingOptionsModal: FC<ModalProps & ShippingFormProps> = ({
  visible,
  onEditShipping,
  onViewShipping,
  onDeleteShipping,
}) => {
  return (
    <OptionModal visible={visible}>
      <List>
        <li onClick={onViewShipping}>
          <span>
            <OpenInFullIcon width={16} height={16} />
          </span>
          <span>Ver</span>
        </li>
        <li onClick={onEditShipping}>
          <span>
            <EditIcon width={16} height={16} />
          </span>
          <span>Editar</span>
        </li>
        <li onClick={onDeleteShipping}>
          <span>
            <DeleteIcon width={16} height={16} />
          </span>
          <span>Eliminar</span>
        </li>
      </List>
    </OptionModal>
  );
};

const ShippingItem: FC<ShippingItemProps & ShippingFormProps> = ({
  shipping,
  index,
  onSelect,
  isVisible,
  onEditShipping,
  onViewShipping,
  onDeleteShipping,
}) => (
  <tr>
    <td>{shipping.consignee}</td>
    <td>{shipping.notify}</td>
    <td>{shipping.transport_mode}</td>
    <td>{shipping.country}</td>
    <td>{shipping.city}</td>
    <td>
      <BtnIcon type="button" onClick={onSelect} id={`${index}`}>
        <MoreVertical />
      </BtnIcon>
      <ShippingOptionsModal
        visible={isVisible}
        onEditShipping={onEditShipping}
        onViewShipping={onViewShipping}
        onDeleteShipping={onDeleteShipping}
      />
    </td>
  </tr>
);

const ShippingInstructionList: FC<ShippingListProps> = ({ customerId }) => {
  const { loading, shippings } = useShippingCollection(customerId);
  const [selectedShipping, setSelect] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [isFormModalOpeneded, setOpenForm] = useState(false);
  const [formType, setFormType] = useState<FormType>("edit");

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener("click", handleCloseModal);
    } else {
      window.removeEventListener("click", handleCloseModal);
    }

    return () => {
      window.removeEventListener("click", handleCloseModal);
    };
  }, [selectedShipping, open, handleCloseModal]);

  const handleSelect = (e: MouseEvent) => {
    setSelect(e.currentTarget.id);
    setOpen(true);
  };

  const handleOnEditShipping = () => {
    setFormType("edit");
    setOpenForm(true);
  };

  const handleOnViewShipping = () => {
    setFormType("view");
    setOpenForm(true);
  };

  const handleOnDeleteShipping = () => {
    if (selectedShipping) {
      deleteShipping(customerId, selectedShipping);
    }
  };

  const handleCloseShippingForm = () => {
    setOpenForm(false);
  };

  if (loading) {
    return <p>Loading ...</p>;
  }
  console.log("selectedShipping: ", selectedShipping)
  return (
    <TableWrapper>
      <Modal open={isFormModalOpeneded} full>
        {formType === "edit" ? (
          <EditShippingForm
            customerId={customerId}
            shippingId={selectedShipping}
            onClose={handleCloseShippingForm}
          />
        ) : (
          <ViewShipping
            customerId={customerId}
            shippingId={selectedShipping}
            onClose={handleCloseShippingForm}
          />
        )}
      </Modal>

      <Table>
        <TableHeader>
          <tr>
            <th>Consignee</th>
            <th>Notify</th>
            <th>Modalidad</th>
            <th>País</th>
            <th>Ciudad entrega</th>
            <th></th>
          </tr>
        </TableHeader>

        <TableBody>
          {Object.keys(shippings).map((shippingId) => (
            <ShippingItem
              key={shippingId}
              shipping={shippings[shippingId]}
              onSelect={handleSelect}
              index={shippingId}
              isVisible={open && shippingId === selectedShipping}
              onEditShipping={handleOnEditShipping}
              onViewShipping={handleOnViewShipping}
              onDeleteShipping={handleOnDeleteShipping}
            />
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default ShippingInstructionList;
