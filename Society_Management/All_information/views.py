from rest_framework import viewsets
from .models import AreaType, BillsSetup, Block_info, FormBuilder, MaintenanceCost, ManagementCommittee, MemberTypeSetup, PaymentsCollection ,Property_info,PropertyType,UnitType,Amenity,Service,Owner, OwnerProperty,Tenant
from .serializers import AreaTypeSerializer, BillsSetupDisplaySerializer, BillsSetupSerializer, Block_info_serlializer, FormBuilderSerializer, MaintenanceCostSerializer, ManagementCommitteeDisplaySerializer, ManagementCommitteeSerializer, MemberTypeSetupSerializer, Owner_display_info_Serializer, PaymentsCollectionSerializer ,Property_info_serializer, Property_info_serializer_for_display_data,Property_type_serializer, Tenant_display_info_Serializer,Unit_type_serializer,Amenity_serializer,ServiceSerializer,OwnerPropertySerializer,OwnerSerializer,TenantSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound



class BlockInfoViewSet(viewsets.ModelViewSet):
    queryset = Block_info.objects.all()  
    serializer_class = Block_info_serlializer 
 

class PropertyTypeViewSet(viewsets.ModelViewSet):
    queryset= PropertyType.objects.all()
    serializer_class=Property_type_serializer
    
class UnitTypeViewSet(viewsets.ModelViewSet):
    queryset =UnitType.objects.all()
    serializer_class=Unit_type_serializer
    
class AmenityViewSet(viewsets.ModelViewSet):
    queryset = Amenity.objects.all()
    serializer_class=Amenity_serializer 
        
class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class=ServiceSerializer 
 
class AreaTypeViewSet(viewsets.ModelViewSet):
    queryset = AreaType.objects.all()
    serializer_class = AreaTypeSerializer    
    
class PropertyInfoViewSet(viewsets.ModelViewSet):
    queryset = Property_info.objects.all()
    serializer_class = Property_info_serializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Use the flat serializer for write operations
            return Property_info_serializer
        else:
            # Use the nested serializer for read operations
            return Property_info_serializer_for_display_data
    
    



class OwnerViewSet(viewsets.ModelViewSet):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return OwnerSerializer
        else:
            return Owner_display_info_Serializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data.pop('csrfmiddlewaretoken', None)

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    
    

class OwnerPropertyViewSet(viewsets.ModelViewSet):
    queryset = OwnerProperty.objects.all()
    serializer_class = OwnerPropertySerializer
    

    def create(self, request, *args, **kwargs):
        owner_id = request.data.get('owner_id')
        property_id = request.data.get('property_id')

        try:
            # Check if the property is already assigned to an owner
            property_info = Property_info.objects.get(property_id=property_id)
            if property_info.owner is not None:
                return Response({"error": "This property is already assigned to another owner."}, status=status.HTTP_400_BAD_REQUEST)

            # Assign the owner to the property
            owner = Owner.objects.get(owner_id=owner_id)
            property_info.owner = owner
            property_info.save()

            return Response(Property_info_serializer(property_info).data, status=status.HTTP_201_CREATED)
        
        except Owner.DoesNotExist:
            return Response({"error": "Owner not found."}, status=status.HTTP_404_NOT_FOUND)
        except Property_info.DoesNotExist:
            return Response({"error": "Property not found."}, status=status.HTTP_404_NOT_FOUND)    
    
    
  
class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return TenantSerializer
        else:
            return Tenant_display_info_Serializer
        

# class BillsSetupViewSet(viewsets.ModelViewSet):
#     queryset = BillsSetup.objects.all()
#     serializer_class = BillsSetupSerializer   
#     def get_serializer_class(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             # Use the flat serializer for write operations
#             return BillsSetupSerializer
#         else:
#             # Use the nested serializer for read operations
#             return BillsSetupDisplaySerializer     

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import BillsSetup
from .serializers import BillsSetupSerializer, BillsSetupDisplaySerializer
class BillsSetupViewSet(viewsets.ModelViewSet):
    queryset = BillsSetup.objects.all()
    serializer_class = BillsSetupSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        property_type_name = self.request.query_params.get('property_type_name')
        property_area = self.request.query_params.get('property_area')
        property_number = self.request.query_params.get('property_number')

        if property_type_name:
            queryset = queryset.filter(property_type_name=property_type_name)
        if property_area:
            queryset = queryset.filter(property_area=property_area)
        if property_number:
            queryset = queryset.filter(property_number=property_number)

        return queryset    
 

    @action(detail=True, methods=['put', 'patch'])
    def update_by_property(self, request, pk=None):
        """
        Custom action to update a BillSetup entry based on property type and area.
        """
        bill_setup = self.get_object()  # Get the instance by primary key (pk)
        
        # Ensure that the request contains 'property_type_name' and 'property_area'
        property_type_name = request.data.get('property_type_name')
        property_area = request.data.get('property_area')

        if property_type_name and property_area:
            # Update the record based on these fields
            bill_setup.property_type_name = property_type_name
            bill_setup.property_area = property_area
            # Optionally update other fields
            bill_setup.charges = request.data.get('charges', bill_setup.charges)
            bill_setup.save()
            return Response(BillsSetupSerializer(bill_setup).data)
        else:
            return Response({"error": "Both property_type_name and property_area are required."}, status=400)
        
