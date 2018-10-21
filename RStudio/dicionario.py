def levenshtein(s1, s2):
    if len(s1) < len(s2):
        return levenshtein(s2, s1)

    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)

    for i, c1 in enumerate(s1):

        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))

        previous_row = current_row

    return previous_row[-1]


# for exter, source in enumerate(dictionary):
#
#     print(exter)
#
#     for inter, test in enumerate(dictionary):
#
#         if exter == inter:
#
#             continue
#
#         elif levenshtein(source, test) < 2:
#
#             dictionary.pop(inter)
#
#     print(len(dictionary))

# with open("dictionary.csv", "w", newline='') as file:
#     fieldnames = ["ingredientes"]
#     dataset = csv.DictWriter(file, fieldnames=fieldnames)
#
#     dataset.writeheader()
#
#     for data in dictionary:
#         dataset.writerow({"ingredientes": data})


class ClearData:

    # def read_data(self):
    #
    #     ingredient_list = list()
    #
    #     with open("data.csv", "r") as data:
    #
    #         for result in data:
    #
    #             if len(result) < 25:
    #
    #                 if result not in ingredient_list:
    #                     print(result)
    #                     ingredient_list.append(result)
    #
    #         frequency = list()
    #
    #         for item in ingredient_list:
    #
    #             count = 0
    #
    #             for result in data:
    #
    #                 if item == result:
    #
    #                     count += 1
    #
    #             frequency.append({"name": item, "count": count})
    #
    #         for word in frequency:
    #
    #             if word["count"] > 50:
    #                 print(word)

    with open("data.csv", "r") as data:

        with open("dictionary.csv", "r") as file:

            for item in file:

                count = 0

                for dataset in data:

                    if item == dataset:

                        count += 1

                print(count)


if __name__ == '__main__':
    cleaner = ClearData()

    cleaner.read_data()
