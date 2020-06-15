/* 聊天室功能部分 */
$(function () {
    //创建聊天室
    $('#createRooms').click(function (e) {
        e.preventDefault();

    });
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
})