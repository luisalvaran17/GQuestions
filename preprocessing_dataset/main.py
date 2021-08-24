import csv
import json
import re

def load_csv():
    texts_list = []
    with open('Data_WoS.csv', newline='') as f:
        reader = csv.reader(f, delimiter=';')
        for row in reader:
            texts_list.append(row)
    return texts_list

def split_text(texts_list):
    dict_texts = {}
    count = 0
    new_text = ""
    sentences = []
    break_for = 5050

    for text in texts_list:
        text_split = text[1].split(' ', 10)
        for i in range(len(text_split)-1):
            new_text = new_text + ' ' + text_split[i]

        new_text = clean_sentence(new_text)
        sentences.append(new_text)
        dict_texts[count] = {"area": text[0].strip(), "text": new_text.strip()}
        count = count + 1
        new_text = ""

        if count == break_for:
            break

    return dict_texts

def clean_sentence(text):
    first_character = text[1]

    if first_character == "\"" or first_character.isnumeric():
        return ' '
    else:
        return text

def select_sentences(sentences):
    elements_to_pop = []
    new_dict_final = {}
    count = 0

    for i in range(len(sentences)):
        if sentences[i].get('text') == '':
            elements_to_pop.append(i)

    for element_to_pop in elements_to_pop:
        sentences.pop(element_to_pop)

    for i in range(30, len(sentences)):
        new_dict_final[count] = sentences[i]
        count = count + 1

    return new_dict_final

def get_areas(sentences):
    list_areas = []
    list_dict_areas = []
    for area in sentences.values():
        if area.get('area') not in list_areas:
            list_areas.append(area.get('area'))

    for area in list_areas:
        list_dict_areas.append({'area': area})

    for area in list_dict_areas:
        print(area)
        print(',')

def main():
    texts_csv = load_csv()
    sentences = split_text(texts_csv)
    sentences = select_sentences(sentences)

    get_areas(sentences)
    a_file = open("data.json", "w")
    json.dump(sentences, a_file)

main()