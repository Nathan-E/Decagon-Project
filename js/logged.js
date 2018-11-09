$(document).ready(function(){
    $.get( "'http://localhost:3000/product/'", function( data ) {
    $( "#table" )
        .append( '<tr>'+'<td>' + data.productName + '</td>' + '<td>' + data.category + '</td>'+ '<td>' + data.stock + '</td>'+ '<td>' + data.unitPrice + '</td>'+'<tr>');
    }, "json" );
    var uniqId = (function(){
        var i=0;
        return function() {
            return i++;
        }
    })();
    function Product( productName, category, stock, unitPrice){
        this.id = uniqId();
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
        //$('#heading').append('<th>'+ 'Product Name'+'</th>'+'<th>' + 'Category' +'</th>'+'<th>'+ 'Stock' +'</th>'+'<th>'+'Unit Price'+'</th>')
        $('#table').append( '<tr>'+'<td>' + a + '</td>' + '<td>' + b + '</td>'+ '<td>' + c + '</td>'+ '<td>' + d + '</td>'+'<tr>')
    })
    
    
})