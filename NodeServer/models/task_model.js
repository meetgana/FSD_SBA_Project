const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoInc= require('mongoose-sequence')(mongoose)


let Task = new Schema({
    TaskID          : {type: Number },
    Parent          : {type: Schema.Types.ObjectId, ref: 'ParentTask' },
    Project         : {type: Schema.Types.ObjectId, ref: 'Project' },
    Task            : {type: String, required: true},
    StartDate       : {type: Date, default: null},
    EndDate         : {type: Date, default: null},        
    Priority        : {type: Number},   
    Status          : {type: Number, default: 0},   
    User            : {type: Schema.Types.ObjectId, ref: 'User' }    
    }, {collection: 'tasks'}
);

Task.plugin(autoInc, {inc_field: 'TaskID'});
module.exports = mongoose.model('Task', Task);