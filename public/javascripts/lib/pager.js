function Page(opt){
    var set = $.extend({num:null,startnum:1,elem:null,callback:null},opt||{});
    if(set.startnum>set.num||set.startnum<1){
        set.startnum = 1;
    }
    var n = 0,htm = '';
    var clickpages = {
        elem:set.elem,
        num:set.num,
        callback:set.callback,
        init:function(){
            this.elem.next('div.pageJump').children('.button').unbind('click')
            this.JumpPages();
            this.elem.children('li').click(function () {
                var txt = $(this).children('a').text();
                var page = '', ele = null;
                var page1 = parseInt(clickpages.elem.children('li.active').attr('page'));
                if (isNaN(parseInt(txt))) {
                    switch (txt) {
                        case '下一页':
                            if (page1 == clickpages.num) {
                                return;
                            }
                            if (page1 >= (clickpages.num - 2) || clickpages.num <= 6 || page1 < 3) {
                                ele = clickpages.elem.children('li.active').next();
                            } else {
                                clickpages.newPages('next', page1 + 1);
                                ele = clickpages.elem.children('li.active');
                            }
                            break;
                        case '上一页':
                            if (page1 == '1') {
                                return;
                            }
                            if (page1 >= (clickpages.num - 1) || page1 <= 3 || clickpages.num <= 6) {
                                ele = clickpages.elem.children('li.active').prev();
                            } else {
                                clickpages.newPages('prev', page1 - 1);
                                ele = clickpages.elem.children('li.active');
                            }
                            break;
                        case '«':
                            if (page1 == '1') {
                                return;
                            }
                            if (clickpages.num > 6) {
                                clickpages.newPages('«', 1);
                            }
                            ele = clickpages.elem.children('li[page=1]');
                            break;
                        case '»':
                            if (page1 == clickpages.num) {
                                return;
                            }
                            if (clickpages.num > 6) {
                                clickpages.newPages('»', clickpages.num);
                            }
                            ele = clickpages.elem.children('li[page=' + clickpages.num + ']');
                            break;
                        case '...':
                            return;
                    }
                } else {
                    if ((parseInt(txt) >= (clickpages.num - 3) || parseInt(txt) <= 3) && clickpages.num > 6) {
                        clickpages.newPages('jump', parseInt(txt));
                    }
                    ele = $(this);
                }
                page = clickpages.actPages(ele);
                if (page != '' && page != page1) {
                    if (clickpages.callback){
                        clickpages.callback(parseInt(page));
                    }
                }
            });
        },
        //active
        actPages:function (ele) {
            ele.addClass('active').siblings().removeClass('active');
            return clickpages.elem.children('li.active').text();
        },
        JumpPages:function () {
            this.elem.next('div.pageJump').children('.button').click(function(){
                var i = parseInt($(this).siblings('input').val());
                if(isNaN(i)||(i<=0)||i>clickpages.num){
                    return;
                }else if(clickpages.num>6){
                    clickpages.newPages('jump',i);
                }else{
                    var ele = clickpages.elem.children('li[page='+i+']');
                    clickpages.actPages(ele);
                    if (clickpages.callback){
                        clickpages.callback(i);
                    }
                    return;
                }

                if (clickpages.callback){
                    clickpages.callback(i);
                }
            })
        },

        //newpages
        newPages:function (type, i) {
            var html = "",htmlLeft="",htmlRight="",htmlC="";
            var HL = '<li><a>...</a></li>';
            //html = '<li><a  aria-label="Previous">&laquo;</a></li>\
            html = '<li><a>上一页</a></li>'
            for (var n = 0;n<3;n++){
                htmlC += '<li '+((n-1)==0?'class="active"':'')+' page="'+(i+n-1)+'"><a>'+(i+n-1)+'</a></li>';
                htmlLeft += '<li '+((n+2)==i?'class="active"':'')+' page="'+(n+2)+'"><a>'+(n+2)+'</a></li>';
                htmlRight += '<li '+((set.num+n-3)==i?'class="active"':'')+' page="'+(set.num+n-3)+'"><a>'+(set.num+n-3)+'</a></li>';
            }

            switch (type) {
                case "next":
                    if(i<=4){
                        html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }else if(i>=(set.num-3)){
                        html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }else{
                        html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }
                    break;
                case "prev":
                    if(i<=4){
                        html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }else if(i>=(set.num-3)){
                        html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }else{
                        html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }
                    break;
                case "«" :
                    html+='<li class="active" page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    break;
                case "»" :
                    html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li class="active" page="'+set.num+'"><a>'+set.num+'</a></li>';
                    break;
                case "jump" :
                    if(i<=4){
                        if(i==1){
                            html+='<li class="active" page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                        }else{
                            html+='<li page="1"><a>1</a></li>'+htmlLeft+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                        }
                    }else if((i>=set.num-3)&&(set.num>=7)){
                        if(i==set.num){
                            html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li class="active" page="'+set.num+'"><a>'+set.num+'</a></li>';
                        }else{
                            html+='<li page="1"><a>1</a></li>'+HL+htmlRight+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                        }
                    }else{
                        html += '<li page="1"><a>1</a></li>'+HL+htmlC+HL+'<li page="'+set.num+'"><a>'+set.num+'</a></li>';
                    }
            }
            html += '<li><a>下一页</a></li>';
                //<li><a  aria-label="Next">&raquo;</a></li>';
            if (this.num > 5 || this.num < 3) {
                set.elem.html(html);
                clickpages.init({num:set.num,elem:set.elem,callback:set.callback});
            }
        }
    }
    if(set.num<1){
        $(".pagination").html('');
        return;
    }else if(parseInt(set.num)<=6){
        n = parseInt(set.num);
        // var html='<li><a  aria-label="Previous">&laquo;</a></li>\
        var html ='<li><a>上一页</a></li>';
        for(var i=1;i<=n;i++){
            if(i==set.startnum){
                html+='<li class="active" page="'+i+'"><a>'+i+'</a></li>';
            }else{
                html+='<li page="'+i+'"><a>'+i+'</a></li>';
            }
        }
        html +='<li><a>下一页</a></li>';
                //<li><a  aria-label="Next">&raquo;</a></li>';
        set.elem.html(html);
        clickpages.init();
    }else{
        clickpages.newPages("jump",set.startnum)
    }
}

