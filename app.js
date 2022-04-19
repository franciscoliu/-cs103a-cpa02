const createError = require("http-errors"); // to handle the server errors
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require("express-session"); // to handle sessions using cookies
const path = require("path");  // to refer to local paths
const auth = require('./routes/auth');
const pdf = require('html-pdf');
const expressLayouts = require('express-ejs-layouts');
const dynamicResume = require('./doc/dynamic-resume');;





//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '368063580362-psa3u4jgvvl0n3foeg95ndt463dub4u1.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);


const mongoose = require( 'mongoose' );
// const mongodb_URI = 'mongodb://localhost:27017/cs103a_todo'
const mongodb_URI = 'mongodb+srv://zheyuanliu:140!XuzuPe0106@cluster0.rdpsv.mongodb.net/Project?retryWrites=true&w=majority'

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

app.get('/protected', checkAuthenticated, (req, res) => {
    res.render('protected.ejs');
});

app.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/login')
})

app.get('/resume-generator', (req, res) =>{
    res.redirect('/resume-generator')

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



app.post('/resume-generator', (req, res, next) => {
    console.log(req.body);
    // LOWERCASE -> REMOVE SPACE -> SHORT NAME 
    const userName = req.body.name;
    const lowercaseName = userName.toLowerCase();
    const noSpaceName = lowercaseName.replace(' ', '');
    const shortName = noSpaceName.slice(0, 10);
    console.log("short name: ", shortName);


    let themeOptions = {
        leftTextColor: "rgb(91, 88, 255)",
        leftBackgroundColor: 'rgb(12, 36, 58)',
        wholeBodyColor: ' rgb(183, 182, 255)',
        rightTextColor: 'rgb(12, 36, 58)'
    };

    // HTML TO PDF CONVERTING
    pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/personal_resume/" + shortName + "-resume.pdf", (error, response) => {
        if (error) throw Error("File is not created");
        console.log(response.filename);
        res.sendFile(response.filename);
    });
    pdf.create(dynamicResume(req.body, themeOptions), options).toFile(__dirname + "/personal_resume/" + shortName + "-resume.pdf", (error, response) => {
        if (error) throw Error("File is not created");
        console.log(response.filename);
        res.sendFile(response.filename);
    });


});


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
