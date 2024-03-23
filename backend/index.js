var express = require('express');
var app = express();
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');


app.use('/', router);


// Middleware for parsing JSON bodies
router.use(express.json());
router.use(cors('/'));


app.listen(3001, () => {

    console.log('Server Started !');

})

const uri = `mongodb+srv://root:root@cluster0.5roqgjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri).then(() => {
    console.log(`Connected to MongoDB`);
})

var UserSchema = mongoose.Schema({
    user_name: String,
    email: String,
    password: String,
    todos: [{
        title: String,
        msg: String,
        isComplete: Boolean,
        timestamp: Date
    }]
});

var User = mongoose.model("users", UserSchema);

router.get('/', (req, res) => {
    User.find({}).then((usr)=>{
        res.send(usr);
    })
})

router.post('/user', (req, res) => {

    User.find({_id : req.body._id}).then(usr => {
        res.send(usr);
    })

})

router.post('/signup', async (req, res) => {

    const newUser = new User({

        user_name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const hasAccount = await User.findOne({ email: req.body.email });

    if (hasAccount) {
        res.send('User already exists');
    } else {
        newUser.save().then((usr) => {
            res.send(usr);
        })
    }

})

router.post('/signin', async (req, res) => {

    const hasAccount = await User.findOne({ email: req.body.email, password: req.body.password });

    if (hasAccount) {
        res.send(hasAccount);
    } else {
        res.send("No user found!");
    }

})

router.put('/newtodo', (req, res) => {

    const newTodo = {
        title: req.body.title,
        msg: req.body.msg,
        isComplete: false,
        timestamp: new Date().getTime()
    };

    User.findOneAndUpdate(
        { email: req.body.email },
        { $push: { todos: newTodo } }
    ).then(updatedUser => {

        if (updatedUser) {
            res.send(updatedUser);
        } else {
            res.send("User not found!");
        }

    })

});

router.put('/setcomplete', (req, res) => {


    User.findOne(
        { email: req.body.email }
    ).then(user => {

        if (user) {

            const todo = user.todos.find(t => t._id == req.body._id);

            todo.isComplete = !todo.isComplete;

            user.save().then(updateduser => {
                res.send(updateduser);
            })

        } else {

            res.send("User or todo not found!");

        }
    })
});
