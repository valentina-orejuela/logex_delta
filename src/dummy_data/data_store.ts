// import {
//   ICliente,
//   Country,
//   CiudadZarpe,
//   PuertoZarpe,
//   IShipping,
// } from "../types";
// import { r } from "./testData";

// export const clientsIds = [
//   "939753cd55cf4",
//   "5bd367c4e657f",
//   "f477650146d5f",
//   "de98f2d16483c",
//   "08411837ba37",
//   "b2ca4b7b1057f",
//   "477cfaa01f6ae",
//   "0fb931cfb59c7",
//   "fbe1709bf614e",
//   "68a2ed4f533d2",
//   "6a3ad54a2ae",
//   "4730b9e89bd9f",
//   "82585923a565d",
//   "cdc41efc31b0c",
//   "3a899512f9746",
//   "ea16b334c9dd1",
//   "3d489fec21bcc",
//   "99fea8224cede",
//   "d3510cf4fa2cd",
//   "e22b0f6d5c2c",
// ];

// export const expos = [
//   "a6b05586956c",
//   "ffc00595c76bf",
//   "185ac28ded03f",
//   "fb336b6e25cc7",
//   "145a35391e233",
//   "18543af0b25be",
//   "59bd6963dc717",
//   "c2b012a51ec25",
//   "83c89d4f57707",
//   "74ca52f2570d7",
//   "1aa46a442f3f2",
//   "0af6d56355029",
//   "70d2d8d20dc45",
//   "adfda1efd06d5",
//   "5f3f248624267",
//   "e6ba3adbd73b6",
//   "1fa090385a4d6",
//   "8c38221ef772d",
//   "94387a9d0dca8",
//   "22306973e42b2",
// ];

// export const orders = [
//   "3ff5b974c3",
//   "c699a7f4a8",
//   "b69da9b3ca",
//   "60bb95cbd2",
//   "71227d63ef",
//   "71f380803d",
//   "252c070e0a",
//   "325dbc2c02",
//   "94fd6658bd",
//   "9bb6d35b64",
//   "863ee4b335",
//   "2e3705800f",
//   "762926ed1a",
//   "0986dd4314",
//   "ec675021bf",
//   "78dafc6d0a",
//   "34acce8542",
//   "6d08cbb602",
//   "a4b9a8901e",
//   "f2fd8c70d8",
// ];

// interface ObjectLiteral {
//   [key: number]: string;
// }

// export const navieras: ObjectLiteral = {
//   0: "CMA-GGM",
//   1: "HAPPAG LLOYD",
//   3: "MAERKS",
//   4: "MEDITERRANEAN SHIPPPING",
//   5: "COSCO SHIPPING",
//   6: "EVERGREEN SHIPPING",
//   7: "CHINA SHIPPING",
// };

