

from rest_framework import serializers
from .models import Block_info,Property_info

class Block_info_serlializer(serializers.ModelSerializer):
    class Meta:
        model = Block_info  # Change 'models' to 'model'
        fields = ['id', 'block_name']  
        
        
        
class Property_info_serializer(serializers.ModelSerializer):
    class Meta:
        model=Property_info
        
        fields=[ 'property_name', 
        'block_name', 
        'building_name', 
        'property_type', 
        'unit_type', 
        'unit_number', 
        'floor_number', 
        'number_of_bedrooms', 
        'number_of_bathrooms',
        'parking_space_details',
        'balconies_or_patio_size',
        'number_of_halls', 
        # 'owner',
        'location',
        'size_in_sqm']