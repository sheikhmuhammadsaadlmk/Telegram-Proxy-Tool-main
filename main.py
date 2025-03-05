from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default-secret-key")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/assets/<path:filename>')
def serve_asset(filename):
    return send_from_directory('assets', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
