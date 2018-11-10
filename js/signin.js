$(document).ready(function(){
    $('#login').click(function () {
        let ema = $('#email1').val();
        let pas = $('#pass1').val();
        console.log(pas)
    $.get( "http://localhost:3000/users?email="+ema, function( data ) {
            let obj = JSON.stringify(data[0].password);
            pas = JSON.stringify(pas)
                if (( pas == obj)){ 
                location.replace('file:///C:/Users/user/Documents/Decagon_Bootcamp/1stLab/Second-Set-Of-Lab/New%20folder/Project/Decagon-Project/pages/logged.html#')
                }
                else{
                    alert("hhey")
                }
    }, "json" )
    })
})

//window.location.replace("http://www.w3schools.com")