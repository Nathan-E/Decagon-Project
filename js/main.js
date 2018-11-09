$(document).ready(function(){
    function User(cName, regNo, cAddress, email, password){
        this.cName = cName;
        this.regNo = regNo
        this.cAddress = cAddress;
        this.email = email;
        this.password = password 
    }
    function Product(email, productName, categoery, stock, unitPrice){
        this.email = email;
        this.productName = productName;
        this.categoery = categoery;
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
    
    $("#signup").click(function() {
        var a = $("#name").val();
        var b = $("#number").val()
        var c = $("#address").val();
        var d = $("#address").val();
        var e = $("#pass").val();
        let user = new User(a ,b , c, d, e)
        baseUrl = "http://localhost:3000/users";
        create(user);
      })
    $("#addProduct").click(function() {
        var a = $("#name").val();
        var b = $("#number").val()
        var c = $("#address").val();
        var d = $("#address").val();
        var e = $("#pass").val();
        let user = new User(a ,b , c, d, e)
        baseUrl = "http://localhost:3000/users";
        create(user);
    })
    
})

