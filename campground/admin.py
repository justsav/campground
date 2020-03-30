from django.contrib import admin
from .models import Campsite, Reservation

@admin.register(Campsite, Reservation)
class DefaultAdmin(admin.ModelAdmin):
    pass

# class CampsiteAdmin(admin.ModelAdmin):
#     list_display = ('powerwater', 'access', 'camper_size', 'availability', 'cost_per_night', 'image_url', 'name', 'description', 'lat', 'lng')

# class ReservationAdmin(admin.ModelAdmin):
#     list_display = ('campsite', 'status', 'start_date', 'end_date', 'cost_total')


