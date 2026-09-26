const express = require("express");
const fs = require("node:fs");

const app = express();
const port = 3000;

let id = 1;

function readFile() {
    let users = fs.readFileSync("./users.json").toString();
    if (users === "") users = "[]";

    users = JSON.parse(users);
    return users;
}

function writeFile(users) {
    users = JSON.stringify(users, null, 4);

    fs.writeFileSync("./users.json", users);
}

app.use(express.json());

// Q-1
app.post("/user", (req, res) => {
    const data = req.body;

    let users = readFile();

    if (users.find((user) => user.email === data.email))
        return res.json({ message: "Email already exists." });

    users.push({ ...data, id });
    ++id;
    writeFile(users);

    res.json({ messsage: "User added successfully." });
});

// Q-2
app.patch("/user/:id", (req, res) => {
    const data = req.body;
    const id = req.params.id;

    const users = readFile();

    const user = users.findIndex((user) => user.id === +id);

    if (user === -1)
        return res.json({
            message: "User ID not found",
        });

    users[user] = { ...users[user], ...data };

    writeFile(users);

    res.json({
        message: `User ${Object.keys(user).join(" ")} updated successfully`,
    });
});

// Q-3
app.delete("/user/:id", (req, res) => {
    const { id } = req.params;

    let users = readFile();

    const user = users.findIndex((user) => user.id === +id);

    console.log(user);
    if (user === -1)
        return res.json({
            message: "User ID not found",
        });

    users = users.filter((user) => user.id !== +id);

    writeFile(users);

    res.json({ message: "User deleted successfully" });
});

// Q-4
app.get("/user/getByName", (req, res) => {
    const { name } = req.query;

    const users = readFile();

    const user = users.find((user) => user.name === name);

    if (!user) return res.json({ message: "User name not found." });

    res.json(user);
});

// Q-5
app.get("/user", (req, res) => {
    const users = readFile();
    res.json(users);
});

// Q-6
app.get("/user/filter", (req, res) => {
    const { minAge } = req.query;

    let users = readFile();

    users = users.filter((user) => user.age >= minAge);

    if (users.length === 0) return res.json({ message: "No user found" });

    res.json(users);
});

// Q-7
app.get("/user/:id", (req, res) => {
    const { id } = req.params;

    const users = readFile();

    const user = users.find((user) => user.id === +id);

    if (!user) return res.json({ message: "User not found." });

    res.json(user);
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
