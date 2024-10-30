import {customerArray,ItemArray,cart,orderHistory} from "../db/database.js";
import Order from "../models/OrderModel.js";

import OrderHistory from "../models/orderHistory.js";



$("#customerSearch").click(function (){

    let customerSerachId = parseInt($("#customerSearchId").val());


    let search = false;
    for (let i = 0 ; i < customerArray.length ; i++){
        if (customerSerachId === customerArray[i].id){
                $("#CustomerId2").val(customerArray[i].id);
                $("#cuname").val(customerArray[i].name);
                $("#cusalary").val(customerArray[i].salary);
                $("#cuaddress").val(customerArray[i].address);
        }

    }




});

$("#itemSearchOrder").click(function () {

    let itemFound = false; // Track if item is found
    let itemSearchCode = parseInt($("#iteCode").val());

    for (let i = 0; i < ItemArray.length; i++) {
        if (itemSearchCode === ItemArray[i].id) {
            console.log("Item found:", ItemArray[i].id);
            $("#iteCode2").val(ItemArray[i].id);
            $("#Iname").val(ItemArray[i].iName);
            $("#Iprice").val(ItemArray[i].Price);
            $("#qtyhand").val(ItemArray[i].Quantity);

            itemFound = true;
            break; // Stop searching once found
        }
    }

    if (!itemFound) {
        alert("Item not found"); // Only alert once if not found
    }
});

let total = 0  ;
// $("#addItem").click(function (){
//     let orderid = $("#orderid").val();
//     let date = $("#date").val();
//     let cusID = $("#CustomerId2").val();
//     let ItemCode = $("#iteCode2").val();
//     let ItemName = $("#Iname").val();
//     let ItemPrice = $("#Iprice").val();
//     let QuantityH = $("#qtyhand").val();
//     let OdQu = $("#odQu").val();
//     total = ItemPrice * OdQu;
//
//
//
//
//
//     let order = new Order(orderid, date, cusID,ItemCode,ItemName,ItemPrice,QuantityH,OdQu,total);
//
//     cart.push(order);
//     for (let i = 0 ; i < ItemArray.length ; i++){
//         if (ItemArray[i].id === ItemCode){
//             console.log(ItemPrice);
//             let update = QuantityH -OdQu;
//             ItemArray[i].qtyhand = update;
//         }
//     }
//     console.log(cart)
//     $("#totalDisplay").text(`Total: ${total}` + " Rs/=");
//     loadCart();
//
// });


const LoadItemTable = () => {

    $("#ItemTableBody").empty();

    ItemArray.map((Item,index)=>{
        if (index<5){

            let data = `<tr><td>${Item.id}</td><td>${Item.iName}</td><td>${Item.Price}</td><td>${Item.Quantity}</td></tr>`;

            $("#ItemTableBody").append(data);
        }
    });


}
$("#addItem").click(function () {
    let orderid = $("#orderid").val();
    let date = $("#date").val();
    let cusID = $("#CustomerId2").val();
    let ItemCode = parseInt($("#iteCode2").val());
    let ItemName = $("#Iname").val();
    let ItemPrice = parseFloat($("#Iprice").val()); // Parse as float
    let QuantityH = parseInt($("#qtyhand").val()); // Parse as int
    let OdQu = parseInt($("#odQu").val()); // Parse as int
    let total = ItemPrice * OdQu; // Calculate total

      if(!orderRegex(orderid)) {
        Swal.fire({
            title: "Check your Order Id",
            icon: "question",
            iconHtml: "?",

            showCloseButton: true
        });
    } else {


          // Create a new order
          let order = new Order(orderid, date, cusID, ItemCode, ItemName, ItemPrice, QuantityH, OdQu, total);

          // Add order to cart
          cart.push(order);
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Added to Cart",
              showConfirmButton: false,
              timer: 1500
          });

          // Update ItemArray
          for (let i = 0; i < ItemArray.length; i++) {
              if (ItemArray[i].id === ItemCode) {
                  console.log("hi" + ItemCode);
                  let update = ItemArray[i].Quantity - OdQu; // Update available quantity
                  if (update >= 0) { // Check if there is enough quantity available
                      ItemArray[i].Quantity = update;
                      console.log(ItemArray);
                      LoadItemTable();
                  } else {
                      alert("Not enough quantity available."); // Alert if not enough stock
                  }
                  break; // Exit loop once item is found and updated
              }
          }

          console.log(cart);
          $("#totalDisplay").text(`Total: ${total} Rs/=`); // Display total
          loadCart(); // Refresh cart display
      }
});


