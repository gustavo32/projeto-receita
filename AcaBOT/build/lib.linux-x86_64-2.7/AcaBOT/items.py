# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class AcabotItem(scrapy.Item):

    autor               = scrapy.Field()
    categoria           = scrapy.Field()
    tempo_de_preparo    = scrapy.Field()
    porcoes             = scrapy.Field()
    titulo              = scrapy.Field()
    image_urls          = scrapy.Field()
    ingredientes        = scrapy.Field()
    quantidade_ingre    = scrapy.Field()
    modo_de_preparo     = scrapy.Field()
    likes_mensais       = scrapy.Field()
    likes_total         = scrapy.Field()
