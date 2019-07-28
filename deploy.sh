#!/usr/bin/env sh

 abort on errors
set -e

# build
#npm run build
vue-cli-service build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'pingme.riftkit.net' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/duiker101/pingme-react.git master:gh-pages

cd -
