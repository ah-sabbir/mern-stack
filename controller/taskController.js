const { default: jwtDecode } = require('jwt-decode');
const Task = require('../model/Task');
const TaskModel = require('../model/User');

module.exports = {
    getTasks(req, res){

    },
    setTasks(req, res){
        if(!req.headers.authorization){
            return res.status(401).json({message: "user not authenticated"})
        }
        const decode = jwtDecode(req.headers.authorization);
        const { history, tasks, events } = req.body;
        console.log(tasks.length);
          const task = new Task({
            localApplicationHisoty: tasks,
            browserHistory: history,
            events: events,
            userRef: decode._id
          })
          task.save()
            .then(task=>{
                return res.json(task)
            })
            .catch(error=>{
                return res.json({error:error})
            })
          
    },
    getSingleTask(req, res){

    }
}