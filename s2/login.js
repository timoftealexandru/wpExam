jQuery(document).ready(function($) {

    function okLog(dat)
    {
        data = JSON.parse(dat);
        console.log("result: ",JSON.stringify(data[0]))
        if (data.length == 1)
        {
            sessionStorage.setItem("log", JSON.stringify(data[0]));
            window.location.replace("http://localhost:8080/main.html");
        }
        else
        {
            alert("nope")
        }
    }

    $("#login").click(function () {
        console.log("user+pass: ",$("#name").val(),$("#pass").val())
        $.get( "login.php", { name: $("#name").val(), pass: $("#pass").val() }, okLog);
    });
});