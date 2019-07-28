yarn run build

Push-Location build/

echo 'pingme.riftkit.net' > CNAME

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/duiker101/pingme-react.git master:gh-pages

Pop-Location
