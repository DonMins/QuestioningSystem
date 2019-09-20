Ext.onReady(function () {

    childMenu_2 = function () {
        var west = Ext.create('Ext.Panel', {
            title: 'Пустой',
            region: 'west',
            maxWidth: 150,
            collapsible: true,
            maxHeight: '100%',
            split: true,
            autoScroll: true,
            renderTo: Ext.getBody()
        });
        renderToWorkArea(west);
    };

    GroupOfProfiles.groupOfProfileLoad = function () {

        var storeGroupOfProfile = Ext.create('Ext.data.Store',
            {
                model: 'GroupOfProfiles.model',
                autoLoad: false,
                proxy: {
                    type: 'ajax',
                    url: urlJSONGroupProfile,
                    reader: {
                        type: 'json',
                        root: 'GroupOfProfiles'
                    }
                }
            }
        );

        var west = Ext.create('Ext.Panel', {
            title: 'Список групп анкет',
            region: 'west',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: true,
            closable: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'gridpanel',
                    store: storeGroupOfProfile,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'title',
                            text: '',
                            flex: 1
                        }
                    ],
                    listeners: {
                        itemclick: function (s, r) {
                            Profiles.ListProfileLoad(r.raw.idgroupOfProfiles);
                        }
                    }
                }],
            renderTo: Ext.getBody()
        });

        renderToWorkArea(west);
        storeGroupOfProfile.load({
            scope: this,
            callback: function (records, operation, success) {
            }
        });
    };

});

