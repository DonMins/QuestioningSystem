Ext.onReady(function () {
    var win;
    var winCreateProfile;
    var winEditProfile;
    createProfile = function (groupOfProfiles) {
        if (!winCreateProfile || winCreateProfile.isVisible() === false) {
            winCreateProfile = Ext.create('widget.window', {
                title: 'Создание анкеты',
                width: 800,
                autoHeight: true,
                bodyPadding: 10,
                defaults: {
                    labelWidth: 100
                },

                items: [
                    {
                    xtype: 'textfield',
                    name: 'nameProfile',
                    fieldLabel: 'Название анкеты:',
                    emptyText: 'Введите название',
                    allowBlank: false,
                    width:750
                     },
                    {
                        xtype: 'textareafield',
                        name: 'description',
                        fieldLabel: 'Описание:',
                        height:200,
                        width:750,
                        maxLength: 200


                    },

                    {
                        buttonAlign: 'right',
                        buttons: [{
                        xtype: 'button',
                        text: 'Сохранить',
                        height: 30,
                        renderTo: Ext.getBody(),
                        handler: function () {
                            var nameProfile = Ext.ComponentQuery.query('textfield[name=nameProfile]')[0].getValue();
                            var description = Ext.ComponentQuery.query('textfield[name=description]')[0].getValue();
                            if (nameProfile !== "") {
                                Ext.Ajax.request({
                                        url: saveProfile,
                                        dataType: 'json',
                                        method: 'POST',
                                        headers: {
                                            "X-CSRF-TOKEN": token
                                        },
                                        params: {
                                            nameProfile: nameProfile,
                                            description: description,
                                            idgroupOfProfiles: groupOfProfiles.idgroupOfProfiles
                                        },
                                        success: function (response, options) {
                                            Ext.Msg.alert('Status', 'Анкета была упешно сохранена');
                                            Profiles.ListProfileLoad(groupOfProfiles);
                                            winCreateProfile.close();
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
                        }]
                    }],

            });
        }
        if (winCreateProfile.isVisible()) {
            winCreateProfile.close();
        } else {
            winCreateProfile.show();
        }
    };

    Profiles.ListProfileLoad = function (groupOfProfiles) {
        var storeProfile = Ext.create('storeProfile');

        var west = Ext.create('Ext.Panel', {
            title: 'Список анкет в группе: "' + groupOfProfiles.title + '"',
            region: 'center',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: false,
            closable: true,
            // autoScroll: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    { xtype: 'button',
                        text: 'Назад',
                        handler: function () {
                            GroupOfProfiles.groupOfProfileLoad();
                        },
                    },
                    {
                    xtype: 'button',
                    text: 'Создать анкету',
                    handler: function () {
                        createProfile(groupOfProfiles);
                    },
                    }
                ]
            }],

            items: [
                {
                    xtype: 'gridpanel',
                    store: storeProfile,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'nameProfile',
                            text: '',
                            flex: 1,

                        },

                        {
                            width:90,
                            flex: 0,
                            align: 'center',
                            renderer: function (value, meta, record) {
                                var buttonText = 'Редактировать';
                                return '<a href="#">' + buttonText + '</a>';
                            }
                        },
                        {
                            width:70,
                            flex: 0,
                            align: 'center',
                            renderer: function(value, meta, record) {
                                var buttonText = 'Удалить';
                                return '<a href="#">'+buttonText+'</a>';
                            }
                        }

                    ],
                    plugins: [
                        {
                            ptype: 'rowexpander',
                            rowBodyTpl: new Ext.XTemplate(
                                '<div><b>Описание:</b>{description}</div>'
                            )
                        }

                    ],
                    listeners: {
                        cellclick: function (grid, td, cellIndex, record, tr, rowIndex) {
                            if (cellIndex === 1 || cellIndex === 2) {


                                Question.ListQuestionLoad(record.data);
                            }
                            if (cellIndex === 3) {

                                if (!winEditProfile || winEditProfile.isVisible() === false) {
                                     winEditProfile = Ext.create( "Profile.editor.window",
                                        {winType:'EDIT', rec:record, groupOfProfiles:groupOfProfiles} );
                                }

                                if (winEditProfile.isVisible()) {
                                    winEditProfile.close();
                                } else {
                                    winEditProfile.show();
                                }
                            }
                            if(cellIndex ===4){
                              Ext.Msg.confirm("Удалить","Вы действительно хотите удалить анкету? ",
                                    function(btn){
                                        if (btn === "yes") {
                                            Ext.Ajax.request({
                                                    url: deleteProfile,
                                                    dataType: 'json',
                                                    method: 'POST',
                                                    headers: {
                                                        "X-CSRF-TOKEN": token
                                                    },
                                                    params: {
                                                        idProfile: record.data.idProfile
                                                    },
                                                    success: function (response, options) {
                                                        Ext.Msg.alert('Status', 'Анкета была удалена');
                                                        Profiles.ListProfileLoad(groupOfProfiles);
                                                    },
                                                    failure: function (response, options) {
                                                        Ext.Msg.alert('Status', 'Что-то пошло не так!');
                                                    }
                                                }
                                            );
                                        }
                                    });

                            }
                        }
                    }
                }]
        });

        storeProfile.load({params: {idgroupOfProfiles: groupOfProfiles.idgroupOfProfiles}});
        renderToWorkArea(west);
    };
});


