$(document).ready(function(){
    var uniqId = (function(){
        var i=0;
        return function() {
            return i++;
        }
    })();
    function User(cName, regNo, cAddress, email, password){
        this.id = uniqId()
        this.cName = cName;
        this.regNo = regNo
        this.cAddress = cAddress;
        this.email = email;
        this.password = password 
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
})
