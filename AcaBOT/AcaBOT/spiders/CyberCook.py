# -*- coding: utf-8 -*-
import scrapy
import re
from AcaBOT.items import AcabotItem


class CybercookSpider(scrapy.Spider):
    name = 'CyberCook'

    allowed_domains = ['cybercook.uol.com.br']
    complement = ['saladas', 'massas', 'bebidas', 'lanches', 'legumes', 'peixes-e-frutos-do-mar',
                  'molhos', 'paes', 'carne', 'doces', 'sopas', 'aperitivos-e-antepastos', 'aves',
                  'risotos', 'bolos', 'acompalhamentos']
    index = 0
    pattern_url = 'https://cybercook.uol.com.br/receitas/{}'
    start_urls = [pattern_url.format(complement[index])]

    # start_urls = ['https://cybercook.uol.com.br/como-fazer-bolo-de-cenoura-r-12-1481.html']

    def parse(self, response):

        for url in response.css('div > section > div > div > h3 > a::attr(href)').extract():
            url = response.urljoin(url)
            yield scrapy.Request(url=url, callback=self.parse_details)

        next_page = response.css(
            'ul.font-serif.pagination.grid-sm-12.grid-lg-13 > li:nth-child(6) > a::attr(href)').extract_first()

        if next_page:
            next_page = response.urljoin(next_page)
            print(response.url)
            yield scrapy.Request(url=next_page, callback=self.parse)
        else:
            self.index += 1
            yield scrapy.Request(url=self.pattern_url.format(self.complement[self.index]), callback=self.parse)

    def parse_details(self, response):

        find_autor = re.compile("Por: (.*)")
        find_tempo = re.compile("Tempo de preparo: (.*)")
        find_rendi = re.compile("Rendimento: (.*)")
        find_ingre = re.compile(">\n\s*(.*?)\s*</label>")
        find_comof = re.compile(">\n\s*(.*?)\.\s+<")
        find_tags = re.compile("<(.*?)>")

        data = AcabotItem()

        #data['image_urls']          = response.css('div > div > div > div > img.photo::attr(src)').extract()
        data['titulo'] = response.css('h1::text').extract_first()
        data['categoria'] = self.complement[self.index].replace("-", " ")

        dic_ingred = dict()

        for h2 in response.css('h2 + ul').extract():
            geral_item = 'Geral'
            geral_ingredientes = re.findall(find_ingre, h2)
            count = 0
            for item in geral_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    geral_ingredientes[count] = item

                count += 1

            dic_ingred[geral_item] = geral_ingredientes

        index = 0

        for h3 in response.css('h3 + ul').extract():
            sub_item = response.css('div[class*="printable"] > h3::text').extract()[index]
            sub_ingredientes = re.findall(find_ingre, h3)

            count = 0
            for item in sub_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    sub_ingredientes[count] = item

                count += 1

            dic_ingred[sub_item] = sub_ingredientes
            index += 1

        data['ingredientes'] = dic_ingred

        dic_comof = dict()

        for h2 in response.css('h2 + ol').extract():
            geral_item = 'Geral'
            geral_ingredientes = re.findall(find_comof, h2)
            geral_ingredientes = geral_ingredientes[1::2]
            count = 0

            for item in geral_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    geral_ingredientes[count] = item

                count += 1

            dic_comof[geral_item] = geral_ingredientes

        for h3 in response.css('h3 + ol').extract():
            sub_item = response.css('div[class*="printable"] > h3::text').extract()[index]
            sub_ingredientes = re.findall(find_comof, h3)
            sub_ingredientes = sub_ingredientes[1::2]

            count = 0
            for item in sub_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    sub_ingredientes[count] = item

                count += 1

            dic_comof[sub_item] = sub_ingredientes
            index += 1

        data['modo_de_preparo'] = dic_comof

        ptag = response.css('p.font-serif.pb20::text').extract()

        for p in ptag:
            if re.search("Por:", p):
                data['autor'] = re.findall(find_autor, p)[0]
            elif re.search("Tempo de preparo:", p):
                data['tempo_de_preparo'] = re.findall(find_tempo, p)[0]
            elif re.search("Rendimento:", p):
                data['porcoes'] = re.findall(find_rendi, p)[0]

        yield data
