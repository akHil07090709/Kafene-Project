"use strict";

var status = JSON.parse(window.localStorage.getItem("loginstatus")) || false;
console.log(status);
if (status === "false") {
  window.location.href = "./index.html";
}
// fetch orders data
var orderData;
fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (data) {
    orderData = data;
    createTableRow(orderData);
  })
  .catch((err) => console.error(err));

// Filters-options
var filteredData = [];
function filterOptions(orderData) {
  for (var i = 0; i < 2; i++) {
    let checkStatus = document.getElementById(`check-${i}`);
    if (checkStatus.checked === true) {
      filteredData.push(checkStatus.name);
    }
  }
  console.log(filteredData);
  getFilteredItems(filteredData);
  // getCheckedItems(orderData, filteredData);
  // console.log(filteredData);
  filteredData = [];
}
function getFilteredItems(data) {
  if (data.length == 2) {
    createTableRow(orderData);
  } else if (data.length == 1) {
    if (data[0] == "expired") {
      var newData = getLowCostItems(orderData);
      getCheckedItems(orderData, newData);
    } else {
      var newData = getExpiredItems(orderData);
      getCheckedItems(orderData, newData);
    }
  } else {
    var expiryItemsData = getExpiredItems(orderData);
    var lowStockItemsData = getLowCostItems(orderData);
    var newData = expiryItemsData.concat(lowStockItemsData);
    // var newData = [...expiryItemsData, ...lowStockItemsData];
    getCheckedItems(orderData, newData);
  }
}
function getCheckedItems(orderData, filteredData) {
  // console.log(orderData);
  console.log(filteredData);
  var getCheckedRows = orderData;
  console.log(getCheckedRows);
  getCheckedRows = getCheckedRows.filter(function (el) {
    return !filteredData.includes(el);
  });

  console.log(getCheckedRows);
  // console.log(getCheckedRows);
  createTableRow(getCheckedRows);
  getCheckedRows = [];
}
var lowStockItems = [];
function getLowCostItems(orderData) {
  for (var i = 0; i < orderData.length; i++) {
    if (orderData[i].stock < 100) {
      lowStockItems.push(orderData[i]);
    }
  }
  console.log(lowStockItems);
  return lowStockItems;
}
var expiredItems = [];
function getExpiredItems(orderData) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < orderData.length; i++) {
    const ed = orderData[i].expiryDate;
    var varDate = new Date(ed); //dd-mm-YYYY
    if (varDate < today) {
      expiredItems.push(orderData[i]);
    }
  }
  return expiredItems;
}
$(".check-boxes").on("change", function () {
  filterOptions(orderData);
});

// filterOptions();

// dynamically creating table rows

function createTableRow(data) {
  $("#table-data").html("");
  for (let i = 0; i < data.length; i++) {
    $("#table-data").append(`
      <tr class="products-table-row">
        <td class="product-id u-brown">
          ${data[i].id}
        </td>
        <td class="product-name">
          ${data[i].medicineName}
        </td>
        <td class="product-brand u-brown">
          ${data[i].medicineBrand}
        </td>
        <td class="expiry-date">
          ${data[i].expiryDate}
        </td>
        <td class="unit-price u-brown">
         $${data[i].unitPrice}
        </td>
        <td class="product-stock u-brown">${data[i].stock}</td>
      </tr>
      `);
  }
  document.getElementById("table-count").innerHTML = `count: ${data.length} `;
  expiredItems = [];
  lowStockItems = [];
}
document.getElementById("sign-out").addEventListener("click", function (e) {
  localStorage.setItem("loginstatus", false);
  window.location.href = "./index.html";
});
