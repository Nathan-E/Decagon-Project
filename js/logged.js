const userDetails = localStorage.getItem("userDetails");
if (!userDetails) {
  alert("Not logged in");
  window.location.href = "../index.html";
}
$(document).ready(function() {
  const userId = JSON.parse(userDetails).id;
  $.get(
    `http://localhost:3000/products?userId=${userId}`,
    function(data) {
      for (i in data) {
        $("#table").append(
          `<tr><td>${data[i].productName}</td><td>${data[i].category}</td><td>${
            data[i].stock
          }</td><td>${data[i].unitPrice}</td>
          <td>
          <a href='../logged.html?id=${
            data[i].id
          }'><button type='button'>DEL</button></a>
          </td>
          <tr>`
        );
      }
    },
    "json"
  );

  
  $("#log-out").click(() => {
    window.location.href = "../index.html";
    localStorage.clear();
  });

  var uniqId = (function() {
    var i = 0;
    return function() {
      return i++;
    };
  })();

  function Product(productName, category, stock, unitPrice, userId) {
    this.id = uniqId();
    this.productName = productName;
    this.category = category;
    this.stock = stock;
    this.unitPrice = unitPrice;
    this.userId = userId;
  }
  function create(data) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    return fetch(baseUrl, options).then(response => response.json);
  }
  $("#addProduct").click(function() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const a = $("#nameP").val();
    const b = $("#cat").val();
    const c = $("#stock").val();
    const d = $("#unitP").val();
    let product = new Product(a, b, c, d, userDetails.id);
    baseUrl = "http://localhost:3000/products";
    create(product);
    const e = product.id;
    console.log(e)
    $("#table").append(
      `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>${d}</td>
      <td>
      <a href='../delete.html?id=${e}'><button type='button'>DEL</button></a>
      </td>
      <tr>`
    );
  });

});

