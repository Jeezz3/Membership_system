from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Item, Members, Membership
from .serializers import ItemSerializer, MembersSerializer, MembershipSerializer

# Create your views here.
class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsAdminUser]

class MembersViewSet(ModelViewSet):
    queryset = Members.objects.all()
    serializer_class = MembersSerializer
    permission_classes = [IsAdminUser]

@api_view(['GET'])
@permission_classes([IsAdminUser])
def me(request):
    return Response({
        "username": request.user.username,
        "is_staff": request.user.is_staff
    })


@api_view(['GET'])
@permission_classes([IsAdminUser])
def member_item(request):
    members_list = Members.objects.using('members').all()

    data = [
        {
        "id": member.id,
        "name": member.first_name + " " + member.last_name, 
        "status": member.status,
        "created_at": member.created_at}
    for member in members_list]


    return Response({"data": data},status=200)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_member(request):
    serializer_member = MembersSerializer(data=request.data)
    if not serializer_member.is_valid():
        return Response(serializer_member.errors, status=400)
    
    member = Members.objects.using('members').create(**serializer_member.validated_data)

    membership = Membership.objects.using('membership').create(member_id=member.id)
    serializer_membership = MembershipSerializer(membership)

    return Response({
        "member": serializer_member.data,
        "membership": serializer_membership.data
    }, status=201)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_membership(request,pk):
    try:
        membership = Membership.objects.using('membership').get(member_id=pk)
    except Membership.DoesNotExist:
        return Response({"error": "Membership not found"}, status=404)

    # Serialize the model instance
    serializer = MembershipSerializer(membership)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_member(request, member_id):
    try:
        member = Members.objects.using('members').get(id=member_id)
        member.delete(using='members')
        return Response(status=204)
    except Members.DoesNotExist:
        return Response(status=404)