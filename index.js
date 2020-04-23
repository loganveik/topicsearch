$("#searchbtn").on("click", function (event) {
    event.preventDefault();
    ytajax();
    newsajax();
    $(".youtubeview").empty();
    $(".row").empty();
});

function ytajax() {
    event.preventDefault();
    const topic = $("#topicinput").val().trim();
    console.log(topic);
    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyAnkNPhRa4N57dDV07gK4FIMqWRQ5_0qAY',
            q: topic,
            part: 'snippet',
            maxResults: 4,
            type: 'video',
            videoEmbeddable: true
        }
    }).then(function (response) {
        if (topic === "") {
            const undefinedCatch = $("<h5>you must search something!</h5>");
            $(".youtubeview").append(undefinedCatch);
        } else {
            const result = response.items;
            for (let i = 0; i < result.length; i++) {
                const iFrame = "<iframe width='200px' height='200px' class='my-2 mx-2' src='https://www.youtube.com/embed/" + result[i].id.videoId + "'></iframe>";
                $(".youtubeview").append(iFrame);
            }
        }
    })
}

function newsajax() {
    event.preventDefault();
    const topic = $("#topicinput").val().trim();
    console.log(topic);
    const key = "e590bd0e1fce64b3ee41e7994ea8d73a";
    const queryURL = "https://gnews.io/api/v3/search?q=" + topic + "&token=" + key + "&max=4&image=required";
    $.ajax({
        type: 'GET',
        url: queryURL
    }).then(function (response) {
        console.log(response)
        const result = response.articles;
        for (let i = 0; i < result.length; i++) {
            const col = $("<div class='col-lg-6'></div>");
            const card = $("<div class='card-body my-3'></div>");
            const image =$("<img style='height: 300px; width: 400px;' src=" + '"' + result[i].image + '"' + ">");
            const title = $("<a href=" + '"' + result[i].url + '"' + "><h2>" + result[i].title.toLowerCase() + "</h2></a>");
            const desc = $("<p>" + result[i].description.toLowerCase() + "</p>");
            card.append(image,title,desc);
            col.append(card);
            $(".row").append(col);
        }
    })
}