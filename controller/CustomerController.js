// add customer
import CustomerModel from "../models/customerModel.js";
import { customerArray } from "../db/database.js";


let index = null;
const getNextCustomerId = () => {
    return customerArray.length + 1;
};


$("#customerSaveButton").click(function (){
    let customerId = getNextCustomerId();
    let Cusname = $("#name").val();
    let CusAddress = $("#address").val();
    let CusSalary = $("#salary").val();
    let mobile = $("#mobile").val();
    let email = $("#email").val();

    console.log(customerId);
    console.log(Cusname);
    console.log(CusAddress);
    console.log(CusSalary);
    console.log(mobile);
    console.log(email);

    if (Cusname.length === 0 ) {
        Swal.fire({
            title: "Name is Empty ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(CusAddress.length === 0) {
        Swal.fire({
            title: "Address is Empty ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(CusSalary.length === 0) {
        Swal.fire({
            title: "Empty Salary ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!phoneRegexMethod(mobile)) {
        Swal.fire({
            title: "Mobile incorrect !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!emailRegexMethod(email)) {
        Swal.fire({
            title: "Invalid Email !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else {

        let customer = new CustomerModel(customerId, Cusname, CusAddress, CusSalary, mobile, email);
        customerArray.push(customer);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer Saved",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(customer);
        CustomerTableLoad();
        ClearField();

    }

});



// add table
const CustomerTableLoad = () => {
    $("#CustomerTableBody").empty();

    customerArray.map((customer, index) => {


            // Access by getter methods
            let data = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
            <td>${customer.mobile}</td>
            <td>${customer.email}</td>
        </tr>`;
            $("#CustomerTableBody").append(data);

    });
};
const CustomerTableLoadAll = () => {
    $("#CustomerTableBody2").empty();

    customerArray.map((customer, index) => {


            // Access by getter methods
            let data = `<tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.address}</td>
            <td>${customer.salary}</td>
            <td>${customer.mobile}</td>
            <td>${customer.email}</td>
        </tr>`;
            $("#CustomerTableBody2").append(data);

    });
};


const ClearField = () => {
     $("#CustomerId").val(getNextCustomerId())
     $("#name").val('');
     $("#address").val('');
     $("#salary").val('');
     $("#mobile").val('');
     $("#email").val('');
}

$("#ClearCustomer").click(function (){
    ClearField();
})

// when click the table body details need to load the table body

$("#CustomerTableBody").on('click','tr',function (){
    index = $(this).index();
    console.log(index);
    let customer = customerArray[index];
    $("#CustomerId").val(customer.id);
    $("#name").val(customer.name);
    $("#address").val(customer.address);
    $("#salary").val(customer.salary);
    $("#mobile").val(customer.mobile);
    $("#email").val(customer.email);
});


// update Customer

$("#CustomerUpdateButton").click(function (){

    let selected_index = index
    let customerId = $("#CustomerId").val();
    let Cusname = $("#name").val();
    let CusAddress = $("#address").val();
    let CusSalary = $("#salary").val();
    let mobile = $("#mobile").val();
    let email = $("#email").val();


    if (Cusname.length === 0 ) {
        Swal.fire({
            title: "Name is Empty ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(CusAddress.length === 0) {
        Swal.fire({
            title: "Address is Empty ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(CusSalary.length === 0) {
        Swal.fire({
            title: "Empty Salary ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!phoneRegexMethod(mobile)) {
        Swal.fire({
            title: "Mobile incorrect !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!emailRegexMethod(email)) {
        Swal.fire({
            title: "Invalid Email !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }

    else {
        console.log(customerArray[selected_index]);
        let UpdatedCus = new CustomerModel(customerId, Cusname, CusAddress, CusSalary, mobile, email);
        customerArray[selected_index] = UpdatedCus;
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer Updated",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(customerArray[selected_index]);
        ClearField();
        CustomerTableLoad();
    }
});


// delete customer


$("#DeleteCustomer").click(function (){

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"

    }).then((result) => {
        if (result.isConfirmed) {
            console.log(customerArray);
            customerArray.splice(index ,1);
            ClearField();
            CustomerTableLoad();
            console.log(customerArray);
            Swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted.",
                icon: "success"
            });
        }
    });

});


// load All Customer

$("#viewAllCustomerT").click(function (){
    CustomerTableLoadAll();
})

// regex part

const emailRegexMethod = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const phoneRegexMethod = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
};