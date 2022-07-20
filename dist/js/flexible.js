(function () {
    'use strict';
    
    // dpr->scale = 1 / dpr
    var docEl = document.documentElement,
        viewportEl = document.querySelector('meta[name="viewport"]'),
        dpr = window.devicePixelRatio || 1,
        maxWidth = 800,
        minWidth = 320;
    let screenWidth = window.innerWidth;
    dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

    docEl.setAttribute('data-dpr', dpr);
    docEl.setAttribute('max-width', maxWidth);
    docEl.setAttribute('min-width', minWidth);

    var scale = 1 / dpr,
        content = 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';

    if (viewportEl) {
        viewportEl.setAttribute('content', content);
    } else {
        viewportEl = document.createElement('meta');
        viewportEl.setAttribute('name', 'viewport');
        viewportEl.setAttribute('content', content);
        document.head.appendChild(viewportEl);
    }
    setRemUnit();
    window.addEventListener('resize', ()=>{
        setRemUnit()
    });



    function setRemUnit() {
        screenWidth = window.innerWidth;
        if((dpr!==1&&screenWidth/dpr<=maxWidth)||(dpr===1&&screenWidth<=800)){
            var ratio = 18.75;
            var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;
            if (maxWidth && ((viewWidth / dpr) > maxWidth)) {
                viewWidth = maxWidth * dpr;
            } else if (minWidth && (viewWidth / dpr < minWidth)) {
                viewWidth = minWidth * dpr;
            }
            docEl.style.fontSize = viewWidth / ratio + 'px';
            !isInclude("phone.css")&&loadJsCss("css/phone.css", "css");
            isInclude("style.css")&&removejscssfile("css/style.css","css");
            isInclude("response.css")&&removejscssfile("css/response.css","css");
        }else{
            isInclude("phone.css")&&removejscssfile("css/phone.css","css");
            !isInclude("style.css")&&loadJsCss("css/style.css", "css");
            !isInclude("response.css")&&loadJsCss("css/response.css", "css");
        }
    }
    function loadJsCss(filename, filetype){//添加css
        if (filetype=="js")
        {
          var fileref=document.createElement('script')//创建标签
          fileref.setAttribute("type","text/javascript")//定义属性type的值为text/javascript
          fileref.setAttribute("src", filename)//文件的地址
        }
        else if (filetype=="css")
        { 
          var fileref=document.createElement("link")
          fileref.setAttribute("rel", "stylesheet")
          fileref.setAttribute("type", "text/css") 
          fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined")
        {
          document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
    //移动已经加载过的js/css
    function removejscssfile(filename,filetype){
        var targetelement=(filetype=="js")? "script" :(filetype=="css")? "link" : "none"
        var targetattr=(filetype=="js")?"src" : (filetype=="css")? "href" :"none"
        var allsuspects=document.getElementsByTagName(targetelement)
        for (var i=allsuspects.length; i>=0;i--){
            if (allsuspects[i] &&allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
        }
    }
    //判断html css文件是否引入
    function isInclude(name){
        var js= /js$/i.test(name);
        var es=document.getElementsByTagName(js?'script':'link');
        for(var i=0;i<es.length;i++) 
        if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
        return false;
    }
})();
