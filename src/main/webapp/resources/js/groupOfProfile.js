Ext.onReady(function () {
    var win;
    createGroupProfile = function () {

        if (!win || win.isVisible()===false) {
            win = Ext.create('widget.window', {
                title: 'Создание анкеты',
                width: 450,
                autoHeight: true,
                bodyPadding: 10,
                defaults: {
                    labelWidth: 100
                },
                items: [{
                    xtype: 'textfield',
                    name: 'nameGroupProfile',
                    fieldLabel: 'Название группы:',
                    emptyText: 'Введите название',
                    allowBlank: false,
                },
                    {
                        xtype: 'button',
                        text: 'Сохранить',
                        height: 30,
                        margin: '50 0 0 50',
                        renderTo: Ext.getBody(),
                        handler: function () {
                            var value = Ext.ComponentQuery.query('textfield[name=nameGroupProfile]')[0].getValue();
                            if (value !== "") {
                                console.log(value);
                                Ext.Ajax.request({
                                        url: saveGroupProfile,
                                        dataType: 'json',
                                        method: 'POST',
                                        headers: {
                                            "X-CSRF-TOKEN": va
                                        },
                                        params: {title: value},
                                        success: function (response, options) {
                                            Ext.Msg.alert('Status', 'Название было упешно сохранено');
                                            win.close();
                                        },
                                        failure: function (response, options) {
                                            Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                        }
                                    }
                                );
                            }
                            else {
                                Ext.Msg.alert('Status', 'Заполните поле!');
                            }

                        }
                    }],

            });
        }

        if (win.isVisible()) {
            win.close();
        } else {
            win.show();
        }

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

