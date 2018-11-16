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
        const a = $("#name").val();
        const b = $("#number").val()
        const c = $("#address").val();
        const d = $("#email").val();
        const e = $("#pass").val();
        const f = $("#cpass").val();

        if (a  == "" || b == "" || c == "" || d == "" || e == ""  ) {
            alert("Please fill in all the fields");
        } else if ( e !== f) {
            //$( "#cpass" ).append( "<div><small>The password fields does not match</small></div>")
            alert("The password fields does not match");
        } else {
            let user = new User(a ,b , c, d, e);
            baseUrl = "http://localhost:3000/users";
            create(user);
            swal("Sign Up", "Successful!!!", 'success')
        }
         
      })
})