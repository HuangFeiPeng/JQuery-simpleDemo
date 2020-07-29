$(function(){
    $('#dowlocadFiles').click(function (e) { 
        e.preventDefault();
        var options = {
            responseType: 'blob',//default blob
            mimeType: 'text/plain; charset=x-user-defined',//default
            url:'http://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/cd390680-d0a1-11ea-b7f5-e18efde36737',
            secret: 'zTl7sNChEeqhO5VpxCSX-1AQBCwNDVOHNqcZ5cjwt7Ol7Sbs',
            accessToken: WebIM.conn.context.accessToken,
            onFileDownloadComplete: function ( data ) {
                console.log('文件下载成功',data);
            }, //download file success },
            onFileDownloadError: function ( e ) { 
                console.log('文件下载失败',e);
            }//download file error }
        }
        debugger;
        WebIM.utils.download(options);
        
    });
























})