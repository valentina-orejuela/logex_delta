import React, { useState } from "react";
import { useSuppliers } from "api/suppliers.api";
import styled from "styled-components";
import { ISupplier } from "types";
import {
  PropertyType,
  IColumn,
  IEditableProps,
  SelectTypeBoxOptionTagList
} from "types/table-type/table.types";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  useSupplierOptionList
} from "api/suppliers.api";
import { updateSupplierTypeSettings } from 'api/settings.api';
import {
  StyledMain,
  StyledContent,
  StyledSubHeader,
  ButtonAct,
} from "styles/commons";
import { AddIcon } from "svgs";
import Table from "components/table/Table";
import SupplierSmallView from "components/suppliers-page/screens/supplier-small-view/SupplierSmallView";

const SupplierContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 30px 0;
`;

const SupplierHeader = styled.div`
  display: flex;
  h1 {
    padding: 0;
    margin: 0;
    color: var(--color-text-dominant);
  }
`;

const AddCustomerBtn = styled(ButtonAct)`
  padding: 0 12px 0 6px;
  > svg {
    margin-right: 6px;
    fill: var(--color-main);
  }
`;

const supplierTableColumns: IColumn<ISupplier>[] = [
  {
    type: PropertyType.Text,
    name: "ID / NIT",
    fieldName: "supplierId",
    minWidth: 150,
  },
  {
    type: PropertyType.Text,
    name: "Nombre",
    fieldName: "name",
    minWidth: 150,
  },
  {
    type: PropertyType.Text,
    name: "Alias",
    fieldName: "alias",
    minWidth: 150,
  },
  {
    type: PropertyType.Select,
    name: "Role",
    fieldName: "role",
    minWidth: 150,
  },
];

const emptySupplier: Omit<ISupplier, "createdAt"> = {
  id: "",
  supplierId: "",
  name: "",
  role: "",
  alias: "",
};

const SupplierPage = () => {
  const selectionOptionLists = useSupplierOptionList();
  const { supplierList, loading } = useSuppliers();
  const [error, setError] = useState<null | string>(null);
  const [selectedSupplierId, setSelectedSupplierId] = useState<null | string>(
    null
  );

  const handleOnSelectSupplier = (supplierId: string) => {
    setSelectedSupplierId(supplierId);
  };

  const handleOnDeleteSupplier = () => {
    if (selectedSupplierId) {
      deleteSupplier(selectedSupplierId)
        .then(() => {
          setSelectedSupplierId(null);
        })
        .catch((error) => {
          console.log("Error deleting the supplier: ", error);
          setError("Error al eliminar el proveedor.");
          setSelectedSupplierId(null);
        });
    }
  };

  const handleClickOnAddSupplier = () => {
    const data: ISupplier = {
      ...emptySupplier,
      createdAt: Date.now(),
    };
    createSupplier(data);
  };

  const handleOnUpdate = (editableValue: IEditableProps) => {
    const clone = [...supplierList];
    const { value, rowId, columnName } = editableValue;
    if (rowId && columnName) {
      const rowIndex = clone.findIndex((supplier) => supplier.id === rowId);
      const supplier = supplierList[rowIndex];
      if (supplier) {
        const supplierUpdate = { ...supplier, [columnName]: value };
        updateSupplier(supplier.id, supplierUpdate);
      }
    }
  };

  const handleOnUpdateSelectionOptionList = (
    updatedOptionList: SelectTypeBoxOptionTagList
  ) => {
    updateSupplierTypeSettings(updatedOptionList);
  };

  return (
    <StyledMain>
      {selectedSupplierId && (
        <SupplierSmallView
          supplierId={selectedSupplierId}
          onClose={() => setSelectedSupplierId(null)}
          onDeleteSupplier={handleOnDeleteSupplier}
          error={error}
        />
      )}
      <StyledSubHeader>
        <SupplierHeader>
          <h1>PROVEEDORES</h1>
        </SupplierHeader>
      </StyledSubHeader>
      <StyledContent fullview>
        <SupplierContent>
          {loading ? (
            <p>Loading ...</p>
          ) : supplierList.length ? (
            <Table
              tableName="suppliers_table"
              columns={supplierTableColumns}
              rows={supplierList}
              onSelection={handleOnSelectSupplier}
              onUpdateData={handleOnUpdate}
              onNewRow={handleClickOnAddSupplier}
              selectionOptionLists={selectionOptionLists}
              onUpdateSelectionOptionList={handleOnUpdateSelectionOptionList}
            />
          ) : (
            <div>
              <AddCustomerBtn onClick={handleClickOnAddSupplier}>
                <AddIcon />
                <span>NUEVO PROVEEDOR</span>
              </AddCustomerBtn>
            </div>
          )}
        </SupplierContent>
      </StyledContent>
    </StyledMain>
  );
};

export default SupplierPage;
