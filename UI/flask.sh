npm run build
cd built
rm -r ../../templates
rm -r  ../../static
mkdir -p ../../templates
mkdir -p ../../static
mv *.html ../../templates
mv * ../../static 