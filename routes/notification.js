const express = require("express");
const webpush = require("web-push");
const router = express.Router();

router.post('/notify', (req, res) => {
    //Get pushSubscription object
    const notification = req.body

    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({ title: 'Successful Linkage Request submission' });

    //Pass object into sendNotification
    webpush.sendNotification(notification, payload)
        .catch(err => console.error(err));
});

module.exports = router;