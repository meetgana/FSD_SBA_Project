const mongoose = require('mongoose');
const autoInc= require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;
const Task = require('./task_model');

let Project = new Schema({
    ProjectID       : {type: Number },
    Project         : {type: String, required: true},
    StartDate       : {type: Date, default: null},
    EndDate         : {type: Date, default: null},        
    Priority        : {type: Number},   
    ManagerID       : {type: Number, default: null},       
    }, {collection: 'projects'}
);

Project
.virtual('Tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'Project'
});

Project
.virtual('TotalTasks').get(function ()  {
  return this.get('Tasks') ? this.get('Tasks').length : 0;
});

Project
.virtual('CompletedTasks').get( function() {
  if (this.get('Tasks') && this.get('Tasks').length > 0) {
    var tasks = this.get('Tasks').filter( (task) => {
      return task.Status == 1;
    });
    return tasks.length;
  }
  else {
    return 0;
  }
});


Project.plugin(autoInc, { inc_field: 'ProjectID' })
    
module.exports = mongoose.model('Project', Project);