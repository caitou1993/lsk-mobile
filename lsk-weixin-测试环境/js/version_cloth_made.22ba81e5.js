/*!
 * created by cloud_cb linyunbin on 2017/11/13
 * lsk-mobile v0.0.1
 * Copyright  2017, cloud_cb linyunbin, ISC license
 */
webpackJsonp([10],{56:function(e,t){},90:function(e,t,c){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var n=c(5),a=o(n),l=c(2),i=o(l),r=c(1),s=c(4),m=c(9),u=c(3);c(0),c(56),function(){function e(){I.style.display="none",P.style.display="none",document.body.className=""}function t(){var e=document.querySelectorAll(".item");Array.prototype.forEach.call(e,function(e){e.onclick=function(){a.default.previewImage({current:this.getElementsByTagName("img")[0].getAttribute("src"),urls:p})}})}function c(){p.length>2?N.style.display="none":N.style.display="block"}localStorage["x-token"]||i.default.info({text:"用户未登录",duration:2100,complete:function(){location.replace("./login.html?from="+location.href)}});var o=(0,r.c)("#firmNameIpt"),n=(0,r.c)("#userNameIpt"),l=(0,r.c)("#telIpt"),d=(0,r.c)("#addressIpt"),f=(0,r.c)("#descIpt"),p=[],g=(0,r.c)("#itemWrapper"),y=(0,r.c)("#imgForm"),h=(0,r.c)("#inputPic"),N=(0,r.c)("#upload"),b=(0,r.c)("#submit"),v=(0,r.c)("#tel"),k=(0,r.c)("#cancelDial"),A=(0,r.c)("#confirmDial"),P=(0,r.c)("#dialLayout"),I=(0,r.c)("#mask");v.onclick=function(){I.style.display="block",P.style.display="block",document.body.className="modal-open"},k.onclick=e,I.onclick=e,A.addEventListener("click",function(){location.href="tel:4008013357"},!1);(0,r.c)("#cropperWrapper"),(0,r.c)("#cropperImage");(0,r.checkAndroid)()&&h.setAttribute("captrue","camera");var E={companyAddress:"",companyId:"",companyName:"",contactNumber:"",contactPerson:"",customMemo:"",refPic1:"",refPic2:"",refPic3:""};N.onclick=function(){h.click()},h.onchange=function(){i.default.loading("正在上传.."),m.aliupload.call(this,3,function(e){console.log("图片上传返回值",e),i.default.hide();var o="",n=document.createElement("div");n.className="item",p.push(e[0]),console.log("imgArr值",p),o='<img src="'+e[0]+'">\n        <span class="icon-close"></span>',n.innerHTML=o,g.insertBefore(n,N),c(),t(),n.getElementsByClassName("icon-close")[0].onclick=function(e){e.cancelBubble=!0,e.stopPropagation(),this.parentElement.parentElement.removeChild(this.parentElement);for(var o=0;o<p.length;o++)if(p[o]===this.previousElementSibling.getAttribute("src")){p.splice(o,1);break}console.log("imgArr删除后剩余值",p),y.reset(),c(),t()}},function(e){i.default.error("图片上传失败，请重试")})},b.onclick=function(){E.companyId=parseInt(localStorage.companyId),E.companyName=o.value,E.contactPerson=n.value,E.contactNumber=l.value,E.companyAddress=d.value,E.customMemo=f.value;for(var e=0;e<3;e++)E["refPic"+(e+1)]="";for(var t=0;t<p.length;t++)E["refPic"+(t+1)]=p[t];console.log("申请花型定制：",E),(0,s.testFirmName)(E.companyName)?(0,s.testName)(E.contactPerson)?(0,s.testTel)(E.contactNumber)?(0,s.testAddress)(E.companyAddress)?""===E.customMemo?i.default.info("请填写描述信息"):p.length<1&&i.default.info("请上传图片"):i.default.info("请输入地址"):i.default.info("请输入正确的电话号码"):i.default.info("请输入正确的姓名"):i.default.info("公司名称至少三位"),(0,s.testFirmName)(E.companyName)&&(0,s.testName)(E.contactPerson)&&(0,s.testTel)(E.contactNumber)&&(0,s.testAddress)(E.companyAddress)&&p.length>0&&""!==E.customMemo&&(0,u.customProduct)(E,function(e){console.log(e),0===e.code?i.default.success({text:e.message,duration:2100,complete:function(){location.href="./index.html?time="+(new Date).getTime()}}):i.default.info(e.message)})}}()}},[90]);