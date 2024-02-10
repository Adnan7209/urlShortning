const shortid = require("shortid");
// import { nanoid } from 'nanoid'
const URL = require("../models/url");

const handleGenerateNewShortUrl = async(req,res) => {
    const body = req.body;
    if(!body.url)
        return res.status(400).json({error:"url is required"});
    const shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
    })
    return res.json({id:shortID});
}

module.exports = {handleGenerateNewShortUrl}