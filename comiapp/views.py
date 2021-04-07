from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
# Create your views here.


def home(request):
    return render(request, 'index.html')


def room(request):
    return render(request, 'room.html')


def editor(request):
    return render(request, 'editor.html')


def create(request):
    #room = Room()
    pass


def signup(request):
    if request.method == "POST":
        if request.POST['pass1'] == request.POST['pass2']:
            print('succ!!')
            user = User.objects.create_user(
                username=request.POST['email'], password=request.POST['pass1'],
                email=request.POST['email']  # nickname=request.POST['username']
            )
            auth.login(request, user)
            return redirect('home')
        return render(request, 'signup.html')

    return render(request, 'signup.html')


def login(request):
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['pass1']
        user = auth.authenticate(request, username=email, password=password)
        print(email, password)
        if user is not None:
            print('!!!')
            auth.login(request, user)
            return redirect('home')
        else:
            return render(request, 'login.html', {'error': 'username or password is wrong'})
    else:
        return render(request, 'login.html')


def logout(request):
    auth.logout(request)
    return redirect('home')


def createroom(request):
    return render(request, 'create_room.html')