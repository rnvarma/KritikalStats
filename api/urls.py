from django.conf.urls import patterns, url, include
from rest_framework import routers
from api import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
	#ex: 1/tournament/
    url(r'^1/tournament/$', views.TournamentList.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/entries/$', views.TournamentEntries.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/rounds/$', views.TournamentRounds.as_view()),
    url(r'^1/team/(?P<pk>[A-Za-z0-9-_]+)/$', views.TeamDataFetch.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)