
from rest_framework import serializers
from .models import AreaType, BillsSetup, Block_info, FormBuilder, MaintenanceCost, ManagementCommittee, MemberTypeSetup, PaymentsCollection,Property_info,PropertyType, Tenant,UnitType,Amenity,Service,Owner, OwnerProperty
from rest_framework.exceptions import ValidationError

class Block_info_serlializer(serializers.ModelSerializer):
    class Meta:
        model = Block_info  # Change 'models' to 'model'
        fields = ['id', 'block_name']  
        
class Property_type_serializer(serializers.ModelSerializer):
    class Meta:
        model =PropertyType
        fields=['pro_type_id','property_name']   
 
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
        
class AreaTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaType
        fields = ['area_type_id', 'area_type_name', 'area_value']        
       
class Property_info_serializer_for_display_data(serializers.ModelSerializer):
    block_name = Block_info_serlializer()
    property_type = Property_type_serializer()
    unit_type = Unit_type_serializer()
    amenity_name = Amenity_serializer()
    property_area = AreaTypeSerializer() 
    
    class Meta:
        model = Property_info
        # Instead of '__all__', specify all fields except 'owner'
        exclude = ['owner']  # Exclude the 'owner' field
        
class Property_info_serializer(serializers.ModelSerializer):

    class Meta:
        model = Property_info
        fields = [
            'property_id',
            'block_name',
            'building_name',
            'property_name',
            'property_type',
            'property_number',
            'joint_number',
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
            'property_area',
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
            'properties',
        ]

    def validate_properties(self, value):
        # Check if any property is already assigned to another owner
        for property_obj in value:
            if property_obj.owner_id and (not self.instance or property_obj.owner_id != self.instance.pk):
                raise ValidationError(
                    f"Property {property_obj.property_name} is already assigned to another owner and cannot be reassigned."
                )
        return value

    def create(self, validated_data):
        properties = validated_data.pop('properties', [])
        
        # Save owner instance first to generate pk
        owner = super().create(validated_data)
        
        # Assign properties to the owner
        for property_obj in properties:
            property_obj.owner_id = owner.pk
            property_obj.save()
        
        return owner

    def update(self, instance, validated_data):
        properties = validated_data.pop('properties', [])
        
        # Clear existing properties for this owner
        Property_info.objects.filter(owner_id=instance.pk).update(owner_id=None)
        
        # Update owner instance with other fields
        owner = super().update(instance, validated_data)
        
        # Assign new properties to the owner
        for property_obj in properties:
            property_obj.owner_id = owner.pk
            property_obj.save()
        
        return owner
# class OwnerSerializer(serializers.ModelSerializer):
  
#     properties = serializers.PrimaryKeyRelatedField(many=True, queryset=Property_info.objects.all(), required=False)

#     class Meta:
#         model = Owner
#         fields = [
#             'owner_id',
#             'owner_name',
#             'owner_guardian_name',
#             'owner_profile_picture',
#             'owner_phone_number',
#             'password',
#             'owner_email',
#             'owner_membership_number',
#             'owner_cnic',
#             'owner_address',
#             'owner_country',
#              'owner_city',
#             'document_attachment',
#             'properties',  # Include properties field for owner
#         ]
    
class Tenant_display_info_Serializer(serializers.ModelSerializer):
    assign_property = Property_info_serializer_for_display_data()
    
    class Meta:
        model = Tenant
        fields = '__all__'  
class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = [
            'tenant_id',
            'tenant_name',
            'tenant_guardian_name',
            'tenant_profile_picture',
            'tenant_phone_number',
            'password',
            'tenant_email',
            'tenant_cnic',
            'tenant_address',
            'tenant_city',
            'tenant_country',
            'starting_date',
            'ending_agreement_date',
            'monthly_rent',
            'security_payment',
            'other_monthly_utility_charges',
            'assign_property',
            'agreement_attachment',
        ]   
class FormBuilderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormBuilder
        fields = '__all__'  # This will include all fields from the FormBuilder model

        
class BillsSetupDisplaySerializer(serializers.ModelSerializer):
    form = FormBuilderSerializer(read_only=True)
    class Meta:
        model = BillsSetup
        fields = ['bill_setup_id', 'form', 'form_id','property_type_name', 'property_area', 'property_number', 'form_data']

    def validate_charges(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("Charges must be a dictionary of key-value pairs.")
        return value                       
class BillsSetupSerializer(serializers.ModelSerializer):

    form_id = serializers.PrimaryKeyRelatedField(queryset=FormBuilder.objects.all(), source='form')
    
    class Meta:
        model = BillsSetup
        fields = ['bill_setup_id', 'form', 'form_id','property_type_name', 'property_area', 'property_number', 'form_data']

    def validate_charges(self, value):
        if not isinstance(value, dict):
            raise serializers.ValidationError("Charges must be a dictionary of key-value pairs.")
        return value
# class BillsSetupDisplaySerializer(serializers.ModelSerializer):
#     property_type_name = Property_type_serializer()
#     property_area = AreaTypeSerializer() 
#     class Meta:
#         model = BillsSetup
#         fields = ['bill_setup_id', 'property_type_name', 'property_area', 'property_number', 'charges']

#     def validate_charges(self, value):
#         if not isinstance(value, dict):
#             raise serializers.ValidationError("Charges must be a dictionary of key-value pairs.")
#         return value  
        
# class BillsSetupSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BillsSetup
#         fields = ['bill_setup_id', 'property_type_name', 'property_area', 'property_number', 'charges']

#     def validate_charges(self, value):
#         if not isinstance(value, dict):
#             raise serializers.ValidationError("Charges must be a dictionary of key-value pairs.")
#         return value        
 
 
class MemberTypeSetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MemberTypeSetup
        fields = '__all__'

class ManagementCommitteeDisplaySerializer(serializers.ModelSerializer):
    mc_member_type = MemberTypeSetupSerializer() 

    class Meta:
        model = ManagementCommittee
        fields = '__all__'    
        
class ManagementCommitteeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManagementCommittee
        fields = '__all__'
        
      
class MaintenanceCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceCost
        fields = '__all__' 



class PaymentsCollectionSerializer(serializers.ModelSerializer):
    block_name = serializers.PrimaryKeyRelatedField(queryset=Block_info.objects.all())
    property_numbers = serializers.SerializerMethodField()
    
    class Meta:
        model = PaymentsCollection
        fields = ['payments_collection_mode','block_name', 'property_number', 'property_numbers', 'name_id', 'month','year', 'bills_fields','total_cuttent_bills', 'issue_date', 'due_date']

    def get_property_numbers(self, instance):
        block_name = self.context.get('block_name')
        if block_name:
            # Fetch all property numbers based on the selected block
            properties = Property_info.objects.filter(block_name=block_name)
            return [property.property_number for property in properties]
        return []

    def validate_property_number(self, value):
        # Check if the property number exists
        if not Property_info.objects.filter(property_number=value).exists():
            raise ValidationError("Invalid property number.")
        return value
