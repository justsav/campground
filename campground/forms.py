from django import forms
from .models import Reservation

# class CampsiteForm(forms.ModelForm):
#     class Meta:
#         model = Campsite
#         fields = ('powerwater','access','max_camper_length','availability','cost_per_night','image_url','name','description','lat','lng',)

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ('campsite', 'status', 'start_date', 'end_date', 'date_range', 'cost_total', 'first_name', 'last_name', 'street_address', 'city', 'state', 'zipcode', 'email')