from django.db import models

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
    member = models.ForeignKey(Members, on_delete=models.CASCADE, null=True)
    active_until = models.DateTimeField(null=True, blank=True, default= None)
    remaining_sessions = models.IntegerField(default=-1) # -1 for unlimited sessions
    is_paused = models.BooleanField(default=False) # If True then it should have a pause_start_date. if True --> false pause_start_date should be set to null and update the active_until field based on the pause duration
    pause_start_date = models.DateTimeField(null=True, blank=True, default = None)

    def __str__(self):
        return f'Membership for {self.member_id}'
    
    class Meta:
        app_label = 'api'
