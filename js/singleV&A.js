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