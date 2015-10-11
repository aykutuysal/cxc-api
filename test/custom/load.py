#!/usr/bin/env python

import sys
from random import random
from math import sin, cos, pi
import json
import requests
from threading import Thread
import time


SERVER = 'http://162.243.116.19:3000/api'
ELASTIC_SERVER = 'http://162.243.104.114:9200/'

users = {
    '52960677ebed17df4800000f': [],
    '5296069cebed17df48000010': [],
    '529606b7ebed17df48000011': [],
    '529606cbebed17df48000012': []}

stopped = False

class Pop:
    def __init__(self):
        self.sum = 0
        self.count = 0

    def add(self, num):
        self.sum += num
        self.count += 1

    def mean(self):
        return self.sum / self.count


def doCheckIn():
    global users
    try:
        while not stopped:
            for key in users.keys():
                if len(users[key]) < 20:
                    print 'Checking in', key
                    users[key].append(checkIn(key))
    except:
        return

def doCheckOut():
    global users
    try:
        while not stopped:
            for key in users.keys():
                if len(users[key]) > 15:
                    print 'Checking out', key
                    indexId = users[key].pop()
                    finishCheckIn(key, indexId)
    except:
        return

def doQuery():
    pop = Pop()
    try:
        i = 0
        while not stopped:
            i += 1
            lat, lon = randomLocation(0, 0, 1 / 100.0)
            print 'Querying', lat, lon
            start = time.clock()
            getUsersNearby(lat, lon)
            pop.add(time.clock() - start)
            if i % 100 == 0:
                print 'Average query time', pop.mean()
    except:
        return

def randomLocation(centerLat, centerLon, radius):
    r = random() * radius
    t = random() * pi * 2
    return centerLat + r * sin(t), centerLon + r * cos(t)

def checkIn(userId):
    lat, lon = randomLocation(0, 0, 0)
    payload = {'location': [lat, lon]}
    headers = {'content-type': 'application/json'}
    r = requests.post('%s/users/%s/checkIns' % (SERVER, userId),
            data=json.dumps(payload),
            headers=headers)
    j = r.json()
    return j['data']['indexId']

def finishCheckIn(userId, indexId):
    r = requests.post('%s/users/%s/checkIns/%s/finish' % (SERVER, userId, indexId))
    return r.json()['data']

def getUsersNearby(lat, lon):
    payload = {'location': [lat, lon]}
    headers = {'content-type': 'application/json'}
    r = requests.post('%s/locations/usersNearby' % (SERVER), 
            data=json.dumps(payload),
            headers=headers)
    j = r.json()
    if not j['success']:
        return None
    return j['data']['users']

def deleteIndex():
    requests.delete('%s/checkins/checkin/_query?q=*' % ELASTIC_SERVER)

try:
    deleteIndex()
    checkInThread = Thread(target = doCheckIn)
    checkInThread.start()

    checkOutThread = Thread(target = doCheckOut)
    checkOutThread.start()

    queryThread = Thread(target = doQuery)
    queryThread.start()

    while True:
        pass

except KeyboardInterrupt:
    stopped = True
    checkInThread.join()
    checkOutThread.join()
    queryThread.join()


