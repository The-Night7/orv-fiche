from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import json
import os

app = Flask(__name__)
app.secret_key = 'lecteur_omniscient_secret_key'

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
        # Traitement du formulaire de création de personnage
        # À implémenter selon les besoins
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