import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post ('/sign-up', (req, res) => {
    const {username, avatar} = req.body;

    users.push({username, avatar});

    res.send('OK');
});

app.post ('/tweets', (req, res) => {
    const {username, tweet} = req.body;

    if (!username){
        return res.send('UNAUTHORIZED');
    };

    tweets.push({username, tweet});

    res.send('OK');
});

app.get ('/tweets', (req, res) => {
    if (tweets.length > 10){
        const feedlimit = tweets.slice(-10);
        return res.send(feedlimit);
    };

    res.send(tweets);
});

app.listen(5000, () => console.log("niceeee"));