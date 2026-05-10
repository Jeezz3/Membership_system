from rest_framework import serializers
from .models import Members, Membership


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ['id','first_name', 'last_name', 'created_at', 'status']

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['member', 'active_until', 'remaining_sessions', 'is_paused', 'pause_start_date']


