

export default class CustomerModel {
    constructor(id, name, address, salary, mobile, email) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._salary = salary;
        this._mobile = mobile;
        this._email = email;
    }


    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }


    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }


    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }


    get salary() {
        return this._salary;
    }
    set salary(value) {
        this._salary = value;
    }


    get mobile() {
        return this._mobile;
    }
    set mobile(value) {
        this._mobile = value;
    }


    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
}
