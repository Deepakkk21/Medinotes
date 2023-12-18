const User = require('../modals/user');
const generateToken = require('../authentication'); // Update the path accordingly

module.exports.signupPage = function(req,res){
    return res.render("Sign_up")
}

module.exports.signup = async function(req,res){
    console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;

    if(password!==confirm_password){
        // alert user password dont match
               console.log("password don't match")
               return res.redirect('back');
    }else{
        var user= await User.findOne({email:email});
        if(user){
            // alert user email exists
            console.log("email already exits");
            return res.redirect('/auth/signIn')
        }else{
           var user=await User.create({name:name,email:email,password:password});
           console.log(user);
           return res.redirect('/auth/signIn')
        }
    }
}


module.exports.signInPage = function(req,res){
    return res.render("Sign_in")
}

module.exports.signIn = async function(req,res){
    console.log(req.body);
    var email=req.body.email;
    var password=req.body.password;
    var user=await User.findOne({email:email});
    if(user){
        console.log(user);
        if(user.password===password){

            const token = generateToken(user.id);
            res.cookie('token', token, { httpOnly: true });

            console.log("welcome to profile page");
            await user.save();

            return res.redirect("/user/profile/"+user.id);
        }else{
            // alert the user about wrong password
            console.log("Wrong passord");
        return res.redirect("back")
        }
    }else{
            // alert the user that email doesnot exist ,please Signup
           console.log("email doesnot exits");
            return res.redirect("/auth/signup")
        }
    }

    
    module.exports.logout = function(req, res){
        // Clear the authentication token from cookies or session
        res.clearCookie('token'); 
        console.log('logout Sucussfully')

        // Redirect to the Sign in page
        return res.redirect('/auth/signIn');
    };
    