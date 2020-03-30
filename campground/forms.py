from django import forms
from .models import Reservation

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ('campsite', 'status', 'start_date', 'end_date', 'cost_total', 'first_name', 'last_name', 'street_address', 'city', 'state', 'zipcode', 'email')