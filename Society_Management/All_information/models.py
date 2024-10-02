from django.db import models
# from django.contrib.auth.models import User

class Block_info(models.Model):
    block_name=models.CharField(max_length=100)
    
    def __str__(self):
        return self.block_name


class Property_info(models.Model):
    
    property_id = models.AutoField(primary_key=True)
    PROPERTY_TYPE_CHOICES = [
        ('Residential', 'Residential'),
        ('Commercial', 'Commercial'),
        # Add more types as needed
    ]

    UNIT_TYPE_CHOICES = [
        ('Apartment', 'Apartment'),
        ('Villa', 'Villa'),
        ('Penthouse', 'Penthouse'),
        ('Shop', 'Shop'),
        # Add more unit types as needed
    ]

    FLOOR_NUMBER_CHOICES = [(i, str(i)) for i in range(1, 11)]  # Floors 1-10

    block_name = models.ForeignKey(Block_info, on_delete=models.CASCADE)
    building_name = models.CharField(max_length=200)
    property_name = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES)
    unit_type = models.CharField(max_length=20, choices=UNIT_TYPE_CHOICES)
    unit_number = models.CharField(max_length=50)
    floor_number = models.IntegerField(choices=FLOOR_NUMBER_CHOICES)
    number_of_bedrooms = models.PositiveIntegerField()
    number_of_bathrooms = models.PositiveIntegerField()
    balconies_or_patio_size = models.CharField(max_length=50, blank=True)
    parking_space_details = models.CharField(max_length=100, blank=True)
    number_of_halls = models.PositiveIntegerField()
    location = models.CharField(max_length=255)
    size_in_sqm = models.FloatField()
     # owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.property_name
    
    
