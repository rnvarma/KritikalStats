from django.conf.urls import patterns, url, include
from rest_framework import routers
from api import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    #ex: 1/tournament/
    url(r'^1/tournament/$', views.TournamentList.as_view()),
    url(r'^1/tournament/unentered_rounds/(?P<tourn_name>[A-Za-z0-9-_]+)/?$', views.TournamentRoundsLeft.as_view()),
    url(r'^1/tournament/unentered_elim_rounds/(?P<tourn_name>[A-Za-z0-9-_]+)/?$', views.TournamentElimRoundsLeft.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/entries/$', views.TournamentEntries.as_view()),
    # url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/round/(?P<rn>[0-9]+)/$', views.TournamentRounds.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/round/$', views.TournamentRounds.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/prelims/?$', views.TournamentPrelims.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/round/(?P<r_num>[A-Za-z0-9-_]+)/$', views.TournamentSpecificRound.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/elim_round/(?P<r_num>[A-Za-z0-9-_]+)/$', views.TournamentSpecificElimRound.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/breaks/$', views.SeedView.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/bracket/$', views.TournamentBracket.as_view()),
    url(r'^1/team/(?P<pk>[A-Za-z0-9-_]+)/$', views.TeamDataFetch.as_view()),
    url(r'^1/round/(?P<r_id>[A-Za-z0-9-_]+)/$', views.RoundData.as_view()),
    url(r'^1/elim_round/(?P<r_id>[A-Za-z0-9-_]+)/$', views.ElimRoundData.as_view()),
    url(r'^1/team/rounds/(?P<tourn_name>[A-Za-z0-9-_]+)/(?P<team_id>[A-Za-z0-9-_]+)/?$', views.TeamRoundsFetch.as_view()),
    url(r'^1/team/elim_rounds/(?P<tourn_name>[A-Za-z0-9-_]+)/(?P<team_id>[A-Za-z0-9-_]+)/?$', views.TeamElimRoundsFetch.as_view()),
    url(r'^1/create/tournament', views.TournamentCreate.as_view()),
    url(r'^1/create/round', views.RoundCreate.as_view()),
    url(r'^1/judges/list', views.JudgeList.as_view()),
    url(r'^1/judge/(?P<pk>[A-Za-z0-9-_]+)/?$', views.JudgeView.as_view()),
    url(r'^1/similarteams/?$', views.SimilarTeams.as_view()),
    url(r'^1/updatewinloss/?$', views.UpdateWinLoss.as_view()),
    url(r'^1/update/tournament_data/?$', views.UpdateTournaments.as_view()),
    url(r'^1/update/round_result/?$', views.UpdateRoundResult.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)