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
while getopts "C:a:u:d:" arg
do
    case $arg in
        a)
            app=$OPTARG;;
        u)
            url=$OPTARG;;
        d)
            pkg=$OPTARG;;
        C)
            root=$OPTARG;;
    esac
done

if [ -z $root ] && [ "help" != "$1" ];then
    echo "please use -C to specify install path"
    exit
fi
root=`cd $root;pwd`

#########################################
fn_install(){
    if [ '_' = "$app" ];then
        echo "please use -a to specify install app name"
        exit
    fi

    if [ '_' = "$url" ] && [ '_' = "$pkg" ];then
        echo "please use -u or -d to specify install app url or app package local path"
        exit
    fi

    if [ '_' != "$url" ];then
        fn_download $url
        pkg=$ret
    fi
    fn_install_pkg $pkg
}

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

#params url
fn_download(){
    name=${1##*\/}
    name=${name%%\?*}
    if [ ! -f $repo/$name ];then
        wget -O $repo'/'$name $1
    fi
    ret=$repo'/'$name
}

#params:
fn_remove(){
    if [ '_' = "$app" ];then
        echo "please use -a to specify uninstall app"
        exit
    fi
    rm -rf $root/apps/$app
    rm -rf $root/conf/apps/$app
    rm -rf $root/conf/up/*/$app.*
}

fn_list(){
    v='-'
    if [ -f $root/conf/version ];then
	    v=`cat $root/conf/version`
    fi
    echo base:$v
    for app_name in `ls $root/apps`
    do
        version=$v
        if [ -f $root/conf/apps/$app_name/version ];then
	        version=`cat $root/conf/apps/$app_name/version`
        fi
        echo base_app_$app_name:$version
    done
}

fn_help(){
    echo -e "Usage: vpm <command> [option]\n"
    echo -e "where <command> is one of:"
    echo -e "\tinstall, remove, list, help\n"
    echo -e "vpm install \t install app use [-C,-a,-u|-d] option"
    echo -e "vpm remove \t remove app use [-C,-a] option"
    echo -e "vpm list   \t list installed app use [-C] option\n"
    echo -e "where [option] is one of:"
    echo -e "\t-C, -a, -u, -d\n"
    echo -e "-C \t specify <install|remove|list> path"
    echo -e "-a \t specify <install|remove> app name"
    echo -e "-u \t specify <install> app package url"
    echo -e "-d \t specify <install> app package path"
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

#########################################

case $action in
    install)
        disable_recover_cfg=1
        fn_install;;
    update)
        fn_install;;
    remove)
        fn_remove;;
    list)
        fn_list;;
    help)
        fn_help;;
esac

echo done