$(document).ready(function () {
    $('#searchBox').focus()
    search()
    $('#searchBox').keyup(function () {
        search()
    });
    $('#searchBox').on('change', () => {
        search()
    })
});

function search() {
    var jsonData = []
    $.getJSON("/index.json", function (results) {
        const searchImgPlaceholder = `
        <div style="height:70vh" class="d-flex align-items-center justify-content-center">
            <img class="img-fluid" style="width:70%" src="../img/undraw_the_search.svg" alt="Search">
        </div>
        `
        const searchNotFoundPlaceholder = `
        <div style="height:70vh" class="d-flex align-items-center justify-content-center">
            <img class="img-fluid" style="width:70%" src="../img/undraw_page_not_found.svg" alt="Not Found">
        </div>
        ` 
        $.each(results, function (indexInArray, valueOfElement) {
            res = {}
            res.title = valueOfElement.title
            res.permalink = valueOfElement.permalink
            jsonData.push(res)
            var searchField = $("#searchBox").val()
            if (searchField === '') {
                $('#results').html(searchImgPlaceholder)
                return;
            }
            var regex = new RegExp(searchField, "i")
            var output = '<div class="list-group list-group-flush">'
            $.each(jsonData, function (key, val) {
                if ((val.title.search(regex) != -1)) {
                    output += '<a href="' + val.permalink + '" class="result-item list-group-item list-group-item-action px-0">'
                    output += '<h6 class="res-title">' + val.title + '</h6>'
                    output += '<small class="text-muted">' + val.permalink + '</small>'
                    output += '</a>'
                }
            });
            output += '</div>'
            $('#results').html(output)
            replaceText()
        });
        if (($("#searchBox").val() != '') && ($('.result-item').length < 1)){
            $('#results').html(searchNotFoundPlaceholder)
        }
    });
}

function replaceText() {
    var searchword = $("#searchBox").val()
    if ((searchword.length >= 3)) {
        $("#results").find(".bg-warning").removeClass("bg-warning")

        var custfilter = new RegExp(searchword, "ig")
        var repstr = "<span class='bg-warning'>" + searchword + "</span>"
        $(".res-title").each(function () {
            $(this).html($(this).html().replace(custfilter, repstr))
        })
    }
}