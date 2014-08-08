from django.conf.urls import patterns, include, url
from debate import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('api.urls')),
    url(r'^admin/createtournament/?', 'debate.views.load_tourncreate', name="tourncreate"),
    url(r'^team/(?P<id>[A-Za-z0-9-_]+)/*$', 'debate.views.team_page'),
    url(r'^round/(?P<id>[A-Za-z0-9-_]+/*$)', 'debate.views.round_page'),
    url(r'^elim_round/(?P<id>[A-Za-z0-9-_]+/*$)', 'debate.views.elim_round_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Dashboard/?$', 'debate.views.dashboard_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Main/?$', 'debate.views.main_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Entries/?$', 'debate.views.entries_page'),
    url(r'^(?P<tournament>[A-Za-z0-9-_]+)/Elims/?$', 'debate.views.elims_page'),
    url(r'^archived/(?P<year>[A-Za-z0-9-_]+)/?$', 'debate.views.archived_tournaments'),
    url(r'^archived/?', 'debate.views.archived'),
    url(r'^udl/?', 'debate.views.udl_main'),
    url(r'^$', 'debate.views.load_homepage'),
    url(r'^about/?$', 'debate.views.about_page'),
    url(r'^admin/?$', 'debate.views.admin_page'),
    url(r'^admin/(?P<tournament>[A-Za-z0-9-_]+)/round/(?P<round_num>[0-9]+)/?$', 'debate.views.admin_round'),
    url(r'^admin/(?P<tournament>[A-Za-z0-9-_]+)/elim_round/(?P<round_num>[0-9]+)/?$', 'debate.views.admin_elim_round'),
    url(r'^admin/modifydashboard/(?P<tournament>[A-Za-z0-9-_]+)/?$', 'debate.views.modify_dashboard'),
    url(r'^adminlogin/?$', 'debate.views.admin_login_page'),
    url(r'^admin/createround/?', 'debate.views.load_roundcreate', name="roundcreate"),
    url(r'^admin/mergeteams/?$', 'debate.views.merge_teams'),
    url(r'^admin/updatewinloss/?$', 'debate.views.updatewinloss'),
    url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
)