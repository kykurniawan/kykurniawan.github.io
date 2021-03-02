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
            var output = '<div>'
            $.each(jsonData, function (key, val) {
                if ((val.title.search(regex) != -1)) {
                    output += `<div role="button" onclick="window.location.href='` + val.permalink + `'" class="card result-item border-0 bg-blue-light-5 mb-2"><div class="card-body"><h6 class="res-title">` + val.title + `</h6><small class="text-muted">` + val.permalink + `</small></div></div>`
                }
            });
            output += '</div>'
            $('#results').html(output)
            console.log(output);
            replaceText()
        });
        if (($("#searchBox").val() != '') && ($('.result-item').length < 1)) {
            $('#results').html(searchNotFoundPlaceholder)
        }
    });
}

function replaceText() {
    var searchword = $("#searchBox").val()
    if ((searchword.length >= 2)) {
        $("#results").find(".bg-warning").removeClass("bg-warning")

        var custfilter = new RegExp(searchword, "ig")
        var repstr = "<span class='bg-warning'>" + searchword + "</span>"
        $(".res-title").each(function () {
            $(this).html($(this).html().replace(custfilter, repstr))
        })
    }
}