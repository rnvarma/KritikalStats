// creating krit stats namespace to define all constants used in the website
var kritstats = {};

// url constants needed to make AJAX request
// NOTE: to make a sweeping change to all the urls, simply change the base URL
// solves the bitch ass problem of having to change each url individually like before
kritstats.urls = {};
kritstats.urls.base = "http://127.0.0.1:8000/";
kritstats.urls.tournament_query = kritstats.urls.base + "1/tournament/";
kritstats.urls.update_round = kritstats.urls.base + "1/update/round_result/";
kritstats.urls.similarteams = kritstats.urls.base + "1/similarteams/";
