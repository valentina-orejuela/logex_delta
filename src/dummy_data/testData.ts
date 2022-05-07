// import {
//   IExpo,
//   IReserva,
//   IContainer,
//   IBroker,
//   ContainerType,
//   ModoTransporte,
//   IVehiculo,
//   IDriver,
//   IEmpresaTransporte,
//   ExpoStatus,
//   Month
// } from "../types/";
// import { clientsIds, expos, orders, shippings, clientes, navieras } from "./data_store";

// export let r = (max: number = 13): string =>
//   Math.random()
//     .toString(16)
//     .substring(15 - max);

// const status = [
//   ExpoStatus.PrevioCargue,
//   ExpoStatus.TransitoPuerto,
//   ExpoStatus.EnPuerto,
//   ExpoStatus.TransitoInternacional,
//   ExpoStatus.EnDestino,
//   ExpoStatus.Entregado
// ];

// const vehiculos: { [id: string]: IVehiculo } = {};
// const drivers: { [id: string]: IDriver } = {};
// const containers: { [id: string]: IContainer } = {};
// const bookings: { [id: string]: IReserva } = {};
// const exportaciones: { [id: string]: IExpo } = {};

// const brokers: IBroker[] = [
//   {
//     id: r(10),
//     name: "DHL Global Forwarding",
//     contactos: [],
//   },
//   {
//     id: r(10),
//     name: "Transborder SAS",
//     contactos: [],
//   },
//   {
//     id: r(10),
//     name: "Panalpina Forwarder",
//     contactos: [],
//   },
//   {
//     id: r(10),
//     name: "Blue Cargo",
//     contactos: [],
//   },
//   {
//     id: r(10),
//     name: "Schenker",
//     contactos: [],
//   },
// ];

// const empresas_transporte: IEmpresaTransporte[] = [
//   {
//     id: r(),
//     name: "TRASNPORTES UBIMAR",
//   },
//   {
//     id: r(),
//     name: "ALDIA TRANSPORTES",
//   },
//   {
//     id: r(),
//     name: "TRANSPORTES COLTRANS",
//   },
//   {
//     id: r(),
//     name: "MARITRANS",
//   },
//   {
//     id: r(),
//     name: "COLTANQUES",
//   },
//   {
//     id: r(),
//     name: "TRASNANDINA",
//   },
// ];

// const container_types = [
//   ContainerType._20,
//   ContainerType._40,
//   ContainerType._40HQ,
//   ContainerType._REFEER,
// ];

// let AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// // function randomQty(max: number = 10): number {
// function randomQty(min: number = 0, max: number = 10): number {
//   return min + Math.floor(Math.random() * Math.floor(max + 1));
// }

// function getPrefix(max: number) {
//   let s = "";
//   for (let i = 0; i < max; i++) {
//     s += AZ[randomQty(0, AZ.length - 1)];
//   }
//   return s;
// }

// function create_container_number(): string {
//   return `${getPrefix(4)}-${randomQty(100000, 899000)}-${randomQty(0, 9)}`;
//   // return `${getPrefix()}-${100000 + randomQty(899000)}-${randomQty(9) + 1}`;
// }

// function t() {
//   return {
//     year(): number {
//       return 2020;
//     },
//     month(): number {
//       return randomQty(0, 11);
//     },
//     day(): number {
//       return randomQty(0, 27);
//     },
//   };
// }

// let intl_transport_days = {
//   [ModoTransporte.AEREO]: 3,
//   [ModoTransporte.MARITIMO]: 15,
//   [ModoTransporte.TERRESTRE]: 2,
// };

// export function generate_dates(
//   eta_destino: number,
//   modo_transporte: ModoTransporte
// ) {
//   let day_millis = 60 * 60 * 24 * 1000;

//   let transito = intl_transport_days[modo_transporte];

//   let etd = eta_destino + transito * day_millis;
//   let eta_origen = etd - randomQty(0, 1) * day_millis;
//   let cierre_fisico = etd - randomQty(1, 3) * day_millis;
//   let cierre_documental = cierre_fisico - randomQty(1, 3) * day_millis;
//   let ingreso_puerto = cierre_documental - randomQty(0, 2) * day_millis;
//   let cargue_planta = ingreso_puerto - randomQty(1, 3) * day_millis;

//   return {
//     eta_origen() {
//       return eta_origen;
//     },
//     etd() {
//       return etd;
//     },
//     cierre_fisico() {
//       return cierre_fisico;
//     },
//     cierre_documental() {
//       return cierre_documental;
//     },
//     ingreso_puerto() {
//       return ingreso_puerto;
//     },
//     cargue_planta() {
//       return cargue_planta;
//     },
//   };
// }

// function container_dates(cierre_documental: number) {
//   let day_millis = 60 * 60 * 24 * 1000;
//   let ingreso_puerto = cierre_documental - randomQty(0, 2) * day_millis;
//   let cargue_planta = ingreso_puerto - randomQty(1, 3) * day_millis;

//   return {
//     ingreso_puerto() {
//       return ingreso_puerto;
//     },
//     cargue_planta() {
//       return cargue_planta;
//     },
//   };
// }

