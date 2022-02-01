
function postLoginController(req, res) {
    res.status(200).json({'status':'ok'})
}

function postSignupController(req, res) {
    res.status(200).json({'status':'ok'})
}

function getfailloginController(req, res) {
    res.status(401).json({'status':'getfailloginController'})
}

function getfailsignupController(req, res) {
    res.status(401).json({'status':'getfailsignupController'})
}

function getlogoutController(req, res) {
    res.status(200).json({'status':'ok'})
}

export { postLoginController, postSignupController, getfailloginController, getfailsignupController, getlogoutController }