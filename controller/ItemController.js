
import ItemModel from "../models/ItemModel.js";

import { ItemArray} from "../db/database.js";

let index = null;

// Add Item and load table

const LoadItemTable = () => {

    $("#ItemTableBody").empty();

    ItemArray.map((Item,index)=>{


            let data = `<tr><td>${Item.id}</td><td>${Item.iName}</td><td>${Item.Price}</td><td>${Item.Quantity}</td></tr>`;

            $("#ItemTableBody").append(data);

    });


}
const LoadItemTable2 = () => {

    $("#ItemTableBody2").empty();

    ItemArray.map((Item,index)=>{


            let data = `<tr><td>${Item.id}</td><td>${Item.iName}</td><td>${Item.Price}</td><td>${Item.Quantity}</td></tr>`;

            $("#ItemTableBody2").append(data);

    });


}
$("#ViewAllItem").click(function (){
    LoadItemTable2();
})

$("#AddNewItem").click(function (){
    let id = generateId();
    let IName = $("#ItemName").val();
    let IPrice = $("#price").val();
    let Quantity = $("#Qty").val();

    console.log(id);
    console.log(IName);
    console.log(IPrice);
    console.log(Quantity);

    if (!regexForItemName(IName)) {
        Swal.fire({
            title: "Item Name Invalid ? ",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!priceRegexMethod(IPrice)) {
        Swal.fire({
            title: "Reenter Price !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }
    else if(!regexForQuantity(Quantity)) {
        Swal.fire({
            title: "invalid Quantity !",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    }

    else {

        let Item = new ItemModel(id, IName, IPrice, Quantity);



        ItemArray.push(Item);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Item Saved",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(ItemArray);
        clearItem();
        LoadItemTable();

    }

});

const  clearItem = () => {
    $("#ItemId").val(generateId());
    $("#ItemName").val('');
    $("#price").val('');
    $("#Qty").val('');
}

$("#ItemClear").click(function (){
     clearItem();
});



// load table when click


$("#ItemTableBody").on('click','tr',function (){
        index = $(this).index();
        console.log(index)
        let Item = ItemArray[index];
        $("#ItemId").val(Item.id);
        $("#ItemName").val(Item.iName);
        $("#price").val(Item.Price);
        $("#Qty").val(Item.Quantity);

});

const generateId = () =>{
    return  ItemArray.length+1;
}


$("#UpdateItems").click(function (){
    let id = $("#ItemId").val();
    let IName = $("#ItemName").val();
    let IPrice = $("#price").val();
    let Quantity = $("#Qty").val();

    let Item = new ItemModel(id,IName,IPrice,Quantity);
    ItemArray[index] = Item;
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Updated",
        showConfirmButton: false,
        timer: 1500
    });
    clearItem();
    LoadItemTable();

})


// delete

$("#DeleteItem").click(function (){
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
            ItemArray.splice(index , 1);
            clearItem();
            LoadItemTable();
            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted.",
                icon: "success"
            });
        }
    });

});


// search
$("#ItemSearch").click(function () {
    let searchValue = $("#ItemField").val().trim();
    console.log("Searching for: " + searchValue);

    let itemFound = false;

    // Convert searchValue to number for comparison
    const searchId = Number(searchValue);

    for (let i = 0; i < ItemArray.length; i++) {
        // Check if the current item's id matches the search value
        if (ItemArray[i].id === searchId) {
            itemFound = true;
            // Populate the fields with the found item's details
            $("#ItemId").val(ItemArray[i].id);
            $("#ItemName").val(ItemArray[i].iName);
            $("#price").val(ItemArray[i].Price);
            $("#Qty").val(ItemArray[i].Quantity);
            break;
        }
    }

    if (!itemFound) {
        alert("Item not found");
        clearItem();
    }
});



const priceRegexMethod = (price) => {
    const emailRegex = /^\d+(\.\d{1,2})?$/;
    return emailRegex.test(price);
};
const regexForQuantity = (quantity) => {
    const emailRegex = /^[1-9]\d*$/;
    return emailRegex.test(quantity);
};
const regexForItemName = (Iname) => {
    const emailRegex = /^[a-zA-Z\s\-_.]{1,50}$/;
    return emailRegex.test(Iname);
};



