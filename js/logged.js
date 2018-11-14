const userDetails = localStorage.getItem("userDetails");
if (!userDetails) {
  alert("Not logged in");
  window.location.href = "../index.html";
}
function productDelete(x) {

  let path = `http://localhost:3000/products/${x}`;

  $.ajax({
    url: path,
    method: "delete",

    success: function(response) {
      alert("deleted")
      ;
    },
    error: function() {
      alert("error");
    }
  });
}

  function productUpdate(x) {

    let path = `http://localhost:3000/products/${x}`;
  
    $.ajax({
      url: path,
      method: "delete",
  
      success: function(response) {
        alert("deleted")
        ;
      },
      error: function() {
        alert("error");
      }
    });
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
          }</td><td>$${data[i].unitPrice}</td>
          <td>
          <button type='button' id="${
            data[i].id
          }" onclick="productDelete(this.id)">Delete</button>
          </td>
          <td>
          <button type='button' id="${
            data[i].id
          }" onclick="productUpdate(this.id)">Update</button>
          </td>
          <tr>`
        );
      }
    },
    "json"
  );

  // function productDelete() {
  //   console.log("hello world");
  //   // let id = $(this).attr("id");

  //   let path = `http://localhost:3000/products/${x}`;

  //   $.ajax({
  //     url: path,
  //     method: "delete",

  //     success: function(response) {
  //       alert("deleted");
  //     },
  //     error: function() {
  //       alert("error");
  //     }
  //   });
  // }

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
    $("#table").append(
      `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>$${d}</td>
      <td>
      <button type='button' type='button' id='${
        product.id
      }' onclick='productDelete'()>DEL</button></a>
      </td>
      <tr>`
    );
  });
});


