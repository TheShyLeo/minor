#!/bin/sh
set -e

VER='0.0.1'
APP_NAME="base"

if [ $# != 2 ] ; then
    echo 'usage:sh sh build.sh -v x'
    exit
fi
while getopts "v:V:" arg
do
    case $arg in
        v)
            VER=$VER'.'$OPTARG;;
        *)
            echo 'usage:sh build.sh -v x'
            exit;;
    esac
done

npm install --build-from-source

rm -rf output
mkdir -p output/$APP_NAME
echo $VER>conf/version

cp -rf apps node_modules bin conf library routes app.js output/$APP_NAME
rm -rf node_modules

cd output

tar zcf $APP_NAME-$VER.tar.gz $APP_NAME
rm -rf $APP_NAME
echo 'done'
