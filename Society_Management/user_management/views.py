from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import User, UserRole
from .serializers import UserLoginSerializer  # Use the new UserLoginSerializer
from .utils import generate_otp, send_otp, store_otp
# from django.core.cache import cache


class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data.get('phone_number')
        password = serializer.validated_data.get('password')
        role_id = serializer.validated_data.get('role_id')

        try:
            user = User.objects.get(phone_number=phone_number)

            if user.check_password(password):
          
                # Corrected to use user.id
                user_role_mapping = UserRole.objects.filter(user_id=user.id, role_id=role_id).first()
                
                if user_role_mapping:
                    return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Role mismatch. Login denied.'}, status=status.HTTP_403_FORBIDDEN)

            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        except User.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

