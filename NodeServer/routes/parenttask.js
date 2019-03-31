const express       = require('express');
const router        = express.Router();
const ParentTask    = require ('../models/parenttask_model');

// Create new parent Task 
router.post('/add', (req, res) => {
    let parenttaskData = req.body
    let parenttask = new ParentTask(parenttaskData)
    parenttask.save((err, parenttaskData) => {
      if (err) {
        res.status(400).send({"Success": false, "Message":"Unable to add new parent Task"})    
      } else {
        res.status(200).json({"Success": true})
      }
    });
});

//retrieve parent tasks 
router.get('/',  (req, res) => {
    var Query = ParentTask.find();
    var queryparams = req.query;
    if (queryparams.searchKey) {
        Query.or([
            { 'Parent_Task': { $regex: queryparams.searchKey, $options: 'i' } }]);
    }
    Query.exec(function (err, parenttasks) {
        if (err) {
            res.json({ 'Success': false })
        }
        else {
            res.json({ 'Success': true, 'Data': parenttasks });
        }
    });
});

//get parent task using parent task id
router.get('/:id',  (req, res) => {
    let parentTaskId = req.params.id;

    ParentTask.findOne({ ParentID: parentTaskId }, (err, parenttask) => {
        if (err) {
            res.json({ 'Success': false, 'Message': 'Parent task not found' })
        }
        else {
            res.json({ 'Success': true, 'Data': parenttask });
        }
    });
});

module.exports = router;