function guid() {
var guid = "";
for (var i = 1; i <= 32; i++){
    var n = Math.floor(Math.random()*16.0).toString(16);
    guid +=   n;
    if((i==8)||(i==12)||(i==16)||(i==20))
        guid += "-";
}
return guid;
}


//pageInfo:{pages:'总页数',pageIndex:'当前页'}
//分页组件锚点
//回调方法 处理点击事件
// generatePager({
//     pages:result.data.pages,
//     pageIndex:pageIndex
// },'.foot-page',function (index) {
//     query(index);
// });
function generatePager(pageInfo,ele,cb) {

if(!ele){
    return '';
}

var anchorObj = $(ele);

var ulId = guid();

if(pageInfo && pageInfo.pages && pageInfo.pages > 1){
    var page ='';
    if(pageInfo.total){
        page ='<div class="pageTotal">共有<i class ="lookColory">'+pageInfo.total+'</i>条符合记录</div>';
    }
   
    page += '<div class="pageContent"><ul class="pagination" id="'+ ulId +'"></ul>' +
        '<div class="pageJump"><span>转到 - </span><input type="text"/>' +
        '<button type="button" class="button">GO</button></div></div>';

    anchorObj.html(page);

    Page({
        num: pageInfo.pages*1,	         //总页数
        startnum:pageInfo.pageIndex*1,     //指定页码
        elem: $('#'+ulId),               //指定的元素
        callback: function (pIndex) {	 //回调函数
            cb(pIndex);
        }
    });
}else {

    anchorObj.html('');
}
}