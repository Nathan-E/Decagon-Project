$(document).ready(function(){
    $.get( "http://localhost:3000/users", function( data ) {
        for( i in data){
            if ($('#email1').val() === $(data[i].users.email)){
                if ($('#pass1').val() === $(data[i].users.password)) {
                    $('#signin').click(function() {
                        location.replace('file:///C:/Users/user/Documents/Decagon_Bootcamp/1stLab/Second-Set-Of-Lab/New%20folder/Project/Decagon-Project/pages/logged.html#')
                    })
                }
            }
    }}, "json" )
})

//window.location.replace("http://www.w3schools.com")