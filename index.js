const express = require("express");
const { connectToMongoDb } = require("./connect");

const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error ", err));

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
