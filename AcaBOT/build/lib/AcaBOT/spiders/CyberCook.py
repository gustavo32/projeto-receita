# -*- coding: utf-8 -*-
import scrapy
from AcaBOT.items import AcabotItem


class CybercookSpider(scrapy.Spider):
    name = 'CyberCook'

    allowed_domains = ['cybercook.uol.com.br']
    start_urls = ['https://cybercook.uol.com.br/receitas']
    #start_urls = ['https://cybercook.uol.com.br/lasanha-de-frango-r-5-14002.html']

    def parse(self, response):

        for url in response.css('div > section > div > div > h3 > a::attr(href)').extract():
            url = response.urljoin(url)
            yield scrapy.Request(url=url, callback=self.parse_details)

        next_page = response.css(
            'ul.font-serif.pagination.grid-sm-12.grid-lg-13 > li:nth-child(6) > a::attr(href)').extract_first()

        if next_page:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(url=next_page, callback=self.parse)

    def parse_details(self, response):

        data = AcabotItem()

        data['modo_de_preparo']     = response.css('ol > li > div::text').extract()
        data['ingredientes']        = response.css('ul[class*="ingredient-list"] > li > label::text').extract()
        data['image_urls']          = response.css('div > div > div > div > img.photo::attr(src)').extract()
        data['porcoes']             = response.css('p.font-serif.pb20::text').extract()[2]
        data['tempo_de_preparo']    = response.css('p.font-serif.pb20::text').extract()[1]
        data['autor']               = response.css('p.font-serif.pb20::text').extract()[0]
        data['titulo']              = response.css('h1::text').extract_first()

        yield data
