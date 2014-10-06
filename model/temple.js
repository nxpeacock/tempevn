Temples = new Meteor.Collection('temples');

var Schemas = {};

Schemas.Temple = new SimpleSchema({
    title: {
        type: String,
        label: 'Tên',
        max: 200
    },
    otherTitle: {
        type: String,
        label: 'Tên khác',
        max: 200,
        optional: true
    },
    address : {
        type : String,
        label : 'Địa chỉ',
        max : 500,
        optional: true
    },
    content : {
        type : String,
        label : 'Nội dung',
        optional: true
    },
    wikiTitle : {
        type : String,
        label : 'Wikipedia',
        optional: true
    },
    lat : {
        type : Number,
        label : 'Vĩ độ',
        decimal : true
    },
    long : {
        type : Number,
        label : 'Kinh độ',
        decimal : true
    }
});

Temples.attachSchema(Schemas.Temple);

Temples.allow({
    insert : function(){return true;}
})