VERSION=$(cat package.json | jq -r '.version')

docker build . -t makxca/makxca-site:react-vite$VERSION --platform linux/amd64
docker push makxca/makxca-site:react-vite$VERSION
