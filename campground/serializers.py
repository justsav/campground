from builtins import object

class CampsiteSerializer(object):
    def __init__(self, body):
        self.body = body
    
    @property
    def all_campsites(self):
        output = {'campsites': []}

        for campsite in self.body:
            campsite_details = {
                'id': campsite.id,
                'powerwater': campsite.powerwater,
                'access': campsite.access,
                'max_camper_length': campsite.max_camper_length,
                'availability': campsite.availability,
                'cost_per_night': campsite.cost_per_night,
                'image_url': campsite.image_url,
                'description': campsite.description,
                'lat': campsite.lat,
                'lng': campsite.lng,
                'name': campsite.name,
            }
            output['campsites'].append(campsite_details)

        return output
    
    @property
    def campsite_detail(self):
        return {
            'id': self.body.id,
            'powerwater': self.body.powerwater,
            'access': self.body.access,
            'max_camper_length': self.body.max_camper_length,
            'availability': self.body.availability,
            'cost_per_night': self.body.cost_per_night,
            'image_url': self.body.image_url,
            'description': self.body.description,
            'lat': self.body.lat,
            'lng': self.body.lng,
            'name': self.body.name
        }

class ReservationSerializer(object):
    def __init__(self, body):
        self.body = body
    
    @property
    def all_reservations(self):
        output = {'reservations': []}

        for reservation in self.body:
            reservation_details = {
                'id': reservation.id,
                'campsite': reservation.campsite.pk,
                'status': reservation.status,
                'start_date': reservation.start_date,
                'end_date': reservation.end_date,
                'date_range': reservation.date_range,
                'cost_total': reservation.cost_total,
                'first_name': reservation.first_name,
                'last_name': reservation.last_name,
                'street_address': reservation.street_address,
                'city': reservation.city,
                'state': reservation.state,
                'zipcode': reservation.zipcode,
                'email': reservation.email,
            }
            output['reservations'].append(reservation_details)

        return output
    
    @property
    def reservation_detail(self):
        return {
            'id': self.body.id,
            'campsite': self.body.campsite.pk,
            'status': self.body.status,
            'start_date': self.body.start_date,
            'end_date': self.body.end_date,
            'date_range': self.body.date_range,
            'cost_total': self.body.cost_total,
            'first_name': self.body.first_name,
            'last_name': self.body.last_name,
            'street_address': self.body.street_address,
            'city': self.body.city,
            'state': self.body.state,
            'zipcode': self.body.zipcode,
            'email': self.body.email,
        }