/*!
 * created by cloud_cb linyunbin on 2017/11/13
 * lsk-mobile v0.0.1
 * Copyright  2017, cloud_cb linyunbin, ISC license
 */
webpackJsonp([23],{40:function(e,c){},74:function(e,c,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var t=n(5),i=a(t),o=n(2),r=a(o),s=n(3),l=n(4),u=n(1);n(0),n(40),n(7),function(){function e(){(0,s.getCompanyInfo)({companyId:a},function(e){console.log("获取详细工厂信息",e);var c=e.data;m.setAttribute("company-id",c.id),c.companyHeadIcon&&(h.src=c.companyHeadIcon),f.innerHTML=c.companyName,g.innerHTML=c.address,localStorage.companyName=c.companyName,H.setAttribute("phone",c.phone);try{y.innerHTML=c.companyExtendBO.companyBusiness}catch(e){console.log(e)}H.addEventListener("click",function(){var e=this.getAttribute("phone");location.href="tel:"+e}),m.onclick=function(){c.indexName&&(location.href="https://www.ts57.cn/microWebsite/index.html?companyId="+c.id)}})}function c(){(0,s.getColorCards)({productId:t},function(e){console.log("获取色卡返回值",e);var c=e.data,n="",a="",t=[],o=c.length;(0,u.c)(".total-number")[0].innerHTML="/"+o;for(var r=0;r<o;r++)a+='<div class="swiper-slide" style="background-image: url('+c[r].picUrl+')" url="'+c[r].picUrl+'"></div>',n+='<img src="'+c[r].picUrl+'">',t.push(c[r].picUrl);(0,u.c)(".swiper-wrapper")[0].innerHTML=a,Q.innerHTML=n,N.innerHTML=n;var s=new Swiper(".swiper-container",{spaceBetween:30,onSlideChangeEnd:function(e){console.log("activeIndex",e.activeIndex),(0,u.c)(".active-number")[0].innerHTML=e.activeIndex+1;for(var c=0;c<d.length;c++)d[c].className=d[c].className.replace(" active","");d[e.activeIndex].className=" active"}}),l=document.querySelectorAll(".swiper-slide");Array.prototype.forEach.call(l,function(e){e.onclick=function(){console.log(this.getAttribute("url"),t),i.default.previewImage({current:this.getAttribute("url"),urls:t})}});for(var d=N.getElementsByTagName("img"),p=0;p<d.length;p++)0===p&&(d[0].className+=" active",V.setAttribute("src",c[0].picUrl)),d[p].index=p,d[p].onclick=function(){for(var e=0;e<d.length;e++)d[e].className=d[e].className.replace(" active","");this.className+=" active",V.setAttribute("src",c[this.index].picUrl),s.slideTo(this.index)};for(var m=Q.getElementsByTagName("img"),h=0;h<m.length;h++)0===h&&(m[0].className+=" active",V.setAttribute("src",c[0].picUrl),E.colorId=c[0].id,E.productId=c[0].productId),m[h].index=h,m[h].onclick=function(){for(var e=0;e<m.length;e++)m[e].className=m[e].className.replace(" active","");this.className+=" active",V.setAttribute("src",c[this.index].picUrl),E.colorId=c[this.index].id,E.productId=c[this.index].productId};for(var v=0;v<F.length;v++)F[v].index=v,W.innerHTML=J[0],F[v].onclick=function(){for(var e=0;e<F.length;e++)F[e].className=F[e].className.replace(" active","");this.className+=" active",E.purchaseType=this.index+1,j.value="",j.setAttribute("placeholder",_[this.index]),"1片"===j.getAttribute("placeholder")?(j.value="1片",j.readOnly=!0,E.purchaseNum=1):(j.readOnly=!1,E.purchaseNum=""),O.innerHTML=q[this.index]+"&nbsp;&nbsp;",W.innerHTML=J[this.index]}})}function n(){A.style.display="none",C.style.display="none",document.body.className=""}"bencalie"!=window.name?(location.reload(),window.name="bencalie"):window.name="";var a,t=(0,u.getQueryString)("dataId"),o=(0,u.c)("#productNo"),d=(0,u.c)("#price"),p=(0,u.c)("#cutPrice"),m=(0,u.c)("#companyMessage"),h=(0,u.c)("#avatar"),v=(0,u.c)("#viewNum"),f=(0,u.c)("#companyName"),y=(0,u.c)("#companyBusiness"),g=(0,u.c)("#address"),N=(0,u.c)("#messageColorCard"),b=(0,u.c)("#category"),T=(0,u.c)("#ingredient"),w=(0,u.c)("#stock"),I=(0,u.c)("#width"),M=(0,u.c)("#height"),k=(0,u.c)("#dress"),H=(0,u.c)("#call"),L=(0,u.c)("#collectStar"),x=(0,u.c)("#collectWrapper"),U=(0,u.c)("#buy"),A=(0,u.c)("#mask"),C=(0,u.c)("#colorCard"),P=(0,u.c)("#cancel"),S=(0,u.c)("#arrow"),B=(0,u.c)("#confirm"),E={colorId:"",phone:"",productId:"",purchaseNum:1,purchaseType:1,userName:""},F=(0,u.c)("#buyType").getElementsByClassName("value"),O=(0,u.c)("#referPriceName"),W=(0,u.c)("#referPriceValue"),_=["1片","请输入大货数量","请输入剪版数量"],q=["剪小样参考价:","大货参考价:","剪版参考价:"],J=[" 免费"],Q=(0,u.c)("#patternColorWrapper"),V=(0,u.c)("#cardAvatar"),j=(0,u.c)("#buyNumIpt"),z=(0,u.c)("#userNameIpt"),D=(0,u.c)("#phoneIpt");(0,s.getProduct)({id:t},function(n){console.log("获取花型详情",n);var t=n.data;a=t.companyId,1===t.isFavorite&&(L.className="icon-star-small active"),x.style.display=t.isShelve?"block":"none",m.style.display=t.isShelve?"flex":"none",o.innerHTML=t.productNo,d.innerHTML=(0,u.formatMoney)(t.price,t.priceUnit),p.innerHTML=(0,u.formatMoney)(t.cutPrice,t.priceUnit),v.innerHTML=t.viewCount?t.viewCount:0,b.innerHTML=(0,u.formatSupplyType)(t.category),T.innerHTML=t.ingredient,w.innerHTML=(t.stock?t.stock:"")+" "+(0,u.formatUnit)(t.stockUnit),I.innerHTML=t.width,M.innerHTML=t.height,k.addEventListener("click",function(){location.href="https://www.ts57.cn/share/dress.html?companyId="+t.companyId+"&url="+t.defaultPicUrl+"&from=lace"},!1),J.push((0,u.formatMoney)(t.price,t.priceUnit)),J.push((0,u.formatMoney)(t.cutPrice,t.priceUnit)),c(),e()}),j.oninput=function(){E.purchaseNum=parseFloat(this.value)},z.oninput=function(){E.userName=this.value},D.oninput=function(){E.phone=this.value},U.onclick=function(){A.style.display="block",C.style.display="block",document.body.className="modal-open"},P.onclick=n,S.onclick=n,B.onclick=function(){console.log("色卡部分求购提交",E);var e=!0,c=!0,a=!0;(0,l.testTel)(E.phone)?(D.className="",e=!0):(D.value="",D.className="invalid",e=!1),(0,l.testFirmName)(E.userName)?(z.className="",c=!0):(z.value="",z.className="invalid",c=!1),(0,l.testPurchaseNum)(E.purchaseNum)?(j.className="",a=!0):(j.value="",j.className="invalid",a=!1),e&&c&&a&&(0,s.askPurchase)(E,function(e){console.log("采购登记信息",e),e.code||(alert("采购登记成功！"),n(),location.reload())})},L.onclick=function(){var e=this;(0,s.favoriteBus)({businessId:t,businessType:1},function(c){console.log("收藏或取消",c),0===c.code?(r.default.success(c.message,1e3),"收藏成功"===c.message?e.className="icon-star-small active":e.className="icon-star-small"):r.default.info(c.message,1e3)})}}()}},[74]);