from django.db import models
from django.contrib.auth.models import User

class BusinessRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business_name = models.CharField(max_length=255)
    address = models.TextField()
    contact = models.CharField(max_length=100)
    website = models.URLField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.business_name} (by {self.user.username})"
