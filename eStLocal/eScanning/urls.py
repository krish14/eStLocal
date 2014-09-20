from django.conf.urls.defaults import patterns, include, url
from eStLocal.eScanning import views
from django.conf import settings as comm


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Djangojy.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^$', views.index, name='index'),
    url(r'^launch_scan/$', views.setUpScan, name='launch_scan'),
    url(r'^dashboard_scan/$', views.callDashboard, name='dashboard'),
    url(r'^crop_image/$', views.cropImage, name='crop_image'),
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': comm.STATIC_URL, 'show_indexes': True}),
    url(r'^launch_scann/$', views.setUpScanTest, name='launch_scann'),
    url(r'^launch_scannn/$', views.setUpScanTest1, name='launch_scann'),
)