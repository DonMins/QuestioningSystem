var storeGroupOfProfile = Ext.define('storeGroupOfProfile',
    {
        extend:'Ext.data.Store',
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

var storeProfile = Ext.define('storeProfile', {
    extend:'Ext.data.Store',
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

var storeQuestion = Ext.define('storeQuestion', {
    extend:'Ext.data.Store',
    model: 'Question.model',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: urlJSONQuestion,
        reader: {
            type: 'json',
            root: 'Question'
        }
    }
});

var storeAnswer = Ext.define('storeAnswer', {
    extend:'Ext.data.Store',
    model: 'AnswerOption.model',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: urlJSONAnswer,
        reader: {
            type: 'json',
            root: 'answeroptions'
        }
    }
});
