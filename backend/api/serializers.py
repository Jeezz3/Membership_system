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

    def create(self, validated_data):
        return super().create(validated_data)

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ['member_id', 'active_until', 'remaining_sessions', 'is_paused', 'pause_start_date']

    def create(self, validated_data):
        if 'member' in validated_data:
            member_id = validated_data.get('member').id if instance(validated_data.get('member'), Members) else validated_data.get('member')
            validated_data['member_id'] = member_id
        return super().create(validated_data)

