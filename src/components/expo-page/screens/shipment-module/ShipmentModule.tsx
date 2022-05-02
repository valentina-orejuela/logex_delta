import React from 'react'
import { ShipmentModuleWrapper } from 'components/expo-page/screens/shipment-module/shipment_module.style';
import ShipmentDetails from 'components/shipment-details/ShipmentDetails';

const ShipmentModule = () => {
  return (
    <ShipmentModuleWrapper>
      <ShipmentDetails />      
    </ShipmentModuleWrapper>
  )
}

export default ShipmentModule
