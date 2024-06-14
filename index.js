var mysql = require('mysql');
var express = require("express");
var app = express();
var path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"/public")));

var con = mysql.createConnection({
    host: "localhost",
    user: "kerem",
    password: "000000",
    database: "dbSearchCity",
    port: 3306
    });

con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL database!");
    });

    app.get("/anasayfa", (req,res) => {
        let  query = 'SELECT id, sehir_adi FROM sehirler';
        con.query(query, function (err, datas) {
            res.render('index', { data: datas });
        });
    });

    app.get("/iletisim", (req,res) => {
        
        res.render('iletisim');
    });

    app.get("/anasayfa/arama", (req, res) => {
        const nesne = {
            kosul: req.query.kosul,
            aramaturu: req.query.aramaturu,
        };
    
        let query;
        let values;
    
        if (nesne.aramaturu === "id") {
            query = 'SELECT id, sehir_adi FROM sehirler WHERE id LIKE ?';
            values = [`%${nesne.kosul}%`];
        } else if (nesne.aramaturu === "sehir_adi") {
            query = 'SELECT id, sehir_adi FROM sehirler WHERE sehir_adi LIKE ?';
            values = [`%${nesne.kosul}%`];
        } else {
            return res.status(400).send('Invalid search type.');
        }
    
        con.query(query, values, function (err, datas) {
            if (err) {
                return res.status(500).send('Database query failed.');
            }
            res.render('index', { data: datas });
        });
    });

    app.get('/', (req, res) => {
        // Redirect to /anasayfa
        res.redirect('/anasayfa');
      });



let port=8001;
app.listen(port, (error)=>{
if(error) throw error;
console.log("Server "+port+" numarali portu dinliyor!!")
});