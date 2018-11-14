$(document).ready(function() {
  $("#login").click(function() {
    let ema = $("#email1").val();
    let pas = $("#pass1").val();
     
    $.get(
      "http://localhost:3000/users?email=" + ema,
      function(data) {
        let obj = JSON.stringify(data[0].password);
        pas = JSON.stringify(pas);
        if (pas == obj) {
          localStorage.setItem("userDetails", JSON.stringify(data[0]));
          window.location.href = "./pages/logged.html";
        } else {
          alert("incorrect login details");
        }
      },
      "json"
    );
  });
});


