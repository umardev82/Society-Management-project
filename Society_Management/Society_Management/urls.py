
# society_management/urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from All_information.views import BlockInfoViewSet,PropertyInfoViewSet,PropertyTypeViewSet, TenantViewSet,UnitTypeViewSet,AmenityViewSet,ServiceViewSet,OwnerViewSet,OwnerPropertyViewSet


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
router.register('tenant', TenantViewSet, basename='tenant')



urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user/', include('user_management.urls')),
    path('', include(router.urls)), 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
