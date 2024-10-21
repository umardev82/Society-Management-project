
from rest_framework import serializers
from .models import Block_info,Property_info,PropertyType,UnitType,Amenity,Service,Owner, OwnerProperty


class Block_info_serlializer(serializers.ModelSerializer):
    class Meta:
        model = Block_info  # Change 'models' to 'model'
        fields = ['id', 'block_name']  
        
class Property_type_serializer(serializers.ModelSerializer):
    class Meta:
        model =PropertyType
        fields=['pro_type_id','property_number','joint_number','property_name']   
 
class Unit_type_serializer(serializers.ModelSerializer):
    class Meta:
        model =UnitType
        fields= ['unit_type_id','unit_number','unit_name']   
        
class Amenity_serializer(serializers.ModelSerializer):
    class Meta:
        model= Amenity
        fields =['amenity_id','amenity_name']    
        
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'        
        
       
class Property_info_serializer_for_display_data(serializers.ModelSerializer):
    block_name = Block_info_serlializer()
    property_type = Property_type_serializer()
    unit_type = Unit_type_serializer()
    amenity_name = Amenity_serializer() 
    
    class Meta:
        model = Property_info
        fields = '__all__' 
         
        
        
class Property_info_serializer(serializers.ModelSerializer):

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
            'country',
            'city',
            'area_type',
            'area_value',
            'property_value',
            'status',
            'amenity_name',
            'size_in_sqm',
            'is_active',  # New field for Active/In-Active
            'document_attachment',  # New field for Document Attachment
            'is_rented',  # New field for Rented (Yes/No)
        ]
        
        
class OwnerPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerProperty
        fields = ['owner', 'property_info']



class Owner_display_info_Serializer(serializers.ModelSerializer):
    properties = Property_info_serializer_for_display_data(many=True, read_only=True) 
    

    class Meta:
        model = Owner
        fields = '__all__' 

   
  
class OwnerSerializer(serializers.ModelSerializer):
  
  
    # owner_country = serializers.CharField(max_length=100)
    # owner_city = serializers.CharField(max_length=100)
    properties = serializers.PrimaryKeyRelatedField(many=True, queryset=Property_info.objects.all(), required=False)

    class Meta:
        model = Owner
        fields = [
            'owner_id',
            'owner_name',
            'owner_guardian_name',
            'owner_profile_picture',
            'owner_phone_number',
            'password',
            'owner_email',
            'owner_membership_number',
            'owner_cnic',
            'owner_address',
            'owner_country',
             'owner_city',
            'document_attachment',
            'properties',  # Include properties field for owner
        ]
    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.fields['owner_country'].choices = self.get_countries()
    #     self.fields['owner_city'].choices = self.get_cities()
    # def __init__(self, *args, **kwargs):
    #   super().__init__(*args, **kwargs)
    #   countries = self.get_countries()
    #   cities = self.get_cities()
    #   print("Countries fetched: ", countries)
    #   print("Cities fetched: ", cities)
    #   self.fields['owner_country'].choices = countries
    #   self.fields['owner_city'].choices = cities

    # def get_countries(self):
    #     url = 'https://countriesnow.space/api/v0.1/countries'
    #     response = requests.get(url)
    #     if response.status_code == 200:
    #         data = response.json().get('data', [])
    #         return [(country['country'], country['country']) for country in data]
    #     return []

    # def get_cities(self):
    #     url = 'https://countriesnow.space/api/v0.1/countries'
    #     response = requests.get(url)
    #     if response.status_code == 200:
    #         data = response.json().get('data', [])
    #         all_cities = []
    #         for country in data:
    #             cities = country.get('cities', [])
    #             all_cities.extend([(city, city) for city in cities])
    #         return all_cities
    #     return []