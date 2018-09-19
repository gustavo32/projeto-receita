# -*- coding: utf-8 -*-

import pymongo
from scrapy.conf import settings


class MongoDBPipeline(object):

    def __init__(self):
        connection = pymongo.MongoClient(settings['MONGODB_URL'])
        db = connection[settings['MONGODB_DB']]
        self.collection = db[settings['MONGODB_COLLECTION']]

    def process_item(self, item, spider):

        self.collection.insert(dict(item))

        return item
