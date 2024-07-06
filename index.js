var mysql = require('mysql');
var express = require("express");
var app = express();
var path = require('path');
const notifier = require('node-notifier');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")));


var con = mysql.createConnection({//mysql connections
    host: "localhost",
    user: "kerem",
    password: "313131",
    database: "webfinal",
    port: 3306
    });

con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL database!");
    });

    app.get("/anasayfa", (req,res) => { //gets all values from data for /anasayfa
        let  query = 'SELECT id, sehir_adi FROM sehirler';
        con.query(query, function (err, datas) {
            res.render('index', { data: datas });
        });
    });

    

    app.get("/anasayfa/arama", (req, res) => { // gets values for given queries
        const nesne = {
            kosul: req.query.kosul,
            aramaturu: req.query.aramaturu,
        };
    
        let query;
        let values;
    
        if (nesne.aramaturu === "id") {
            query = 'SELECT id, sehir_adi FROM sehirler WHERE id LIKE ?';
            values = [`%${nesne.kosul}%`];
        } 
        else if (nesne.aramaturu === "sehir_adi") {
            query = 'SELECT id, sehir_adi FROM sehirler WHERE sehir_adi LIKE ?';
            values = [`%${nesne.kosul}%`];
        }
    
        con.query(query, values, function (err, datas) {
            if (err) {
                return res.status(500).send('Database query failed.');
            }
            res.render('index', { data: datas });
        });
    });



    app.get("/iletisim", (req,res) => {
        
        res.render('iletisim');
    });

    
    


    app.get("/iletisim/send", (req, res) => { //sends values to database
        const contact = {
            contact_name: req.query.name,
            contact_email: req.query.email,
            contact_phone: req.query.phone,
            contact_message: req.query.message,
        };
    
        let query = 'INSERT INTO `contact` (`phone`, `contact_name`, `contact_email`, `message`) VALUES (?, ?, ?, ?)';
        let values = [contact.contact_phone, contact.contact_name, contact.contact_email, contact.contact_message];
    

        con.query(query, values, function (err, result) {
            if (err) {
                console.error("Database query error: ", err);
                return res.status(500).send("Database error occurred.");
            }
            notifier.notify({
                title: 'Website',
                message: 'Your Send Successfully!!',
                icon: path.join(__dirname, 'images/website.png'),
                sound: true,
                wait: true
              });
            console.log("message send");
            res.render('iletisim'); 
        });
    });
    


    app.get('/', (req, res) => {
        
        res.redirect('/anasayfa');
      });



let port=8001;
app.listen(port, (error)=>{
if(error) throw error;
console.log("Server "+port+" numarali portu dinliyor!!")
});