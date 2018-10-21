import pymongo
import csv

connection = pymongo.MongoClient("localhost:27017")
db = connection["AcaFoodBackUp"]
collection = db["receitas"]

with open("receitas.csv", "w", newline='') as file:

    fieldnames = ["ingredientes"]
    dados = csv.DictWriter(file, fieldnames=fieldnames)

    dados.writeheader()

    for receitas in collection.find({}):

        for lista in receitas["ingredientes"]:

            for ingredientes in lista["sub_lista"]:

                dados.writerow({"ingredientes": ingredientes})