class FormBuilderViewSet(viewsets.ModelViewSet):
    queryset = FormBuilder.objects.all()
    serializer_class = FormBuilderSerializer

        
        
class FormBuilderViewSet(viewsets.ModelViewSet):
    queryset = FormBuilder.objects.all()
    serializer_class = FormBuilderSerializer 
 
 
 
class ManagementCommitteeViewSet(viewsets.ModelViewSet):
    queryset = ManagementCommittee.objects.all()
    serializer_class = ManagementCommitteeSerializer
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return ManagementCommitteeSerializer
        else:
            return ManagementCommitteeDisplaySerializer       

class MemberTypeSetupViewSet(viewsets.ModelViewSet):
    queryset = MemberTypeSetup.objects.all()
    serializer_class = MemberTypeSetupSerializer        
        
class MaintenanceCostViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceCost.objects.all()
    serializer_class = MaintenanceCostSerializer        
 




# PaymentsCollectionViewSet
class PaymentsCollectionViewSet(viewsets.ModelViewSet):
    queryset = PaymentsCollection.objects.all()
    serializer_class = PaymentsCollectionSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        block_name = self.request.query_params.get('block_name', None)
        if block_name:
            context['block_name'] = block_name  # Passing block_name to the serializer context
        return context

    @action(detail=False, methods=['get'])
    def get_property_numbers(self, request):
        block_name = request.query_params.get('block_name', None)
        if block_name:
            # Fetching properties based on block_name
            properties = Property_info.objects.filter(block_name=block_name)
            property_numbers = [property.property_number for property in properties]
            return Response({'property_numbers': property_numbers})
        return Response({'property_numbers': []}, status=400)

    @action(detail=False, methods=['get'])
    def get_property_owner_or_tenant(self, request):
        # Get the selected property number from the request
        property_number = request.query_params.get('property_number', None)

        if property_number:
            property_number = property_number.strip()  # Clean the input

            # Fetch the related Property_info
            property_info = Property_info.objects.filter(property_number=property_number).first()
            if property_info:
                # Fetch the associated owner from Property_info using owner_id
                owner = property_info.owner  # This fetches the Owner instance linked to this Property_info
                owner_name = owner.owner_name if owner else "Owner not found"

                # Fetch tenant associated with this property using assign_property
                tenant = Tenant.objects.filter(assign_property=property_info).first()
                tenant_name = tenant.tenant_name if tenant else "Tenant not found"

                # Check for specific BillsSetup linked to property_number
                specific_bills_setup = BillsSetup.objects.filter(property_number=property_number).first()
                
                if specific_bills_setup:
                    # Case 1: Specific BillsSetup for the property_number
                    return Response({
                        'property_number': property_info.property_number,
                        'owner_name': owner_name,
                        'tenant_name': tenant_name,
                        'related_properties': [property_info.property_number],
                        'bills_fields': specific_bills_setup.form_data
                    })

                # Case 2: Fallback to area/type-based BillsSetup
                property_area = property_info.property_area
                property_type = property_info.property_type

                bills_setup = BillsSetup.objects.filter(
                    property_area=property_area,
                    property_type_name=property_type
                ).first()

                if bills_setup:
                    # Fetch all properties linked by area and type
                    related_properties = Property_info.objects.filter(
                        property_area=property_area,
                        property_type=property_type
                    )
                    related_property_numbers = [prop.property_number for prop in related_properties]

                    return Response({
                        'property_number': property_info.property_number,
                        'owner_name': owner_name,
                        'tenant_name': tenant_name,
                        'related_properties': related_property_numbers,
                        'bills_fields': bills_setup.form_data
                    })

                return Response({'error': 'No matching bills setup found'}, status=status.HTTP_404_NOT_FOUND)

            return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error': 'property_number is required'}, status=status.HTTP_400_BAD_REQUEST)









