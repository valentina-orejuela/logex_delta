// import React, { FunctionComponent } from "react";
// import { useSelector } from "react-redux";
// import { StateType, ExpoItemProps } from "types/props.types";

// // import Checkpoint from "components/checkpoint/CheckPoint";
// // import Checklist from "components/checklist/Checklist";
// import ShipmentDetails from "components/shipment-details/ShipmentDetails";

// import {
//   ExpoDetailsWrapper,
//   CustomerInfo,
//   DataField,
//   DataContent,
//   BookingNumber,
//   SealingInfo,
//   BrokersAndSchedule,
//   Schedule,
// } from "styles/expo_details";
// import { Wrapper } from "./expo_quick_view.style";

// type Props = {
//   expoId: string;
// };

// const ExpoDetails: FunctionComponent<ExpoItemProps> = ({ expo }) => {
//   return (
//     <ExpoDetailsWrapper>
//       <CustomerInfo>
//         <span className="customer-name">{expo.customer_name}</span>
//         <span className="destination">{`${expo.destination_country} / ${expo.puerto_destino}`}</span>
//       </CustomerInfo>
//       <DataField>
//         <DataContent>
//           <label>Ordenes de compra</label>
//           <span>{expo.oc}</span>
//         </DataContent>
//         <DataContent>
//           <label>Facturas</label>
//           <span></span>
//         </DataContent>
//       </DataField>
//       <BookingNumber>
//         <DataContent emphasize>
//           <label>Reserva No:</label>
//           <span>{expo.booking?.booking_number}</span>
//         </DataContent>
//         <DataContent emphasize>
//           <label>BL No:</label>
//           <span></span>
//         </DataContent>
//       </BookingNumber>
//       <SealingInfo>
//         <DataContent>
//           <label>Ciudad zarpe</label>
//           <span>{expo.ciudad_puerto_zarpe?.name}</span>
//         </DataContent>
//         <DataContent>
//           <label>Terminal porturario</label>
//           <span>{expo.sealing_port?.alias}</span>
//         </DataContent>
//         <DataContent>
//           <label>Naviera</label>
//           <span>{expo.shipping_company}</span>
//         </DataContent>
//         <DataContent>
//           <label>Viaje / Motonave</label>
//           {/* <span>V25N / VERONICA</span> */}
//           <span></span>
//         </DataContent>
//       </SealingInfo>
//       <BrokersAndSchedule>
//         <DataContent>
//           <label>Agente de carga</label>
//           <span>{expo.broker}</span>
//         </DataContent>
//         <DataContent>
//           <label>Agente de aduanas</label>
//           <span>AGENCIA DE ADUANAS DHL</span>
//         </DataContent>
//         <DataContent>
//           <label>Transportador</label>
//           <span>COLTRANS</span>
//         </DataContent>
//         <Schedule>
//           <label>Itinerario</label>
//           <div>
//             <ul>
//               <li>
//                 <label>ETA:</label>
//                 <span>
//                   {expo?.booking?.eta
//                     ? new Date(expo?.booking?.eta).toLocaleDateString()
//                     : ""}
//                 </span>
//               </li>
//               <li>
//                 <label>Cierre documental:</label>
//                 <span>
//                   {new Date(
//                     expo.booking?.date_cierre_documental || ""
//                   ).toLocaleDateString()}
//                 </span>
//               </li>
//               <li>
//                 <label>Cierre físico:</label>
//                 <span>
//                   {new Date(
//                     expo.booking?.date_cierre_fisico || ""
//                   ).toLocaleDateString()}
//                 </span>
//               </li>
//               <li>
//                 <label>Zarpe:</label>
//                 <span>
//                   {expo.booking?.etd
//                     ? new Date(expo.booking?.etd).toLocaleDateString()
//                     : ""}
//                 </span>
//               </li>
//               <li>
//                 <label>ETA destino:</label>
//                 <span>
//                   {expo.booking?.eta_destino
//                     ? new Date(expo.booking?.eta_destino).toLocaleDateString()
//                     : ""}
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </Schedule>
//       </BrokersAndSchedule>
//     </ExpoDetailsWrapper>
//   );
// };

// const Expo = ({ expoId }: Props) => {
//   const expo = useSelector(
//     (state: StateType) => state.exportaciones[expoId] ?? {}
//   );
//   if (!expo.consecutivo) {
//     return <p>Error para visualizar esta exportación</p>;
//   }

//   return (
//     <Wrapper>
//       <ExpoDetails expo={expo} />
//       {/* <Checkpoint /> */}
//       {/* <Checklist list={expo.todo_list ?? []} expoId={expoId} /> */}
//       <ShipmentDetails />
//     </Wrapper>
//   );
// };

// export default Expo;

export {}