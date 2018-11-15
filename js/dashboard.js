// Authenticates if User is Signed In
const userDetails = localStorage.getItem("userDetails");
if (!userDetails) {
  alert("Not logged in");
  window.location.href = "../index.html";
}



// Deletes a Product
function productDelete(x) {

  let path = `http://localhost:3000/products/${x}`;

  $.ajax({
    url: path,
    method: "delete",

    success: function(response) {
      location.reload();
      alert("deleted");
    },
    // error: function() {
    //   alert("error");
    // }
  });
}

// Prefills your form
  function fillField(x) {
    $.get(
      `http://localhost:3000/products/${x}`,
      function(data) {
        console.log(data)
    let v = data.productName;
    let w = data.category
    let y = data.stock;
    let z = data.unitPrice;
    $('#productN').val(v);
    $('#cate').val(w);
    $('#stockNum').val(y);
    $('#unitPri').val(z);
    });

  // Updates a Product
  $("#update").click(function() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const data = {
      id: x,
     productName: $("#productN").val(),
     category: $("#categ").val(),
     stock: $("#stockNum").val(),
     unitPrice: $("#unitPri").val(),
     userId: parseInt(userDetails.id)
    }
    baseUrl = `http://localhost:3000/products/${x}`;
    
    $.ajax(
      {
        url: baseUrl,
        method:'PUT',
        data:data,
        success:function(response){
          alert("Updated");
          location.reload();
          //alert("Updated");
        },
        // error:function(){
        //   alert('Update Aborted')
        // }
      }
    )
  });
}

$(document).ready(function() {
  const userId = JSON.parse(userDetails).id;
  // Load data and fills your Table
  $.get(
    `http://localhost:3000/products?userId=${userId}`,
    function(data) {
      for (i in data) {
        $("#table").append(
          `<tr><td>${data[i].productName}</td><td>${data[i].category}</td><td>${
            data[i].stock
          }</td><td>$${data[i].unitPrice}</td>
          <td>
          <button class='pro-del' type="button" id="${
            data[i].id
          }" onclick="productDelete(this.id)">Delete</button>
          </td>
          <td>
          <button type="button" id="${
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

  // Creates a product
  function Product(productName, category, stock, unitPrice, userId) {
    this.productName = productName;
    this.category = category;
    this.stock = stock;
    this.unitPrice = unitPrice;
    this.userId = userId;
  }

  // Post request
  function create(data) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    return fetch(baseUrl, options).then(response => response.json)//.then(location.reload());
  }

  
  // Create a New Product Onclick
  $("#addProduct").click(function() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const a = $("#nameP").val();
    const b = $("#cate").val();
    const c = $("#stock").val();
    const d = $("#unitP").val();
    const e = JSON.stringify(userDetails.id)
    let product = new Product(a, b, c, d, e);

    baseUrl = "http://localhost:3000/products";
    create(product);
    $("#table").append(
      `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>$${d}</td>
      <td>
      <button type="button"  id="${product.id}" onclick="productDelete(this.id)">Delete</button>
      </td>
      <td>
      <button type="button" id="${product.id}" onclick="fillField(this.id)" data-toggle="modal" data-target="#example">Update</button>
      </td>
      <tr>`
    );
    
  });
});