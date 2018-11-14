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
      alert("deleted");
      location.reload();
    },
    error: function() {
      alert("error");
    }
  });
}

  function fillField(x) {
    $.get(
      `http://localhost:3000/products/${x}`,
      function(data) {
        console.log(data)
    let v = data.productName;
    let w = data.category
    let y = data.stock;
    let z = data.unitPrice;
    console.log(x);
    console.log(y);
    console.log(z);
    $('#productN').val(v);
    $('#cate').val(w);
    $('#stockNum').val(y);
    $('#unitPri').val(z);
    });

    function change(data) {
      let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      return fetch(baseUrl, options).then(response => response.json);
    }
    //Updates a Product
  $("#update").click(function() {
    // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // const a = $("#productN").val();
    // const b = $("#cate").val();
    // const c = $("#stockNum").val();
    // const d = $("#unitPri").val();
    // let product = new Product(a, b, c, d, userDetails.id);

    baseUrl = "http://localhost:3000/products/${x}";
    change(product);
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
          }"  onclick="fillField(this.id)" data-toggle="modal" data-target="#example">Update</button>
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
    $("#table").append(
      `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>$${d}</td>
      <td>
      <button type='button' type='button' id='${
        product.id
      }' onclick='productDelete'(this.id)>Delete</button></a>
      </td>
      <td>
      <button type='button' id="${
        product.id
      }" onclick="fillField(this.id)" data-toggle="modal" data-target="#example">Update</button>
      </td>
      <tr>`
    );
  });

  

});