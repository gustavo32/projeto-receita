# -*- coding: utf-8 -*-
import scrapy
import re
from AcaBOT.items import AcabotItem


class SopasSpider(scrapy.Spider):
    name = 'sopasBOT'

    allowed_domains = ['cybercook.uol.com.br']                  #Definindo o domínio de busca
    start_urls = ['https://cybercook.uol.com.br/receitas/sopas']

    def parse(self, response):                                  #Função inicial de scrapping

        for url in response.css('main > div > section > div > div > h3 > a::attr(href)').extract(): #Seletor CSS para pegar os links das receitas (40 por página)
            url = response.urljoin(url)                                                             #Mostrando qual URL está sendo acessada pelo BOT
            yield scrapy.Request(url=url, callback=self.parse_details)                              #Chamando função para coletar dados da URL da receita

        next_page = response.css(  # Coletando o link para a próxima página de receitas
            'ul.font-serif.pagination.grid-sm-12.grid-lg-13 > li:nth-child(6) > a::attr(href)').extract_first()

        if next_page:                                                 #Se existir uma próxima página, então:

            next_page = response.urljoin(next_page)                   #Adiciona o domínio (allowed_domains) ao link para que possámos acessá-lo
            yield scrapy.Request(url=next_page, callback=self.parse)  #Aqui é feito um laço para o BOT percorrer página à página uma categoria de prato

    def parse_details(self, response):                         #Essa é a função feita específicamente para coletar dados das páginas contendo as receitas

        find_autor = re.compile("Por: (.*)\s")                 #Expressão regular usada para encontrar o autor da receita
        find_tempo = re.compile("Tempo de preparo: (.*)\s")    #Expressão regular usada para encontrar o tempo de preparo de uma receita
        find_rendi = re.compile("Rendimento: (\d+).*")         #Expressão regular usada para encontrar o rendimento (quantas porções) de uma receita
        find_ingre = re.compile(">\n\s*(.*?)\s*</label>")      #Expressão regular usada para encontrar os ingredientes de uma receita
        find_comof = re.compile(">\n\s*(.*?)\r?\n\t\t\t\s+<")  #Expressão regular usada para encontrar o modo de fazer de uma receita
        find_tags  = re.compile("<(.*?)>")                     #Expressão regular usada para encontrar tags HTML poluindo os dados coletados
        find_quant = re.compile('.*\((\d+)\)')                 #Expressão regular usada para encontrar a quantidade total de ingredientes da receita
        find_image = re.compile('data-src=\"(.*?)\"')          #Expressão regular usada para encontrar as URLs das imagens da receita

        data = AcabotItem()                                    #Aqui é definido um extrutura de dados para coletar os dados da página

        data['titulo'] = response.css('h1::text').extract_first()                   #Aqui é feito a coleta do título do receita
        data['categoria'] = "sopas"                                                 #Aqui é atribuido a qual categoria esse receita pertence
        data['quantidade_ingre'] = int(re.findall(find_quant, response.css(         #Aqui é capturada a quantidade de ingredientes da receita
            "h2[class=\"green txt-large font-serif txt-bold mb25 mt25\"]::text").extract_first())[0])
        data['likes_mensais']   = 0                                                 #Os likes mensais são configurados como '0' inicialmente
        data['likes_total']     = 0                                                 #Assim como os totais

        array_de_images_url = list()

        for busca in response.css('div.swiper-wrapper > div').extract():        #
            if re.search(find_image, busca):                                    #
                array_de_images_url.append(re.findall(find_image, busca)[0])    # A expressão regular 'find_image' captura a URL do texto contido em 'busca'
                                                                                #
        data['image_urls'] = array_de_images_url                                # Aqui são armazenadas as URLs das imagens da receita

        array_de_ingredientes = list()     # Criação de um dicionário auxiliar para coletar os ingredientes, pois estes podem conter subtópicos (tags h3)

        for h2 in response.css('h2 + ul').extract():              #
            geral_ingredientes = re.findall(find_ingre, h2)       #
            count = 0                                             #
            for item in geral_ingredientes:                       #
                                                                  #
                if re.search(find_tags, item):                    #
                                                                  #
                    for tag in re.findall(find_tags, item):       #
                        tag = "<" + tag + ">"                     #
                        item = item.replace(tag, "")              #
                                                                  #
                    geral_ingredientes[count] = item              #
                                                                  #
                count += 1                                        #
                                                                  #
            array_de_ingredientes.append(dict(nome="geral", sub_lista=geral_ingredientes))           #

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

            array_de_ingredientes.append(dict(nome=sub_item, sub_lista=sub_ingredientes))
            index += 1

        data['ingredientes'] = array_de_ingredientes

        array_modo_de_preparo = list()

        for h2 in response.css('h2 + ol').extract():
            geral_ingredientes = re.findall(find_comof, h2)
            count = 0

            for item in geral_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    geral_ingredientes[count] = item

                count += 1

            array_modo_de_preparo.append(dict(nome="geral", sub_lista=geral_ingredientes))

        for h3 in response.css('h3 + ol').extract():
            sub_item = response.css('div[class*="printable"] > h3::text').extract()[index]
            sub_ingredientes = re.findall(find_comof, h3)

            count = 0
            for item in sub_ingredientes:

                if re.search(find_tags, item):

                    for tag in re.findall(find_tags, item):
                        tag = "<" + tag + ">"
                        item = item.replace(tag, "")

                    sub_ingredientes[count] = item

                count += 1

            array_modo_de_preparo.append(dict(nome=sub_item, sub_lista=sub_ingredientes))
            index += 1

        data['modo_de_preparo'] = array_modo_de_preparo

        ptag = response.css('p.font-serif.pb20::text').extract()

        for p in ptag:
            if re.search("Por:", p):
                data['autor'] = re.findall(find_autor, p)[0]
            elif re.search("Tempo de preparo:", p):
                data['tempo_de_preparo'] = re.findall(find_tempo, p)[0]
            elif re.search("Rendimento:", p):
                data['porcoes'] = int(re.findall(find_rendi, p)[0])

        yield data