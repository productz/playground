cd ./react/
./node_modules/.bin/webpack --env.production
cd ..
cp -a ./react/dist ../
cp ./react/index.html ../
