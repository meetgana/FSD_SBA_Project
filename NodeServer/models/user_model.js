var mongoose = require ('mongoose');
const autoIncrement= require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema;

/* var options = {
    toObjects :{ virtuals: true },
    toJSON :{ virtuals: true} 

}
*/

/* let User = new Schema({
    UserID      : {type: Number },
    FirstName   : {type: String, required: true},
    LastName    : {type: String, required: true},
    EmployeeID  : {type: Number, required: true},        
    TaskID      : {type: Number, default: null},   
    ProjectID   : {type: Number, default: null},       
    }, options, {collection: 'users'}
);
*/
let User = new Schema({
    UserID      : {type: Number },
    FirstName   : {type: String, required: true},
    LastName    : {type: String, required: true},
    EmployeeID  : {type: Number, required: true},        
    TaskID      : {type: Number, default: null},   
    ProjectID   : {type: Number, default: null},       
    }, {collection: 'users'}
);

User.plugin (autoIncrement, {inc_field : 'UserID'})
    
module.exports = mongoose.model('User', User);