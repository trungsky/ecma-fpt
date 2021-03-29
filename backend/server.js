const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserSchema = require("./models/user");
var cors = require("cors");
app.use(cors());
require("dotenv/config");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require("cookie-parser");
const user = require("./models/user");

app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("ok");
});

app.get("/api/getUser", async (req, res) => {
  const users = await UserSchema.find().exec();
  // res.send(users.find((user) => user.id == req.body.id))
  res.json(users);
});

app.get("/api/getUser/:id", async (req, res) => {
  const users = await UserSchema.findOne({ _id: req.params.id }).exec();
  // res.send(users.find((user) => user.id == req.body.id))
  res.json(users);
});

app.get("/api/getUser/del/:id", async (req, res) => {
  await UserSchema.findOne({ _id: req.params.id }).remove().exec();
  // res.redirect("http://localhost:8080/#/listuser");

  // res.json(test);
  // res.send(users.find((user) => user.id == req.body.id))
});

app.get("/api/getUser/update/:id", async (req, res) => {
  const user = await UserSchema.findOne(
    { _id: req.params.id },
    function (err, doc) {
      doc.name = req.body.name;
      doc.email = req.body.email;
      doc.role = req.body.role;
      doc.save();
    }
  );
  res.send(user);
  // res.redirect("http://localhost:8080/#/listuser");

  // res.json(test);
  // res.send(users.find((user) => user.id == req.body.id))
});

app.get("/login", (req, res) => {
  res.send("Ok");
});

app.get("/register", (req, res) => {
  res.send("Ok");
});

app.post("/changepass/:id", async (req, res) => {
  const users = await UserSchema.find({ _id: req.body.id }).exec();
  const { fullname, old_pass, new_pass1, new_pass2 } = req.body;

  if (fullname != users[0].name) {
    await UserSchema.update({ name: users[0].name }, { name: fullname });
    res.cookie("resStatus", "success", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/changeinfo");
  } else {
    if (old_pass != "" && new_pass1 != "" && new_pass2 != "") {
      if (old_pass != users[0].password) {
        res.cookie("resStatus", "pass0", {
          expires: new Date(Date.now() + 5000),
        });
        res.redirect("http://localhost:8080/#/changeinfo");
      } else if (new_pass1 != new_pass2) {
        res.cookie("resStatus", "repass0", {
          expires: new Date(Date.now() + 5000),
        });
        res.redirect("http://localhost:8080/#/changeinfo");
      } else {
        await UserSchema.update(
          { password: users[0].password },
          { password: new_pass1 }
        );
        res.cookie("resStatus", "success", {
          expires: new Date(Date.now() + 5000),
        });
        res.redirect("http://localhost:8080/#/changeinfo");
      }
    }
    res.cookie("resStatus", "nochange", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/changeinfo");
  }
});

app.post("/login", async (req, res) => {
  const users = await UserSchema.find().exec();
  const { email, password } = req.body;

  const user = users.find((u) => {
    return u.email === email && password === u.password;
  });

  const haveUser = users.find((u) => {
    return u.email === email;
  });

  if (!haveUser) {
    res.cookie("resStatus", "user-not-found", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/account");
  }
  if (user) {
    res.cookie("id", user.id);
    res.cookie("resStatus", "login-ok", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/user");
  } else {
    res.cookie("resStatus", "sai-pass", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/account");
  }
});

app.post("/register", async (req, res) => {
  const users = await UserSchema.find().exec();
  const { name, email, password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    if (users.find((user) => user.email === email)) {
      res.cookie("resStatus", "user_registed");
      res.redirect("http://localhost:8080/#/account");

      return;
    }

    const newUser = new UserSchema({
      name: name,
      email: email,
      password: password,
      role: 0,
    });
    newUser.save();
    res.cookie("id", newUser.id);
    res.cookie("resStatus", "register_ok", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/user");
  } else {
    res.cookie("resStatus", "passwd-khong-hop-le", {
      expires: new Date(Date.now() + 5000),
    });
    res.redirect("http://localhost:8080/#/user");
  }
});

app.listen(5000);
