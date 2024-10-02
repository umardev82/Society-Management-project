from rest_framework import viewsets
from .models import Block_info ,Property_info
from .serializers import Block_info_serlializer ,Property_info_serializer
from rest_framework.permissions import IsAuthenticated
from rest_framework .authentication import BasicAuthentication


class BlockInfoViewSet(viewsets.ModelViewSet):
    queryset = Block_info.objects.all()  
    serializer_class = Block_info_serlializer 
    permission_classes = [IsAuthenticated]  # Only authenticated users can access
    authentication_classes = [BasicAuthentication] 
  
class PropertyInfoViewSet(viewsets.ModelViewSet):
    queryset=Property_info.objects.all()
    serializer_class = Property_info_serializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access
    authentication_classes = [BasicAuthentication]    


    