from django.db import models
# from django.contrib.auth.models import User

class Block_info(models.Model):
    block_name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.block_name
    
    

# add  PropertyType Model
class PropertyType(models.Model):
    pro_type_id = models.AutoField(primary_key=True)
    property_number = models.IntegerField(unique=True)  # Ensures uniqueness
    property_name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.property_number} - {self.property_name}"
    
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
    amenity_name = models.ForeignKey('Amenity', on_delete=models.CASCADE, null=True, blank=True)
    size_in_sqm = models.FloatField(null=True, blank=True)  # Optional field

    def __str__(self):
        return (f"Property: {self.property_name} (Property Number: {self.property_type.property_number}) - "
                f"Unit: {self.unit_type.unit_name} (Unit Number: {self.unit_type.unit_number}) - "
                f"Building: {self.building_name}, Floor: {self.floor_number} - "
                f"Amenity: {self.amenity_name.amenity_name if self.amenity_name else 'N/A'}")


# class Property_info(models.Model):
    
#     property_id = models.AutoField(primary_key=True)
    
#     FLOOR_NUMBER_CHOICES = [(i, str(i)) for i in range(1, 11)]  # Floors 1-10
#     block_name = models.ForeignKey('Block_info', on_delete=models.CASCADE)
#     building_name = models.CharField(max_length=200)
#     property_name = models.CharField(max_length=200)
#     # Updated to ForeignKey to reference PropertyType and UnitType models
#     property_type = models.ForeignKey(PropertyType, on_delete=models.CASCADE)
#     unit_type = models.ForeignKey(UnitType, on_delete=models.CASCADE)
#     floor_number = models.IntegerField(choices=FLOOR_NUMBER_CHOICES)
#     number_of_bedrooms = models.PositiveIntegerField()
#     number_of_bathrooms = models.PositiveIntegerField()
#     balcony_or_patio = models.CharField(max_length=3, choices=[('No', 'No'), ('Yes', 'Yes')])
#     parking_space = models.CharField(max_length=3, choices=[('No', 'No'), ('Yes', 'Yes')])
#     number_of_halls = models.PositiveIntegerField()
#     street_address = models.CharField(max_length=255, null=True, blank=True)
#     city= models.CharField(max_length=255, null=True, blank=True)
#     country= models.CharField(max_length=255, null=True, blank=True)
#     AREA_TYPE_CHOICES = [
#         ('SQFT', 'Square Feet (SQFT)'),
#         ('MARLA', 'Marla'),
#         ('KANAL', 'Kanal'),
#     ]
#     area_type = models.CharField(max_length=10, choices=AREA_TYPE_CHOICES)
#     area_value = models.FloatField(blank=True, null=True)  # To store the area size input by the user
#     property_value = models.DecimalField(max_digits=15, decimal_places=2)  # Field for property price
#     amenity_name = models.ForeignKey('Amenity', on_delete=models.CASCADE, null=True, blank=True)
#     size_in_sqm = models.FloatField(null=True, blank=True)  # Allowing null for size_in_sqm if appropriate
    
    
    
    
#     def __str__(self):
#         return (f"Property: {self.property_name} (Property Number: {self.property_type.property_number}) - "
#                 f"Unit: {self.unit_type.unit_name} (Unit Number: {self.unit_type.unit_number}) - "
#                 f"Building: {self.building_name}, Floor: {self.floor_number}- "
#                  f"Amenity: {self.amenity_name.amenity_name}")



    # def __str__(self):
    #     return self.property_name
    
    
