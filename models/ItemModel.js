export default class ItemModel {
    constructor(id, iName, Price, Quantity) {
        this._id = id;
        this._iName = iName;
        this._Price = Price;
        this._Quantity = Quantity;
    }


    get id() {
        return this._id;
    }


    set id(value) {
        this._id = value;
    }


    get iName() {
        return this._iName;
    }


    set iName(value) {
        this._iName = value;
    }


    get Price() {
        return this._Price;
    }


    set Price(value) {
        this._Price = value;
    }


    get Quantity() {
        return this._Quantity;
    }


    set Quantity(value) {
        this._Quantity = value;
    }
}
