install:
	virtualenv env
	source env/bin/activate
	pip3 install -r requirements.txt

dev-global:
	pnpm run -w dev
dev-global-stop:
	lsof -i :3010 | grep -oE "node *\d+" | grep -oE "\d+" | xargs kill -9
dev:
	python3 app.py

preview:
	waitress-serve --host 127.0.0.1 --port=3000 app:app

docker:
	./ci/dockerpush.sh
release:
	./ci/release.sh
