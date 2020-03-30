import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ReservationForm
from .models import Campsite, Reservation
from .serializers import CampsiteSerializer, ReservationSerializer

### CAMPSITES ###
def campsite_list(request):
    campsites = Campsite.objects.all()
    serialized_campsites = CampsiteSerializer(campsites).all_campsites
    return JsonResponse(data=serialized_campsites, status=200)
    
def campsite_detail(request, campsite_id):
    campsite = Campsite.objects.get(id=campsite_id)
    serialized_campsite = CampsiteSerializer(campsite).campsite_detail
    return JsonResponse(data=serialized_campsite, status=200)


### RESERVATIONS ###
def reservation_list(request):
    reservations = Reservation.objects.all()
    serialized_reservations = ReservationSerializer(reservations).all_reservations
    return JsonResponse(data=serialized_reservations, status=200)
    
def reservation_detail(request, reservation_id):
    reservation = Reservation.objects.get(id=reservation_id)
    serialized_reservation = ReservationSerializer(reservation).reservation_detail
    return JsonResponse(data=serialized_reservation, status=200)

@csrf_exempt
def new_reservation(request):
    data = json.load(request)
    if request.method == "POST":
        form = ReservationForm(data) #data doesnt work
        if form.is_valid():
            reservation = form.save(commit=True)
            serialized_reservation = ReservationSerializer(reservation).reservation_detail
            return JsonResponse(data=serialized_reservation, status=200)

@csrf_exempt
def edit_reservation(request, reservation_id):
    reservation = Reservation.objects.get(id=reservation_id)
    if request.method == 'POST':
        form = ReservationForm(request.POST, instance=reservation)
        if form.is_valid():
            reservation = form.save(commit=True)
            serialized_reservation = ReservationSerializer(reservation).reservation_detail
            return JsonResponse(data={'success': 'you have edited your reservation', 'reservation': serialized_reservation}, status=200)