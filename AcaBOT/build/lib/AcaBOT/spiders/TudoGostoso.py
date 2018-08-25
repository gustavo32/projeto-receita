# -*- coding: utf-8 -*-
import scrapy


class Receita(scrapy.Item):
    titulo = scrapy.Field()
    ingredientes = scrapy.Field()
    modoDePreparo = scrapy.Field()


class TudogostosoSpider(scrapy.Spider):
    name = 'TudoGostoso'

    allowed_domains = ['www.tudogostoso.com.br']
    start_urls = ['https://www.tudogostoso.com.br/categorias/bolos-e-tortas-doces/receitas-populares']

    def parse(self, response):

        print(response.url)

        for url in response.css('div.box.box-big > a::attr(href)').extract():
            url = response.urljoin(url)
            print(url)
            yield scrapy.Request(url=url, callback=self.parse_details)

        next_page = response.css('a.next::attr(href)').extract_first()

        if next_page:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(url=next_page, callback=self.parse)

    def parse_details(self, response):

        data = Receita()

        data['titulo'] = response.css('div.recipe-title > h1::text').extract_first()
        data['ingredientes'] = response.css('span.p-ingredient::text').extract()
        data['modoDePreparo'] = response.css('ol > li > span::text').extract()

        yield data
