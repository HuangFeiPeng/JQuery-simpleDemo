var conn = {};
WebIM.config = config;
conn = WebIM.conn = new WebIM.connection({
    appKey: WebIM.config.appkey,
    isHttpDNS: WebIM.config.isHttpDNS,
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: WebIM.config.https,
    url: WebIM.config.xmppURL,
    apiUrl: WebIM.config.apiURL,
    isAutoLogin: WebIM.config.isAutoLogin,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    isStropheLog: WebIM.config.isStropheLog,
    delivery: WebIM.config.delivery
})
// WebIM.config 为之前集成里介绍的WebIMConfig.js
conn.listen({
    onOpened: function (message) {
        console.log('>>>环信链接成功！')
        console.log(conn.isOpened());
    }, //连接成功回调 
    onClosed: function (message) {
        alert('已退出！')
    }, //连接关闭回调
    onTextMessage: function (message) {
        var cmdMsg = confirm('收到' + message.from + '的消息');
        if (cmdMsg) {
            if (message.ext.conferenceId) {
                var confrId = message.ext.conferenceId;
                var password = message.ext.password;
                emedia.mgr.joinConference(confrId, password, "加入").then(
                    function (confr) {
                        var time = Math.round(new Date() / 1000);
                        console.log(">>>>>>>>加入成功时间为" + time);
                        var videoCreate = document.getElementById("video");
                        var constaints = {
                            audio: true,
                            video: true
                        };
                        emedia.mgr
                            .publish(constaints, videoCreate, "发布视频流")
                            .then(function (pushedStream) {
                                //stream 对象
                                console.log(pushedStream);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }).catch(function (error) {
                        console.log("加入失败");
                    })

            }
        } else {

        }
        console.log('>>>>收到文本消息！',message.data);

    }, //收到文本消息
    onEmojiMessage: function (message) {
        console.log('>>>收到表情消息', message)
    }, //收到表情消息
    onPictureMessage: function (message) {
        console.log('>>>图片消息', message)
        var imgUrl = message.url;
        console.log(imgUrl);
        document.getElementById('img').setAttribute("src",imgUrl);

    }, //收到图片消息
    onCmdMessage: function (message) {
        console.log('>>>收到命令消息', message)
        //收到邀请加入会议
        // var cmdMsg = confirm('收到', message.from, '的消息');
        // var confrId = message.ext.confrId;
        // var password = message.ext.password;
        // // var confr = message.ext.confr;
        // if (cmdMsg) {
        //     emedia.mgr.joinConference(confrId, password, "加入").then(
        //         function (confr) {
        //             console.log("加入成功");
        //             var videoCreate = document.getElementById("localVideo");
        //             var constaints = {
        //                 audio: true,
        //                 video: true
        //             };
        //             emedia.mgr
        //                 .publish(constaints, videoCreate, "发布视频流")
        //                 .then(function (pushedStream) {
        //                     //stream 对象
        //                 })
        //                 .catch(function (error) {
        //                     console.log(error);
        //                 });

        //         }).catch(function (error) {
        //         console.log("加入失败");
        //     })

    }, //收到命令消息
    onAudioMessage: function (message) {
        console.log('>>>收到音频消息', message)
        if (message.url) {
            // // console.log(1);
            // var audioURl = message.url;
            // window.localStorage.setItem("audioURl",audioURl);
            // console.log(audioURl);
            var options = { url: message.url };
            // options.onFileDownloadComplete = function ( response ) { 
                //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
                // var objectURL = WebIM.default.utils.parseDownloadResponse.call(conn, response);
                // console.log(objectURL);
                window.localStorage.setItem("audioURl",message.url);
                // console.log(objectURL)
            //   };  
          
            // };
            // options.onFileDownloadError = function () {
            //     //音频下载失败 
            // };
            //通知服务器将音频转为mp3
            options.headers = {
                'Accept': 'audio/mp3'
            };
            WebIM.default.utils.download.call(conn, options);
            console.log(options)
        }
    }, //收到音频消息
    onLocationMessage: function (message) {
        console.log('>>>收到位置消息', message)
    }, //收到位置消息
    onFileMessage: function (message) {
        console.log('>>>收到文件消息', message)
    }, //收到文件消息
    onVideoMessage: function (message) {
        var node = document.getElementById('privateVideo');
        var option = {
            url: message.url,
            headers: {
                'Accept': 'audio/mp4'
            },
            onFileDownloadComplete: function (response) {
                var objectURL = WebIM.default.fromutils.parseDownloadResponse.call(conn, response);
                node.src = objectURL;
            },
            onFileDownloadError: function () {
                console.log('File down load error.')
            }
        };
        WebIM.default.utils.download.call(conn, option);
    }, //收到视频消息
    onPresence: function (message) {
        var toID = message.from;
        console.log(">>>>收到消息！", message)
        var handlePresence = function (e) {
            //（发送者希望订阅接收者的出席信息），即别人申请加你为好友
            if (e.type === 'subscribe') {
                console.log('>>>收到添加消息');
                var subMsg = confirm(e.from + '请求添加您为好友~' + e.status);
                if (subMsg) {
                    //同意好友申请的方法
                    conn.subscribed({
                        to: toID,
                        // message: '[resp:true]'
                        //若e.status中含有[resp:true],则表示为对方同意好友后反向添加自己为好友的消息，
                        //demo 中发现此类消息，默认同意操作，完成双方互为好友；
                        //如果不含有[resp:true]，则表示为正常的对方请求添加自己为好友的申请消息。
                    });
                } else {
                    //拒绝好友申请的方法
                    conn.unsubscribed({
                        to: toID,
                        message: '不好意思，不想加你！'
                    });
                }
            }
            //(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
            if (e.type === 'subscribed') {
                alert(toID + '同意了您的好友申请！');
            }

            //（发送者取消订阅另一个实体的出席信息）,即删除现有好友
            if (e.type === 'unsubscribe') {
                alert('把' + toID + '删除成功！');
            }

            //（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
            if (e.type === 'unsubscribed') {
                alert('好友关系解除，或者为拒绝了好友申请！')
            }
        };
        handlePresence(message);
    }, //处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
    onRoster: function (message) {
        console.log('>>>>>onRoster执行', message);
    }, //处理好友申请
    onInviteMessage: function (message) { }, //处理群组邀请
    onOnline: function () { }, //本机网络连接成功
    onOffline: function () { }, //本机网络掉线
    onError: function (message) {
        console.log('>>>出现错误', message);
    }, //失败回调
    onBlacklistUpdate: function (list) { //黑名单变动
        // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
        console.log('>>>>>黑名单功能执行正常', list);
    },
    onRecallMessage: function (message) { }, //收到撤回消息回调
    onReceivedMessage: function (message) {
        console.log('>>>收到消息送达服务器回执', message)
    }, //收到消息送达服务器回执
    onDeliveredMessage: function (message) {
        console.log('>>>>收到消息到达客户端回执', message)
    }, //收到消息送达客户端回执
    onReadMessage: function (message) { 
        console.log('收到消息已读~',message);
    }, //收到消息已读回执
    onCreateGroup: function (message) { }, //创建群组成功回执（需调用createGroupNew）
    onMutedMessage: function (message) { 
        console.log('在群内被禁言然后发言触发的这个回调~~~');
    } //如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
});

//初始化 WebRTC Call
var rtcCall = new WebIM.WebRTC.Call({
    connection: conn,
    mediaStreamConstaints: {
        audio: true,
        video: true
        /**
         * 修改默认摄像头，可以按照以下设置，不支持视频过程中切换
         * video:{ 'facingMode': "user" } 调用前置摄像头
         * video: { facingMode: { exact: "environment" } } 后置
         */
    },

    listener: {
        onAcceptCall: function (from, options) {
            console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
        },//接通执行的回调
        //通过streamType区分视频流和音频流，streamType: 'VOICE'(音频流)，'VIDEO'(视频流)
        onGotRemoteStream: function (stream, streamType) {
            console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
            var video = document.getElementById('video');
            video.srcObject = stream;
        },//获取到远程流执行的回调
        onGotLocalStream: function (stream, streamType) {
            console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
            var video = document.getElementById('localVideo');
            video.srcObject = stream;
        },//获取到本地流执行的回调
        onRinging: function (caller, streamType) {
            console.log("onRinging", caller)
            var returned = confirm('接到来自'+caller+'音视频,是否接听？')
            if (returned) {
                rtcCall.acceptCall();
                console.log('>>>>接听成功！');
            } else {
                rtcCall.endCall()
                console.log('>>>>挂断成功！');

            }
        },//监听到有人呼叫执行的回调
        onTermCall: function (reason) {
            console.log('>>>>>onTermCall监听回调执行');
            console.log('>>>>>>reason:', reason);
        },//通话断开执行的回调
        onIceConnectionStateChange: function (iceState) {
            console.log('>>>>onIceConnectionStateChange::', 'iceState:', iceState);
        },//监听连接状态
        onError: function (e) {
            console.log('>>>>音视频错误', e);
        }//单点音视频错误回调
    }
});

//初始化多人会议
emedia.config({
    restPrefix: 'https://a1.easemob.com', //配置服务器域名、必填 比如: 'https://a1-hsb.easemob.com'
    appkey: WebIM.config.appkey, // 配置appkey、必填
    useDeployMore: true //开启多集群部署
});
//进入会议之前，设置SDK毁掉后，可获知成员加入或离开会议，数据流更新等。
emedia.mgr.onMemeberJoined = function (member) {
    console.log(member.name, '成功加入会议！');
};
//有人退出会议
emedia.mgr.onMemberExited = function (member) {
    console.log(member.name, '退出会议！')
}
//其他成员收到通知并订阅流
//有媒体流添加；比如 自己调用了publish方法（stream.located() === true时），或其他人调用了publish方法。
emedia.mgr.onStreamAdded = function (member, stream) {
    console.log('>>>>有媒体流添加', member, stream);
    if (!stream.located()) { //自己发送的数据流 
        var subscribe = confirm('是否订阅？')
        if (subscribe) {
            emedia.mgr.streamBindVideo(stream, localVideo)
            emedia.mgr.subscribe(member, stream, true, true, localVideo) //成员A成功发布数据流后，会议中其他成员会收到监听类回调[emedia.mgr.onStreamAdded]，如果成员B想看成员A的音视频，可以调用subscribe接口进行订阅
        } else {
            emedia.mgr.unsubscribe(stream);
        }

    } else {
        emedia.mgr.streamBindVideo(video, pushedStream);
    }
}
//有媒体流移除
emedia.mgr.onStreamRemoved = function (member, stream) {
    console.log(">>>>>>媒体流移除", stream);
};
//角色改变
emedia.mgr.onRoleChanged = function (role) {
    console.log('>>>>角色改变', role);

};



