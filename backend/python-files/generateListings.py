import json
import random

latitudeUK = {
    'min': 50.10319,
    'max': 60.15456
}

longitudeUK = {
    'min': -7.64133,
    'max': 1.75159
}

property_types = [
    'studio flat',
    'bedsit',
    'detached',
    'semi-detached',
    'terrace',
    'bungalow',
    'end terrace',
    'flat',
    'penthouse',
    'maisonette',
    'mobile home',
    'house boat'
]

statuses = [
    'draft',
    'live',
    'dormant',
    'let agreed'
]

cities = [
    'London',
    'Manchester',
    'Birmingham',
    'Liverpool',
    'Leeds',
    'Newcastle',
    'Bristol',
    'Sheffield',
    'Glasgow',
    'Edinburgh'
]

counties = [
    'Greater London',
    'Greater Manchester',
    'West Midlands',
    'Merseyside',
    'West Yorkshire',
    'Tyne and Wear',
    'Bristol',
    'South Yorkshire',
    'Lanarkshire',
    'Midlothian'
]

listings = []

for i in range(1000):
    property_type = random.choice(property_types)
    price = random.randint(500, 10000)
    num_of_bedrooms = random.randint(1, 9)
    num_of_bathrooms = random.randint(1, 5)
    pets_allowed = random.choice([0, 1])
    has_garage = random.choice([0, 1])
    status = random.choice(statuses)
    featured = random.choice([True, False])
    address_house_num = random.randint(1, 999)
    address_street_name = f"{random.choice(['High', 'Main', 'Station', 'Park', 'Oak'])} {random.choice(['Street', 'Road', 'Avenue'])}"
    address_post_code = f"{random.choice(['AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH', 'BL', 'BN', 'BR'])}{random.randint(1, 99)} {random.randint(1, 9)}{random.choice(['AB', 'BA', 'CD', 'DE', 'EF', 'FG', 'GH', 'HI', 'IJ', 'JK'])}"
    address_city = random.choice(cities)
    address_county = random.choice(counties)
    title = f"{num_of_bedrooms}-bedroom {property_type}"
    description = f"{property_type} with {num_of_bedrooms} bedrooms and {num_of_bathrooms} bathrooms"
    address_longitude = round((random.random() * (longitudeUK['max'] - longitudeUK['min'])) + longitudeUK['min'], 5)
    address_latitude = round((random.random() * (latitudeUK['max'] - latitudeUK['min'])) + latitudeUK['min'], 5)
    user_id = random.randint(1, 10)

    listing = {
        'title': title,
        'description': description,
        'propertyType': property_type,
        'price': price,
        'numOfBedrooms': num_of_bedrooms,
        'numOfBathrooms': num_of_bathrooms,
        'petsAllowed': pets_allowed,
        'hasGarage': has_garage,
        'status': status,
        'featured': featured,
        'addressHouseNum': address_house_num,
        'addressStreetName': address_street_name,
        'addressPostCode': address_post_code,
        'addressCity': address_city,
        'addressCounty': address_county,
        'addressLongitude': address_longitude,
        'addressLatitude': address_latitude,
        'userId': user_id
}
    listings.append(listing)
    with open('mock-listings.json', 'w') as f:
     json.dump(listings, f)
