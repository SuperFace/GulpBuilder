function isFormatedForNull(){for(var n=$(j_m.currPage[0]).find("[data-format-null]"),t=0,i=n.length;i>t;t++){var e=n.eq(t);if(""==e.val().trim())return ErrorAlert(e.attr("data-format-null")),!1}return!0}function praiseUp(n,t){var i,e=$(n);e.off("click"),i=e.closest("[data-id]").attr("data-id"),$star=e.children(".icon"),t?(e.addClass("on"),$star.removeClass("icon-18").addClass("icon-19"),e.on("click",function(){praiseUp(n,!1)})):(e.removeClass("on"),$star.removeClass("icon-19").addClass("icon-18"),e.on("click",function(){praiseUp(n,!0)}))}function wxSdkApply(){function n(){wx.hideOptionMenu()}var t,i,e,a,c="http_weixintoken.php?url="+Base64.base64_encode(window.location.href.trim());location.href.split("?")[0]+"?#login";callService({unlock:!0,url:c,type:"post",paras:{},callback:function(n){n&&(t=n.appId,i=n.timestamp,e=n.nonceStr,a=n.signature,wx.config({debug:!1,appId:t,timestamp:i,nonceStr:e,signature:a,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]}))}}),wx.ready(n),wx.error(function(n){})}function getLocalTime(n,t,i){var t=t||".",e=new Date(1e3*parseInt(n)),a=e.getMonth()+1;a=(a+"").length<2?"0"+a:a;var c=e.getDate();c=(c+"").length<2?"0"+c:c;var i=i===!1?i:!0,o=e.getHours().toString();o=2==o.length?o:"0"+o;var r=e.getMinutes().toString();r=2==r.length?r:"0"+r;var s=e.getSeconds().toString();return s=2==s.length?s:"0"+s,i?e.getFullYear()+t+a+t+c+" "+o+":"+r+":"+s:e.getFullYear()+t+a+t+c}function getCurrCity(n){AMap.service(["AMap.CitySearch"],function(){var t=new AMap.CitySearch;t.getLocalCity(function(t,i){i&&i.city&&i.bounds&&n(i)})})}function getCityByPlat(n,t){callService({url:j_m.oVersion.addr["interface"]+"/index.php?d=v2_violate_info&c=v2_violate_info&m=get_city",type:"post",paras:{plate:n},callback:function(n){n&&200===+n.code&&t(n.msg)}})}function chooseCar(){var n=$(j_m.currPage[0]);if(0!=arguments.length&&"close"===arguments[0])return n.find("#car-type").empty().hide(),void n.find("#car-brand").empty().hide();var t=0!=arguments.length&&"function"==typeof arguments[arguments.length-1]?arguments[arguments.length-1]:null,i=window.event||arguments.callee.arguments[0].caller,e=function(){var n=i.target||i.srcElement;return n.nodeType&&1===n.nodeType?n:this==window||this==document?$("body"):this}.call(this);if(n.find("#car-brand-box").length)setCarList({grade:"brand",tar:e},t);else{var a=$('<div id="car-brand-box"></div>').appendTo(n);j_m.loadPage("lib_car",function(n){a.html(n),setCarList({grade:"brand",tar:e},t)})}}function setCarList(n,t){$(j_m.currPage[0]);return}function replyText(n){var t=$(j_m.currPage[0]),i=t.children(".comm-ret");if("string"==typeof n&&"close"===n)return void i.remove();if("object"==typeof n&&"open"===n.type){var e=n.callback||null;0===i.length&&(i=$("<div class='comm-ret'></div>").appendTo(t),$area=$("<textarea class='comm-ret-area' placeholder='"+(n.cap||"请输入文字：")+"'></textarea>").appendTo(i)),n.focus!==!1&&$area[0].focus(),i.on("keydown",function(n){13===n.keyCode&&e&&(e($area.val()),i.remove())})}}function loadCarList(n){callService({url:j_m.oVersion.addr["interface"]+"/index.php?d=pinche&c=car_sharing&m=ajax_get_car",type:"get",paras:{},callback:function(t){t&&200==+t.ret&&0!=t.data.length&&(localStorage.car=JSON.stringify(t.data),n&&n())}})}var oUserinfo={wid:getUrlval("wid")||"ctb_love",openid:getUrlval("openid")||"love_chetuobang_forever_543720",uid:getUrlval("uid")||"love_chetuobang_forever_1314",unid:getUrlval("unid")||"love_chetuobang",from:getUrlval("from")||null},oDocinfo={},j_m=new Junb;j_m.oVersion.addr={root:"http://wxlk.chetuobang.com","interface":"http://192.168.100.83:9000",wx_callback:"",file:""};var catalogRoot=location.href.substring(0,location.href.lastIndexOf("/"+j_m.oVersion.name+"/")+j_m.oVersion.name.length+1),cpViewpoint=document.getElementById("cpViewpoint"),shareTitle="车托邦 | 车主社区！",shareDesc="车托邦 | 车主社区 每天都要来哦！";$(function(){!function(){$(document).on("click","[data-maidian-key]",function(){Util.maiDian({key:$(this).attr("data-maidian-key").trim()})}),$(window).scroll(function(){oDocinfo.t=document.body.scrollTop||document.documentElement.scrollTop}),0===window.orientation&&$("body").height($(window).height()),!function(){localStorage.car}(),!function(){$(document).on("click","[data-href]",function(){var n=$(this).attr("data-href").trim();j_m.changeHash(n)})}(),$(document).on("click",".comm-posts>ul>li>.comm-posts-sub",function(){var n=$(this).parent();j_m.changeHash("pdt&hash_id="+n.attr("data-id"))}),$(document).on("click",".comm-fr>ul>li>.comm-fr-sub>.comm-fr-sub-con",function(){var n=$(this).parent().parent();j_m.changeHash("pdt&hash_id="+n.attr("data-id"))}),$(document).on("click","[data-userid]",function(){j_m.changeHash("fr&hash_userid="+$(this).attr("data-userid"))}),clearAllCookies(),landscapeTip(!0),wxSdkApply(),responsiveScaling()}(),!function(){j_m.extend("main","车友社区",function(n){var t=$(j_m.currPage[0]),i=t.find("#main-hd-list-slider"),e=t.find(".comm-posts-cond").children();Junb.ajax({url:j_m.oVersion.addr["interface"]+"/front/forum/v1/forums?haha=1&bb=2",type:"get",dataType:"jsonp",paras:{name:"lijun",age:"111"},callback:function(n){}});new Swiper(i,{pagination:".swiper-pagination",loop:!0,slidesPerView:4,centeredSlides:!0});e.each(function(){var n=this;0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(n,!1)}):$(this).on("click",function(){praiseUp(n,!0)}))}),n()},{style:["css/main1.css","css/main2.css"],js:["js/main.js"]}),j_m.extend("list",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-posts-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("reply",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-rep-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("pdt",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-posts-cond").children(),e=t.find(".comm-rep-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),e.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("rdt",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-rep-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("lst",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-posts-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("un_gen",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-posts-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("un_car",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-posts-cond").children(),e=t.find("#un_car-hd-tit-bt"),a=t.find(".un_car-hd-tit"),c=a.children(".un_car-hd-tit-pic").children("img"),o=a.children(".un_car-hd-tit-tip").children("em");i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),j_m.listen("hash_cate",function(n){"selCar"===n?chooseCar.call(e[0],function(n){c.attr("src",n.brandpic),o.text(n.brandname+" "+n.typename),j_m.changeHash("un_car")}):chooseCar.call(e[0],"close")}),e.on("click",function(){j_m.changeHash("un_car&hash_cate=selCar")}),n()}),j_m.extend("fr",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-fr-cond").children();i.each(function(){0===$(this).index()&&($(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}))}),n()}),j_m.extend("focus",function(n){$(j_m.currPage[0]);n()}),j_m.extend("car",function(n){var t=$(j_m.currPage[0]);t.find("#inp-car").on("click",function(){}),t.find("#inp-reg").on("click",function(){}),$btCar=t.find("#change-car-bt"),$titCar=t.find($btCar).parent(),j_m.listen("hash_cate",function(n){"selCar"===n?chooseCar.call($btCar[0],function(n){$titCar.html(n.brandname+" "+n.typename),j_m.changeHash("car")}):chooseCar.call($btCar[0],"close")}),$btCar.on("click",function(){j_m.changeHash("car&hash_cate=selCar")}),n()}),j_m.extend("task",function(n){$(j_m.currPage[0]);n()}),j_m.extend("user",function(n){var t=$(j_m.currPage[0]);$btCar=t.find("#user-info-sel-car"),$birTime=t.find("#birthday"),selDateTimeRange({y:2008,m:1,d:1},{y:1970,m:1,d:1},{y:(new Date).getFullYear(),m:(new Date).getMonth()+1,d:(new Date).getDate()},$birTime,function(n){}),j_m.listen("hash_cate",function(n){"selCar"===n?chooseCar.call($btCar[0],function(n){$btCar.html("<input type='text' class='user-info-box-t-inp inp t-right icon icon-6' value='"+n.brandname+" "+n.typename+"'/>"),j_m.changeHash("user")}):chooseCar.call($btCar[0],"close")}),$btCar.on("click",function(){j_m.changeHash("user&hash_cate=selCar")}),n()}),j_m.extend("center",function(n){$(j_m.currPage[0]);j_m.listen("hash_cate",function(n){replyText("advice"===n?{type:"open",cap:"请在此输入您的宝贵意见：",focus:!0,callback:function(n){j_m.changeHash("center")}}:"close")}),n()}),j_m.extend("fans",function(n){$(j_m.currPage[0]);n()}),j_m.extend("sysmsg",function(n){$(j_m.currPage[0]);n()}),j_m.extend("actmsg",function(n){$(j_m.currPage[0]);n()}),j_m.extend("fdt",function(n){var t=$(j_m.currPage[0]),i=t.find(".comm-fdt-cond").children(),e=t.find(".comm-fr-cond").children(),a=t.find("#fdt-rep-inp");i.each(function(){0===$(this).index()?$(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}):1===$(this).index()&&$(this).on("click",function(){j_m.changeHash("fdt&hash_cate=reply")})}),e.each(function(){0===$(this).index()?$(this).hasClass("on")?$(this).on("click",function(){praiseUp(this,!1)}):$(this).on("click",function(){praiseUp(this,!0)}):1===$(this).index()&&$(this).on("click",function(){j_m.changeHash("fdt&hash_cate=reply_rep")})}),j_m.listen("hash_cate",function(n){replyText("reply"===n?{type:"open",cap:"请输入评论内容：",focus:!0,callback:function(n){j_m.changeHash("fdt")}}:"reply_rep"===n?{type:"open",cap:"请输入回复内容：",callback:function(n){j_m.changeHash("fdt")}}:"close")}),a.on("touchend",function(){j_m.changeHash("fdt&hash_cate=reply")}),n()}),j_m.extend("ffo",function(n){$(j_m.currPage[0]);n()}),j_m.extend("ffa",function(n){$(j_m.currPage[0]);n()}),j_m.extend("unit",function(n){$(j_m.currPage[0]);n()}),j_m.iniPages()}()}),j_m.extend("pubPre",function(n){var t=$(n[0]);t.find("*").off("click touchstart touchend touchmove scroll focus blur change select load keydown resize"),"android"===j_m.device.plat&&wxSdkApply(),Util.maiDian({key:"cwz-pv"}),Util.maiDian({key:"cwz-uv"})}),j_m.extend("pub",function(n){var t=n[0],i=$(t);!function(){i.find(".eq-wh").each(function(){$(this).height($(this).width())}),i.find(".eq-hw").each(function(){$(this).width($(this).height())})}(),!function(){var n=i.find(".responsive-ratio"),t=[];n.each(function(n){if($(this).attr("data-ratio")){var i=+$(this).attr("data-ratio");$(this).height($(this).width()/i),t[n]=i}else t[n]=($(this).width()/$(this).height()).toFixed(2)}),$(window).resize(function(){n.each(function(){$(this).height($(this).width()/t[$(this).index()])})})}()});