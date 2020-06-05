/* 登录，注册，退出，发送消息部分的代码段 */
$(function () {
    WebIM.message = WebIM.default.message;
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
        return {
            username,
            userpwd,
            userId
        };
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
        var msg = new WebIM.default.message('txt', id)
        msg.set({
            msg: message, // 消息内容
            to: sendTo, // 接收消息对象（用户id）
            roomType: false,
            ext: {

            }, //扩展消息
            success: function (id, serverMsgId) {
                console.log('send private text Success');
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
        var msg = new WebIM.default.message('txt', id); // 创建文本消息
        var option = {
            msg: '聊天室发送内容测试！', // 消息内容
            to: '115374024622083', // 接收消息对象(聊天室id)
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
        var url = 'https://huaban.com/img/long_image_shadow.png';
        var id = conn.getUniqueId(); // 生成本地消息id
        var msg = new WebIM.default.message('img', id); // 创建图片消息
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
            to: 'i', // 接收消息对象,
            success: function () {
                console.log('发送成功！');
            }
        };
        msg.set(option);
        console.log(msg)
        conn.send(msg.body);
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
        var customExts = {}; // 消息内容，key/value 需要 string 类型
        msg.set({
            to: 'i', // 接收消息对象（用户id）
            customEvent,
            customExts,
            ext: {
                ang: '随意'
            }, // 消息扩展
            roomType: false,
            success: function (id, serverMsgId) {
                console.log('自定义消息发送成功！', id, serverMsgId);
            },
            fail: function (e) {
                console.log('>>>>自定义发送失败', e);
            }
        });
        conn.send(msg.body);

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
            queue: "hfp3",
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
        var file = WebIM.default.utils.getFileUrl(input);
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
/* 好友功能部分 */
$(function () {
    //查询好友列表
    $('#findFriendList').click(function (e) {
        e.preventDefault();
        conn.getRoster({
            success: function (roster) {
                console.log('>>>>查询好友列表成功！', roster);
            }
        })
    });
    //添加好友
    $('#addFriends').click(function (e) {
        e.preventDefault();
        var toID = $('#nickname').val()
        console.log(toID)
        conn.subscribe({
            to: toID,
            message: '要不要做朋友？'
        });
    });
    //删除好友
    $('#removeFriends').click(function (e) {
        e.preventDefault();
        var toID = $('#nickname').val()
        console.log(toID)
        //取nickname里的value值作为toID使用
        conn.removeRoster({
            to: toID
        });
    });
    //获取黑名单列表
    $('#getBlackList').click(function (e) {
        e.preventDefault();
        conn.getBlacklist();
    });
    //将好友加入黑名单
    $('#joinBlackList').click(function (e) {
        e.preventDefault();
        var toID = $('#nickname').val();
        conn.addToBlackList({
            name: [toID],
            success: function (e) {
                console.log('>>>成功将指定好友加入黑名单！', e);
            },
            error: function (err) {
                console.log('将好友加入黑名单失败！', err);
            }
        });
    });
    //将好友移出黑名单
    $('#removeBlackList').click(function (e) {
        e.preventDefault();
        var toID = $('#nickname').val();
        conn.removeFromBlackList({
            name: [toID],
            success: function (res) {
                console.log(res);
            },
            error: function (err) {
                console.log('将好友移出黑名单失败！', err);
            }
        });
    });

})
/* 群组功能部分 */
$(function () {
    //群组管理
    //获取用户加入的群组列表
    $('#getGroupList').click(function (e) {
        e.preventDefault();
        var options = {
            success: function (resp) {
                console.log(">>>加入的群组列表", resp);
            },
            error: function (e) {
                console.log('>>>>获取群列表失败！', e);
            }
        }
        conn.getGroup(options);
    });
    //分页获取公开群
    $('listGroups').click(function (e) {
        e.preventDefault();
        var limit = 1, //每次获取的数量
            cusror = globalCursor;
        var options = {
            limit: limit,
            cusror: cusror,
            success: function (resp) {
                console.log(">>>>获取成功", resp);
                globalCursor = resp.cusror;
            },
            error: function (e) {
                console.log('获取失败', e);
            }
        }
        conn.listGroups(options);
    });
    //创建群组
    $('#createGroup').click(function (e) {
        e.preventDefault();
        var options = {
            data: {
                groupname: '创建群功能测试01',                    // 群组名
                desc: '群组创建测试',                          // 群组描述
                members: ['pfh'],            // 用户名组成的数组
                public: true,                         // pub等于true时，创建为公开群
                approval: false,                  // approval为true，加群需审批，为false时加群无需审批
                // allowinvites: allowInvites 位置
            },
            success: function (respData) {
                console.log('》》》》群组创建成功！', respData);
            },
            error: function (e) {
                console.log('>>>>群组创建失败！', e);
            }
        };
        conn.createGroupNew(options);
    });
    //获取群组信息
    $('#getGroupInfo').click(function (e) {
        e.preventDefault();
        var options = {
            groupId: '116840041873409', //填写要获取的群组ID
            success: function (resp) {
                console.log('>>>获取成功', resp);
            },
            error: function (e) {
                console.log('>>>获取失败！', e);
            }
        }
        conn.getGroupInfo(options);
    });
    //修改群组信息
    $('#changeGroupInfo').click(function (e) {
        e.preventDefault();
        var option = {
            groupId: '116840041873409',
            groupName: '修改群组信息测试',  // 群组名称
            description: '这是修改群组简介测试',  // 群组简介
            success: function (res) {
                console.log('修改成功！', res);
            }
        };
        conn.modifyGroup(option);
    });
    //移除群成员
    $('#removeSingleGroup').click(function (e) {
        e.preventDefault();
        var option = {
            groupId: '116840041873409',
            username: 'song1233',                         // 群组成员名称
            success: function () {
                console.log('》》》成员移除成功！');
            }
        };
        conn.removeSingleGroupMember(option);
    });
    //解散群组
    $('#dissolveGroup').click(function (e) {
        e.preventDefault();
        var option = {
            groupId: '116846231617538',
            success: function () {
                console.log('>>>>群组已解散!');
            }
        };
        conn.dissolveGroup(option);
    });
    //退出群组
    $('#quitGroup').click(function (e) {
        e.preventDefault();
        var option = {
            to: 'hfp',
            groupId: '116846231617538',
            success: function (res) {
                console.log('您成功，离开群组！', res);
            },
            error: function () {
                console.log('Leave room faild');
            }
        };
        conn.quitGroup(option);
    });

})
/* 聊天室功能部分 */
$(function(){
    //创建聊天室
    $('#createRooms').click(function (e) { 
        e.preventDefault();
        
    });
})
/* 点对点音视频部分 */
$(function () {
    //实时音视频部分
    //视频呼叫
    $('#rtcCall').click(function (e) {
        e.preventDefault();
        var toName = document.getElementById('nickname').value;
        rtcCall.makeVideoCall(toName, null, true, true); //第三个参数为是否录制、第四个参数为是否合并，参数可以为空
        rtcCall.caller = 'hfp'; //呼叫人
        console.log("视频呼叫：" + toName);
    });
    //音频呼叫
    $('#rtAudioCall').click(function (e) {
        e.preventDefault();
        var toName = document.getElementById('nickname').value;
        rtcCall.caller = 'hfp';
        rtcCall.makeVoiceCall(toName, null, true, true); //用法同视频
        console.log("语音呼叫：" + toName);
    });
    //挂断
    document.getElementById('endCall').onclick = function () {
        var end = confirm('确认挂断？');
        if (end) {
            rtcCall.endCall();
        }
    }
})
/* 多人音视频部分 */
$(function () {
    var resultCon = {}
    //创建会议
    document.getElementById("createMeet").onclick = function () {
        emedia.mgr.createConference(emedia.mgr.ConfrType.COMMUNICATION_MIX).then(function (confr) {
            console.log("创建会议成功");
            console.log(confr);
            resultCon = confr;
            //创建者加入
            emedia.mgr.joinConference(resultCon.confrId, resultCon.password, "加入").then(
                function (confr) {
                    console.log("加入成功");
                    var videoCreate = document.getElementById("video");
                    var constaints = {
                        audio: true,
                        video: true
                    };
                    //发布视频流
                    emedia.mgr
                        .publish(constaints, videoCreate, "发布视频流")
                        .then(function (pushedStream) {
                            //stream 对象
                        })
                        .catch(function (error) {
                            console.log(error);
                        })

                }).catch(function (error) {
                    console.log("加入失败");
                })
        }).catch(function (error) {
            console.log("创建会议失败");
        })
    }
    emedia.mgr.onMemberJoined = function (member) {
        console.log('有人加入会议>>>>', member);
    };
    //发布视频流
    // document.getElementById("pushVideo").onclick = function () {
    //     var videoPush = document.getElementById("video");
    //     var constaints = {
    //         audio: true,
    //         video: true
    //     };
    //     emedia.mgr
    //         .publish(constaints, videoPush, "创建者加入会议")
    //         .then(function (pushedStream) {
    //             //stream 对象
    //             console.log('stream>>>>', pushedStream);
    //         })
    //         .catch(function (error) {
    //             console.log('>>>>', error);
    //         });
    // }
    // $('#endMeet').click(function (e) {
    //     e.preventDefault();
    //     var rtn = confirm("确定退出?");
    //     if (rtn) {
    //         emedia.mgr.exit();
    //     }
    // });
    //文本邀请
    document.getElementById('textAsk').onclick = function () {
        var toName = document.getElementById('nickname').value
        var jid = WebIM.config.appkey + "_" + toName + "@easemob.com";
        rtcCall.inviteConference(resultCon.confrId, resultCon.password, jid);

    }
    //离开会议
    document.getElementById('exitMeet').onclick = function () {
        var alert = confirm('确认退出会议？');
        if (alert) {
            emedia.mgr.exitConference();
        }
    }
    //获取会议信息
    document.getElementById('getMeetMsg').onclick = function () {
        emedia.mgr.selectConfr(resultCon.confrId, resultCon.password).then(function (confr) {
            console.log('获取成功！', confr);
        }).catch(function (error) {
            console.log('加入失败', error);
        })
    }
    document.getElementById('shareDesk').onclick = function () {
        let params = {
            videoConstaints: true,
            withAudio: true,
            videoTag: document.getElementById('shareVideo'),
            ext: {
                test: '测试共享桌面'
            },
            confrId: resultCon.confrId,
            stopSharedCallback: function () {
                console.log('点击停止');
            }
        }
        console.log(resultCon)
        console.log(params);
        emedia.mgr.shareDesktopWithAudio(params).then(function (pushedStream) {
            //stream 对象
            console.log('共享桌面获取到了', pushedStream);
        }).catch(function (error) {
            console.log('共享桌面报错！', error);
        });
    }
    //cmd 扩展邀请
    // document.getElementById("cmdAsk").onclick = function () {
    //     var username = document.getElementById("userId").value;
    //     var toname = document.getElementById("nickname").value;
    //     var id = conn.getUniqueId(); //生成本地消息id
    //     var msg = new WebIM.message('cmd', id); //创建命令消息
    //     msg.set({
    //         msg: '邀请您加入会议' + resultCon.confrId,
    //         to: toname, //接收消息对象
    //         action: 'action', //用户自定义，cmd消息必填
    //         ext: {
    //             confrId: resultCon.confrId,
    //             password: resultCon.password,
    //             jid: WebIM.config.appkey + '_' + toname + '@' + WebIM.config.Host
    //         },
    //         success: function (id, serverMsgId) {
    //             console.log('send private cmd Success');
    //         },
    //         fail: function (e) {
    //             console.log("Send private cmd error");
    //         }
    //     })
    //     msg.body.chatType = 'singleChat';
    //     conn.send(msg.body);
    // }
    document.getElementById('changeCam').onclick = function () {
        emedia.mgr.switchCamera().then(function (e) {
            console.log(e)
            console.log('>>>>1');

        }).catch(function () {
            console.log('>>>切换失败！');
        })
    }

})