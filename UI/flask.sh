npm run build
cd built
mkdir -p ../../templates
mkdir -p ../../static

mv *.html ../../templates
mv * ../../static 