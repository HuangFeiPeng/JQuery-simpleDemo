/* 登录，注册，退出，发送消息部分的代码段 */
$(function () {
    // WebIM.message = WebIM.default.message;
    // 注册
    $('#register').click(function (e) {
        e.preventDefault();
        username = $('#nickname').val();
        userId = $('#userId').val();
        userpwd = $('#userpwd').val();
        var options = {
            username: userId,
            password: userpwd,
            nickname: username,
            appKey: WebIM.config.appkey,
            success: function () {
                console.log('>>>>注册成功!');
            },
            error: function () {
                console.log('>>>>注册失败!');
            },
            apiUrl: WebIM.config.apiURL
        };
        conn.registerUser(options);

    });
    // 登录
    $('#login').click(function (e) {
        e.preventDefault();
        userId = $('#userId').val();
        userpwd = $('#userpwd').val();
        var options = {
            apiUrl: WebIM.config.apiURL,
            user: userId,
            pwd: userpwd,
            appKey: WebIM.config.appkey,
            success: function (res) {
                console.log(res);
                var token = res.access_token
            }
        };
        conn.open(options);
        return {
            userpwd,
            userId,
        }
        console.log(token);
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 13) {
            $('#login').click();
        }
    })
    //退出
    $('#logout').click(function (e) {
        e.preventDefault();
        conn.close();
    });
    /* 发送消息 */
    //发送单聊消息
    $('#chatMessage').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId();
        var sendTo = $('#nickname').val();
        var message = $('#msg').val();
        var msg = new WebIM.message('txt', id)
        msg.set({
            msg: message, // 消息内容
            to: sendTo, // 接收消息对象（用户id）
            roomType: false,
            ext: {

            }, //扩展消息
            success: function (id, serverMsgId) {
                console.log('发送成功！',id,serverMsgId);
            }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function (e) {
                console.log("Send private text error");
            } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        });
        conn.send(msg.body);
        return sendTo
    });
    //发送群组消息
    $('#groupMessage').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.default.message('txt', id); // 创建文本消息
        var option = {
            msg: '群消息内容测试', // 消息内容
            to: '115310648688641', // 接收消息对象(群组id)
            roomType: false, // 群聊类型，true时为聊天室，false时为群组
            ext: {}, // 扩展消息
            success: function () {
                console.log('send room text success');
            }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function () {
                console.log('failed');
            } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        msg.setGroup('groupchat'); // 群聊类型
        conn.send(msg.body);
    });
    //发送聊天室消息
    $('#roomMessage').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('txt', id); // 创建文本消息
        var option = {
            msg: '聊天室发送内容测试！', // 消息内容
            to: '122163737722883', // 接收消息对象(聊天室id)
            roomType: true, // 群聊类型，true时为聊天室，false时为群组
            ext: {}, // 扩展消息
            success: function () {
                console.log('send room text success');
            }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
            fail: function () {
                console.log('failed');
            } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
        };
        msg.set(option);
        msg.setGroup('groupchat'); // 群聊类型
        conn.send(msg.body);
    });
    //贴图消息原生写法（未执行成功！待找解决办法）
    document.addEventListener('paste', function (e) {
        if (e.clipboardData && e.clipboardData.types) {
            if (e.clipboardData.items.length > 0) {
                if (/^image\/\w+$/.test(e.clipboardData.items[0].type)) {
                    var blob = e.clipboardData.items[0].getAsFile();
                    var url = window.URL.createObjectURL(blob);
                    var id = conn.getUniqueId(); // 生成本地消息id
                    var msg = new WebIM.message('img', id); // 创建图片消息
                    msg.set({
                        apiUrl: WebIM.config.apiURL,
                        file: {
                            data: blob,
                            url: url
                        },
                        to: 'username', // 接收消息对象
                        roomType: false,
                        onFileUploadError: function (error) {
                            console.log('Error');
                        },
                        onFileUploadComplete: function (data) {
                            console.log('Complete');
                        },
                        success: function (id) {
                            console.log('Success');
                        }
                    });
                    conn.send(msg.body);
                }
            }
        }
    });
    //发送URL图片消息
    $('#urlMessage').click(function (e) {
        e.preventDefault();
        var url = 'https://image.carzone.cn/carzone_crm/baseinfo/detail/20200528/202005281149562.377013089704299.jpg';
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('img', id); // 创建图片消息
        var option = {
            body: {
                type: 'file',
                url: url,
                size: {
                    width: '100',
                    height: '100',
                },
                length: msg.length,
                filename: '图片名',
                filetype: msg.filetype
            },
            to: '13031081380', // 接收消息对象,
            success: function () {
                console.log('发送成功！');
            }
        };
        msg.set(option);
        console.log(msg)
        conn.send(msg.body);
        console.log('body',msg.body);
    });
    //发送命令消息
    $('#cmdMessage').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); //生成本地消息id
        var msg = new WebIM.message('cmd', id); //创建命令消息
        msg.set({
            msg: 'msg',
            to: 'username', //接收消息对象
            action: '发送的命令消息', //用户自定义，cmd消息必填
            ext: {
                'extmsg': 'extends messages'
            }, //用户自扩展的消息内容（群聊用法相同）
            success: function (id, serverMsgId) {
                console.log('>>>>发送命令消息成功！', id, serverMsgId);
            } //消息发送成功回调   
        });


        // if (  ) {
        //     msg.setGroup('groupchat');
        // } else if ( /*如果是发送到聊天室*/ ) {
        //     msg.body.roomType = true;
        //     msg.setGroup('groupchat');
        // }

        conn.send(msg.body);
    });
    //发送自定义消息
    $('#custoMessage').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('custom', id); // 创建自定义消息
        var customEvent = "customEvent"; // 创建自定义事件
        var customExts = {
            confrid: '1111111',
            password: '11111'
        }; // 消息内容，key/value 需要 string 类型
        msg.set({
            to: '122917070372866', // 接收消息对象（用户id）
            customEvent,
            customExts,
            ext: {
                ang: '随意'
            }, // 消息扩展
            roomType: true,
            success: function (id, serverMsgId) {
                console.log('自定义消息发送成功！', id, serverMsgId);
            },
            fail: function (e) {
                console.log('>>>>自定义发送失败', e);
            }
        });
        msg.setGroup('groupchat');
        conn.send(msg.body);


    });
    //发送位置消息
    $('#localMsg').click(function (e) { 
        e.preventDefault();
        var toId = $('#nickname').val()
        var id = WebIM.conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('location', id);      // 创建位置消息
        msg.set({
            to: toId,                          // 接收消息对象（用户id）
            roomType: false,
            addr: "北京四通桥",
            lat: "39.9666",
            lng: "116.322",
            success: function (id, serverMsgId) {
                console.log('发送位置消息成功', id, serverMsgId)
            }
        })
        WebIM.conn.send(msg.body);
    });
    //撤回消息
    $('#widthDrawMessage').click(function (e) {
        e.preventDefault();
        conn.recallMessage({
            mid: "738952245768357804",
            to: 'i',
            success: function (id) {
                console.log(id) // id为撤回通知的id
            },
            fail: function (err) {
                console.log(err)
            }
        })
    });
    //获取历史消息（漫游消息）
    $('#getHistoryMsg').click(function (e) {
        e.preventDefault();
        var options = {
            queue: "13031081380",
            isGroup: false,
            count: 10,
            success: function (res) {
                console.log('>>>>>拉取历史消息成功！', res);
            }
        }
        WebIM.conn.fetchHistoryMessages(options)

    });
    // 发送附件消息
    //发送图片消息
    $('#sendImg').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('file', id); // 创建文件消息
        var input = document.getElementById('image');
        var file = WebIM.utils.getFileUrl(input);
        var allowType = {
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true,
            'zip': true,
            'txt': true,
            'pdf': true,
            'doc': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: 'i', // 接收消息对象
                roomType: false,
                onFileUploadError: function () { // 消息上传失败
                    console.log('消息上传失败');
                },
                onFileUploadComplete: function (data) { // 消息上传成功
                    console.log('消息上传成功',data);
                },
                success: function () { // 消息发送成功
                    console.log('>>>>>>消息发送成功');
                },
                flashUpload: WebIM.flashUpload,
                ext: {
                    file_length: file.data.size
                }
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
    //发送文件消息
    $('#sendFile').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('file', id); // 创建文件消息
        var input = document.getElementById('fileMessage'); // 选择文件的input
        var file = WebIM.default.utils.getFileUrl(input); // 将文件转化为二进制文件
        console.log(file);
        var allowType = {
            'jpg': true,
            'gif': true,
            'png': true,
            'bmp': true,
            'zip': true,
            'txt': true,
            'pdf': true,
            'doc': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: 'i', // 接收消息对象
                roomType: false,
                onFileUploadError: function () { // 消息上传失败
                    console.log('消息上传失败');
                },
                onFileUploadComplete: function () { // 消息上传成功
                    console.log('消息上传成功');
                },
                success: function () { // 消息发送成功
                    console.log('文件发送Success');
                },
                flashUpload: WebIM.flashUpload,
                ext: {
                    file_length: file.data.size
                }
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
    //发送音频消息
    $('#sendVocie').click(function (e) {
        e.preventDefault();
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('audio', id); // 创建音频消息
        var input = document.getElementById('vocieMessage'); // 选择音频的input
        var file = WebIM.default.utils.getFileUrl(input); // 将音频转化为二进制文件
        var allowType = {
            'mp3': true,
            'amr': true,
            'wmv': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: '13031081380', // 接收消息对象
                roomType: false,
                onFileUploadError: function () { // 消息上传失败
                    console.log('消息上传失败');
                },
                onFileUploadComplete: function () { // 消息上传成功
                    console.log('消息上传成功');
                },
                success: function () { // 消息发送成功
                    console.log('音频消息Success');
                },
                flashUpload: WebIM.flashUpload,
                ext: {
                    file_length: file.data.size
                }
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
    //发送视频消息
    $('#sendvideo').click(function (e) {
        e.preventDefault();
        console.log(1)
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.message('video', id); // 创建视频消息
        var input = document.getElementById('videoMessage'); // 选择视频的input
        var file = WebIM.default.utils.getFileUrl(input); // 将视频转化为二进制文件
        console.log(file);
        var allowType = {
            'mp4': true,
            'wmv': true,
            'avi': true,
            'rmvb': true,
            'mkv': true
        };
        if (file.filetype.toLowerCase() in allowType) {
            var option = {
                apiUrl: WebIM.config.apiURL,
                file: file,
                to: 'i', // 接收消息对象
                roomType: false,
                onFileUploadError: function () { // 消息上传失败
                    console.log('消息上传失败');
                },
                onFileUploadComplete: function () { // 消息上传成功
                    console.log('消息上传成功');
                },
                success: function () { // 消息发送成功
                    console.log('视频发送Success');
                },
                flashUpload: WebIM.flashUpload,
                ext: {
                    file_length: file.data.size
                }
            };
            msg.set(option);
            conn.send(msg.body);
        }
    });
})