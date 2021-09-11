from django.urls import path

from . import views

urlpatterns = [
    path('',views.home_view , name = 'myproject'),
    path('tweet/',views.tweet_detail_view, name = 'tweet'),
    path('tweets', views.tweet_list_view, name = 'tweets'), 

    
]