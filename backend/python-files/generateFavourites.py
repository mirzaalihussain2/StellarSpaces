import json
import random

favourites = []

for i in range(1000):
    user_id = random.randint(1, 10)
    listing_id = random.randint(1139, 2138)

    favourite = {
        'userId': user_id,
        'listingId': listing_id
    }

    favourites.append(favourite)

with open('mock-favourites.json', 'w') as f:
    json.dump(favourites, f)
