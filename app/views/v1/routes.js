// External dependencies
const express = require('express')

const router = express.Router()

// Add your routes here - above the module.exports line

//Start page
router.post('/start', (req, res) => {
    res.redirect('update-other-details')
});

//Update other details page
router.post('/update-other-details', (req, res) => {
    res.redirect('member-type')
});

//Member type page
router.post('/member-type', (req, res) => {
    const selection = req.session.data['memberType']

    if (selection == 'active') {
        //redirect to Access to ESR page
        res.redirect('access-to-esr');
    } else {
        //redirect to change your details route
        res.redirect('change-address');
    }
    });

    //Access to ESR page
router.post('/access-to-esr', (req, res) => {
    const selection = req.session.data['esrAccess']

    if (selection == 'yes') {
        //redirect to Access to ESR page
        res.redirect('use-esr-to-update-address');
    } else {
        //redirect to change your details route
        res.redirect('are-you-a-dental-practitioner');
    }
    });

    //Are you a dental practitioner page
router.post('/are-you-a-dental-practitioner', (req, res) => {
    const selection = req.session.data['dental']

    if (selection == 'yes') {
        //redirect to Access to Compass
        res.redirect('access-to-compass');
    } else {
        //redirect to change your details route
        res.redirect('let-your-employer-know');
    }
    });

     // Do you know your membership number page
router.post('/membership-number', (req, res) => {
    const selection = req.session.data['membership-number-known'];

    if (selection === 'yes') {
        // Redirect to name page
        res.redirect('enter-your-name');
    } else {
        // Redirect to national insurance number page
        res.redirect('enter-national-insurance-number');
    }
});

//What is your name page
router.post('/enter-your-name', (req, res) => {
    res.redirect('enter-date-of-birth')
});

//What is your national insurance number page
router.post('/enter-national-insurance-number', (req, res) => {
    res.redirect('enter-your-name')
});

module.exports = router
