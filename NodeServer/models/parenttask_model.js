const mongoose = require('mongoose');
const autoInc= require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;


let ParentTask = new Schema({
    ParentID        : {type: Number },
    ParentTask      : {type: String, required: true},
    ProjectID       : {type: Number, default: null}  
    }, {collection: 'parenttasks'}
);

ParentTask.plugin(autoInc, {inc_field: 'ParentID'});
module.exports = mongoose.model('ParentTask', ParentTask);