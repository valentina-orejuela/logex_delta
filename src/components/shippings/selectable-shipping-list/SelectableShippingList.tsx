import React, { FC } from "react";
import styled from 'styled-components'
import { IShipping } from "types";

import {
  TableWrapper,
  Table,
  TableHeader,
  TableBody,
} from "styles/Tables/table.styles";

import { SelectableShippingProps } from "types/props.types";


const SelectableTableWrapper = styled(TableWrapper)`
  width: 100%;
  box-shadow: unset;
  margin-bottom: 20px;
  font-family: 'Roboto';
`

const Body = styled(TableBody)`
  > tr {
    td:first-child {
      width: 40px;
    }
    td:last-child {
      width: unset;
    }
  }
`

type ShippingItemProps = {
  shipping: IShipping;
  onSelect: (event: React.SyntheticEvent<HTMLInputElement>) => void;
  index: string | null;
};

const ShippingItem: FC<ShippingItemProps> = ({ shipping, index, onSelect }) => (
  <tr>
    <td>
      <input type="radio" name="shipping" id={index as string} onChange={onSelect}/>
    </td>
    <td>{shipping.consignee}</td>
    <td>{shipping.notify}</td>
    <td>{shipping.transport_mode}</td>
    <td>{shipping.country}</td>
    <td>{shipping.city}</td>
  </tr>
);

const SelectableShippingList: FC<SelectableShippingProps> = ({ shippings, onSelectShipping }) => {
  return (
    <SelectableTableWrapper>
      <Table>
        <TableHeader>
          <tr>
            <th></th>
            <th>Consignee</th>
            <th>Notify</th>
            <th>Modalidad</th>
            <th>País</th>
            <th>Ciudad entrega</th>
          </tr>
        </TableHeader>

        <Body>
          {Object.keys(shippings).map((shippingId) => (
            <ShippingItem
              key={shippingId}
              shipping={shippings[shippingId]}
              onSelect={onSelectShipping}
              index={shippingId}
            />
          ))}
        </Body>
      </Table>
    </SelectableTableWrapper>
  );
};

export default SelectableShippingList;
