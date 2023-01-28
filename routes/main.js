const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const productsController = require("../controllers/products");
const cartController = require("../controllers/cart");
const passport = require("passport")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, productsController.getProfile);
router.get("/cart", ensureAuth, cartController.getCart);
router.get("/feed", ensureAuth, productsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);



router.get('/auth/google', passport.authenticate('google', { scope: ['profile']}))

router.get('/auth/google/callback', 
passport.authenticate('google', {failureRedirect: '/'}), (req,res) => {
    res.redirect('/')
}
)

router.get('/logout', (req,res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

module.exports = router;
