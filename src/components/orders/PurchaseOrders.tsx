import React from "react";
import {
  TableWrapper,
  Table,
  TableHeader,
} from "styles/Tables/table.styles";

const PurchaseOrders = () => {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <tr>
            <th>ID</th>
            <th>Incoterm</th>
            <th>Modalidad</th>
            <th>Ciudad entrega</th>
            <th>Fecha entrega</th>
          </tr>
        </TableHeader>
      </Table>
    </TableWrapper>
  );
};

export default PurchaseOrders;
