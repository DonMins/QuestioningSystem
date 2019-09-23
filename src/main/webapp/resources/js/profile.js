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
                        width:750

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
                                            Profiles.ListProfileLoad();
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
        var storeProfile = Ext.create('Ext.data.Store', {
            model: 'Profiles.model',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: urlJSONProfile,
                reader: {
                    type: 'json',
                    root: 'Profile'
                }
            }
        });

        var west = Ext.create('Ext.Panel', {
            title: 'Список анкет',
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
                            flex: 1,

                            align: 'right',
                            dataIndex: 'nameProfile',
                            renderer: function (value, meta, record) {
                                var buttonText = 'Редактировать';
                                return '<a href="#">' + buttonText + '</a>';
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
                                QuestionAndAnswer.ProfileLoad(record.data);
                            }
                            if (cellIndex === 3) {
                                if (!winEditProfile || winEditProfile.isVisible() === false) {
                                    winEditProfile = Ext.create('widget.window', {
                                        title: 'Редактирование анкеты',
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
                                                width:750
                                            },

                                            {
                                                buttonAlign: 'right',
                                                buttons: [{
                                                    xtype: 'button',
                                                    text: 'Изменить',
                                                    height: 30,
                                                    renderTo: Ext.getBody(),
                                                    handler: function () {
                                                        var nameProfile = Ext.ComponentQuery.query('textfield[name=nameProfile]')[0].getValue();
                                                        var description = Ext.ComponentQuery.query('textfield[name=description]')[0].getValue();
                                                        if (nameProfile !== "") {
                                                            Ext.Ajax.request({
                                                                    url: editProfile,
                                                                    dataType: 'json',
                                                                    method: 'POST',
                                                                    headers: {
                                                                        "X-CSRF-TOKEN": token
                                                                    },
                                                                    params: {
                                                                        idProfile:record.data.idProfile,
                                                                        nameProfile: nameProfile,
                                                                        description: description,
                                                                    },
                                                                    success: function (response, options) {
                                                                        Ext.Msg.alert('Status', 'Анкета была упешно изменена');
                                                                        Profiles.ListProfileLoad();
                                                                        winEditProfile.close();
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
                                if (winEditProfile.isVisible()) {
                                    winEditProfile.close();
                                } else {
                                    winEditProfile.show();
                                }
                            }
                        }
                    }
                }]
        });

        storeProfile.load({params: {idgroupOfProfiles: groupOfProfiles.idgroupOfProfiles}});
        renderToWorkArea(west);
    };

    QuestionAndAnswer.ProfileLoad = function (groupOfProfiles) {
        var radioArray = [];
        var groupRadio = [];
        var storeQuestionAndAnswer = Ext.create('Ext.data.Store', {
            model: 'QuestionAndAnswer.model',
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: urlJSONQuestionAndAnswer,
                reader: {
                    type: 'json',
                    root: 'Question'
                }
            },
            listeners: {
                load: function (store, records) {
                    store.each(function (record) {
                        console.log(record.data.nameQuestion);
                        var size = record.data.answerOptions.length;
                        for (let i = 0; i < size; i++) {
                            console.log(record.data.answerOptions[i].nameAnswerOptions);
                            radioArray.push(record.data.answerOptions[i].nameAnswerOptions);
                        }
                        groupRadio.push(new Ext.form.RadioGroup({
                            fieldLabel: record.data.nameQuestion,
                            xtype: 'radiogroup',

                        }));

                    });
                }
            }
        });

        if (!win) {
            win = Ext.create('widget.window', {
                title: 'Layout Window',
                closable: true,
                closeAction: 'hide',
                width: 600,
                minWidth: 350,
                height: 350,
                items: [groupRadio]

            });

            storeQuestionAndAnswer.load({
                params: {idgroupOfProfiles: idgroupOfProfiles, idProfile: idProfile},
                callback: function () {
                    this.each(function (record) {
                        console.log(record.data.nameQuestion);
                        var size = record.data.answerOptions.length;
                        for (let i = 0; i < size; i++) {
                            console.log(record.data.answerOptions[i].nameAnswerOptions);
                            radioArray.push(record.data.answerOptions[i].nameAnswerOptions);
                        }
                    });
                }
            });

        }
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }

    }
});


