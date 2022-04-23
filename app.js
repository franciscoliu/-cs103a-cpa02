const createError = require("http-errors"); // to handle the server errors
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require("express-session"); // to handle sessions using cookies
const path = require("path");  // to refer to local paths
const auth = require('./routes/auth');
const axios = require('axios')
axios.post('https://cs103a-cpa02.herokuapp.com/', {})

// const pdf = require('html-pdf');
const expressLayouts = require('express-ejs-layouts');
const dynamicResume = require('./doc/dynamic-resume');;
const dotenv = require('dotenv')
dotenv.config()

const personal_info = require('./model/personal_info')




//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '368063580362-psa3u4jgvvl0n3foeg95ndt463dub4u1.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


const mongoose = require( 'mongoose' );
// const mongodb_URI = 'mongodb://localhost:27017/cs103a_todo'
const mongodb_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rdpsv.mongodb.net/Project?retryWrites=true&w=majority`
console.log(process.env.DB_USERNAME);
// const mongodb_URI = 'mongodb+srv://zheyuanliu:140!XuzuPe0106@cluster0.rdpsv.mongodb.net/Project?retryWrites=true&w=majority'

mongoose.connect( mongodb_URI, { useNewUrlParser: true, useUnifiedTopology: true } );
// fix deprecation warnings

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("we are connected!!!")});

const app = express();
const PORT = process.env.PORT || 5000;
const options = {
    "height": "6.28in",        // allowed units: mm, cm, in, px
    "width": "4.8in",            // allowed units: mm, cm, in, pxI
};

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));    ///Look up why is this
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
// app.use(expressLayouts);




// app.use(express.static('public'))

app.use(
    session({
      secret: "zzbbyanana789sdfa8f9ds8f90ds87f8d9s789fds", // this ought to be hidden in process.env.SECRET
      resave: false,
      saveUninitialized: false
    })
  );
  
// const auth = require('./routes/auth');
const { deflateSync } = require("zlib");
app.use(auth)

const isLoggedIn = (req,res,next) => {
    if (res.locals.loggedIn) {
      next()
    }
    else res.redirect('/login')
  }

const Administrator = (req, res, next) => {
    if (res.locals.admin) {
        next()
      }
      else res.redirect('/login')
}
app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res)=> {
    let token = req.body.token;
    // console.log(token);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        // console.log(payload);
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success');
      }).catch(console.error);
})

app.get('/userpage',checkAuthenticated, (req, res) => {
    let user = req.user;
    res.render('userpage', {user});
});

app.get('/temp', isLoggedIn, (req, res) => {
    res.render('temp');
})

app.get('/protected', Administrator, (req, res) => {
    res.render('protected.ejs');
});

app.post('/protected/byName', Administrator, 
    async(req, res, next) => {
        const name = req.body.name
        const personal = await personal_info.find({name: {'$regex': name}})
        res.json(personal)
        // res.render('protected');
});

app.post('/protected/bySchool', Administrator, 
    async(req, res, next) => {
        const school = req.body.name
        const personal = await personal_info.find({coll_name: {'$regex': school}})
        res.json(personal)
        // res.render('protected');
});

app.post('/protected/byMajor', Administrator, 
    async(req, res, next) => {
        const major = req.body.name
        const personal = await personal_info.find({$or: [{major: {'$regex': major}}, {major2: {'$regex': major}}]})
        res.json(personal)
        // res.render('protected');
});

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/login')
})

app.get('/resume-generator', (req, res) =>{
    res.redirect('/resume-generator')

});

app.get('/example_page', (req, res) => {
    res.render('example_page')
})

app.post('/resume-generator', 
    async(req, res, next) => {
        // console.log(req.body);
        const userName = req.body.name;
        const userPhone = req.body.phone;
        const useraddress = req.body.address;
        const usergithub = req.body.github;
        const useremail = req.body.email;
        const usercollege = req.body.coll_name;
        const usermajor = req.body.major;
        const usermajor2 = req.body.major2;
        const usergpa = req.body.gpa;
        const userstart = req.body.start;
        const usergrad = req.body.grad;
        const usercourse = req.body.courses;
        const userabout = req.body.about;
        const userintern1 = req.body.intern1;
        const userinpternpos1 = req.body.int_position1;
        const userintern2 = req.body.inter2;
        const userinpternpos2 = req.body.int_position2;
        const userintern3 = req.body.intern3;
        const userinpternpos3 = req.body.int_position3;
        const userres1 = req.body.research1;
        const userrespos1 = req.body.res_position1;
        const userres2 = req.body.research2;
        const userrespos2 = req.body.res_position2;
        const userres3 = req.body.research3;
        const userrespos3= req.body.res_position3;
        const userexp1 = req.body.exp_1;
        const userexp2 = req.body.exp_2;
        const userexp3= req.body.exp_3;
        const honor= req.body.honor;
        const skill= req.body.skill;
        const language1= req.body.language1;
        const language1_pro= req.body.language1_pro;
        const language2= req.body.language2;
        const language2_pro= req.body.language2_pro;
        const extra1= req.body.extra1;
        const extra2= req.body.extra2;
        const extra3= req.body.extra3;
        res.render('example_page', {userName: userName, userPhone: userPhone, useraddress:useraddress,
            usergithub:usergithub, useremail:useremail,usercollege:usercollege,usermajor:usermajor,usermajor2:usermajor2,
            usergpa:usergpa,userstart:userstart,usergrad:usergrad, usercourse:usercourse, userabout:userabout,userintern1:userintern1,
            userinpternpos1:userinpternpos1,userintern2:userintern2,
            userinpternpos2:userinpternpos2, userintern3:userintern3,
            userinpternpos3:userinpternpos3, userres1:userres1, userrespos1: userrespos1, userres2:userres2, userrespos2: userrespos2,
            userres3:userres3, userrespos3: userrespos3, userexp1:userexp1, userexp2:userexp2, userexp3:userexp3, honor:honor, skill:skill,
        language1:language1, language1_pro:language1_pro,language2:language2, language2_pro:language2_pro,extra1:extra1,extra2:extra2,extra3:extra3})
});


function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })

}





// app.post('/resume-generator', (req, res, next) => {
//     console.log("body", req.body);
//     // LOWERCASE -> REMOVE SPACE -> SHORT NAME 
//     const userName = req.body.name;
//     const lowercaseName = userName.toLowerCase();
//     const noSpaceName = lowercaseName.replace(' ', '');
//     const shortName = noSpaceName.slice(0, 10);
//     console.log("short name: ", shortName);
//     console.log(req.body.address);

//     let themeOptions = {
//         leftTextColor: "rgb(91, 88, 255)",
//         leftBackgroundColor: 'rgb(12, 36, 58)',
//         wholeBodyColor: ' rgb(183, 182, 255)',
//         rightTextColor: 'rgb(12, 36, 58)'
//     };
    
//     res.render('/login')

//     // HTML TO PDF CONVERTING
//     // pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/personal_resume/" + shortName + "-resume.pdf", (error, response) => {
//     //     if (error) throw Error("File is not created");
//     //     console.log(response.filename);
//     //     res.sendFile(response.filename);
//     // });
//     // pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/personal_resume/" + shortName + "-resume.pdf", (error, response) => {
//     //     if (error) throw Error("File is not created");
//     //     console.log(response.filename);
//     //     res.sendFile(response.filename);
//     // });


// });


// app.get('/pdf-static-resume', (req, res, next) => {
//     // HTML TO PDF CONVERTING
//     pdf.create(staticResume(), options).toFile(__dirname + "/docs/static-resume.pdf", (error, response) => {
//         if (error) throw Error("File is not created");
//         console.log(response.filename);
//         res.sendFile(response.filename);
//     });
// });



app.get('/download-pdf', (req, res, next) => {
    const filePath = __dirname + '/docs/static-resume.pdf';
    res.download(filePath);;
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.use(function(req, res, next) {
next(createError(404));
});

// this processes any errors generated by the previous routes
// notice that the function has four parameters which is how Express indicates it is an error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;