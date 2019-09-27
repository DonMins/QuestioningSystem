Ext.onReady(function () {
    var showQuestionary;
    GroupOfProfiles.passSurveyGroupProfileLoad = function () {
        var storeGroupOfProfile = Ext.create('storeGroupOfProfile');

        var groupProfilePanel = Ext.create('Ext.Panel', {
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
                        },
                    ],
                    listeners: {
                        cellclick: function (grid, td, cellIndex, record, tr, rowIndex) {
                            if (cellIndex === 0 || cellIndex === 1) {
                                passSurveyProfileLoad(record.data);
                            }
                        }
                    }
                }],
        });
        renderToWorkArea(groupProfilePanel);
    };

    passSurveyProfileLoad = function (groupOfProfiles) {
        var storeProfile = Ext.create('storeProfile');

        var profilePanel = Ext.create('Ext.Panel', {
            title: 'Список анкет в группе: "' + groupOfProfiles.title + '"',
            region: 'center',
            maxWidth: '100%',
            collapsible: true,
            maxHeight: '100%',
            split: false,
            closable: true,

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
                            if (cellIndex === 2) {
                                var countQuestion = record.data.questionList.length;
                                console.log(countQuestion);

                                var panel = Ext.create('panel',
                                    {record: record , countQuestion: countQuestion});
                                for(let i = 0;i<countQuestion;++i) {
                                    panel.addRow(record.data.questionList[i].nameQuestion);
                                }

                                renderToWorkArea(panel);
                            }

                        }
                    }
                }]
        });

        storeProfile.load({params: {idgroupOfProfiles: groupOfProfiles.idgroupOfProfiles}});
        renderToWorkArea(profilePanel);
    };

    Ext.define('panel', {
        extend: 'Ext.Panel', initComponent: function () {
            var me = this;
            Ext.apply(me, {
                title: me.record.nameProfile,
                region: 'center',
                maxWidth: '100%',
                collapsible: true,
                maxHeight: '100%',
                split: false,
                closable: true,
                id:'panelProfile',

                bodyStyle: {
                    'background': '#e0e9f6; !important'
                },

                items: [
                    {
                        xtype: 'form',
                        trackResetOnLoad: true,
                        border:0,
                        bodyStyle: {
                            'background': '#e0e9f6; !important'
                        },


                        items: [{
                            xtype: 'textfield',
                            name: 'nameProfile',
                            width: 200,
                            height: 50,
                            inputWrapCls: 'textboxasLabel',
                            fieldCls: 'textboxasLabel',
                            readOnly: true,
                        },
                            {
                                xtype: 'textareafield',
                                name: 'description',
                                width: '100%',
                                height: 40,
                                inputWrapCls: 'description',
                                fieldCls: 'description',
                                readOnly: true,
                                autoScroll: false,
                            },
                            {

                                addRow : function(rowLabel) {
                                    this.add({
                                        xtype: 'fieldcontainer',
                                        fieldLabel: rowLabel,
                                        labelWidth: '100%',
                                        labelStyle: 'font-weight: bold; font-size: 20px;',
                                        layout: 'hbox',
                                        items: [{
                                            xtype: 'textfield',
                                            flex: 1
                                        }, {
                                            xtype: 'textfield',
                                            flex: 1
                                        }]
                                    });
                                }


                            }


                    ]}
                    ]


            });
            me.callParent();
            // if (me.record !== undefined) {
            //     me.down('form').loadRecord(me.record);
            // }

            // Ext.ComponentQuery.query('textfield[name=question1]')[0].setValue(me.record.data.questionList[0].nameQuestion);
        }
    });

});