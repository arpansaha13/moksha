from django.contrib import admin
from . models import *
# Register your models here.
admin.site.register(SoloEvent)
admin.site.register(TeamEvent)
admin.site.register(Team)
admin.site.register(TeamUserRegistrations)
# admin.site.register(EventDetail)
admin.site.register(SoloContestRegistrations)
admin.site.register(TeamContestRegistrations)