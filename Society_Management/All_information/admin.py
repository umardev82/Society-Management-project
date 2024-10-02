from django.contrib import admin
from .models import Block_info,Property_info

@admin.register(Block_info)
class AdminBlock(admin.ModelAdmin):
    list_display = ['id', 'block_name']
    
    
# Admin customization for Property model
@admin.register(Property_info)
class PropertyAdmin(admin.ModelAdmin):
    list_display = (
        'property_name', 
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
        'size_in_sqm'
    )  # Fields to display in the list view
    list_filter = ('property_type', 'unit_type', 'block_name', 'floor_number')  # Filters for easier navigation    
    search_fields = ('property_name', 'building_name', 'unit_number',
                     )