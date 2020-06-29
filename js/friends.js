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
            to: toID,
            success: function(res){
                console.log('删除好友成功！',res);
            }
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