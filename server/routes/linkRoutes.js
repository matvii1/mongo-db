import express from 'express';
import Link from '../models/Link.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import config from 'config';
import shortid from 'shortid';

export const linkRouter = express.Router();

linkRouter.post('/generate', authMiddleware, async (req, res, next) => {
  try {
    const BASE_URL = config.get('baseUrl');
    const { from } = req.body;
    
    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.send({ link: existing });
    }

    const to = BASE_URL + '/t/' + code;

    const newLink = new Link({
      from, to, code, owner: req.user.userId,
    });

    await newLink.save();
    
    res.status(201).json({ link: newLink });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong123" });
  }
})

linkRouter.get('/detail', authMiddleware, async (req, res, next) => {
  try {
    const allLinks = await Link.find({ owner: req.user.userId });

    res.send(allLinks);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong123" });
  }
})

linkRouter.get('/detail/:linkId', authMiddleware, async (req, res, next) => {
  try {
    const { linkId } = req.params;

    const foundLink = await Link.findById(linkId);

    res.send(foundLink);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong123" });
  }
})