# class PaymentsCollectionViewSet(viewsets.ModelViewSet):
#     queryset = PaymentsCollection.objects.all()
#     serializer_class = PaymentsCollectionSerializer

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         block_name = self.request.query_params.get('block_name', None)
#         if block_name:
#             context['block_name'] = block_name  # Passing block_name to the serializer context
#         return context

#     @action(detail=False, methods=['get'])
#     def get_property_numbers(self, request):
#         block_name = request.query_params.get('block_name', None)
#         if block_name:
#             # Fetching properties based on block_name
#             properties = Property_info.objects.filter(block_name=block_name)
#             property_numbers = [property.property_number for property in properties]
#             return Response({'property_numbers': property_numbers})
#         return Response({'property_numbers': []}, status=400)
    
#     @action(detail=False, methods=['get'])
#     def get_property_owner_or_tenant(self, request):
#      property_number = request.query_params.get('property_number', None)
#      if property_number:
#         property_number = property_number.strip()  # Clean the input

#         # Fetch the related Property_info
#         property_info = Property_info.objects.filter(property_number=property_number).first()
#         if property_info:
#             # Check for specific BillsSetup linked to property_number
#             specific_bills_setup = BillsSetup.objects.filter(property_number=property_number).first()
          
#             if specific_bills_setup:
#                 # Case 1: Specific BillsSetup for the property_number
#                 return Response({
#                     'property_number': property_info.property_number,
#                     'related_properties': [property_info.property_number],
#                     'bills_fields': specific_bills_setup.form_data
#                 })

#             # Case 2: Fallback to area/type-based BillsSetup
#             property_area = property_info.property_area
#             property_type = property_info.property_type

#             bills_setup = BillsSetup.objects.filter(
#                 property_area=property_area,
#                 property_type_name=property_type
#             ).first()

#             if bills_setup:
#                 # Fetch all properties linked by area and type
#                 related_properties = Property_info.objects.filter(
#                     property_area=property_area,
#                     property_type=property_type
#                 )
#                 related_property_numbers = [prop.property_number for prop in related_properties]

#                 return Response({
#                     'property_number': property_info.property_number,
#                     'related_properties': related_property_numbers,
#                     'bills_fields': bills_setup.form_data
#                 })

#             return Response({'error': 'No matching bills setup found'}, status=status.HTTP_404_NOT_FOUND)

#         return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

#      return Response({'error': 'property_number is required'}, status=status.HTTP_400_BAD_REQUEST)



    
    
# class PaymentsCollectionViewSet(viewsets.ModelViewSet):
#     queryset = PaymentsCollection.objects.all()
#     serializer_class = PaymentsCollectionSerializer
    
#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         block_name = self.request.query_params.get('block_name', None)
#         if block_name:
#             context['block_name'] = block_name  # Passing block_name to the serializer context
#         return context
    
#     @action(detail=False, methods=['get'])
#     def get_property_numbers(self, request):
#         block_name = request.query_params.get('block_name', None)
#         if block_name:
#             # Fetching properties based on block_name
#             properties = Property_info.objects.filter(block_name=block_name)
#             property_numbers = [property.property_number for property in properties]
#             return Response({'property_numbers': property_numbers})
#         return Response({'property_numbers': []}, status=400)
#     @action(detail=False, methods=['get'])
#     def get_property_owner_or_tenant(self, request):
    # # Get the selected property number from the request
    #  property_number = request.query_params.get('property_number', None)

    #  if property_number:
    #     # Fetch the Property_info object based on the property_number
    #     property_info = Property_info.objects.filter(property_number=property_number).first()

    #     if property_info:
    #         # Fetch the associated owner from Property_info using owner_id
    #         owner = property_info.owner  # This fetches the Owner instance linked to this Property_info
    #         owner_name = owner.owner_name if owner else "Owner not found"

    #         # Fetch tenant associated with this property using assign_property
    #         tenant = Tenant.objects.filter(assign_property=property_info).first()
    #         tenant_name = tenant.tenant_name if tenant else "Tenant not found"

    #         # Fetch the bills setup for this property
    #         bills_setup = BillsSetup.objects.filter(property_number=property_info).first()
    #         form_data = bills_setup.form_data if bills_setup else "No bills setup found"

#             return Response({
#                 'property_number': property_info.property_number,
#                 'owner_name': owner_name,
#                 'tenant_name': tenant_name,
#                 'bills_fields': form_data
#             })
#         return Response({'error': 'Property not found'}, status=status.HTTP_404_NOT_FOUND)

#      return Response({'error': 'property_number is required'}, status=status.HTTP_400_BAD_REQUEST)