const loadCart = () => {
    $("#cart").empty();
    total = 0;

    cart.forEach((item) => {
        total += item.total;
        let row = `<tr>
                    <td>${item.orderid}</td>
                    <td>${item.cusid}</td>
                    <td>${item.iname}</td>
                    <td>${item.iprice}</td>
                    <td>${item.ordedqty}</td>
                    <td>${item.total}</td>
                   </tr>`;
        $("#cart").append(row);
    });

    $("#totalDisplay").text(`Total: ${total} Rs/=`);
    $("#subtotal").text("Last total: 0 Rs/=");
    $("#lastBal").text("Balance : 0 Rs/=");
};

$("#removecart").click(function () {
    let orderid = $("#orderid").val();

    let indexToRemove = cart.findIndex((item) => item.orderid === orderid);

    if (indexToRemove !== -1) {
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
                let removedItem = cart.splice(indexToRemove, 1)[0];
                total -= removedItem.total;  // Update total by subtracting the removed item's total

                // Update quantity back in ItemArray
                for (let i = 0; i < ItemArray.length; i++) {
                    if (ItemArray[i].id === removedItem.itemcode) { // Assuming `itemcode` is the correct property name
                        ItemArray[i].Quantity += removedItem.ordedqty; // Restore removed quantity
                        break;
                    }
                }

                loadCart();  // Refresh cart display
                LoadItemTable(); // Refresh the item table to reflect updated quantity

                Swal.fire({
                    title: "Deleted!",
                    text: "Removed from the cart.",
                    icon: "success"
                });
            }
        });

    } else {
        alert("Order ID not found");
    }
});



// let dis;
// $("#disButton").click(function (){
//    let discount = $("#discount").val();
//
//    dis = total - discount;
//
//     $("#subtotal").text(`subtotal: ${dis}` + " Rs/=");
//
// });


$("#balancecal").click(function (){
        let givenCash = $("#cashGiven").val();

        let balance = givenCash - total;

    $("#lastBal").text(`Balance: ${balance}` + " Rs/=");
});



$("#purchase").click(function () {
    let givenCash = parseFloat($("#cashGiven").val()) || 0; // Default to 0 if not a number
    let balance = givenCash - total; // Calculate balance
    $("#lastBal").text(`Balance: ${balance} Rs/=`); // Display balance
    let customerId = parseInt($("#CustomerId2").val(), 10); // Convert to number
    let orderId = parseInt($("#orderid").val(), 10); // Convert to number

    // Ensure customer ID and order ID validation logic aligns with your application
    if (customerId === orderId) {
        // Add cart to order history on checkout if cash is sufficient
        if (balance >= 0) {
            cart.forEach((item) => {
                let existingOrder = orderHistory.find(order => order.orderid === item.orderid);
                if (existingOrder) {
                    // Update total and add item details if order ID already exists
                    existingOrder.total += item.total;
                    existingOrder.items.push(item); // Add item to existing order's items
                } else {
                    // If new order ID, create and push to history
                    let newOrder = new OrderHistory(
                        item.orderid,
                        item.date,
                        item.cusid,
                        item.total,
                        [item] // Start with the current item in the items array
                    );
                    orderHistory.push(newOrder);
                }
            });
            cart.length = 0; // Clear the cart
            loadCart(); // Reload cart display
            Swal.fire({
                title: "Order Placed Successfully",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/images/trees.png)",
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                `
            });
        } else {
            alert("Insufficient cash provided."); // Alert for insufficient cash
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Different Customer for order id",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
});




const loadOrderHistory = () => {
    $("#OrderHistoryTable").empty();

    orderHistory.forEach((order, index) => {
        // Display the main row for the order with consolidated total
        let mainRow = `<tr>
                        <td>${index + 1}</td>
                        <td>${order.orderid}</td>
                        <td>${order.date}</td>
                        <td>${order.cusid}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>${order.total}</td>
                       </tr>`;
        $("#OrderHistoryTable").append(mainRow);

        // Display each item in the order as a sub-row
        order.items.forEach((item) => {
            let itemRow = `<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${item.iname}</td>
                            <td>${item.iprice}</td>
                            <td>${item.ordedqty}</td>
                            <td>${item.total}</td>
                           </tr>`;
            $("#OrderHistoryTable").append(itemRow);
        });
    });
};


$("#orderHistroy").click(function () {
    loadOrderHistory();
});



const orderRegex = (order) => {
    const orderReg = /^\d+$/;
    return orderReg.test(order);
};
