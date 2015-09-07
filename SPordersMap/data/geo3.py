#!/usr/local/bin/python
# -- coding: utf-8 --

import csv
import json
import urllib.parse, urllib.request

geocode_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='
data_points = []

with open('data.csv', newline='') as csvfile:
    data = csv.reader(csvfile, delimiter=",")
    for row in data:
        address = urllib.parse.quote_plus(row[6]) # encode address
        response = urllib.request.urlopen(geocode_url +  address) # fetch data
        content = bytes.decode(response.read()) # read content
        data = json.loads(content) # convert to JSON
        if data['status'] == 'OK':
            coordinates = data['results'][0]['geometry']['location']
            data_points.append({
                'Item': row[0],
                'Vendor': row[1],
                'Year': row[2],
                'Quantity': row[3],
                'Country': row[4],
                'City': row[5],
                'Address': row[6],
                'Lat':coordinates['lat'],
                'Lon': coordinates['lng']
            })
with open('locations.json', 'w') as outfile:
    json.dump(data_points, outfile)
