const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    localApplicationHisoty:{
        type: Object
    },
    browserHistory:{
        type: Object
    },
    events:{
        type: Object

    },
    userRef:{
            type: Schema.Types.ObjectId
    }
}, {timestamps: true} );


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;









//   imageName: 'electron.exe',
//   pid: 11552,
//   sessionName: 'Console',
//   sessionNumber: 1,
//   memUsage: 76156928,
//   status: 'Running',
//   username: 'CYBERSPACE\\ahsab',
//   cpuTime: 1,
//   windowTitle: 'Task Time',
//   events: { keypress: 0, mousemove: 62.8, mouseclick: 0.6 }
