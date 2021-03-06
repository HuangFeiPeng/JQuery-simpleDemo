/* 群组功能部分 */
$(function () {
    //群组管理
    //获取用户加入的群组列表
    $('#getGroupList').click(function (e) {
        e.preventDefault();
        var options = {
            success: function (resp) {
                console.log(">>>加入的群组列表", resp.data);
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
                groupname: '创建群功能测试01', // 群组名
                desc: '群组创建测试', // 群组描述
                members: ['pfh'], // 用户名组成的数组
                public: true, // pub等于true时，创建为公开群
                approval: false, // approval为true，加群需审批，为false时加群无需审批
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
            groupId: '117200113434628', //填写要获取的群组ID
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
            groupName: '修改群组信息测试', // 群组名称
            description: '这是修改群组简介测试', // 群组简介
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
            username: 'song1233', // 群组成员名称
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
            groupId: '117200113434628',
            success: function () {
                console.log('>>>>群组已解散!');
            }
        };
        conn.dissolveGroup(option);
    });
    //退出群组 （群主不能退出自己创建的群）
    $('#quitGroup').click(function (e) {
        e.preventDefault();
        var option = {
            to: '13031081380',
            groupId: '117200113434628',
            success: function (res) {
                console.log('您成功，离开群组！', res);
            },
            error: function () {
                console.log('Leave room faild');
            }
        };
        conn.quitGroup(option);
    });
    /* 群公告管理 */
    //获取群公告
    $("#getGroupAct").click(function (e) {
        e.preventDefault();
        conn.fetchGroupAnnouncement({
            groupId: '116839838449666',
            success: function (data) {
                console.log('获取群公告成功~', data);
            },
            error: function (e) {
                console.log('获取失败~', e);
            }
        })
    });
    //上传修改群公告
    $('#updateGroupAct').click(function (e) {
        e.preventDefault();
        conn.updateGroupAnnouncement({
            groupId: '116839838449666',
            announcement: '群组公告修改测试', // 公告内容                        
            success: function (resp) {
                console.log('群组公告修改成功～', resp.data);
            },
            error: function (e) {
                console.log('修改失败！', e);
            }
        })
    });
    /* 群文件管理 */
    //上传群文件
    $('#upGroupFile').click(function (e) {
        e.preventDefault();
        var input = document.getElementById(groupFile);
        var file = WebIM.utils.getFileUrl(input);
        // console.log(file);
        conn.uploadGroupSharedFile({
            groupId: '117200113434628', //群组id 
            file: file, // <input type="file"/>获取的file文件对象                         
            onFileUploadProgress: function (resp) {
                console.log('上传进度回调~', resp);
            }, // 上传进度的回调
            onFileUploadComplete: function (resp) {
                console.log('上传完成回调~', resp);
            }, // 上传完成时的回调
            onFileUploadError: function (e) {
                console.log('上传失败回调~', e);
            }, // 上传失败的回调
            onFileUploadCanceled: function (e) {
                console.log('上传失败回调', e);
            } // 上传取消的回调
        });

    });
    //获取群文件列表
    $('#getGroupFileList').click(function (e) {
        e.preventDefault();
        conn.fetchGroupSharedFileList({
            groupId: '117200113434628', //群组id 
            success: function (resp) {
                console.log('获取群文件成功！', resp.data);
            },
            error: function (e) {
                console.log('获取失败~', e);
            }

        })
    });
    //下载群文件
    $('#dowGroupFile').click(function (e) {
        e.preventDefault();
        // debugger;
        conn.downloadGroupSharedFile({
            groupId: '117200113434628', //群组id 
            fileId: 'fc952380-a623-11ea-ab69-55e856852236', //文件id
            success: function (resp) {
                console.log('下载成功~', resp);
                var hearf = ``
            },
            error: function (e) {
                console.log('下载失败~', e);
            }
        });
    });
    //删除群文件
    $('#delGroupFile').click(function (e) {
        e.preventDefault();
        conn.deleteGroupSharedFile({
            groupId: '117200113434628', //群组id 
            fileId: 'fc952380-a623-11ea-ab69-55e856852236', //文件id
            success: function (resp) {
                console.log('删除成功~', resp);
            },
            error: function (e) {
                console.log('删除失败~', e);
            }
        })

    });
    /* 群成员管理 */
    //获取全部成员
    $('#listGroupMember').click(function (e) {
        e.preventDefault();
        conn.listGroupMember({
            pageNum: 1,
            pageSize: 5,
            groupId: '117200113434628',
            success: function (resp) {
                console.log("Response: ", resp)
            },
            error: function (e) {}
        })
    });
    //获取除群主之外所有管理员
    $('#getGroupAdmin').click(function (e) {
        e.preventDefault();
        conn.getGroupAdmin({
            groupId: "117200113434628", // 群组id
            success: function (resp) {
                console.log('获取全部管理员成功', resp.data);
            },
            error: function (e) {
                console.log('获取失败', e);
            }
        })
    });
    //将成员设为管理员
    $('#setAdmin').click(function (e) {
        e.preventDefault();
        conn.setAdmin({
            groupId: "117200113434628", // 群组id
            username: "13031081380", // 用户名
            success: function (resp) {
                console.log('设置成功~', resp);
            },
            error: function (e) {
                console.log('设置失败！', e);
            }
        })
    });
    //撤销管理员
    $('#delAdmin').click(function (e) {
        e.preventDefault();
        conn.setAdmin({
            groupId: "117200113434628", // 群组id
            username: "13031081380", // 用户名
            success: function (resp) {
                console.log('撤销成功~', resp);
            },
            error: function (e) {
                console.log('撤销失败！', e);
            }
        })
    });
    /* 加群管理 */
    //将好友加入群组
    $('#inviteToGroup').click(function (e) {
        e.preventDefault();
        conn.inviteToGroup({
            users: ["omg2", "hfp4"],
            groupId: '117200113434628',
            success: function (resp) {
                console.log('邀请成功！', resp);
            },
            error: function (e) {
                console.log('邀请失败！', e);
            }
        })
    });
    //向群组发出入群申请
    $('#joinGroup').click(function (e) {
        e.preventDefault();
        conn.joinGroup({
            groupId: "117200113434628", // 群组ID
            success: function (resp) {
                console.log("Response: ", resp);
            },
            error: function (e) {
                if (e.type == 17) {
                    console.log("您已经在这个群组里了");
                }
            }
        })
    });
    //同意用户加群入群没有写，这两个功能可以写在监听里面。
    //同意用户入群
    $('#agreeJoinGroup').click(function (e) {
        e.preventDefault();
        conn.agreeJoinGroup({
            applicant: applicant, // 申请加群的用户名
            groupId: groupId, // 群组ID
            success: function (resp) {
                console.log(resp);
            },
            error: function (e) {}
        })
    });
    //拒绝用户入群
    $('#rejectJoinGroup').click(function (e) {
        e.preventDefault();

    });
    /* 禁言处理 */
    //将成员禁言
    $('#mute').click(function (e) {
        e.preventDefault();
        conn.mute({
            username: "omg2", // 成员用户名
            muteDuration: 886400000, // 禁言的时长，单位是毫秒
            groupId: "117200113434628",
            success: function (resp) {
                console.log('禁言成功~', resp.data);
            },
            error: function (e) {
                console.log('禁言失败！', e);
            }
        })
    });
    //将成员解除禁言
    $('#removeMute').click(function (e) {
        e.preventDefault();
        conn.removeMute({
            groupId: "117200113434628", // 群组ID
            username: "omg2", // 成员用户名
            success: function (resp) {
                console.log('禁言解除成功~', resp.data);
            },
            error: function (e) {
                console.log('禁言解除失败！', e);
            }
        })
    });
    //获取群组下禁言成员
    $('#allMuteList').click(function (e) {
        e.preventDefault();
        conn.getMuted({
            groupId: "117200113434628", // 群组ID
            success: function (resp) {
                console.log('获取成功>>>', resp.data);
            },
            error: function (e) {
                console.log('获取失败！', e);
            }
        })
    });
    //开启全员禁言
    $('#onAllMute').click(function (e) {
        e.preventDefault();
        conn.disableSendGroupMsg({
            groupId: "117200113434628", //群组id
            success: function (resp) {
                console.log('开启全员禁言成功！', resp.data);
            },
            error: function (e) {
                console.log('开启全员禁言失败！', e);
            }
        })
    });
    //关闭全员禁言
    $('#offAllMute').click(function (e) {
        e.preventDefault();
        conn.enableSendGroupMsg({
            groupId: "117200113434628", //群组id
            success: function (resp) {
                console.log('关闭全员禁言成功！', resp.data);
            },
            error: function (e) {
                console.log('关闭全员禁言失败！', e);
            }
        })
    });
    /* 白名单管理 */
    //从服务器拉去白名单
    $('#getWhiteList').click(function (e) {
        e.preventDefault();
        conn.getGroupWhitelist({
            groupId: "117200113434628", //群组id
            success: function (resp) {
                console.log('拉取成功', resp.data);
            },
            error: function (e) {
                console.log('拉取失败～', e);
            }
        })
    });
    //添加用户到白名单
    $('#addWhiteList').click(function (e) {
        e.preventDefault();
        conn.addUsersToGroupWhitelist({
            groupId: "117200113434628", //群组id
            users: ["hfp3", "1hr"], //成员id列表
            success: function (resp) {
                console.log('添加成功~', resp.data);
            },
            error: function (e) {
                console.log('添加失败~', e);
            }
        })
    });
    //将用户移出白名单
    $('#removeWhiteList').click(function (e) {
        e.preventDefault();
        let options = {
            groupId: "117200113434628", //群组id
            userName: ["1hr", "13031081380"], //成员id列表
            success: function (resp) {
                console.log('移出成功~', resp.data);
            },
            error: function (e) {
                console.log('移出失败~', e);
            }
        }
        conn.rmUsersFromGroupWhitelist(options);
    });
    //查询自己是否为白名单成员,操作权限：app admin可查询所有用户；app user可查询自己
    $('#findWhiteList').click(function (e) {
        e.preventDefault();
        conn.isGroupWhiteUser({
            groupId: "117200113434628", //群组id
            userName: "hfp", //要查询的成员
            success: function (resp) {
                console.log('查询成功', resp);
            },
            error: function (e) {
                console.log('查询失败', e);
            }
        })
    });
    /* 黑名单管理 */
    //获取群组黑名单
    $('#getGroupBlacklistNew').click(function (e) {
        e.preventDefault();
        conn.getGroupBlacklistNew({
            groupId: '117200113434628',
            success: function (list) {
                console.log('Get group black list: ', list.data);
            },
            error: function () {
                console.log('Get group black list error.');
            }
        });
    });
    //将成员单个拉入群黑名单
    $('#groupBlockSingle').click(function (e) {
        e.preventDefault();
        conn.groupBlockSingle({
            groupId: '117200113434628', // 群组ID
            username: 'hfp4', // 将要被加入黑名单的用户名
            success: function (resp) {
                console.log("Response: ", resp);
            },
            error: function (e) {}
        })
    });
    //将单个成员移出黑名单
    $('#removeGroupBlockSingle').click(function (e) {
        e.preventDefault();
        conn.removeGroupBlockSingle({
            groupId: "117200113434628", // 群组ID              
            username: "hfp4", // 需要移除的用户名
            success: function (resp) {
                console.log("移出黑名单成功 ", resp);
            },
            error: function (e) {
                console.log('移出失败~');
            }
        })
    });
    //将成员批量加入黑名单
    $('#groupBlockMulti').click(function (e) {
        e.preventDefault();
        conn.groupBlockMulti({
            groupId: '117200113434628', // 群组ID
            usernames: ['1hr', 'omg2'], // 将要被加入黑名单的用户名数组
            success: function (resp) {
                console.log("批量加入成功~", resp.data);
            },
            error: function (e) {
                console.log('加入失败~', e);
            }
        })
    });
    //将成员批量移出黑名单
    $('#removeGroupBlockMulti').click(function (e) {
        e.preventDefault();
        conn.removeGroupBlockMulti({
            groupId: "117200113434628", // 群组ID
            usernames: ["1hr", "omg2"], // 需要移除的用户名数组
            success: function (resp) {
                console.log("移出成功: ", resp.data);
            },
            error: function (e) {

                console.log('移出失敗',e);
            }
        })
    });
})