from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Members, Membership, Schedule
from .serializers import MembersSerializer, MembershipSerializer, ScheduleSerializer


from datetime import datetime

# Create your views here.

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

    membership = Membership.objects.using('members').create(member=member)
    serializer_membership = MembershipSerializer(membership)

    return Response({
        "member": serializer_member.data,
        "membership": serializer_membership.data
    }, status=201)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_membership(request,pk):
    try:
        membership = Membership.objects.using('members').get(member_id=pk)
    except Membership.DoesNotExist:
        return Response({"error": "Membership not found"}, status=404)

    # Serialize the model instance
    serializer = MembershipSerializer(membership)
    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def edit_membership(request,pk):
    data = request.data
    print(data)
    try:
        membership = Membership.objects.using("members").get(member_id=pk)
    except Membership.DoesNotExist:
        return Response({"error": "Membership not found"}, status=404)
    
    if data['active_until'] is not None:
        print("active pass")
        membership.active_until = data['active_until']
    
    if data['remaining_sessions'] is not None:
        print("remain pass")
        membership.remaining_sessions = data['remaining_sessions']
    
    if data['is_paused'] is not None:
        membership.is_paused = data['is_paused']
        if data['is_paused']:
            membership.pause_start_date = datetime.now()
    
    membership.save(using="members")

    return Response(status=204)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_member(request, member_id):

    try:
        member = Members.objects.using('members').get(id=member_id)
        member.delete(using='members')
        return Response(status=204)
    except Members.DoesNotExist:
        return Response(status=404)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_schedule(request, pk):
    try:
        schedule = Schedule.objects.using('members').get(schedule_id=pk)
    except Schedule.DoesNotExist:
        return Response({"error": "Schedule not found"}, status=404)
    
    serializer = ScheduleSerializer(schedule)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_schedule(request):
    data = request.data
    for schedule_info in data:
        serialize_schedule = ScheduleSerializer(data=schedule_info)
        Schedule.objects.using('members').create(**serialize_schedule.validated_data)

    return Response(status=201)

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def edit_schedule(request, pk):
    data = request.data
    try:
        schedule = Schedule.objects.using('members').get(schedule_id=pk)
    except Schedule.DoesNotExist:
        return Response({"error": "Schedule not found"}, status=404)
    
    if data['name'] is not None:
        schedule.name = data['name']

    if data['days'] is not None:
        schedule.days = data['days']

    if data['time'] is not None:
        schedule.time = data['time']

    if data['max_att'] is not None:
        schedule.max_attendance = data['max_att']

    if data['is_routine'] is not None:
        schedule.is_routine = data['is_routine']
    
    if data['is_active'] is not None:
        schedule.is_active = data['is_active']
    
    schedule.save(using="members")
     
    return Response(status=204)   