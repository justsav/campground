import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import ReservationForm
from .models import Campsite, Reservation
from .serializers import CampsiteSerializer, ReservationSerializer
import datetime
import ast

### CAMPSITES ###
def campsite_list(request):
    campsites = Campsite.objects.all()
    serialized_campsites = CampsiteSerializer(campsites).all_campsites
    return JsonResponse(data=serialized_campsites, status=200)
    
def campsite_detail(request, campsite_id):
    campsite = Campsite.objects.get(id=campsite_id)
    serialized_campsite = CampsiteSerializer(campsite).campsite_detail
    return JsonResponse(data=serialized_campsite, status=200)

# THIS MAY BE RE-ADDED IN A FUTURE VERSION 
# @csrf_exempt
# def edit_campsite(request, campsite_id):
#     campsite = Campsite.objects.get(id=campsite_id)
#     if request.method == 'POST':
#         form = CampsiteForm(request.POST, instance=campsite)
#         if form.is_valid():
#             campsite = form.save(commit=True)
#             serialized_campsite = CampsiteSerializer(campsite).campsite_detail
#             return JsonResponse(data={'success': 'you have edited your campsite', 'campsite': serialized_campsite}, status=200)


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
        form = ReservationForm(data)
        if form.is_valid():
            reservation = form.save(commit=True)
            # temp = json.loads(reservation.campsite.availability)
            # dates_to_drop = ast.literal_eval(reservation.date_range)
            # for i in range(len(dates_to_drop)-1):
            #     temp[dates_to_drop[i]] = 0
            # reservation.campsite.availability = temp 
            # reservation.campsite.save()
            serialized_reservation = ReservationSerializer(reservation).reservation_detail
            return JsonResponse(data=serialized_reservation, status=200)
