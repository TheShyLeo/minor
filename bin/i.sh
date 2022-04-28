#!/bin/bash
action=$1
root=$(cd `dirname $0`/.. &&pwd)
repo='/tmp'
url='_'
pkg='_'
app='_'
ret=
disable_recover_cfg=0

#########################################
OPTIND=2

root=`cd $root;pwd`

#params pkg_path
fn_install_pkg(){
    if [ ! -f $1 ];then
        echo "$1 does not exist!"
        exit
    fi
    fn_backup_cfg
    tar -zxf $1 -C $root
    fn_recover_cfg
}

#保证在同级目录下 保证是-v 0打包
fn_i(){
    name=../../$action/output/$action-0.0.1.0.tar.gz
    fn_install_pkg $name
}

fn_backup_cfg(){
    if [ -d $root/apps/$app ];then
        rm -rf $repo/backup/vpm/$app
        mkdir -p $repo/backup/vpm/$app/conf/apps/$app
        find $root/conf/apps/$app -type f ! -name "version" | xargs -I {} cp -rf {} $repo/backup/vpm/$app/conf/apps/$app
        tmp=`find $root/conf/up -name $app.js | wc -l`
        if [ "$tmp" -gt 0 ];then
             find $root/conf/up -name $app.js | awk -F '/' '{print "'$repo'/backup/vpm/'$app'/conf/up/"$(NF-1)}' |xargs mkdir -p
             find $root/conf/up -name $app.js | awk -F '/' '{print $(NF-1)}' |xargs -I {} cp $root/conf/up/{}/$app.js $repo/backup/vpm/$app/conf/up/{}/
        fi
    fi
}

fn_recover_cfg(){
    if [ $disable_recover_cfg = 1 ];then
        return 1
    fi
    cfg_backup_path=$repo/backup/vpm/$app
    if [ -d $cfg_backup_path ];then
        cp -rf $cfg_backup_path/* $root
        rm -rf $cfg_backup_path
    fi
}

fn_i
echo done