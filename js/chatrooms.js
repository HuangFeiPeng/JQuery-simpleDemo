/* 聊天室功能部分 */
$(function () {
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
            roomId: '119029788377090', // 聊天室id，
            success: function(){
                console.log('加入聊天室成功！');
            },
            error: function(){
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
                console.log('聊天室公告更新',resp);
            },
            error: function (e) {
                console.log('聊天室公告更新失败',e);
            }
        });
    });
})