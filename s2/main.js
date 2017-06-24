jQuery(document).ready(function($) {

    var news = []
    var addedNews = [];
    var index=0;
    var user;
    var firstTime = true;
    if (sessionStorage.getItem("log") == null){
        window.location.replace("http://localhost:8080/login.html");
    }

    var storage = sessionStorage.getItem("log")
    var currentUser = JSON.parse(storage)
    console.log("Current user",currentUser)
    if (currentUser.role == 1) {
        user = 1;
        console.log("WRITER");
        $("#writer").show();
        $("#reader").hide();
    } else {
        user=2;
        console.log("Reader");
        $("#writer").hide();
        $("#reader").show();
    }

    if(user==2){
        getReaderNews();
    }else{
        getWriterNews();

        $("#submit").on("click",function(){
            console.log("added",addedNews)
            $.post('addNews.php', {
                news:addedNews
            },function(data, textStatus, xhr) {
                    getWriterNews()
              });
        })

        $("#add").on("click",function(){
            addedNews.push({
                title: $("#title").val(),
                description: $("#description").val(),
                userId: currentUser.id
            })
            showAddedNews();
        })

    }

    $("#logout").click(function(event) {
        if(sessionStorage.getItem("log")){
            sessionStorage.removeItem("log");
        }
        window.location.replace("http://localhost:8080/login.html");
    });

    function showAddedNews(){
        $("#added-news").html("");
        addedNews.map(function(item){
            $("#added-news").append('<div>'+ item.title+item.description+'</div>');
        })
    }
    function getWriterNews(){
        jQuery.get('getWriterNews.php',{userId: currentUser.id}, function(data, textStatus, xhr) {
            console.log("data",data)
            var wNews = JSON.parse(data)
            console.log("news: ",wNews);
            wNews.map(function(item){
                $("#my-news").append('<div>'+item.title + " " + item.description+
                    '<button onclick="deleteNews(' + item.id + ')">delete</button>')
                news.push(item);
            })
        });
    }
    function getReaderNews() {
        jQuery.get('getNews.php', function (data, textStatus, xhr) {
            var lastNews = JSON.parse(data)
            if(!firstTime){
                lastNews.map(function(item){
                    var res = $.grep(news, function(e){ return e.id == item.id; });
                    if(res.length < 1){
                        alert("news added , title: "+item.title)
                    }
                });
            }
            firstTime=false;
            news = lastNews;

            console.log("news: ", news);
            (function repeat() {
                if (index == 4) {
                    index = 0;
                }
                console.log(news)
                $("#news").html('<div>' + news[index].title + " " + news[index].description + "</div>")
                index++;
                setTimeout(repeat, 4000);
            })()

            setTimeout(getReaderNews, 3000);
        })
    }
    function deleteNews(id){
        console.log("delete id:",id)
        $.post('delete.php', {id: id}, function(data, textStatus, xhr) {
        });
    }

});