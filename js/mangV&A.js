/* 多人音视频部分 */
$(function () {
    var resultCon = {}
    var resultCon2 = {}
    //创建会议
    document.getElementById("createMeet").onclick = function () {
        emedia.mgr.createConference(10).then(function (confr) {
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
    //文本邀请加入会议
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
    //授权
    $('#grantRole').click(function (e) { 
        e.preventDefault();
        debugger;
        emedia.mgr.grantRole(resultCon, '13031081380', 7).then(function(res){
            console.log('授权成功',res);
        }).catch(function(error){
            console.log('授权失败！',error);
        })
    });
    // //开启桌面共享
    $('#shareDesk').click(function (e) {
        debugger;
        let stream;
        e.preventDefault();
        let params = {
            // videoConstaints: {screenOptions: ['screen', 'window', 'tab']}, //想要获取的桌面流的类别
            videoConstaints: false, //想要获取的桌面流的类别
            widthAudio: true,
            videoTag: $("#video2")[0],
            ext: "共享桌面成功开启",
            stopSharedCallback: function () {
                // debugger;
                emedia.mgr.unpublish(stream)
            }
        }
        emedia.mgr.shareDesktopWithAudio(params).then(function (pushedStream) {
            //stream 对象
            // console.log('共享桌面的成功！stream',stream);
            console.log('共享桌面成功！', pushedStream);
            return stream = pushedStream;
        }).catch(function (error) {
            console.log('共享桌面出现error', error);
        });

    });
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
    //创建并保持会议
    $('#createConFr').click(function (e) {
        e.preventDefault();
        emedia.mgr.createConference(10, '', true, true, true).then(function (confr) {
            console.log('创建成功',confr);
            resultCon2 = confr;
        }).catch(function (error) {
            console.log('创建会议失败！',error);
        })
    });
    //加入创建的会议
    $('').click(function (e) { 
        e.preventDefault();
        
    });
})