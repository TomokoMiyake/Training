/*
 * モバイルAPIを使ったサンプルプログラム
 * Copyright (c) 2016 Cybozu
 * 
 * Licensed under the MIT License
 */
(function() {
    "use strict";

    //ラジオボタンの選択によってフィールドの表示・非表示を切り替える
    var events1 = ['app.record.detail.show',
                   'app.record.create.show',
                   'app.record.create.change.QType',
                   'app.record.edit.change.QType',
                   'mobile.app.record.detail.show',
                   'mobile.app.record.create.show',
                   'mobile.app.record.create.QType',
                   'mobile.app.record.edit.change.QType'];
    
    kintone.events.on(events1, function(event) {
        var record = event.record;
        var QType = record.QType.value;
        if (QType === 'その他') {
            kintone.app.record.setFieldShown('Other', true);
            kintone.mobile.app.record.setFieldShown('Other', true);
        }else {
            kintone.app.record.setFieldShown('Other', false);
            kintone.mobile.app.record.setFieldShown('Other', false);
        }
        return event;
        //record['number'].value = record['text'].value ? record['text'].value.length : 0;
        //record['table'].value.push({value: {'textInTable':
        //    {type: 'SINGLE_LINE_TEXT', value: 'ほげ'}
        //}});
    });

    //ドロップダウンの選択でテーブル行の追加&データ入力をする
    var events2 = ['app.record.create.change.CType', 
                   'app.record.edit.change.CType',
                   'mobile.app.record.create.change.CType', 
                   'mobile.app.record.edit.change.CType']

    kintone.events.on(events2, function(event) {
        var record = event.record;
        var CType = record.CType.value;
        var CType2 = record.Table.value[0].value.CType2.value;
        record.Table.value.push({
            'value': {
                'CType2':{
                    'type': 'DROP_DOWN', 
                    'value': CType
                }
            }
        });
        return event;
    });

    //保存実行前にアラート表示する
    var events3 = ['app.record.create.submit',
                   'app.record.edit.submit',
                   'mobile.app.record.create.submit',
                   'mobile.app.record.edit.submit'];

    kintone.events.on(events3, function(event) {
        //window.alert('楽しんで');
        
        swal({
                title: "保存後にプロセスを次の人に回してください。",
                text: "忘れずに！",
                type: "warning",
                confirmButtonText: "OK"
        });
        
    });
})(); 
