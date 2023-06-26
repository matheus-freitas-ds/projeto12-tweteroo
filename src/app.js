import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body;

    users.push({ username, avatar });

    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;
    const usernameError = users.find((user) => user.username === username);

    if (!usernameError) {
        return res.send('UNAUTHORIZED');
    };

    tweets.push({ username, tweet });

    res.send('OK');
});

app.get('/tweets', (req, res) => {
    const feed = tweets.map((element) => {
        const user = users.find((u) => u.username === element.username);
        return { ...element, avatar : user.avatar }
    });

    if (feed.length > 10){
        const feedLimit = feed.slice(-10);
        return res.send(feedLimit);
    }

    res.send(feed);
});

app.listen(5000, () => console.log("niceeee"));