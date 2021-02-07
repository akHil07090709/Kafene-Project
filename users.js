$(document).ready(() => {
  // console.log("obj");
  var status = JSON.parse(window.localStorage.getItem("loginstatus")) || false;
  console.log(status);
  if (status === "false") {
    window.location.href = "./index.html";
  }
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

  document.getElementById("cross").addEventListener("click", function (e) {
    document.getElementById("search-box").value = "";
  });

  document.getElementById("searchForm").onsubmit = (e) => {
    e.preventDefault();
    const value = $("#search-box").val();
    if (value.length >= 2) {
      let filteredData = search(value, tableData);
      rowMaking(filteredData);
    } else {
      alert("Please enter at least 2 characters");
    }
  };

  $("#search-box").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
      // the enter key code
      let value = $(this).val();
      if (value.length >= 2) {
        let filteredData = search(value, tableData);
        rowMaking(filteredData);
      } else {
      }
    }
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
    window.location.href = "./index.html";
  });
});
