var status = JSON.parse(window.localStorage.getItem("loginstatus")) || false;
console.log(status);
if (status === "true") {
  window.location.href = "./orders.html";
}

var userName = document.querySelector(".login-form-username");
var userPassword = document.querySelector(".login-form-password");
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  const user = userName.value;
  const pwd = userPassword.value;
  var mObj = {
    username: "Qaifi",
    password: "Password",
  };
  if (user === pwd && user !== "" && pwd !== "") {
    $.post(
      "https://5fc4fc8e36bc790016344468.mockapi.io/AkHil0709/kafeneLogin",
      mObj,
      function () {
        alert("Login Succefully");
        localStorage.setItem("loginstatus", true);
        window.location.href = "./orders.html";
      }
    ).fail(function () {
      alert("try again");
    });
  } else {
    alert("Please enter valid credentials!");
  }
});
document.getElementById("sign-out").style.display = "none";
