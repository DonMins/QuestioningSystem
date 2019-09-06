Ext.onReady(function(){

    // Ext.define('GroupOfProfiles', {
    //     extend: 'Ext.data.Model',
    //
    //     idProperty: 'idgroupOfProfiles',
    //
    //     fields: [{
    //         name: 'idgroupOfProfiles',
    //         type: 'int'
    //     }, {
    //         name: 'title',
    //         type: 'string'
    //     }]
    // });
    //
    // var myStore = Ext.create('Ext.data.Store', {
    //     model: 'GroupOfProfiles',
    //     autoLoad: true,
    //     proxy: {
    //         type: 'ajax',
    //         url: 'ajaxData.json',
    //         reader: {
    //             type: 'json',
    //             root: 'GroupOfProfiles'
    //         }
    //     }
    // });
    //
    // myStore.load(function() {
    //     myStore.each(function(record){
    //         alert(record.get('title'));
    //     });
    // });

    Ext.Ajax.request({
        url: urlJSON,
        dataType: 'json',

        success: function(response, options){
            document.getElementById("test").textContent = response.responseText;

        },
        failure: function(response, options){
            alert("Ошибка: " + response.statusText);
        }
    });

    // var MyPanel = Ext.create("Ext.panel.Panel",{
    //     renderTo: Ext.getBody(),
    //     width: '100%',
    //     height: '100%',
    //
    //     layout: {
    //         type: 'border',
    //         padding: 5
    //     },
    //
    //     items: [{
    //         region: 'west',
    //         title: 'Список',
    //         store: store,
    //         width: 200,
    //         split: true,
    //         collapsible: true,
    //         floatable: false,
    //         columns: [{
    //             header: 'ID',
    //             dataIndex: 'idgroupOfProfiles'
    //         },
    //             {
    //                 header: 'Название ',
    //                 dataIndex: 'title',
    //             }],
    //     },
    //         {
    //         region: 'center',
    //         xtype: 'tabpanel',
    //         items: [{
    //             title: 'Bogus Tab',
    //             html: 'Hello world 1'
    //         }, {
    //             title: 'Another Tab',
    //             html: 'Hello world 2'
    //         }, {
    //             title: 'Closable Tab',
    //             html: 'Hello world 3',
    //         }]
    //     },
    //     {   region: 'north',
    //         xtype: 'button',
    //         height:30,
    //         text: 'Выйти!',
    //         handler: function() {
    //             document.forms['logoutForm'].submit()
    //         }
    //     }
    //     ],
    // });

});

