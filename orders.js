"use strict";
// fetch orders data
var orderData;
fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
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
function filterOptions() {
  for (var i = 0; i < 4; i++) {
    let checkStatus = document.getElementById(`check-${i}`);
    if (checkStatus.checked === true) {
      filteredData[i] = checkStatus.name;
    }
  }
  getCheckedItems(orderData, filteredData);
  // console.log(filteredData);
  filteredData = [];
}

$(".check-boxes").on("change", function () {
  filterOptions(orderData);
});

function getCheckedItems(orderData, filteredData) {
  let data = orderData;
  var getCheckedRows = data.filter(function (store) {
    return filteredData.indexOf(store.orderStatus) > -1;
  });
  // console.log(getCheckedRows);
  createTableRow(getCheckedRows);
  getCheckedRows = [];
}
// filterOptions();

// dynamically creating table rows

function createTableRow(data) {
  $("#table-data").html("");
  for (let i = 0; i < data.length; i++) {
    $("#table-data").append(`
        <tr>
          <td class="order-id">${data[i].id}</td>
          <td class="order-customer-name">${data[i].customerName}</td>
          <td class="order-date">
            ${data[i].orderDate} <br /><span class="order-time">${data[i].orderTime}</span>
          </td>
          <td class="order-amount">${data[i].amount}</td>
          <td class="order-status">${data[i].orderStatus}</td>
        </tr>
      `);
  }
  document.getElementById("table-count").innerHTML = `count: ${data.length} `;
}
document.getElementById("sign-out").addEventListener("click", function (e) {
  localStorage.setItem("loginstatus", false);
  window.location.href = "./index.html";
});
