var express = require('express');
var app = express();
var router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');


app.use('/', router);


// Middleware for parsing JSON bodies
router.use(express.json());
router.use(cors({
    origin : 'https://ab-h-i-n-todo-server.vercel.app'
}));


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
    User.find({}).then((usr) => {
        res.send(usr);
    })
})

router.post('/user', (req, res) => {

    User.findOne({ _id: req.body._id }).then(usr => {

        if (usr) {

            res.json({
                error: null,
                data: {
                    _id: usr._id,
                    user_name: usr.user_name,
                    email: usr.email,
                    todos: usr.todos
                }
            });

        } else {

            res.status(404).json({
                error: "User not found!",
                data: null
            });
        }

    })

})

router.post('/signup', async (req, res) => {


    const hasAccount = await User.findOne({ email: req.body.email });

    if (hasAccount) {

        res.status(404).json({
            error: "User already exist!",
            data: null
        });

    } else {

        const saltRound = 10;

        bcrypt.hash(req.body.password, saltRound, (err, hash) => {

            if (err) {

                res.status(404).json({
                    data: null,
                    error: err
                })

            } else {

                const newUser = new User({

                    user_name: req.body.name,
                    email: req.body.email,
                    password: hash
                })

                newUser.save().then((usr) => {

                    res.json({
                        error: null,
                        data: {
                            _id: usr._id,
                            user_name: usr.user_name,
                            email: usr.email,
                            todos: usr.todos
                        }
                    });

                })

            }

        })

    }

})

router.post('/signin', async (req, res) => {

    const hasAccount = await User.findOne({ email: req.body.email });

    if (hasAccount) {

        const userPassInDb = hasAccount.password;

        bcrypt.compare(req.body.password, userPassInDb, (err, result) => {

            if (err) {

                res.json({

                    data: null,
                    error: err

                })

            } else {

                if (result) {

                    res.json({

                        data: {
                            _id: hasAccount._id,
                            user_name: hasAccount.user_name,
                            email: hasAccount.email,
                            todos: hasAccount.todos
                        },
                        error: null
                    })

                } else {

                    res.json({

                        data: null,
                        error: 'Invalid email or password'

                    })

                }

            }

        })


    } else {

        res.status(404).json({
            error: "Invalid email or password",
            data: null
        });
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
        { _id: req.body._id },
        { $push: { todos: newTodo } }
    ).then(updatedUser => {

        if (updatedUser) {
            res.json({
                error: null,
                data: {
                    _id: updatedUser._id,
                    user_name: updatedUser.user_name,
                    email: updatedUser.email,
                    todos: updatedUser.todos
                }
            })
        } else {
            res.status(404).json({
                error: "User not found!",
                data: null
            });
        }

    })

});

router.put('/setcomplete', (req, res) => {

    User.findOne(
        { _id: req.body._id }
    ).then(user => {

        if (user) {

            const todo = user.todos.find(t => t._id == req.body.todo_id);

            if (todo) {

                todo.isComplete = !todo.isComplete;

                user.save().then(updateduser => {
                    res.json({
                        error: null,
                        data: {
                            _id: updateduser._id,
                            user_name: updateduser.user_name,
                            email: updateduser.email,
                            todos: updateduser.todos
                        }
                    });
                })

            } else {

                res.json({

                    error: "Todo not found!",
                    data: null

                });

            }

        } else {

            res.status(404).json({

                error: "User not found!",
                data: null

            });

        }
    })
});

router.delete('/deletetodo', (req, res) => {

    User.findOne({ _id: req.body._id }).then(usr => {

        if (!usr) {

            res.json({
                data: null,
                error: 'User not found!'
            })

        } else {

            const todo = usr.todos.find(toDo => toDo._id == req.body.todo_id);

            if (todo) {

                usr.todos.pull(todo);

                usr.save().then(() => {
                    res.json({
                        error: null,
                        data: {
                            _id: updateduser._id,
                            user_name: updateduser.user_name,
                            email: updateduser.email,
                            todos: updateduser.todos
                        }
                    });
                })

            } else {

                res.status(404).json({
                    error: 'Todo not found!',
                    data: null
                })

            }

        }

    })

})