let url = new URL(document.location.href);
let id = url.searchParams.get("id");
let path = `http://localhost:3000/products/${id}`;

$.ajax({
  url: path,
  method: "delete",
  success: function(response) {
    alert("deleted");
   // document.location.href = "./pages/logged.html";
  },
  error: function(){
      alert('error')
  }
});
