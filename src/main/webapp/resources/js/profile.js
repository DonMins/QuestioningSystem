Ext.onReady( function () {
    var win;
    Profiles.ListProfileLoad = function (idgroupOfProfiles) {
        var storeProfile =  Ext.create('Ext.data.Store', {
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
            split: true,
            closable: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'gridpanel',
                    store: storeProfile,
                    iconCls: 'icon-grid',
                    columnLines: true,
                    enableLocking: true,
                    columns: [
                        {
                            xtype: 'rownumberer'
                        },

                        {
                            dataIndex: 'nameProfile',
                            text: '',
                            flex: 1
                        }
                    ],
                    plugins:[
                        {
                            ptype:'rowexpander',
                            rowBodyTpl:new Ext.XTemplate(
                                '<div><b>Описание:</b>{description}</div>'
                            )
                        }
                    ],
                    listeners: {
                        itemclick: function (s, r) {
                             QuestionAndAnswer.ProfileLoad(r.raw.idgroupOfProfiles, r.raw.idProfile);
                        }
                    }
                }],
        });

        storeProfile.load( { params:{idgroupOfProfiles: idgroupOfProfiles} } );
        renderToWorkArea( west );
    };

    QuestionAndAnswer.ProfileLoad = function (idgroupOfProfiles , idProfile) {
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
                        var size  = record.data.answerOptions.length;
                        for (let i = 0; i <size; i++) { // нет необходимости в "начале"
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
                items:[groupRadio]

            });

            storeQuestionAndAnswer.load( { params:{idgroupOfProfiles: idgroupOfProfiles ,idProfile: idProfile },
                callback: function() {
                    this.each(function (record) {
                        console.log(record.data.nameQuestion);
                         var size  = record.data.answerOptions.length;
                         for (let i = 0; i <size; i++) {
                             console.log(record.data.answerOptions[i].nameAnswerOptions);
                             radioArray.push(record.data.answerOptions[i].nameAnswerOptions);
                         }
                    });
                }});

        }
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }

    }
});


