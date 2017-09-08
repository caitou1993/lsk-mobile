
export function pullUpLoad(hasmore, ajaxFn, parentNode) {
    var loadingZone;
    if (!parentNode) {
        parentNode = document.body;
    }
    if (!document.querySelector('.cbui-loading-zone')) {
        loadingZone = document.createElement('div');
        loadingZone.className = 'cbui-loading-zone';
        var tplStr = `<div class="load-more">上拉加载更多</div>
          <div class="loading-tip">
            <span class="loading-icon"></span>
            <span class="loading-text">正在加载中</span>
          </div>
          <div class="no-more">
            <span class="caret"></span>
            <span class="no-more-text">没有更多了</span>
            <span class="caret"></span>
          </div>`;
        loadingZone.innerHTML = tplStr;
        parentNode.appendChild(loadingZone);
    } else {
        loadingZone = document.querySelector('.cbui-loading-zone');
    }
    console.log('loadingZone', loadingZone);
    loadingZone.style.display = 'block';
    var loadMore = loadingZone.getElementsByClassName('load-more')[0];
    var loadingTip = loadingZone.getElementsByClassName('loading-tip')[0];
    var noMore = loadingZone.getElementsByClassName('no-more')[0];
    
    if (hasmore) {
        showLoadMore();
    } else {
        showNoMore();
        return;
    }

    var scrolling = false;
    var f = debounce(scroll, 500);
    window.onscroll = f;

    function scroll() {
        console.log(2);
        if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            console.log(3);
            if (hasmore) {
                showLoadingTip();
                typeof ajaxFn === 'function' && ajaxFn();
            } 
        }
    }

    function showLoadMore() {
        loadMore.style.display = 'block';
        loadingTip.style.display = 'none';
        noMore.style.display = 'none';
    }
    function showLoadingTip() {
        loadMore.style.display = 'none';
        loadingTip.style.display = 'block';
        noMore.style.display = 'none';
    }
    function showNoMore() {
        loadMore.style.display = 'none';
        loadingTip.style.display = 'none';
        noMore.style.display = 'block';
    }
}

//获取滚动条当前的位置 
function getScrollTop() { 
    var scrollTop = 0; 
    if (document.documentElement && document.documentElement.scrollTop) { 
        scrollTop = document.documentElement.scrollTop; 
    } else if (document.body) { 
    scrollTop = document.body.scrollTop; 
    } 
    return scrollTop; 
} 

//获取当前可视范围的高度 
function getClientHeight() { 
    var clientHeight = 0; 
    if (document.body.clientHeight && document.documentElement.clientHeight) { 
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
    } else { 
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
    } 
    return clientHeight; 
} 

//获取文档完整的高度 
function getScrollHeight() { 
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
}

function debounce(fn, delay) {
    var timer = null;
    console.log('进入debounce');
    return function() {
        var _this = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
            console.log('清除了timer');
        }
        timer = setTimeout(function() {
            fn.apply(_this, args);
        }, delay);
    }
}