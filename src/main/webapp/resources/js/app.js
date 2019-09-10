Ext.onReady(function(){

    Ext.define('GroupOfProfiles', {
        extend: 'Ext.data.Model',

        idProperty: 'idgroupOfProfiles',

        fields: [
            { name: 'idgroupOfProfiles', type: 'int' },
            {name: 'title', type: 'string' }
        ],
        hasMany: { model: 'Profiles', name: 'nameProfile' ,associationKey: 'nameProfile'}
    });

    Ext.define('Profiles', {
        extend: 'Ext.data.Model',
        idProperty: 'idProfile',

        fields: [{ name: 'idProfile', type: 'int'},
            { name: 'name', type: 'string'}
        ],
        belongsTo: 'GroupOfProfiles',
    });

    var myStore = Ext.create('Ext.data.Store', {
        model: 'GroupOfProfiles',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: urlJSON,
            reader: {
                type: 'json',
                root: 'GroupOfProfiles'
            }
        }
    });

    var listPanelProfiles=Ext.create('Ext.Panel', {
               store: myStore,
               layout: {
                   type: 'border',
                   padding: 5
               },
               region: 'west',
               title: 'Список групп анкет',
               height: '100%',
               width: 200,
        id : 'listPanelProfiles',
        renderTo: Ext.getBody()
    });
    Ext.getCmp('listPanelProfiles').add({
             height: '100%',
             xtype:'gridpanel',
             width: 200,
             store: myStore,
             resizable: false,
             flex: 0,
             sortable: false,
             columns: [
                  // {
                  //     width: 100,
                  //     dataIndex: 'title'
                  // },
                 {
                  width: 100,
                     dataIndex: 'nameProfile',
                     renderer: function(value, meta, record, colIndex, rowIndex, store, view) {
                         var nameProfile=record.raw.nameProfile;
                         var name="";
                         var i =0;

                         Ext.each(nameProfile,function(nameProf){
                             name = nameProf['name'];
                             console.log(name);

                         });
                         return '<a href="#">'+name+'</a>';
                     //    return '<a href="#">'+record.nameProfile().first().get("name")+'</a>';

                     },

                 }],

             renderTo: Ext.getBody()
    });



    //
    //
    // Ext.Ajax.request({
    //     url: urlJSON,
    //     dataType: 'json',
    //
    //     success: function(response, options){
    //       var o = Ext.decode(response.responseText);
    //       // MyPanel.getComponent('listProfiles').setValue(o['GroupOfProfiles']['title']);
    //
    //     },
    //     failure: function(response, options){
    //         alert("Ошибка: " + response.statusText);
    //     }
    // });

    //
    // var table =  Ext.create('Ext.grid.Panel', {
    //      title: 'Пользователи',
    //      height: 200,
    //      width: 400,
    //      store: myStore,
    //      columns: [
    //                          {
    //                              header : "Column 1",
    //                              width: 100,
    //                              dataIndex: 'idgroupOfProfiles'
    //
    //                          },
    //                          {
    //                              header : "column2",
    //                              width: 100,
    //                              dataIndex: 'title'
    //                          }],
    //      renderTo: Ext.getBody()
    //  });


    //
    // var myPanal =  Ext.create("Ext.panel.Panel",{
    //        renderTo: Ext.getBody(),
    //        width: '100%',
    //        height: '100%',
    //        store: myStore,
    //        layout: {
    //            type: 'border',
    //            padding: 5
    //        },
    //
    //        items: [{
    //            region: 'west',
    //            title: 'Список групп анкет',
    //            height: 20,
    //            width: 200,
    //            split: true,
    //
    //            collapsible: true,
    //            floatable: false,
    //            items: [{
    //                xtype:'gridpanel',
    //                columns: [
    //                    {
    //                        header : "Column 1",
    //                        width: 100,
    //                        dataIndex: 'idgroupOfProfiles'
    //
    //                    },
    //                    {
    //                        header : "column2",
    //                        width: 100,
    //                        dataIndex: 'title'
    //                    }],
    //            }],
    //                //html: '<h2> <a href="">Что то</a></h2>'
    //         //   }],
    //
    //        },
    //            {
    //            region: 'center',
    //            xtype: 'tabpanel',
    //            items: [{
    //                title: 'Bogus Tab',
    //                html: 'Hello world 1'
    //            }, {
    //                title: 'Another Tab',
    //                html: 'Hello world 2'
    //            }, {
    //                title: 'Closable Tab',
    //                html: 'Hello world 3',
    //            }]
    //        },
    //        {   region: 'north',
    //            xtype: 'button',
    //            height:30,
    //            text: 'Выйти!',
    //            handler: function() {
    //                document.forms['logoutForm'].submit()
    //            }
    //        }
    //        ],
    //    });


});

