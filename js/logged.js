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
          "<tr>" +
            "<td>" +
            data[i].productName +
            "</td>" +
            "<td>" +
            data[i].category +
            "</td>" +
            "<td>" +
            data[i].stock +
            "</td>" +
            "<td>" +
            data[i].unitPrice +
            "</td>" +
            "<td>" +
            "<button>" +
            "Edit" +
            "</button>" +
            "</td>" +
            "<tr>"
        );
      }
    },
    "json"
  );


  $("#table").on("click", "button", () => {
    
    $("#table")
      .find("tr")
      .bind("click", (event) => {
        const product = event.target.parentElement.parentElement.childNodes;
        const productDetails = {
          productName: product[0].textContent
        };
        $.get(
          `http://localhost:3000/products?userId=${userId}`,
          function(data) {
            for (i in data) {
              if (productDetails.productName == data[i].productName) {
                let x = data[i].id;
                console.log(x)
    
                $.ajax({
                  url: `http://localhost:3000/products?id=${x}`,
                  method: 'DELETE',
                  contentType: 'application/json',
                  success: function(result) {
                      alert ("deleted")
                  },
                  error: function(request,msg,error) {
                      alert ("retry")
                  }
              });
    
              }
            }
          },
          "json"
        );
      });
      
    $("#table")
      .find("tr")
      .unbind("click", method(event));
  });

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
    this.productName = produyctName;
    this.category = categor;
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
    //$('#heading').append('<th>'+ 'Product Name'+'</th>'+'<th>' + 'Category' +'</th>'+'<th>'+ 'Stock' +'</th>'+'<th>'+'Unit Price'+'</th>')
    $("#table").append(
      "<tr>" +
        "<td>" +
        a +
        "</td>" +
        "<td>" +
        b +
        "</td>" +
        "<td>" +
        c +
        "</td>" +
        "<td>" +
        d +
        "</td>" +
        "<td>"+
        "<a>"+
        "<button>" +
        "Edit" +
        "</button>" +
        "</a>"+
        "</td>" +
        "<tr>"
    );
  });
});


// #table > tbody > tr:nth-child(2) > td:nth-child(1)
// #table > tbody > tr:nth-child(4) > td:nth-child(1)
// #table > tbody > tr:nth-child(12) > td:nth-child(1)
