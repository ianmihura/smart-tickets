// Client-side Javascript
// DOM elements manipulation & event listeners

var purchaseDetails = {};

function OnBuyTicket() {
    var eventId = EventId();
    purchaseDetails = {
        ticketId: getElementById("ticketId").value,
        amount: getElementById("amount").value,
        personalId: requiresId ? getElementById("personalId").value : ""
    };

    purchaseDetails.price = ticketPrices[purchaseDetails.ticketId];
    purchaseDetails.totalPrice = purchaseDetails.amount * purchaseDetails.price;

    if (!eventId || !purchaseDetails.ticketId || !purchaseDetails.amount)
        return LogShow("", "Please fill in the required fields");

    var ticketName = ticketDescriptions[purchaseDetails.ticketId];
    PopulateConfirmModal(eventId, ticketName);

    M.Modal.getInstance(getElementById("purchaseConfirm")).open();
}

function PopulateConfirmModal(eventId, ticketName) {
    var table = getElementById("purchaseTable");
    var tableLength = table.children[0].children.length;

    for (tableLength; tableLength > 1; tableLength--)
        table.deleteRow(tableLength - 1);

    var row = table.insertRow();
    var eventIdRow = row.insertCell(0);
    var amountRow = row.insertCell(1);
    var ticketRow = row.insertCell(2);
    var priceRow = row.insertCell(3);

    eventIdRow.innerHTML = eventId;
    ticketRow.innerHTML = ticketName;
    amountRow.innerHTML = purchaseDetails.amount;
    priceRow.innerHTML = purchaseDetails.totalPrice;
}

function OnConfirmPurchase() {
    BuyTickets(
        EventId(),
        purchaseDetails.ticketId,
        purchaseDetails.amount,
        purchaseDetails.totalPrice,
        purchaseDetails.personalId,
        BuyTicketCallback);
}

function BuyTicketCallback(data) {
    LogShow(data, 'Bought Tickets!');
    setTimeout(OnGetEventData, 2000);
}
