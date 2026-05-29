from flask import Flask, render_template, Response, redirect, request
from flask_sqlalchemy import SQLAlchemy
from modules.public_service import PublicService
import requests
import os
from dotenv import load_dotenv
from markdown import markdown
from datetime import datetime

load_dotenv()

publicService = PublicService(os.environ.get("PUBLIC_URL", "localhost:3010"))
app = Flask(__name__, static_url_path='/flask/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask.db.sqlite'
db = SQLAlchemy(app)

class ClicksCounter(db.Model):
    ip = db.Column(db.String(100), primary_key=True)
    clicks = db.Column(db.Integer, nullable=False, default=0)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<ClicksCounter %r>' % self.ip + ' ' + str(self.clicks)

with app.app_context():
    db.create_all()

def markdownFilter(s: str):
    return markdown(s)

app.add_template_filter(markdownFilter, "markdown") 

@app.route('/flask/')
def flaskRedirect():
    return redirect('/flask/en', 301)

@app.route('/flask/<string:lang>')
@app.route('/flask/<string:lang>/')
def main(lang: str):
    translations = publicService.getPublicFile('/labels/' + lang + '.json')
    if (translations is None):
        return redirect('/flask/en')
    contents = publicService.getPublicFile('/contents.json')
    navigation = publicService.getPublicFile('/navigation.json')
    counter = ClicksCounter.query.filter_by(ip=request.remote_addr).first()
    return render_template('main.html', translations=translations, contents=contents, navigation=navigation, language=lang, counter=counter.clicks or 0)

@app.route('/flask/<string:lang>/about')
@app.route('/flask/<string:lang>/about/')
def about(lang: str):
    translations = publicService.getPublicFile('/labels/' + lang + '.json')
    if (translations is None):
        return redirect('/flask/en')
    contents = publicService.getPublicFile('/contents.json')
    navigation = publicService.getPublicFile('/navigation.json')
    return render_template('about.html', translations=translations, contents=contents, navigation=navigation, language=lang)

# increment counter for the user
@app.route('/flask/counter', methods=['POST'])
def incrementCounter():
    ip = request.remote_addr
    counter = ClicksCounter.query.filter_by(ip=ip).first()
    if counter is None:
        counter = ClicksCounter(ip=ip, clicks=0)
        db.session.add(counter)
    counter.clicks += 1
    db.session.commit()
    return {'count': counter.clicks}

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
