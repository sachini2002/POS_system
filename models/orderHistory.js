// OrderModel.js

export default class OrderHistory {
    constructor(orderid, date, cusid, total, items) {
        this._orderid = orderid; // Private variable
        this._date = date;       // Private variable
        this._cusid = cusid;     // Private variable
        this._total = total;     // Private variable
        this._items = items;     // Private variable
    }

    // Getter and Setter for orderid
    get orderid() {
        return this._orderid;
    }

    set orderid(value) {
        this._orderid = value;
    }

    // Getter and Setter for date
    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    // Getter and Setter for cusid
    get cusid() {
        return this._cusid;
    }

    set cusid(value) {
        this._cusid = value;
    }

    // Getter and Setter for total
    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    // Getter and Setter for items
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    // Method to add an item to the order
    addItem(item) {
        this._items.push(item); // Add item to the items array
        this._total += item.total; // Update the total amount
    }
}


