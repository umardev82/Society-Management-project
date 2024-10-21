from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
# from django.contrib.auth.models import User
from django.db.models import UniqueConstraint

class Block_info(models.Model):
    block_name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.block_name
    
    

# add  PropertyType Model
class PropertyType(models.Model):
    pro_type_id = models.AutoField(primary_key=True)
    property_number = models.IntegerField(unique=True)  # Ensures uniqueness
    property_name = models.CharField(max_length=100)
    joint_number = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(4)],
        blank=True,
        null=True,
        help_text="Select the joint number (0, 1, 2, 3, 4) or leave empty if not applicable"
    )

    def __str__(self):
        return f"{self.property_number} - {self.property_name} (Joint: {self.joint_number})"
   
    
    # add  UnitType Model
class UnitType(models.Model):
    unit_type_id = models.AutoField(primary_key=True)
    unit_number = models.IntegerField(unique=True)  # Ensures uniqueness
    unit_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.unit_number} - {self.unit_name}"    
    
    
 # add  Amenity Model  
class Amenity(models.Model):
    amenity_id = models.AutoField(primary_key=True)
    amenity_name = models.CharField(max_length=100)  # Name of the amenity (e.g., Gym, Pool, etc.)
   

    def __str__(self):
        return self.amenity_name 
       
class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    service_name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# add Property_info Model
class Property_info(models.Model):
    property_id = models.AutoField(primary_key=True)
    
    FLOOR_NUMBER_CHOICES = [(i, str(i)) for i in range(1, 11)]  # Floors 1-10
    block_name = models.ForeignKey('Block_info', on_delete=models.CASCADE)
    building_name = models.CharField(max_length=200)
    property_name = models.CharField(max_length=200)
    property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE)
    unit_type = models.ForeignKey('UnitType', on_delete=models.CASCADE)
    floor_number = models.IntegerField(choices=FLOOR_NUMBER_CHOICES)
    number_of_bedrooms = models.PositiveIntegerField()
    number_of_bathrooms = models.PositiveIntegerField()
    balcony_or_patio = models.CharField(max_length=3, choices=[('No', 'No'), ('Yes', 'Yes')], default='No')
    parking_space = models.CharField(max_length=3, choices=[('No', 'No'), ('Yes', 'Yes')], default='No')
    number_of_halls = models.PositiveIntegerField()
    street_address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    AREA_TYPE_CHOICES = [
        ('SQFT', 'Square Feet (SQFT)'),
        ('MARLA', 'Marla'),
        ('KANAL', 'Kanal'),
    ]
    area_type = models.CharField(max_length=10, choices=AREA_TYPE_CHOICES,null=True, blank=True)
    area_value = models.FloatField(blank=True, null=True)  # To store the area size input by the user
    property_value = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    STATUS_TYPE_CHOICES = [
        ('Available', 'Available'),
        ('Rented', 'Rented'),
        ('Maintenance Pending ', 'Maintenance Pending'),
    ]
    status = models.CharField(max_length=50, choices=STATUS_TYPE_CHOICES,null=True, blank=True)
    amenity_name = models.ForeignKey('Amenity', on_delete=models.CASCADE, null=True, blank=True)
    size_in_sqm = models.FloatField(null=True, blank=True)  # Optional field
    is_active = models.BooleanField(default=True)  # Active/In-Active field
    document_attachment = models.FileField(upload_to='documents/', null=True, blank=True)  # Document attachment
    is_rented = models.BooleanField(choices=[(True, 'Yes'), (False, 'No')], default=False)  # Rented (Yes/No)
    owner = models.ForeignKey('Owner', related_name='properties', on_delete=models.CASCADE,null=True, blank=True)  # Ensure this line exists  # Create the one-to-many relationship here
  
    
    def __str__(self):
     return (
        f" ({self.block_name.block_name}) - "
        f" {self.property_type.property_number}, Joint Number: {self.property_type.joint_number}"
    )

    
    # def __str__(self):
    #     return ( f"Block: {self.block_name.block_name} - " f"Property: {self.property_name} (Property Number: {self.property_type.property_number}) - "
    #             f"Unit: {self.unit_type.unit_name} (Unit Number: {self.unit_type.unit_number}) - "
    #             f"Building: {self.building_name}, Floor: {self.floor_number} - "
    #             f"Amenity: {self.amenity_name.amenity_name if self.amenity_name else 'N/A'}")



#add owner models

class Owner(models.Model):
    owner_id = models.AutoField(primary_key=True)
    owner_name = models.CharField(max_length=200)
    owner_guardian_name = models.CharField(max_length=200, null=True, blank=True)
    owner_profile_picture = models.ImageField(upload_to='owner_profile_pictures/', null=True, blank=True)
    owner_phone_number = models.CharField(max_length=15)
    password = models.CharField(max_length=128)  # Consider using hashed passwords in production
    owner_email = models.EmailField(unique=True)
    owner_membership_number = models.CharField(max_length=50, null=True, blank=True)
    owner_cnic = models.CharField(max_length=15, unique=True)
    owner_address = models.CharField(max_length=255, null=True, blank=True)
    owner_city = models.CharField(max_length=255, null=True, blank=True)
    owner_country = models.CharField(max_length=255, null=True, blank=True)
    document_attachment = models.FileField(upload_to='owner_documents/', null=True, blank=True)

    def __str__(self):
        return self.owner_name
    
    
class Tenant(models.Model):
    tenant_id = models.AutoField(primary_key=True)
    tenant_name = models.CharField(max_length=255)
    tenant_guardian_name = models.CharField(max_length=200, null=True, blank=True)
    tenant_profile_picture = models.ImageField(upload_to='tenant_profiles/', null=True, blank=True)
    tenant_phone_number = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)
    tenant_email = models.EmailField(unique=True)
    tenant_cnic = models.CharField(max_length=15)
    tenant_address = models.TextField()
    tenant_country = models.CharField(max_length=100)
    tenant_city = models.CharField(max_length=100)
    starting_date = models.DateField()
    ending_agreement_date = models.DateField()
    monthly_rent = models.DecimalField(max_digits=10, decimal_places=2)
    security_payment = models.DecimalField(max_digits=10, decimal_places=2)
    other_monthly_utility_charges = models.DecimalField(max_digits=10, decimal_places=2)
    assign_property = models.ForeignKey('Property_info', on_delete=models.CASCADE)
    agreement_attachment = models.FileField(upload_to='agreements/', null=True, blank=True)

    def __str__(self):
        return self.tenant_name
    
    
    
    
    
    
    
    
    
    
    
 
 # add OwnerProperty   model 
class OwnerProperty(models.Model):
    owner = models.ForeignKey(Owner, related_name='owner_properties', on_delete=models.CASCADE)
    property_info = models.ForeignKey(Property_info, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('owner', 'property_info')

    def __str__(self):
        return f"{self.owner} - {self.property_info}"    