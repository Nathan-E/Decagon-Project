$(document).ready(function(){
    function Product( productName, category, stock, unitPrice){
        this.productName = productName;
        this.category = category;
        this.stock = stock;
        this.unitPrice = unitPrice
    }
    function create(data) {
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
        return fetch(baseUrl, options)
          .then((response) => response.json)
    }
    $("#addProduct").click(function() {
        var a = $("#nameP").val();
        var b = $("#cat").val()
        var c = $("#stock").val();
        var d = $("#unitP").val();
        let product = new Product(a ,b , c, d)
        baseUrl = "http://localhost:3000/products";
        create(product);
    })
    
})

