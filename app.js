const express = require('express');
const bodyParser = require('body-parser');


const app = express();

//call EJS BP and public ststic path
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// let Variables
let today = new Date();
let currentday = today.getDay();
let date = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();
let day = "";
let currentMonth = ""
let items = [];

// switch function for app get methods
function createDay(currentday) {
    switch (currentday) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
            default:
                console.log('error!!')
                break;
            };
};
function createMonth(month) {
    switch (month) {
        case 0:
            currentMonth = "January"
            break;
        case 1:
            currentMonth = "February"
            break;
        case 2:
            currentMonth = "March"
            break;
        case 3:
            currentMonth = "April"
            break;
        case 4:
            currentMonth = "May"
            break;
        case 5:
            currentMonth = "June"
            break;
        case 6:
            currentMonth = "July"
            break;
        case 7:
            currentMonth = "August"
                break;
        case 8:
            currentMonth = "September"
                break;
        case 9:
            currentMonth = "October"
                break;
        case 10:
            currentMonth = "November"
                break;
        case 11:
            currentMonth = "December"
                break;
            default:
                console.log('error!!')
                break;
            };
};

//GET Route Functions
app.get('/', function(req, res){
    createDay(currentday);
    createMonth(month);
    res.render('index', {
        kindOfDay: day,
        dateOfTheWeek: date,
        monthOfTheYear: currentMonth,
        currentYear: year,
        newListItems: items,
    });
});

app.get('/about', function(req, res){
    createDay(currentday);
    createMonth(month);
    res.render('about', {
        kindOfDay: day,
        dateOfTheWeek: date,
        monthOfTheYear: currentMonth,
        currentYear: year,
    });
});

//Post routes
app.post('/', function(req, res){
    let item = req.body.newItem
    items.push(item);
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running..');
});