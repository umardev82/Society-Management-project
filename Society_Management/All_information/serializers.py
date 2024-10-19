

from rest_framework import serializers
from .models import Block_info,Property_info,PropertyType,UnitType,Amenity

class Block_info_serlializer(serializers.ModelSerializer):
    class Meta:
        model = Block_info  # Change 'models' to 'model'
        fields = ['id', 'block_name']  
        
class Property_type_serializer(serializers.ModelSerializer):
    class Meta:
        model =PropertyType
        fields=['pro_type_id','property_number','property_name']   
 
class Unit_type_serializer(serializers.ModelSerializer):
    class Meta:
        model =UnitType
        fields= ['unit_type_id','unit_number','unit_name']   
        
class Amenity_serializer(serializers.ModelSerializer):
    class Meta:
        model= Amenity
        fields =['amenity_id','amenity_name']    
        
        


      
class Property_info_serializer_for_display_data(serializers.ModelSerializer):
    block_name = Block_info_serlializer()
    property_type = Property_type_serializer()
    unit_type = Unit_type_serializer()
    amenity_name = Amenity_serializer() 
    
    class Meta:
        model = Property_info
        fields = [
            'property_id',
            'block_name',
            'building_name',
            'property_name',
            'property_type',
            'unit_type',
            'floor_number',
            'number_of_bedrooms',
            'number_of_bathrooms',
            'balcony_or_patio',
            'parking_space',
            'number_of_halls',
            'street_address',
            'city',
            'country',
            'area_type',
            'area_value',
            'property_value',
            'amenity_name',
            'size_in_sqm',
        ]
         
        
class Property_info_serializer(serializers.ModelSerializer):
    # block_name = Block_info_serlializer()
    # property_type = Property_type_serializer()
    # unit_type = Unit_type_serializer()
    # amenity_name = Amenity_serializer()

    class Meta:
        model = Property_info
        fields = [
            'property_id',
            'block_name',
            'building_name',
            'property_name',
            'property_type',
            'unit_type',
            'floor_number',
            'number_of_bedrooms',
            'number_of_bathrooms',
            'balcony_or_patio',
            'parking_space',
            'number_of_halls',
            'street_address',
            'city',
            'country',
            'area_type',
            'area_value',
            'property_value',
            'amenity_name',
            'size_in_sqm',
        ]
         
  