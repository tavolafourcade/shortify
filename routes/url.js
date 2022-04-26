const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const config = require('config')
const Url = require('../models/Url')
const { nanoid } = require('nanoid')
/* This file contains the logic needed to create the short Url */

// @route    POST /api/url/shorten
// @desc     Create short URL
router.post('/shorten', async (req,res)=>{
  const {longUrl} = req.body
  const baseUrl = config.get('baseUrl')

  // Check base url
  if(!validUrl.isUri(baseUrl)){
    return res.status(401).json('Invalid base url')
  }

  // Create url code
  const urlCode = nanoid(6)

  // Check if long Url is valid
  if (validUrl.isUri(longUrl)){
    try {
      let url = await Url.findOne({longUrl})

      if(url) {
        res.json(url)
      } else {
        const shortUrl = baseUrl + '/' + urlCode

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        })

        await url.save()

        res.json(url)
      }
    } catch (error) {
      console.log(error)
      res.status(500).json('Server error')
    }
  } else {
    res.status(401).json('Invalid long url')
  }})


module.exports = router