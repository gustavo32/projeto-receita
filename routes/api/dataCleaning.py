import re
import string
import sys

stopwords = list()

with open("routes/api/stopwords.txt", "r", encoding="utf8") as file1:
    for item in file1:
        stopwords.append(item.replace("\n", ""))

listaTemperos = list()

with open("routes/api/ListaTemperos.txt", "r", encoding="utf8") as file1:
    for item in file1:
        listaTemperos.append(item.replace("\n", ""))

table = str.maketrans(".,;:?!()-_[]*/“”\"‘’•¿º´«ª©¹²", 28 * " ")

ingre_limpos = list()


parameter = sys.argv[1].split(",")

# parameter = ["creme de leite", "açucar"]

for item in parameter:
    item = item.translate(table)
    item = re.sub(r'\d+', '', item)
    item = str.lower(item)
    item = str.strip(item)
    querywords = item.split()
    resultwords = [word for word in querywords if word.lower()
                   not in stopwords]
    result = ' '.join(resultwords)
    if result != "":
        ingre_limpos.append(result)

ingre_limpos = ','.join(ingre_limpos)

print(ingre_limpos)
sys.stdout.flush()
