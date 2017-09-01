require('../../common/styles/static/reset/reset.styl');
require('../../common/styles/common.styl');
require('../../common/fonts/font.css');
require('./login.css');
require('./login.js');
import Toast from '../../common/plugins/toast/Toast.js';
import baseURL from '../../config/domain.js';
import {
    c,
    testTel,
    testPwd,
    testImgCode,
} from '../../common/scripts/utils/utils';

import {
    login,
    getVerifyCode
}  from '../../api/user.js';



(function () {
    var telIpt = c('#telIpt'),
        pwdIpt = c('#pwdIpt'),
        next = c('#next'),
        imgCodeBox = c('#imgCodeBox'),
        verifyImgIpt = c('#verifyImgIpt')[0],
        verifyImg = c('#verifyImg'),
        imgIsHide = true,
        imgFirstTipRemain = true,
        loginCode,
        Xtoken,
        userData = {
            userMobile: '',
            userPWD: '',
            picCode: ''
        },
        message = {
            testTel: '请输入正确的手机号码',
            telRegistered: '手机号码已被注册',
            getCodeText: '获取验证码',
            countStr: ' 秒后可重新获取',
            testVcode: '验证码格式不正确',
            testImgCode: '图形验证码格式不正确',
            checkVcode: '验证码不正确，请重新输入',
            checkImgCode: '图形验证码不正确，请重新输入',
            registered: '&times;号码已被注册',
            canRegister: '号码可用',
            passwordText: '密码长度需大于等于6位',
            checkError: '验证手机号码失败，请检查您的网络'
        };

    telIpt.oninput = function () {
        userData.userMobile = this.value;
        checkTelAndPwd();
    };

    telIpt.onblur = function () {
        if (!testTel(this.value)) {
            Toast.error(message.testTel, 3000);
        }
    };
    pwdIpt.oninput = function () {
        userData.userPWD = this.value;
        checkTelAndPwd();
    };
    pwdIpt.onblur = function () {
        if (!testPwd(userData.userPWD)) {
            Toast.error(message.passwordText, 3000);
        }
    };
    //图形验证码增加
    testLoginCode();

    function testLoginCode() {
        if (loginCode === 2000004) {
            imgCodeBox.className = imgCodeBox.className.replace('hide', 'show');
            imgIsHide = false;
            checkTelAndPwd();
            getImgCode();
            verifyImg.onclick = getImgCode;
            verifyImgIpt.oninput = function () {
                userData.picCode = this.value;
                checkTelAndPwd();
            };
            verifyImgIpt.onblur = function () {
                if (!testImgCode(this.value)) {
                    Toast.error(message.testImgCode, 3000);
                }
            };
            function getImgCode() {
                getVerifyCode(data);
                Ajax({
                    method: 'POST',
                    url: baseURL + '/front/user/getVerifyCode',
                    headers: {
                        'x-version': '1.0',
                        'x-client': '1'
                    },
                    success: function (res) {
                        verifyImg.innerHTML = '<img width="72px" src="data:image/gif;base64,' + res.data + '">';
                    },
                    error: function (res) {
                        console.log(res);
                    }
                });
                getVerifyCode
            }
        }
    }


    function checkTelAndPwd() {
        console.log(_check());
        if (_check()) {
            next.removeAttribute('disabled');
        } else {
            next.setAttribute('disabled', 'disabled');
        }

        function _check() {
            if (testTel(userData.userMobile) && testPwd(userData.userPWD) && (imgIsHide || testImgCode(userData.picCode))) {
                return true;
            } else {
                return false;
            }
        }
    }

    next.onclick = function () {
        register(goIndex);
        function register(cb) {
            var data = JSON.stringify(userData);
            console.log(data);
            Ajax({
                method: 'POST',
                url: baseURL + '/front/user/login',
                data: data,
                headers: {
                    'x-client': '1',
                    'x-version': '1.0',
                    'x-token': Xtoken
                },
                success: function (res) {
                    console.log('success', res);
                    loginCode = res.code;
                    testLoginCode();
                    // 取消第一次出现图片验证码的错误提示
                    if (imgFirstTipRemain && (res.message === '图片验证错误')) {
                        imgFirstTipRemain = false;
                    } else {
                        Toast.success(res.message, 3000, function () {
                            if (res.code === 0) {
                                typeof cb === 'function' && cb();
                            }
                        });
                        // blackTip(res.message, 1000, function () {
                        //     if (res.code === 0) {
                        //         typeof cb === 'function' && cb();
                        //     }
                        // });
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });
        }

        function goIndex() {
            location.href = 'http://www.baidu.com/';
        }
    };
})();