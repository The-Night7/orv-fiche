from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'lecteur_omniscient_secret_key'

# Chemin vers le fichier JSON de stockage
CHARACTER_DATA_FILE = 'static/data/character_sheet.json'

# Fonction pour charger les données existantes
def load_character_data():
    if os.path.exists(CHARACTER_DATA_FILE):
        try:
            with open(CHARACTER_DATA_FILE, 'r', encoding='utf-8') as file:
                return json.load(file)
        except json.JSONDecodeError:
            # Si le fichier est vide ou mal formaté, retourner une liste vide
            return []
    else:
        # Créer le répertoire si nécessaire
        os.makedirs(os.path.dirname(CHARACTER_DATA_FILE), exist_ok=True)
        return []

# Fonction pour sauvegarder les données
def save_character_data(data):
    characters = load_character_data()
    characters.append(data)
    with open(CHARACTER_DATA_FILE, 'w', encoding='utf-8') as file:
        json.dump(characters, file, ensure_ascii=False, indent=4)

# Routes principales
@app.route('/')
def index():
    return render_template('main.html')

@app.route('/rules')
def rules():
    return render_template('rules.html')

@app.route('/context')
def context():
    return render_template('context.html')

@app.route('/constellations')
def constellations():
    return render_template('constellations.html')

@app.route('/monsters')
def monsters():
    return render_template('monsters.html')

@app.route('/equipment')
def equipment():
    return render_template('equipment.html')

@app.route('/skills')
def skills():
    return render_template('skills.html')

@app.route('/scenarios')
def scenarios():
    return render_template('scenarios.html')

@app.route('/character_sheet', methods=['GET', 'POST'])
def character_sheet():
    if request.method == 'POST':
        # Récupérer les données du formulaire
        character_data = {
            'name': request.form.get('character-name', ''),
            'firstname': request.form.get('character-firstname', ''),
            'age': request.form.get('character-age', ''),
            'birthday': request.form.get('character-birthday', ''),
            'gender': request.form.get('character-gender', ''),
            'orientation': request.form.get('character-orientation', ''),
            'traits': [
                request.form.get('character-trait1', ''),
                request.form.get('character-trait2', ''),
                request.form.get('character-trait3', ''),
                request.form.get('character-trait4', ''),
                request.form.get('character-trait5', '')
            ],
            'tastes': request.form.get('character-tastes', ''),
            'passions': request.form.get('character-passions', ''),
            'physical_description': request.form.get('physical-description', ''),
            'distinctive_signs': request.form.get('distinctive-signs', ''),
            'general_skills': {
                'vitality': request.form.get('vitality', '1'),
                'physical_strength': request.form.get('physical-strength', '1'),
                'agility': request.form.get('agility', '1'),
                'magical_strength': request.form.get('magical-strength', '1')
            },
            'special_skills': [],
            'characteristics': [],
            'constellation': request.form.get('constellation-name', ''),
            'constellation_rank': request.form.get('constellation-rank', ''),
            'constellation_marks': [],
            'history': request.form.get('character-history', ''),
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        # Récupérer les compétences spéciales
        special_skill_names = request.form.getlist('special-skill-name[]')
        special_skill_levels = request.form.getlist('special-skill-level[]')
        for i in range(len(special_skill_names)):
            if i < len(special_skill_levels) and special_skill_names[i].strip():
                character_data['special_skills'].append({
                    'name': special_skill_names[i],
                    'level': special_skill_levels[i]
                })
        
        # Récupérer les caractéristiques
        characteristic_names = request.form.getlist('characteristic-name[]')
        characteristic_rarities = request.form.getlist('characteristic-rarity[]')
        for i in range(len(characteristic_names)):
            if i < len(characteristic_rarities) and characteristic_names[i].strip():
                character_data['characteristics'].append({
                    'name': characteristic_names[i],
                    'rarity': characteristic_rarities[i]
                })
        
        # Récupérer les marques de constellation
        constellation_marks = request.form.getlist('constellation-mark[]')
        for mark in constellation_marks:
            if mark.strip():
                character_data['constellation_marks'].append(mark)
        
        # Sauvegarder les données
        save_character_data(character_data)
        
        flash('Votre fiche de personnage a été créée avec succès !', 'success')
        return redirect(url_for('character_sheet'))
    
    return render_template('character_sheet.html')

@app.route('/timeline')
def timeline():
    return render_template('timeline.html')

@app.route('/stations')
def stations():
    return render_template('stations.html')

@app.route('/deaths')
def deaths():
    return render_template('deaths.html')

# API pour générer des fiches de personnage en JSON
@app.route('/api/generate_character', methods=['POST'])
def generate_character():
    character_data = request.get_json()
    # Traitement des données et génération de la fiche
    return jsonify(character_data)

if __name__ == '__main__':
    app.run(debug=True)