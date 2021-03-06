require('common/styles/index.styl');
require('./supply_purchase_info.styl');
require('plugins/swiper/swiper-3.4.2.min.js');
import wx from 'weixin-js-sdk';
import Toast from 'plugins/toast/Toast';
import {blackTip} from 'utils/utils';

var pullUpLoad = require('common/scripts/pull_up_load').pullUpLoad;

import {
    c,
    // formatProduceShape,
    getDateDiff,
    formatUserName,
    getQueryString,
    // formatSupplyType
    formatSupplyShape
} from 'utils/utils';

import {
    listHomeCompanySupplys,
    listHomeProductBuys
} from 'api/user';

(function () {
    console.log('companyId', localStorage['companyId']);
    console.log('userId', localStorage['userId']);
    console.log('isSettled', localStorage['isSettled']);
    var headRight = c('#headRight');
    var supplyWrapper = c('#supplyWrapper');
    var buyingWrapper = c('#buyingWrapper');
    var swiperTag = c('.swiper-tag')[0].getElementsByTagName('span');

    var userType = localStorage.userType;
    console.log('userType', userType);
    var isSettled = parseInt(localStorage.isSettled);
    var text = [
        {
            text: '发布供应',
            link: '../publish_supply.html'
        },
        {
            text: '发布求购',
            link: './publish_buy.html'
        }
    ];
    if (userType === '3') {
        text[0].text = '发布求购';
        text[0].link = './publish_buy.html';
    }
    headRight.innerHTML = text[0].text;
    headRight.setAttribute('href', text[0].link);
    headRight.onclick = function () {
        location.href = this.getAttribute('href');
        // if (isSettled) {
        //     location.href = this.getAttribute('href');
        // } else {
        //     blackTip('该功能仅对蕾丝控商家公开', 2500);
        // }
    };


    var getSupplyParamas = {
        supplyShapes: '',
        supplyTypes: '',
        pageNo: 1,
        pageSize: 10
    };
    var getBuyingParamas = {
        buyTypes: '',
        // isStartUp: '', pc端用
        buyShapes: '',
        pageNo: 1,
        pageSize: 10
    };


    window.addEventListener('pageshow', function (event) {
        if (event.persisted || window.performance && window.performance.navigation.type == 2) {
            if (getBuyingParamas.pageNo && getSupplyParamas.pageNo) {
                getBuyingParamas.pageNo = Number(sessionStorage.buyingNo);
                getSupplyParamas.pageNo = Number(sessionStorage.supplyNo);
                // console.log('getSupplyParamas', getSupplyParamas);
                // console.log('getBuyingParamas', getBuyingParamas);
                // alert('击中');
            }

            if (sessionStorage.recordingBuyingHtml && sessionStorage.recordingSupplyHtml) {
                buyingWrapper.innerHTML = sessionStorage.recordingBuyingHtml;
                supplyWrapper.innerHTML = sessionStorage.recordingSupplyHtml;
                setScrollTop();
                initJump();
                sessionStorage.removeItem('recordingBuyingHtml');
                sessionStorage.removeItem('recordingSupplyHtml');
            }
            // var hasMore = Number(sessionStorage.pageNO) < Number(sessionStorage.totalPage);
            // sessionStorage.buyingNo = res.data.pageNO;
            // sessionStorage.buyingTotalNo = res.data.totalPage;
            if (Number(sessionStorage.buyingNo) < Number(sessionStorage.buyingTotalNo)) {
                getBuyingParamas.pageNo++;
                pullUpLoad(true, getBuying, buyingWrapper);
            }
            if (Number(sessionStorage.supplyNo) < Number(sessionStorage.supplyTotalNo)) {
                getSupplyParamas.pageNo++;
                pullUpLoad(true, getSupply, supplyWrapper);
            }
        } else {
            sessionStorage.clear();
            sessionStorage.offsetTop = 0;
            setScrollTop();
            getSupply();
            getBuying();
        }
    }, false);



    // 获取供应列表
    function getSupply() {
        listHomeCompanySupplys(getSupplyParamas, function (res) {
            console.log('首页供应列表', res);
            var list = res.data.list;
            var listStr = '';
            for (var i = 0; i < list.length; i++) {
                var div = document.createElement('div');
                div.setAttribute('data-id', list[i].id);
                div.setAttribute('user-id', list[i].userId);
                div.className = 'item';
                listStr = `<div class="avatar-wrapper border-bottom">
                        <img src="${list[i].userHeadIcon}">
                    
                        <div>${userType === '1' ? formatUserName(list[i].userName) : list[i].userName}</div>
                    </div>
                    <div class="product-info">
                        <img src="${list[i].productPicUrl}">
                        <div class="text">
                            <div class="brief">${list[i].supplyDesc}</div>
                            <div class="type">${formatSupplyShape(list[i].supplyShape)}</div>
                            <div class="time">${getDateDiff(new Date(list[i].createDate))}</div>
                        </div>
                    </div>`;
                div.innerHTML = listStr;

                div.onclick = function () {
                    var id = this.getAttribute('data-id');
                    var userId = this.getAttribute('user-id');
                    console.log('data-id', id);
                    console.log('userId', userId);
                    console.log('localStorage[\'userId\']', localStorage['userId']);
                    console.log('userId === localStorage[\'userId\']',userId === localStorage['userId']);
                    if (userType === '1') {
                        // 判断是否是自己发部的信息，自己发布的可以看
                        if (userId === localStorage['userId']) {
                            location.href = './supply_detail.html?dataId=' + id;
                            saveToStorage();
                        } else {
                            blackTip('为了保密，供应详情仅对买家公开', 2500);
                        }
                    } else {
                        location.href = './supply_detail.html?dataId=' + id;
                        saveToStorage();
                    }
                };
                supplyWrapper.insertBefore(div, document.querySelector('.supply-flag'));
            }
            var hasMore = res.data.pageNO < res.data.totalPage;
            sessionStorage.supplyNo = res.data.pageNO;
            sessionStorage.supplyTotalNo = res.data.totalPage;
            console.log('hasMore值:', hasMore);
            if (hasMore) {
                getSupplyParamas.pageNo++;
            }
            pullUpLoad(hasMore, getSupply, supplyWrapper);
        });
    }
    // 获取求购列表
    function getBuying() {
        listHomeProductBuys(getBuyingParamas, function (res) {
            console.log('首页求购列表', res);
            var list = res.data.list;
            var listStr = '';
            for (var i = 0; i < list.length; i++) {
                var div = document.createElement('div');
                div.setAttribute('data-id', list[i].id);
                div.setAttribute('user-id', list[i].userId);
                div.className = 'item';
                listStr = `<div class="avatar-wrapper border-bottom">
                        <img src="${list[i].userHeadIcon}">
                        <div>${isSettled ? list[i].userName : formatUserName(list[i].userName)}</div>
                    </div>
                    <div class="product-info">
                        <img src="${list[i].buyPicUrl}">
                        <div class="text">
                            <div class="brief">${list[i].buyDesc}</div>
                            <div class="status">${((list[i].buyStatus) ? '求购中' : '已完成')}</div>
                            <div class="time">${getDateDiff(list[i].createDate)}</div>
                        </div>
                    </div>`;
                div.innerHTML = listStr;

                div.onclick = function () {
                    var id = this.getAttribute('data-id');
                    var userId = this.getAttribute('user-id');
                    console.log('data-id', id);
                    console.log('isSettled', isSettled);
                    console.log('userId', userId);
                    console.log('localStorage[\'userId\']', localStorage['userId']);
                    console.log('userId === localStorage[\'userId\']',userId === localStorage['userId']);
                    if (isSettled) {
                        location.href = './buy_detail.html?dataId=' + id;
                        saveToStorage();
                    } else {
                        if (userId === localStorage['userId']) {
                            location.href = './buy_detail.html?dataId=' + id;
                            saveToStorage();
                        } else {
                            blackTip('为了保密，求购详情仅对蕾丝控商家公开', 2500);
                        }
                    }
                };
                buyingWrapper.insertBefore(div, document.querySelector('.buying-flag'));
            }
            var hasMore = res.data.pageNO < res.data.totalPage;
            sessionStorage.buyingNo = res.data.pageNO;
            sessionStorage.buyingTotalNo = res.data.totalPage;
            if (hasMore) {
                getBuyingParamas.pageNo++;
            }
            pullUpLoad(hasMore, getBuying, buyingWrapper);
        });
    }


    var contentSwiper = new Swiper('.swiper-container', {
        onSlideChangeEnd: swiperControl,
        spaceBetween: 30,
        initialSlide: ((getQueryString('swiperIndex')) ? (getQueryString('swiperIndex')) : 0)
    });

    (function slideControl() {
        for (var i = 0; i < swiperTag.length; i++) {
            (function (i) {
                swiperTag[i].addEventListener('click', function () {
                    contentSwiper.slideTo(i, 300, false);
                    swiperControl(contentSwiper);
                }, false);
            })(i);
        }
    })();

    function swiperControl(swiper) {
        for (var i = 0; i < swiperTag.length; i++) {
            swiperTag[i].className = swiperTag[i].className.replace('active', '');
        }
        swiperTag[swiper.activeIndex].className += ' active';
        headRight.innerHTML = text[swiper.activeIndex].text;
        headRight.setAttribute('href', text[swiper.activeIndex].link);
        history.replaceState(null, null, '?swiperIndex=' + swiper.activeIndex);
    }

    function setScrollTop() {
        buyingWrapper.scrollTop = sessionStorage.buyOffsetTop;
        supplyWrapper.scrollTop = sessionStorage.supplyOffsetTop;
    }

    function initJump() {
        Array.prototype.forEach.call(buyingWrapper.getElementsByClassName('item'), function(item) {
            item.onclick = function () {
                var id = this.getAttribute('data-id');
                var userId = this.getAttribute('user-id');
                if (isSettled) {
                    location.href = './buy_detail.html?dataId=' + id;
                    saveToStorage();
                } else {
                    if (userId === localStorage['userId']) {
                        location.href = './buy_detail.html?dataId=' + id;
                        saveToStorage();
                    } else {
                        blackTip('为了保密，求购详情仅对蕾丝控商家公开', 2500);
                    }
                }
            };
        });
        Array.prototype.forEach.call(supplyWrapper.getElementsByClassName('item'), function(item) {
            item.onclick = function () {
                var id = this.getAttribute('data-id');
                var userId = this.getAttribute('user-id');
                if (userType === '1') {
                    if (userId === localStorage['userId']) {
                        location.href = './supply_detail.html?dataId=' + id;
                        saveToStorage();
                    } else {
                        blackTip('为了保密，供应详情仅对买家公开', 2500);
                    }
                } else {
                    location.href = './supply_detail.html?dataId=' + id;
                    saveToStorage();
                }
            };
        });
    }

    function saveToStorage() {
        sessionStorage.recordingBuyingHtml = buyingWrapper.innerHTML;
        sessionStorage.recordingSupplyHtml = supplyWrapper.innerHTML;
        sessionStorage.supplyOffsetTop = supplyWrapper.scrollTop;
        sessionStorage.buyOffsetTop = buyingWrapper.scrollTop;
    }
})();



