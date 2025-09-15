from flask import Flask, render_template, Response, redirect
from modules.public_service import PublicService
import requests
import os
from dotenv import load_dotenv

load_dotenv()

publicService = PublicService(os.environ.get("PUBLIC_URL", "localhost:3010"))
app = Flask(__name__, static_url_path='/flask/static')

@app.route('/flask')
def flaskRedirect():
    return redirect('/flask/en', 301)

@app.route('/flask/<string:lang>')
@app.route('/flask/<string:lang>/about')
def index(lang: str):
    translations = publicService.getPublicFile('/labels/' + lang + '.json')
    if (translations is None):
        return redirect('/flask/en')
    return render_template('main.html', translations=translations)

# proxy for public in localdev
@app.route('/flask/public/<path:path>')
@app.route('/public/<path:path>')
def public(path: str):
    target = 'http://localhost:3010/' + path

    response = requests.request(
        'GET',
        target,
        stream=True
    )

    return Response(
        response.content,
        status=response.status_code,
        content_type=response.headers['content-type']
    )

# not-found page
@app.errorhandler(404)
def page_not_found(e: str):
    return render_template('404.html'), 404

if __name__ == "__main__":
    app.run(debug=True)
