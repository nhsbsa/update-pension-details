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
        res.redirect('membership-number');
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
        req.session.data['membership-number-known'] =
            req.body['membership-number-known'];
    
        if (req.body['membership-number-known'] === 'yes') {
            req.session.data['membership-number'] =
                req.body['membership-number'];
    
            res.redirect('enter-your-name');
        } else {
            res.redirect('enter-national-insurance-number');
        }
    });

//What is your name page
router.post('/enter-your-name', (req, res) => {
    res.redirect('enter-date-of-birth')
});

 // What is your national insurance number page
 router.post('/enter-national-insurance-number', (req, res) => {

    req.session.data['national-insurance-number'] =
        req.body['national-insurance-number'];

    res.redirect('enter-your-name');

});

//What is your date of birth page
router.post('/enter-date-of-birth', (req, res) => {
    res.redirect('enter-your-email')
});

//What is your email address
router.post('/enter-your-email', (req, res) => {
    res.redirect('enter-your-phone-number')
});

//Updating your address content page
router.post('/updating-your-address', (req, res) => {
    res.redirect('enter-your-old-postcode')
});

//What is your phone number page
router.post('/enter-your-phone-number', (req, res) => {
    res.redirect('updating-your-address')
});

// What is your old postcode page
router.post('/enter-your-old-postcode', (req, res) => {
    const postcode = req.body['oldPostcode'];

    // Check whether the postcode matches a basic UK postcode format
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

    if (!postcode || !postcodeRegex.test(postcode.trim())) {
        return res.redirect('no-address-found');
    }

    res.redirect('select-your-old-address');
});

//No address found page
router.post('/no-address-found', (req, res) => {
    res.redirect('enter-your-old-postcode')
});

//Enter your previous address manual not in the UK page
router.post('/enter-in-previous-address-not-uk', (req, res) => {
    res.redirect('enter-your-new-postcode')
});

//Enter your previous address manual UK page
router.post('/enter-in-previous-address-uk', (req, res) => {
    req.session.data['previousAddressEntryMethod'] = 'manual';

    req.session.data['previousAddressLine1'] = req.body['previousAddressLine1'];
    req.session.data['previousAddressLine2'] = req.body['previousAddressLine2'];
    req.session.data['previousAddressTown'] = req.body['previousAddressTown'];
    req.session.data['previousAddressCounty'] = req.body['previousAddressCounty'];
    req.session.data['previousAddressCountry'] = req.body['previousAddressCountry'];
    req.session.data['previousAddressPostcode'] = req.body['previousAddressPostcode'];

    res.redirect('enter-your-new-postcode');
});

//Select your old address page
router.post('/select-your-old-address', (req, res) => {
    req.session.data['previousAddressEntryMethod'] = 'selected';
    req.session.data['previousAddress'] = req.body['previousAddress'];

    res.redirect('enter-your-new-postcode');
});

//What is your new postcode page
router.post('/enter-your-new-postcode', (req, res) => {
    res.redirect('select-your-new-address')
});

// Select your new address page
router.post('/select-your-new-address', (req, res) => {
    req.session.data['newAddress'] = req.body['newAddress'];

    // Make sure the selected address is displayed instead of manual entry
    req.session.data['newAddressEntryMethod'] = 'selected';

    res.redirect('/v1/check-your-answers');
});

//Enter your new address manual UK page
router.post('/enter-in-new-address-uk', (req, res) => {
    req.session.data['newAddressEntryMethod'] = 'manualNew';

    req.session.data['newAddressLine1'] = req.body['newAddressLine1'];
    req.session.data['newAddressLine2'] = req.body['newAddressLine2'];
    req.session.data['newAddressTown'] = req.body['newAddressTown'];
    req.session.data['newAddressCounty'] = req.body['newAddressCounty'];
    req.session.data['newAddressCountry'] = req.body['newAddressCountry'];
    req.session.data['newAddressPostcode'] = req.body['newAddressPostcode'];

    res.redirect('check-your-answers');
});

//Check your answers page
router.post('/check-your-answers', (req, res) => {
    res.redirect('confirmation')
});

module.exports = router
