export default class Order {
    constructor(orderid, date, cusid, itemcode, iname, iprice, qtyhand, ordedqty, total) {
        this._orderid = orderid;
        this._date = date;
        this._cusid = cusid;
        this._itemcode = itemcode;
        this._iname = iname;
        this._iprice = iprice;
        this._qtyhand = qtyhand;
        this._ordedqty = ordedqty;
        this._total = total;
    }

    // Getters
    get orderid() {
        return this._orderid;
    }

    get date() {
        return this._date;
    }

    get cusid() {
        return this._cusid;
    }

    get itemcode() {
        return this._itemcode;
    }

    get iname() {
        return this._iname;
    }

    get iprice() {
        return this._iprice;
    }

    get qtyhand() {
        return this._qtyhand;
    }

    get ordedqty() {
        return this._ordedqty;
    }

    get total() {
        return this._total;
    }

    // Setters
    set orderid(orderid) {
        this._orderid = orderid;
    }

    set date(date) {
        this._date = date;
    }

    set cusid(cusid) {
        this._cusid = cusid;
    }

    set itemcode(itemcode) {
        this._itemcode = itemcode;
    }

    set iname(iname) {
        this._iname = iname;
    }

    set iprice(iprice) {
        this._iprice = iprice;
    }

    set qtyhand(qtyhand) {
        this._qtyhand = qtyhand;
    }

    set ordedqty(ordedqty) {
        this._ordedqty = ordedqty;
    }

    set total(total) {
        this._total = total;
    }
}
