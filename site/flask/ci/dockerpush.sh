VERSION=$(cat package.json | jq -r '.version')

docker build . -t makxca/makxca-site:flask$VERSION --platform linux/amd64
docker push makxca/makxca-site:flask$VERSION
docker image remove makxca/makxca-site:flask$VERSION
