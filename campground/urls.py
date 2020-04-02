from django.urls import path
from . import views

urlpatterns = [
    path('campsites', views.campsite_list, name='campsite_list'),
    path('campsites/<int:campsite_id>', views.campsite_detail, name='campsite_detail'),
    # path('campsites/<int:campsite_id>/edit', views.edit_campsite, name='edit_campsite'),

    path('reservations', views.reservation_list, name='reservation_list'),
    path('reservations/<int:reservation_id>', views.reservation_detail, name='reservation_detail'),
    path('reservations/new', views.new_reservation, name='new_reservation'),
]