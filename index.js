const http = require("http");
const express = require("express");
const _ = require("lodash");
const app = express();

const bodyParser = require("body-parser")
app.use(bodyParser.json());

const todos = [
    {
        id: 1,
        name: "Write this server",
        completed: false,
    },
    {
        id: 2,
        name: "Learn Android",
        completed: false,
    },
    {
        id: 3,
        name: "Write the android client",
        completed: false,
    },
];

app.get("/todo", (req, res) => {
    return res.send({
        _items: todos,
    });
});

app.get("/todo/:id", (req, res) => {
    const todo = _.find(todos, {id: +req.params.id});
    if (!todo) {
        return res.status(404).send();
    }
    return res.send(todo);
});

app.post("/todo", (req, res) => {
    const ids = todos.map((t) => t.id);
    console.log("ids: ", ids);
    
    const nextId = _.max(ids) + 1;
    const todo = {
        id: nextId,
        name: req.body.name,
        completed: false,
    };
    todos.push(todo);
    res.status(204).send();
});

http.createServer(app).listen(8080, () => {
    console.log("listening on 8080");
});