// function add_vehiculo() {
//   let transportador: IEmpresaTransporte =
//     empresas_transporte[randomQty(0, empresas_transporte.length - 1)];

//   let vehiculo: IVehiculo = {
//     id: r(),
//     placa: `${getPrefix(3)}-${randomQty(100, 899)}`,
//     driver_id: `${randomQty(4000000, 9999999999)}`,
//     empresa_id: transportador?.id,
//   };

//   let driver: IDriver = {
//     id: vehiculo.driver_id,
//     name: `Name ${r()}`,
//   };

//   vehiculos[vehiculo.id] = vehiculo;
//   drivers[driver.id] = driver;

//   return vehiculo.id;
// }

// export function generate_containers(
//   booking_id: string,
//   cierre_documental: number
// ): string[] {
//   let qty = randomQty(0, 20);
//   let constainers_ids: string[] = [];
  
//   for (let i = 0; i < qty; i++) {
//     let container_number = create_container_number();
    
//     let dates = container_dates(cierre_documental);
//     let peso_bruto = randomQty(8000, 21000); // TODO: rounded numbers to 18550, mean to decimal
//     let peso_neto = peso_bruto * 0.9;
  
//     let vehiculo_id = add_vehiculo();
//     let id = r();
//     const container = {
//       id,
//       container_number,
//       booking_id,
//       type: container_types[randomQty(0, 2)],
//       date_cargue: dates.cargue_planta(),
//       date_ingreso_puerto: dates.ingreso_puerto(),
//       peso_bruto,
//       peso_neto,
//       vehiculo_id,
//     };
//     containers[id] = container;
//     constainers_ids.push(id);
//   }

//   return constainers_ids;
// }

// function get_transport_type(r: number): ModoTransporte {
//   let type = ModoTransporte.MARITIMO;
//   if (r > 95) {
//     type = ModoTransporte.TERRESTRE;
//   } else if (r > 90) {
//     type = ModoTransporte.AEREO;
//   }
//   return type;
// }

// // export function createBooking(
// //   modo_transporte: ModoTransporte,
// //   shipping_id: string
// // ): {booking_id: string
// //   booking_number: string
// // } {
// export function createBooking(
//   booking_id: string,
//   modo_transporte: ModoTransporte,
//   shipping_id: string
// ) {

//   let eta_destino = new Date(t().year(), t().month(), t().day()).getTime();
//   let dates = generate_dates(eta_destino, modo_transporte);
//   let eta = dates.eta_origen();
//   let etd = dates.etd();
//   let date_cierre_documental = dates.cierre_documental();
//   let date_cierre_fisico = dates.cierre_fisico();
  
//   // let booking_id = r(10);
//   let booking_number = r();

//   let booking: IReserva = {
//     id: booking_id,
//     booking_number,
//     broker_id: brokers[randomQty(0, 4)].id,
//     eta,
//     eta_destino,
//     date_cierre_documental,
//     date_cierre_fisico,
//     etd,
//     documento_transporte_id: r(),
//     naviera_id: randomQty(0, 6),
//     shipping_id,
//     contenedores: generate_containers(booking_id, date_cierre_documental),
//   };
//   bookings[booking_id] = booking;

//   // return {booking_id, booking_number};
// }

// export function createExpo(consecutivo: number) {
//   let customer = clientes[randomQty(0, clientes.length - 1)]?? {};
//   let modo_transporte = get_transport_type(randomQty(0, 100));

//   let { id, name } = customer;

//   // let { booking_id, booking_number } = createBooking(modo_transporte, customer?.shippings[0]);
//   let shipping_id = customer?.shippings[0];
//   let shipping_instruction = shippings[shipping_id]?? {};


//   let booking_id = r(10);
//   createBooking(booking_id, modo_transporte, shipping_id);

//   let booking = bookings[booking_id]?? {};
//   let { eta, naviera_id, broker_id } = booking;

//   let naviera: string = navieras[naviera_id] || '';
//   let broker = brokers.find(i => i.id === broker_id)?.name || '';

//   let { puerto_zarpe, country, ciudad_puerto_zarpe, city } = shipping_instruction;

//   let expo: IExpo = {
//     // id: r(),
//     id: `EXP-10${consecutivo}`,
//     consecutivo: `EXP-10${consecutivo}`,
//     oc: r(),
//     customer_id: id,
//     customer_name: name,
//     ciudad_puerto_zarpe,
//     sealing_port: puerto_zarpe,
//     destination_country: pais_destino,
//     puerto_destino, 
//     modo_transporte,
//     booking: booking,
//     naviera, 
//     broker,
//     // status: status[randomQty(0, status.length - 1)], // probably broken after new changes
//     status: randomQty(0, status.length - 1), // probably broken after new changes
//     indicatator_month: (new Date(eta).getMonth() + 1) as Month,
//   };
//   exportaciones[expo.id] = expo;
// }

// export function generate_data(qty: number) {
//   for(let i = 0; i < qty; i++) {
//     createExpo(i);
//   }

//   return {
//     customers: {...clientes},
//     exportaciones,
//     bookings,
//     containers,
//     vehiculos,
//     drivers,
//     shippings,
//   }

// }

export default null;