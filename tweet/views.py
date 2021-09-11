import random
from django.http.response import HttpResponse
from django.shortcuts import render
from .models import Tweet
from django.http import HttpResponse, Http404, JsonResponse 
from .forms import TweetForm


def home_view(request, *args, **kwargs):
    return render(request, "pages/home.html", context={}, status=200)

def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None) 
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related logic
        obj.save()
        form = TweetForm()
    return render(request, "components/form.html", context={"form":form})


def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweets_list = [{'id': x.id, 'content': x.content, "likes": random.randint(0,10)} for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list 
        
    }
    return JsonResponse(data)

def tweet_detail_view(request, tweet_id):
    data = {
        "id": tweet_id,
       
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] =  "Not found" 
        status = 404

    

    return JsonResponse(data, status=status)
