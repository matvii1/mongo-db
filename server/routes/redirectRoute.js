import express from "express";
import Link from "../models/Link.js";

export const redirectRouter = express.Router();

redirectRouter.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    
    if (link) {
      if (link.clicks == undefined) {
        link.clicks = 1;
      } else {
        link.clicks += 1;
      }
      
      await link.save();
      res.redirect(link.from);
    }

    res.status(404);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong123" });
  }
})