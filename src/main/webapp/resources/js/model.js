Ext.define('GroupOfProfiles.model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idgroupOfProfiles', type: 'int' },
        {name: 'title', type: 'string' },
    ]
});

Ext.define('Profiles.model', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'idProfile', type: 'int' },
        {name: 'nameProfile', type: 'string' },
        {name: 'description', type: 'string' },
        {name: 'groupOfProfiles', type: Ext.data.Types.AUTO },
    ],
});

Ext.define('Question.model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idQuestion', type: 'int' },
        {name: 'type', type: 'string' },
        {name: 'nameQuestion', type: 'string' },
        {name: 'profile', type: Ext.data.Types.AUTO},
    ],
});

Ext.define('AnswerOption.model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idAnswerOptions', type: 'int' },
        {name: 'nameAnswerOptions', type: 'string' },
        {name: 'position', type: 'int' }
    ],
});
