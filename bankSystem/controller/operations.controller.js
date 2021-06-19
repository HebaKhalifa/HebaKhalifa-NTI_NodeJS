const dbConnection = require('../db/db');
const {ObjectID}=require('mongodb');







const addPOST = (req, res) => {
    data = req.body
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('operations').insertOne(data, (error, result)=>{
            if(error) console.log(error);
            else{
                console.log(result);
            } 
        })
    })
    res.redirect('/');
}
const addView = (req, res) => {
    res.render('operations/add');
}
/************ */

const showSummary = (req, res) => {
    dbConnection(db=>{
        if(!db) return console.log('error');
        db.collection('operations').find().toArray((err, summary)=>{
            if(err)console.log(err);
            else {
                console.log(summary);
                res.render('operations/home', {summary});
            }
        });
    });
}



const showoperationDetails = (req, res) => {
    let id = req.params.id;
    dbConnection(db=>{
        db.collection('operations').findOne({_id:new ObjectID(id)}, (err, operation)=>{
            res.render('operations/single', {operation});
        });
    });
}
/********************* */

const deleteOperation = (req, res) => {
    let id = req.params.id
    dbConnection(db=>{
        db.collection('operations').deleteOne({_id:new ObjectID(id)})
        .then(data=>{res.redirect('/')})
        .catch(e=>{});
    });
}
/*********************** */

const editoperationView = (req, res) => {
    let id = req.params.id;
    dbConnection(db=>{
        db.collection('operations').findOne({_id:new ObjectID(id)}, (err, operation)=>{
            res.render('operations/add', {operation});
        });
    });
}

const editoperationPOST = (req, res) => {
    let id = req.params.id
    let newoperation=req.body;
    console.log(req.query);
    dbConnection(db=>{
        db.collection('operations').updateOne({_id:new ObjectID(id)},
        {$set:{
            amount:newoperation.amount,
            date:newoperation.date,
            location:newoperation.location
        }
    }).then(res.redirect('/'))
        .catch(e=>{});
    });
}

// const editTask = (req, res) => {
//     const id = req.params.id;
//     const allTasks = taskHelper.readData();
//     data = {
//         pageTitle: 'edit Task',
//         record: undefined,
//         errors: [],
//         errorStatus: false
//     }
//     data.record = allTasks.find(task => task.id == id);
//     if (!data.record) {
//         data.errors.push('Task is not found');
//         data.errorStatus = true;
//     } else {
//         if (Object.keys(req.query).length != 0) {
//             if (req.query.title == '') data.errors.push('invalid title');
//             if (req.query.content == '') data.errors.push('invalid content');
//             if (data.errors.length == 0) {
//                 data.record.title = req.query.title;
//                 data.record.content = req.query.content;
//                 req.query.status == 'on' ? data.record.status = true : data.record.status = false;
//                 taskHelper.writeData(allTasks);
//                 res.redirect('/');
//             } else {
//                 data.errorStatus = true;
//             }
//         }
//     }
//     res.render('add', data);
// }


module.exports = { 
    addView,
    addPOST,
    editoperationView,
    editoperationPOST,
    showSummary,
    showoperationDetails,
    deleteOperation,
    
}