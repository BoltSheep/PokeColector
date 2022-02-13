import requests
from time import sleep

pokemons = []
baseString = 'INSERT INTO pokemons.pokemon (id, name, type1, type2, pictureUrl, description) VALUES'
response = requests.get('https://pokeapi.co/api/v2/pokemon').json()

while True:
    for p in response['results']:
        pokemon = requests.get(p['url']).json()
        id = pokemon['id']
        name = pokemon['species']['name']
        types = list(map(lambda t: t['type']['name'], pokemon['types']))
        if not types:
            print(f'{id} fodeu')
            break

        type1 = types[0]
        if len(types) == 2:
            type2 = f"'{types[1]}'"
        else:
            type2 = 'NULL'

        sprite = pokemon['sprites']['front_default']
        species = requests.get(pokemon['species']['url']).json()
        dexDescription = list(filter(lambda a: a['language']['name'] == 'en', species['flavor_text_entries']))[0]['flavor_text']
        dexDescription = dexDescription.replace("'", "\\'").replace("\n", " ").replace('\u000c', ' ')
        # dexDescription = next(filter(lambda a: a['language']['name'] == 'en', species['flavor_text_entries']))['flavor_text']
        print(f"{baseString}({id}, '{name}', '{type1}', {type2}, '{sprite}', '{dexDescription}');")

    if next := response['next']:
        sleep(5)
        response = requests.get(next).json()
    else:
        break
