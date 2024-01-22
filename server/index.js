const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const { createClient } = require("redis");
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const secretkey = "heheHaHa_Secret-Key";

const authenticationTokenMiddleware = (req,res,next) => {
  const {token} = req.header('Authorization');

  if(!token){
    return res.status(403).json({ message: 'Forbidden' });
  }
  if(token){
    jwt.verify(token,secretkey,(err,decoded)=>{
      if (err) {
        console.error('JWT Verification Failed:', err.message);
      } else {
        console.log('Decoded JWT:', decoded);
        next();
      }
    })
  }
}

const client = createClient({
  password: "Fh0nxlfAFUjWgThhhF1lszzEiMZI5gno",
  socket: {
    host: "redis-16147.c281.us-east-1-2.ec2.cloud.redislabs.com",
    port: 16147,
  },
});

client
  .connect()
  .then(() => {
    console.log("Connected to Redis!");
  })
  .catch((err) => {
    console.log("Error while connecting!: ", err);
  });

client.on("error", (err) => {
  console.error(`Redis connection error: ${err}`);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userInfo = await client.hGetAll(`users:${username}`, (err) => {
    if (err) console.err(err);
  });
  if (username === userInfo.username && password == userInfo.password) {
    const tokenResponse = jwt.sign({username, password},secretkey,{expiresIn: '1h'})
    // res.status(200).send(JSON.stringify({username, password}));
    res.status(200).json({token: tokenResponse});
  } else {
    res.status(401).json({message: 'Invalid Credentials! Authentication Failed.'});
  }
});
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  await client
    .hSet(`users:${username}`, {
      username: username,
      password: password,
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Post Req Failed!");
    });
  res.status(200).send(JSON.stringify({username, password}));
});

app.post("/tasks", async (req, res) => {
  const { name, task } = req.body;
  await client.sAdd(`tasks:${name}`, task).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
  res.status(200).json(req.body);
});

app.delete("/tasks", async (req, res) => {
  await client.sRem(`tasks:${req.body.name}`, req.body.task).catch((err) => {
    console.err(err);
    res.status(400).json(err);
  });
  res.status(200).json(req.body);
});

app.get('/protected',authenticationTokenMiddleware,(req,res)=>{
  res.json({message: "Authenticated! Access Approved..."});
})

app.listen(port, () => {
  console.log(`Server running at Port: ${port}`);
});
