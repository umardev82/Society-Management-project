
# society_management/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from All_information.views import BlockInfoViewSet,PropertyInfoViewSet,PropertyTypeViewSet,UnitTypeViewSet,AmenityViewSet,ServiceViewSet,OwnerViewSet,OwnerPropertyViewSet


# Define the router and register the viewset
router = DefaultRouter()
router.register('block_info', BlockInfoViewSet, basename='block_info')
router.register('property_type_info',PropertyTypeViewSet,basename='property_type_information')
router.register('unit_type_info',UnitTypeViewSet,basename='unit_type_information')
router.register('amenity_info',AmenityViewSet,basename='amenity_information')
#update
router.register('service_info',ServiceViewSet,basename='service_information')
router.register('property_info', PropertyInfoViewSet, basename='property_info')
router.register('owners', OwnerViewSet, basename='owner')



urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user/', include('user_management.urls')),
    path('', include(router.urls)), 
]
