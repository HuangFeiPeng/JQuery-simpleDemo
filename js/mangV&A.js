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