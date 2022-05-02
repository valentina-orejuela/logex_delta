// import { IContainer } from "../types/";
// let r = (max: number = 13) : string => Math.random().toString(16).substring(15 - max);
let r = (max = 13) => Math.random().toString(16).substring(15 - max);

var expos = []
var orders = []

function generateInitialKeyValues() {
    for (let i = 0; i < 20; i++) {
        expos.push(r());
        orders.push(r(10));
    }
    console.log("expos: ", expos);
    console.log("orders: ", orders);
}

generateInitialKeyValues();

// console.log("random", r);
// let AZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// function randomQty(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function getPrefix() {
//     let s = ''
//     for (let i = 0; i < 4; i++) {
//         s += AZ[randomQty(AZ.length)];
//     }
//     return s;
// }

// function createContainerNumber() {
//     return `${getPrefix()}-${100000 + randomQty(899000)}-${randomQty(9) + 1}`
// }

// export function generateContainers() {
//     let qty = randomQty(20);
//     let r = {}
//     let container = createContainerNumber();
//     for(let i = 0; i < qty; i++) {
//         r[container] = true;
//         container = createContainerNumber();
//     }
//     console.log(r);
//     return r;
// }

// function createContainerInfo(id) : IContainer {
//     let c: IContainer = {
//         id,

        
//     }
//     return c;
// }

// function createItem() {
//     const d = {};

//     d.invoices = {
//         [r()]: true,
//     }

//     r.reserva = {
//         id: r(),
//         requestedAt: Date.now(),
//         containers: generateContainers()
//     }
// }

// const data = {
//     1: {
//         expoId: 1,
//     }
// }
