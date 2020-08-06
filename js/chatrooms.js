/* 聊天室功能部分 */
$(function () {
    //创建聊天室功能
    $('#createChatRooms').click(function (e) {
        e.preventDefault();
        var options = {
            name: 'chatRoomName', // 聊天室名称
            description: 'awdaw', // 聊天室描述
            maxusers: 200, // 聊天室成员最大数（包括聊天室创建者），默认值200，最大值5000
            // members: ['13031081380'], // 聊天室成员，此属性为可选的，但是如果加了此项，数组元素至少一个
            success: function (res) {
                console.log('创建聊天室成功~', res);
            },
            error: function (err) {
                console.log('聊天室创建失败~', err);
            }
        }

        conn.createChatRoom(options)
    });

    //获取聊天室列表
    $('#getChatRooms').click(function (e) {
        e.preventDefault();
        conn.getChatRooms({
            // apiUrl: 'https://a1.easemob.com',
            apiUrl: `https:${WebIM.config.apiURL}`,
            pagenum: 1, // 页数
            pagesize: 20, // 每页个数
            success: function (list) {
                console.log('获取聊天室列表成功~', list.data);
            },
            error: function () {
                console.log('List chat room error');
            }
        })
    });
    //加入聊天室
    $('#joinChatRoom').click(function (e) {
        e.preventDefault();
        conn.joinChatRoom({
            roomId: '122917070372866', // 聊天室id，
            success: function () {
                console.log('加入聊天室成功！');
            },
            error: function () {
                console.log('加入聊天室失败~');
            }
        });
    });
    //退出聊天室
    $('#quitChatRoom').click(function (e) {
        e.preventDefault();
        conn.quitChatRoom({
            roomId: '119029788377090' // 聊天室id
        });
    });
    //获取聊天室成员列表
    $('#listRoomsMebr').click(function (e) {
        e.preventDefault();
        conn.listChatRoomMember({
            pageNum: 1,
            pageSize: 10,
            chatRoomId: '117834645569537',
            success: function (res) {
                console.log('获取成功', res);
            },
            error: function (err) {}
        })
    });
    /* 聊天室公告 */
    //获取聊天室公告
    $('#getChatroomAct').click(function (e) {
        e.preventDefault();
        conn.fetchChatRoomAnnouncement({
            roomId: '118286717091841', // 聊天室id                          
            success: function (resp) {
                console.log('获取聊天室公告成功~', resp);
            },
            error: function (e) {
                console.log('获取聊天室公告失败~', e);
            }
        })
    });
    //上传或者修改聊天室公告
    $('#upChatroomAct').click(function (e) {
        e.preventDefault();
        conn.updateChatRoomAnnouncement({
            roomId: '118286717091841', // 聊天室id   
            announcement: 'announcement', // 公告内容                        
            success: function (resp) {
                console.log('聊天室公告更新', resp);
            },
            error: function (e) {
                console.log('聊天室公告更新失败', e);
            }
        });
    });
    //禁言个别成员
    $('#muteSingleMem').click(function (e) {
        e.preventDefault();
        var options = {
            chatRoomId: "122163737722883", // 聊天室id
            username: '13031081380', // 被禁言的聊天室成员的id
            muteDuration: -1000, // 被禁言的时长，单位ms，如果是“-1000”代表永久
            success: function (resp) {
                console.log('禁言成功', resp);
            },
            error: function (e) {
                console.log('禁言失败', e);
            }
        };
        conn.muteChatRoomMember(options);
    });
})