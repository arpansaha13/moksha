from django.contrib import admin
from .models import SoloContestRegistrations, TeamContestRegistrations

# Register your models here.
admin.site.register(SoloContestRegistrations)
admin.site.register(TeamContestRegistrations)
