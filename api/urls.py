from django.conf.urls import patterns, url, include
from rest_framework import routers
from api import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
	#ex: 1/tournament/
    url(r'^1/tournament/$', views.TournamentList.as_view()),
<<<<<<< HEAD
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/entries/$', views.TournamentEntries.as_view()),
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/rounds/$', views.TournamentRounds.as_view()),
    url(r'^1/team/(?P<pk>[A-Za-z0-9-_]+)/$', views.TeamDataFetch.as_view()),
=======
    #ex: 1/tournament/Berkely/entries
    url(r'^1/tournament/(?P<pk>[A-Za-z0-9-_]+)/entries', views.TournamentEntries.as_view()),
>>>>>>> d6263b42ebca74f527a62fca7097e83b36b60b09
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)