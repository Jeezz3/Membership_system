from rest_framework import serializers
from .models import Item, Members, Membership

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ['id','first_name', 'last_name', 'created_at', 'status']

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['member_id', 'active_until', 'remaining_sessions', 'is_paused', 'pause_start_date']


