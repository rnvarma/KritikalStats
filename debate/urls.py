from django.conf.urls import patterns, include, url

from django.contrib import admin
from debate import settings
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'debate.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^login/?', 'debate.views.load_loginpage', name="login"),
    url(r'^createtournament/?', 'debate.views.load_tourncreate', name="tourncreate"),
    url(r'^', 'debate.views.load_homepage', name="home"),
    url(r'^admin/', include(admin.site.urls)),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
)