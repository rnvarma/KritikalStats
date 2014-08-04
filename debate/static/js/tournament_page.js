$(document).ready(function () {
  $(".btn-control").click(function () {
    var page = $(this).attr("tournament-page");
    var split = document.URL.split('/')
    var tournament = split[split.length-2];
    var url = location.protocol + "//" + location.hostname + ":8000/" + tournament + "/" + page;
    window.location.href = url;
  });
});