(function() {
    "use strict";
    kintone.events.on('app.record.detail.show', function(event) {
        var record = event.record;
        //NOTE テーブルの値定義
        var count = record.contents_table.value;
        //NOTE 行数カウントのnum定義
        var num = 0;
        //NOTE 掲載ステータスのテーブル行数カウント
        for (var i = 0; i < count.length; i++) {
            var status = record.contents_table.value[i].value.published_status.value;
            if (status === "掲載") {
                num++;
            }
        }
        //NOTE 6行以上でアラート表示
        if (num >= 6) {
            swal({
                title: "掲載のファイルが7つ以上あります!\nご確認ください。",
                text: "上から7つ目以降はGaroonポータルで表示されません。",
                type: "warning",
                confirmButtonText: "OK"
            });
        }
    });
})();
