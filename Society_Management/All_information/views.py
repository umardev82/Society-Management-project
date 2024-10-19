from rest_framework import viewsets
from .models import Block_info ,Property_info,PropertyType,UnitType,Amenity,Service,Owner, OwnerProperty
from .serializers import Block_info_serlializer, Owner_display_info_Serializer ,Property_info_serializer, Property_info_serializer_for_display_data,Property_type_serializer,Unit_type_serializer,Amenity_serializer,ServiceSerializer,OwnerPropertySerializer,OwnerSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response




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
        
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class=ServiceSerializer 
    
class PropertyInfoViewSet(viewsets.ModelViewSet):
    queryset = Property_info.objects.all()
    serializer_class = Property_info_serializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Use the flat serializer for write operations
            return Property_info_serializer
        else:
            # Use the nested serializer for read operations
            return Property_info_serializer_for_display_data
    
    



class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return OwnerSerializer
        else:
            return Owner_display_info_Serializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data.pop('csrfmiddlewaretoken', None)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def create(self, request, *args, **kwargs):
    #     data = request.data.copy()
    #     data.pop('csrfmiddlewaretoken', None)

    #     country_name = data.get('owner_country')
    #     city_name = data.get('owner_city')

    #     if not country_name or not city_name:
    #         # Default country and city if not provided
    #         country_name = country_name or 'Pakistan'
    #         city_name = city_name or 'Lahore'

    #     # Assign country and city names directly to the data
    #     data['owner_country'] = country_name
    #     data['owner_city'] = city_name

    #     serializer = self.get_serializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  


class OwnerPropertyViewSet(viewsets.ModelViewSet):
    queryset = OwnerProperty.objects.all()
    serializer_class = OwnerPropertySerializer

    def create(self, request, *args, **kwargs):
        owner_id = request.data.get('owner_id')
        property_id = request.data.get('property_id')

        try:
            # Check if the property is already assigned to an owner
            property_info = Property_info.objects.get(property_id=property_id)
            if property_info.owner is not None:
                return Response({"error": "This property is already assigned to another owner."}, status=status.HTTP_400_BAD_REQUEST)

            # Assign the owner to the property
            owner = Owner.objects.get(owner_id=owner_id)
            property_info.owner = owner
            property_info.save()

            return Response(Property_info_serializer(property_info).data, status=status.HTTP_201_CREATED)
        
        except Owner.DoesNotExist:
            return Response({"error": "Owner not found."}, status=status.HTTP_404_NOT_FOUND)
        except Property_info.DoesNotExist:
            return Response({"error": "Property not found."}, status=status.HTTP_404_NOT_FOUND)
 
 
