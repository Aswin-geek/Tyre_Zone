from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import *
from .models import *
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
import random
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.


class CheckEmail(APIView):
    def post(self, request):
        email=request.data['email']
        if User.objects.filter(email=email).exists():
            return Response(status=status.HTTP_226_IM_USED) 
        else:
            return Response(status=status.HTTP_202_ACCEPTED)       

class UserRegistrationView(APIView):
    def post(self, request):
        
        data=request.data
        print(data)
        password=make_password(data['password'])
        data['password']=password
        serializer = UserSerializer(data=request.data)
        serializer.is_valid()
        print(serializer.errors)
        if serializer.is_valid():
            print(serializer.errors)
            user = serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OtpMail(APIView):
    def post(self, request):
        email=request.data['email']
        otp=random.randint(1000,9999)
        subject = 'Your OTP for Login'
        message = f'Your OTP is: {otp}'
        from_email = 'aswintjimca18@gmail.com'
        recipient_list = [email]
        send_mail(subject, message, from_email, recipient_list)
        print(otp)
        return Response(otp,status=status.HTTP_200_OK)
    
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():  
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            # Perform authentication (e.g., check credentials)
            # Assuming you have a CustomUser model
            print(email,password)
            user = User.objects.filter(email=email).first()
            print(user)
            myuser = authenticate(username=user.username,password=password)
            print(myuser)
            if myuser:
                refresh = RefreshToken.for_user(myuser)
                # login(request, user)
                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'type': str(user.type),
                    'id': str(user.id),
                    'status': True
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
