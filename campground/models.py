from django.db import models

class Campsite(models.Model):
    powerwater = models.CharField(max_length=10)
    access = models.CharField(max_length=30)
    max_camper_length = models.IntegerField()
    availability = models.TextField()
    cost_per_night = models.IntegerField()
    image_url = models.CharField(max_length=3255)
    name = models.CharField(max_length=255)
    description = models.TextField()
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    lng = models.DecimalField(max_digits=8, decimal_places=6)

    def __str__(self):
        return self.name

class Reservation(models.Model):
    campsite = models.ForeignKey('Campsite', on_delete=models.CASCADE, related_name='campsites')
    status = models.CharField(max_length=50, default='pending')
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50)
    cost_total = models.IntegerField(default=0)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    street_address = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    def __str__(self):
        reservation = f"{self.campsite}: {self.start_date}  to  {self.end_date}"
        return reservation