const shortid = require("shortid");
// import { nanoid } from 'nanoid'
const URL = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.render("home",{
    id:shortID
  });
  // return res.json({ id: shortID });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne( {shortId} );
//   if(!result)
//     return res.status(400).json({error:"cannot find id"});
  return res.json({
    totalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
};

module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