// export const shippings: { [id: string]: IShipping } = {
//   kjhasd54asd: {
//     id: "kjhasd54asd",
//     customer_id: clientsIds[0],
//     consignee_id: clientsIds[0],
//     pais_destino: Country.Ecuador,
//     notify_id: clientsIds[0],
//     ciudad_puerto_zarpe: CiudadZarpe.IPIALES,
//     puerto_zarpe: {name: '',  alias: ''},
//     puerto_destino: "Tulcán",
//   },
//   asd45as4d58a5: {
//     id: "asd45as4d58a5",
//     customer_id: clientsIds[1],
//     consignee_id: clientsIds[1],
//     pais_destino: Country.Ecuador,
//     notify_id: clientsIds[1],
//     ciudad_puerto_zarpe: CiudadZarpe.BUENAVENTURA,
//     puerto_zarpe: PuertoZarpe.SPRBUN,
//     puerto_destino: "CALLAO",
//   },
//   askdjkls5456f: {
//     id: "askdjkls5456f",
//     customer_id: clientsIds[2],
//     consignee_id: clientsIds[2],
//     pais_destino: Country.Chile,
//     notify_id: clientsIds[2],
//     ciudad_puerto_zarpe: CiudadZarpe.BUENAVENTURA,
//     puerto_zarpe: PuertoZarpe.TCBUEN,
//     puerto_destino: "VALPARAISO",
//   },
//   qwe48qwe5qwe: {
//     id: "qwe48qwe5qwe",
//     customer_id: clientsIds[3],
//     consignee_id: clientsIds[3],
//     pais_destino: Country.Ecuador,
//     notify_id: clientsIds[3],
//     ciudad_puerto_zarpe: CiudadZarpe.CARTAGENA,
//     puerto_zarpe: PuertoZarpe.SPRCTG,
//     puerto_destino: "SANTOS",
//   },
//   tr5w54w5e5we45: {
//     id: "tr5w54w5e5we45",
//     customer_id: clientsIds[4],
//     consignee_id: clientsIds[4],
//     pais_destino: Country.Mexico,
//     notify_id: clientsIds[4],
//     ciudad_puerto_zarpe: CiudadZarpe.BUENAVENTURA,
//     puerto_zarpe: PuertoZarpe.SPRBUN,
//     puerto_destino: "Veracruz",
//   },
//   uuuaskdjk56: {
//     id: "uuuaskdjk56",
//     customer_id: clientsIds[5],
//     consignee_id: clientsIds[5],
//     pais_destino: Country.EstadosUnidos,
//     notify_id: clientsIds[5],
//     ciudad_puerto_zarpe: CiudadZarpe.CARTAGENA,
//     puerto_zarpe: PuertoZarpe.CONTECAR,
//     puerto_destino: "NEW YORK",
//   },
//   iusdjk665sd: {
//     id: "iusdjk665sd",
//     customer_id: clientsIds[6],
//     consignee_id: clientsIds[6],
//     pais_destino: Country.Belgica,
//     notify_id: clientsIds[6],
//     ciudad_puerto_zarpe: CiudadZarpe.CARTAGENA,
//     puerto_zarpe: PuertoZarpe.SPRCTG,
//     puerto_destino: "Antwerp",
//   },
//   oosdkll5452sd: {
//     id: "oosdkll5452sd",
//     customer_id: clientsIds[7],
//     consignee_id: clientsIds[7],
//     pais_destino: Country.EmiratosArabes,
//     notify_id: clientsIds[7],
//     ciudad_puerto_zarpe: CiudadZarpe.BUENAVENTURA,
//     puerto_zarpe: PuertoZarpe.SPRBUN,
//     puerto_destino: "Emiretes",
//   },
//   oopakkjas854a: {
//     id: "oopakkjas854a",
//     customer_id: clientsIds[8],
//     consignee_id: clientsIds[8],
//     pais_destino: Country.Espana,
//     notify_id: clientsIds[8],
//     ciudad_puerto_zarpe: CiudadZarpe.CARTAGENA,
//     puerto_zarpe: PuertoZarpe.SPRCTG,
//     puerto_destino: "BILBAO",
//   },
// };

// export const clientes: ICliente[] = [
//   {
//     id: clientsIds[0],
//     name: "Importaciones de Ecuador",
//     shippings: ["kjhasd54asd"],
//     country: Country.Ecuador,
//     city: "Quito",
//     address: "Av nuevo milenio",
//   },
//   {
//     id: clientsIds[1],
//     name: "Importaciones de Perú",
//     shippings: ["asd45as4d58a5"],
//     country: Country.Peru,
//     city: "Callao",
//     address: "Av primera diagonal 2b",
//   },
//   {
//     id: clientsIds[2],
//     name: "Importaciones de Chile",
//     shippings: ["askdjkls5456f"],
//     country: Country.Chile,
//     city: "Santiago de Chile",
//     address: "Calle 1A # 44 - 75",
//   },
//   {
//     id: clientsIds[3],
//     name: "Importaciones de Brasil",
//     shippings: ["qwe48qwe5qwe"],
//     country: Country.Brasil,
//     city: "Sao Pablo",
//     address: "Calle 52 # 87 -92",
//   },
//   {
//     id: clientsIds[4],
//     name: "Importaciones de México",
//     shippings: ["tr5w54w5e5we45"],
//     country: Country.Mexico,
//     city: "México DF",
//     address: "Carrera 22 # 78 - 96",
//   },
//   {
//     id: clientsIds[5],
//     name: "Central Perk imports LTD",
//     shippings: ["uuuaskdjk56"],
//     country: Country.EstadosUnidos,
//     city: "New York",
//     address: "First strest down central park",
//   },
//   {
//     id: clientsIds[6],
//     name: "Belgium imports LLC",
//     shippings: ["iusdjk665sd"],
//     country: Country.Belgica,
//     city: "Bruselas",
//     address: "Brusel stree 44 cuis",
//   },
//   {
//     id: clientsIds[7],
//     name: "Emirates Expert Imports",
//     shippings: ["oosdkll5452sd"],
//     country: Country.EmiratosArabes,
//     city: "Emiretes",
//     address: "Emiretes main street building",
//   },
//   {
//     id: clientsIds[8],
//     name: "Mediterranean importaciones",
//     shippings: ["oopakkjas854a"],
//     country: Country.Espana,
//     city: "Madrid",
//     address: "Calle vieja # 45 - 25",
//   },
// ];

export default null;