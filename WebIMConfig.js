function getUrl() {
    var apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
    var xmppUrl = "im-api-v2.easemob.com/ws"
    if (window.location.href.indexOf("webim-h5.easemob.com") !== -1) {
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    else if (window.location.href.indexOf("172.17.1.95") !== -1) {
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    else if (window.location.href.indexOf("localhost") !== -1) {
        apiUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//a1.easemob.com"
        xmppUrl = (window.location.protocol === "https:" ? "https:" : "http:") + "//im-api-v2.easemob.com/ws"
    }
    return {
        apiUrl: apiUrl,
        xmppUrl: xmppUrl
    }}
    var config = {
        xmppURL: '//im-api-v2.easemob.com/ws',    // xmpp Server地址
        // xmppURL: getUrl().xmppUrl,
        // apiURL: getUrl().apiUrl,
        apiURL: '//a1.easemob.com',               // rest Server地址
        appkey: 'easemob-demo#chatdemoui', //环信App key
        // appkey: '1119190917098768#test', //App key
        https: true,                            // 是否使用https

        isHttpDNS: false,                          // 3.0 SDK支持，防止DNS劫持从服务端获取XMPPUrl、restUrl 

        isMultiLoginSessions: false,              // 是否开启多页面同步收消息，注意，需要先联系商务开通此功能

        isDebug: true,                           // 打开调试，会自动打印log，在控制台的console中查看log

        autoReconnectNumMax: 2,                   // 断线重连最大次数

        autoReconnectInterval: 2,                 // 断线重连时间间隔

        heartBeatWait: 4500,                      // 使用webrtc（视频聊天）时发送心跳包的时间间隔，单位ms

        Host: 'easemob.com',
        delivery: true                        // 是否发送已读回执
    }
    