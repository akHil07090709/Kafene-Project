$(document).ready(() => {
  // console.log("obj");

  var tableData = [];
  fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      tableData = data;

      rowMaking(tableData);
    })
    .catch((err) => console.error(err));

  function rowMaking(data) {
    $("#tableBody").html("");
    for (let i = 0; i < data.length; i++) {
      data[i].dob.split("-");
    }
    for (var i = 0; i < data.length; i++) {
      $(`#tableBody`).append(
        $("<tr>").append(
          $("<td>").attr("class", "dimColor").text(data[i].id),
          $("<td>").html(`<img src="${data[i].profilePic}" alt="profilePic"/>`),
          $("<td>").attr("class", "dimColor").text(`${data[i].fullName}`),
          $("<td>").text(`${data[i].dob}`),
          $("<td>").attr("class", "dimColor").text(data[i].gender),
          $("<td>")
            .attr("class", "dimColor")
            .text(`${data[i].currentCity}, ${data[i].currentCountry}`)
        )
      );
    }
  }
  $(`#reset`).click(() => {
    $(`#search-box`).value = "";

    rowMaking(tableData);
  });
  setInterval(() => {
    var search = document.getElementById("search-box").value.length;
    if (search > 0) {
      $(`#cross`).show();
    } else {
      $(`#cross`).hide();
    }
  }, 0);

  $("#search-box").on("keyup", function () {
    let value = $(this).val();
    let filteredData = search(value, tableData);
    rowMaking(filteredData);
  });

  function search(value, data) {
    var newData = [];
    for (var i = 0; i < data.length; i++) {
      value = value.toLowerCase();
      var firstName = data[i].fullName.toLowerCase();
      if (firstName.includes(value)) {
        newData.push(data[i]);
      }
    }

    return newData;
  }
  document.getElementById("sign-out").addEventListener("click", function (e) {
    localStorage.setItem("loginstatus", false);
    window.location.href = "./login.html";
  });
});
