from django.conf.urls import patterns, include, url
from debate import settings
from django.contrib import admin
admin.autodiscover()



urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'debate.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^login/?', 'debate.views.load_loginpage', name="login"),
    url(r'^createtournament/?', 'debate.views.load_tourncreate', name="tourncreate"),
    url(r'^$', 'debate.views.load_homepage', name="home"),
    url(r'^', include('api.urls')),
    url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
)