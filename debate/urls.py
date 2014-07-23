from django.conf.urls import patterns, include, url
from debate import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('api.urls')),
    url(r'^load/?', 'debate.views.loading_test'),
    url(r'^login/?', 'debate.views.load_loginpage', name="login"),
    url(r'^createtournament/?', 'debate.views.load_tourncreate', name="tourncreate"),
    url(r'^team/(?P<id>[A-Za-z0-9-_]+)/*$', 'debate.views.team_page'),
    url(r'^$', 'debate.views.splash'),
    url(r'^home$', 'debate.views.load_homepage', name="home"),
    url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
)