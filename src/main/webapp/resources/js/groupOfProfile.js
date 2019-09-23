Ext.onReady(function () {
    var win;
    var winEdit;
    createGroupProfile = function () {

        if (!win || win.isVisible()===false) {
            win = Ext.create('widget.window', {
                title: 'Создание группы анкет',
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
                        buttonAlign: 'right',
                        buttons: [{
                            xtype: 'button',
                            text: 'Сохранить',
                            height: 30,
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
                                                "X-CSRF-TOKEN": token
                                            },
                                            params: {title: value},
                                            success: function (response, options) {
                                                Ext.Msg.alert('Status', 'Название было упешно сохранено');
                                                GroupOfProfiles.groupOfProfileLoad();
                                                win.close();
                                            },
                                            failure: function (response, options) {
                                                Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                            }
                                        }
                                    );
                                } else {
                                    Ext.Msg.alert('Status', 'Заполните поле!');
                                }

                            }
                        }],

                    }]
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
                autoLoad: true,
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
            id:'west',

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype:'button',
                    text: 'Создать группу',
                    handler: function () {
                        createGroupProfile();
                    }}],
              }],

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
                        },
                        {
                            flex: 1,
                            align: 'right',
                            dataIndex: 'title',
                            renderer: function(value, meta, record) {
                                var buttonText = 'Редактировать';
                                return '<a href="#">'+buttonText+'</a>';
                            }
                        }

                      ],
                    listeners: {
                            cellclick: function(grid, td, cellIndex, record, tr, rowIndex) {
                            if (cellIndex===0 || cellIndex===1){
                                Profiles.ListProfileLoad(record.data);
                            }
                            if (cellIndex === 2) {
                                if (!winEdit || winEdit.isVisible()===false) {
                                    winEdit = Ext.create('widget.window', {
                                        title: 'Редактирование',
                                        width: 450,
                                        autoHeight: true,
                                        bodyPadding: 10,
                                        defaults: {
                                            labelWidth: 100
                                        },
                                        items: [{
                                            xtype: 'textfield',
                                            name: 'editNameGroupProfile',
                                            fieldLabel: 'Название группы:',
                                            emptyText: 'Введите название',
                                            allowBlank: false,
                                        },
                                            {
                                                buttonAlign: 'right',
                                                buttons: [{
                                                    xtype: 'button',
                                                    text: 'Изменить',
                                                    height: 30,
                                                    renderTo: Ext.getBody(),
                                                    handler: function () {

                                                        var value = Ext.ComponentQuery.query('textfield[name=editNameGroupProfile]')[0].getValue();
                                                        console.log(value);
                                                        if (value !== "") {
                                                            Ext.Ajax.request({
                                                                    url: saveGroupProfile,
                                                                    dataType: 'json',
                                                                    method: 'POST',
                                                                    headers: {
                                                                        "X-CSRF-TOKEN": token
                                                                    },
                                                                    params: {
                                                                        idgroupOfProfiles: record.data.idgroupOfProfiles,
                                                                        title: value
                                                                    },
                                                                    success: function (response, options) {
                                                                        Ext.Msg.alert('Status', 'Название было упешно изменено');
                                                                        GroupOfProfiles.groupOfProfileLoad();
                                                                        winEdit.close();

                                                                    },
                                                                    failure: function (response, options) {
                                                                        Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                                                    }
                                                                }
                                                            );

                                                        } else {
                                                            Ext.Msg.alert('Status', 'Заполните поле!');
                                                        }

                                                    }
                                                }
                                                ],
                                            }]
                                    });
                                    Ext.ComponentQuery.query('textfield[name=editNameGroupProfile]')[0].setValue(record.data.title);
                                }

                                if (winEdit.isVisible()) {
                                    winEdit.close();
                                } else {
                                    winEdit.show();
                                }




                            }
                        }
                    }
                }],

        });

        renderToWorkArea(west);
        // storeGroupOfProfile.load({
        //     scope: this,
        //     callback: function (records, operation, success) {
        //     }
        // });
    };

});



