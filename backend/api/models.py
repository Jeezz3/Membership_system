from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self


class Members(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False) # False for inactive, True for active

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        app_label = 'api'

class Membership(models.Model):
    member_id = models.IntegerField(null=True, blank=True) # linked to member db in members database
    active_until = models.DateTimeField(null=True, blank=True, default= None)
    remaining_sessions = models.IntegerField(default=-1) # -1 for unlimited sessions
    is_paused = models.BooleanField(default=False) # If True then it should have a pause_start_date. if True --> false pause_start_date should be set to null and update the active_until field based on the pause duration
    pause_start_date = models.DateTimeField(null=True, blank=True, default = None)

    def __str__(self):
        return f'Membership for {self.member}'
    
    class Meta:
        app_label = 'api'
