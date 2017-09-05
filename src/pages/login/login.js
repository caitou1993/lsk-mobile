require('common/styles/index.styl');
require('./login.styl');

import Toast from 'plugins/toast/Toast';

var aes = require('plugins/aes/mode-ecb');

import {
    c,
    testAccount,
    testPwd,
    testImgCode,
} from 'utils/utils';

import {
    login,
    getVerifyCode,
}  from 'api/user';



(function() {
    var telIpt = c('#telIpt');
    var pwdIpt = c('#pwdIpt');
    var next = c('#next'),
        imgCodeBox = c('#imgCodeBox'),
        verifyImgIpt = c('#verifyImgIpt'),
        verifyImg = c('#verifyImg'),
        imgIsHide = true,
        // Xtoken,
        userData = {
            userMobile: '',
            userPWD: '',
            picCode: ''
        },
        message = {
            testAccount: '账号/手机号码不能为空',
            testImgCode: '图形验证码格式不正确',
            imgCodeIptTip: '请输入验证码',
            passwordText: '密码长度需大于等于6位',
        };

    telIpt.oninput = function() {
        userData.userMobile = this.value;
        checkAccountAndPwd();
    };

    telIpt.onblur = function() {
        if (!testAccount(this.value)) {
            Toast.error(message.testAccount, 1000);
        }
    };
    pwdIpt.oninput = function() {
        userData.userPWD = this.value;
        checkAccountAndPwd();
    };
    pwdIpt.onblur = function() {
        if (!testPwd(userData.userPWD)) {
            Toast.error(message.passwordText, 1000);
        }
    };

    verifyImgIpt.oninput = function() {
        userData.picCode = this.value;
        checkAccountAndPwd();
    };
    verifyImgIpt.onblur = function() {
        if (!testImgCode(this.value)) {
            Toast.error(message.testImgCode, 1000);
        }
    };

    next.onclick = function() {
        Toast.loading('请稍后...');
        userData.userPWD = aes(userData.userPWD);
        login(userData, function(res) {
            console.log('登录', res);
            if (res.code === 0) {
                Toast.success('登录成功', 1000);
                location.href = 'http://www.baidu.com/';
            } else if (res.code === 2000004) {
                if (imgIsHide) {
                    imgIsHide = false;
                    Toast.error(message.imgCodeIptTip, 1000);
                } else {
                    Toast.error(res.message, 1000);
                }
                imgCodeBox.className = imgCodeBox.className.replace('hide', 'show');
                verifyImg.onclick = getImgCode;
                console.log(imgIsHide);
                getImgCode();
            } else {
                getImgCode();
                Toast.error(res.message, 1000);
            }
        });
    };

    function checkAccountAndPwd() {
        if (_check()) {
            next.removeAttribute('disabled');
            next.className = 'button active';
        } else {
            next.setAttribute('disabled', 'disabled');
            next.className = 'button';
        }
        function _check() {
            if (testAccount(userData.userMobile) && testPwd(userData.userPWD) && (imgIsHide || testImgCode(userData.picCode))) {
                return true;
            } else {
                return false;
            }
        }
    }

    function getImgCode() {
        getVerifyCode({}, function (res) {
            console.log('图形验证码', res);
            var data = res.data;
            verifyImg.innerHTML = '<img width="72px" src="data:image/gif;base64,' + data + '">';
        });
    }
})();