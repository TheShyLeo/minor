#!/bin/sh
set -e
CD=$(pwd)
BASE=$(cd `dirname $0`/.. &&pwd)

if [ $# = 0 ] ; then  #params needed
        echo 'usage:sh deploy.sh app'
        exit
fi
APP=$1
PROJ=
OP=update
VER=1

OPTIND=2
while getopts "d:v:f" arg
do
    case $arg in
        d)
            PROJ=$OPTARG;;
        v)
            VER=$OPTARG;;
        f)
        	OP=install;;
    esac
done

cd $PROJ
sh build.sh -v ${VER}

sh ${BASE}/bin/vpm.sh $OP -d ${PWD}/output/*.tar.gz -a $APP
cd ${BASE}/bin

start_node_count=`pm2 ls | grep online | grep www | wc -l`

if [ "$start_node_count" -eq 0 ];then
        pm2 start www
else
        pm2 reload www
fi

cd $CD