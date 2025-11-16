from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/context')
def context():
    return render_template('context.html')

@app.route('/character-sheet')
def character_sheet():
    return render_template('character_sheet.html')

if __name__ == '__main__':
    app.run(debug=True)
