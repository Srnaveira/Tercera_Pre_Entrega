const ticketsData = require('../persistence/data/ticketsData.js');


async function purchase(newPurchase){
    try {
        console.log(newPurchase)
        const purchaseSucefull = await ticketsData.purchase(newPurchase) 
        return purchaseSucefull;
    } catch (error) {
        console.error("Hubo un problema en el TicketService");
        throw new Error("Hubo un problema en el TicketService");
    }
};


async function getTicketByUser(purchaser){
    try {
        console.log(purchaser)
        return await ticketsData.getTicketByUser(purchaser);     
    } catch (error) {
        console.error("Hubo un problema en el TicketService");
        throw new Error("Hubo un problema en el TicketService");
    }
};

async function getTicketByCode(code){
    try {
        return await ticketsData.getTicketByCode(code);
    } catch (error) {
        console.error("Hubo un problema en el TicketService");
        throw new Error("Hubo un problema en el TicketService");
    }
};

async function getTickets() {
    try {
        return await ticketsData.getTickets();   
    } catch (error) {
        console.error("Hubo un problema en el TicketService al traer todos los tickets");
        throw new Error("Hubo un problema en el TicketService al traer todos los tickets");
        
    }
};


module.exports = {
    purchase,
    getTicketByUser,
    getTicketByCode,
    getTickets
}