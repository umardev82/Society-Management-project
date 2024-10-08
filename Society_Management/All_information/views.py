from rest_framework import viewsets
from .models import Block_info ,Property_info,PropertyType,UnitType,Amenity
from .serializers import Block_info_serlializer ,Property_info_serializer,Property_type_serializer,Unit_type_serializer,Amenity_serializer




class BlockInfoViewSet(viewsets.ModelViewSet):
    queryset = Block_info.objects.all()  
    serializer_class = Block_info_serlializer 
 

class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset= PropertyType.objects.all()
    serializer_class=Property_type_serializer
    
class UnitTypeViewSet(viewsets.ModelViewSet):
    queryset =UnitType.objects.all()
    serializer_class=Unit_type_serializer
    
class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class=Amenity_serializer     


class PropertyInfoViewSet(viewsets.ModelViewSet):
    queryset=Property_info.objects.all()
    serializer_class = Property_info_serializer
 
      


    