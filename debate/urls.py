from django.conf.urls import patterns, include, url
from debate import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('api.urls')),
    url(r'^load/?', 'debate.views.loading_test'),
    url(r'^login/?', 'debate.views.load_loginpage', name="login"),
    url(r'^createtournament/?', 'debate.views.load_tourncreate', name="tourncreate"),
    url(r'^createround/?', 'debate.views.load_roundcreate', name="roundcreate"),
    url(r'^team/(?P<id>[A-Za-z0-9-_]+)/*$', 'debate.views.team_page'),
    url(r'^round/(?P<id>[A-Za-z0-9-_]+/*$)', 'debate.views.round_page'),
    url(r'^$', 'debate.views.load_homepage'),
    url(r'^about/?$', 'debate.views.about_page'),
    url(r'^admin/?$', 'debate.views.admin_page'),
    url(r'^adminlogin/?$', 'debate.views.admin_login_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Dashboard/?$', 'debate.views.dashboard_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Main/?$', 'debate.views.main_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Entries/?$', 'debate.views.entries_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Bracket/?$', 'debate.views.bracket_page'),
    url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
)