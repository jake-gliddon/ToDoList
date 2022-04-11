const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

let day = date();

const app = express();

//call EJS BP and public ststic path
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://jakegliddon:Jgking5s5@cluster0.q3fiw.mongodb.net/todolistDB', {useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model('item', itemsSchema);

const item1 = new Item ({
    name: 'Your Daily To-do List'
});
const item2 = new Item ({
    name: 'press the + to add a new item'
});
const item3 = new Item ({
    name: '<---tick the checkbox to delete'
});

const defaultItems = [item1, item2, item3];

Item.find({}, function(err, foundItems){
    console.log(foundItems);
});

//GET Route Functions
app.get('/', function(req, res){
    Item.find({}, function(err, foundItems){
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err){
                if (err){
                    console.log(err);
                } else { 
                    console.log('Saved');
                };  
            });
            res.redirect('/');
        } else {
        res.render('index', {
            kindOfDay: day,
            newListItems: foundItems,
        });
    }
    });
});

app.get('/about', function(req, res){
    res.render('about', {
        kindOfDay: day,
    });
});

//Post routes
app.post('/', function(req, res){
    const itemName = req.body.newItem
    const newItem = new Item({
        name: itemName
    });
   newItem.save();
    res.redirect('/');
});

app.post('/delete', function(req, res) {
    const checkedItemID = req.body.delete;
    Item.findByIdAndRemove(checkedItemID, function(err){
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running..');
});