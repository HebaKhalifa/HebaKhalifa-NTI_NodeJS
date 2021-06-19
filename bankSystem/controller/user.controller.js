const dbConnection = require('../db/db');
const {ObjectID}=require('mongodb');
const operationsController = require('../controller/operations.controller');


const LoginView = (req, res) => {
    
    res.render('users/add', {userLogin:true});
    
}
const LoginPOST = (req, res) => {
    userLogin = req.body;
    dbConnection(db => {
        
        db.collection('users').findOne( {userName:userLogin.userName , password:userLogin.password}, (err, user)=>{
            if(user){
                req.session.userSession=1;
                s={userSession:req.session.userSession};
                console.log(s);
                res.redirect('/');
            } else{
                res.render('users/add', {loginMessage:true});
            }
        });
    });
}


const addUserPOST = (req, res) => {
    data = req.body
    dbConnection(db => {
        if(!db) return console.log('database error')
        db.collection('users').insertOne(data, (error, result)=>{
            if(error) console.log(error);
            else{
                console.log(result);
            } 
        })
    })
    res.redirect('/allUsers');
}
const addUserView = (req, res) => {
    res.render('users/add');
}
/************ */

const showAllUsers = (req, res) => {
    dbConnection(db=>{
        if(!db) return console.log('error');
        db.collection('users').find().toArray((err, users)=>{
            if(err)console.log(err);
            else {
                console.log(users);
                res.render('users/all', {users});
            }
        });
    });
}



const showSingleUser = (req, res) => {
    let id = req.params.id;
    dbConnection(db=>{
        db.collection('users').findOne({_id:new ObjectID(id)}, (err, user)=>{
            res.render('users/single', {user});
        });
    });
}
/********************* */

const deleteUser = (req, res) => {
    let id = req.params.id
    dbConnection(db=>{
        db.collection('users').deleteOne({_id:new ObjectID(id)})
        .then(data=>{res.redirect('/allUsers')})
        .catch(e=>{});
    });
}
/*********************** */

const editUserView = (req, res) => {
    let id = req.params.id;
    dbConnection(db=>{
        db.collection('users').findOne({_id:new ObjectID(id)}, (err, user)=>{
            res.render('users/add', {user});
        });
    });
}

const editUserPOST = (req, res) => {
    let id = req.params.id
    let newUser=req.body;
    console.log(req.query);
    dbConnection(db=>{
        db.collection('users').updateOne({_id:new ObjectID(id)},
        {$set:{
            userName:newUser.userName,
            password:newUser.password
        }
    }).then(res.redirect('/allUsers'))
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
    addUserView,
    addUserPOST,
    editUserPOST,
    editUserView,
    showAllUsers,
    showSingleUser,
    deleteUser,
    LoginView,
    LoginPOST
}