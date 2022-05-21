/* 1st step in creating an express server* , here we are going to require the express middle ware */

const express= require('express')
const app = express()
 /* for accessing mysql database in step 7*/
 const mysql= require('mysql')

 /* for step 12*/
 const bodyParser=require('body-parser')
 const cors =require('cors')

/*3rd step: do something with the server, like accessing the intial route */
 /*app.get('/', (req, res)=>{ */
    /* 9th step: make a requse to the database to see if it is working*/

   /* const sqlinsert = "INSERT INTO pizza(title,email) VALUES ('cook', 'myemail');"
    db.query(sqlinsert, (err, result)=>{
        res.send('hello dainel');
    })
    
});
*/
/* 2nd step: we want to listen to the express server that we have created*/
app.listen(3001,()=> {
    console.log('running on port 3001');
})

/* 4th step we configure nodemon, by going to the package.josn; and on th       script object we add the following details;
"start":"node index.js",
"devStart":"nodemon index.js", */

/* 5th step: NEXT WE CONFIGURE OUR DATABASE*/

/* 6th step: create a database if you have created one */

/* 7th: access the mysql database, using const mysql= require('mysql') */

/*8th to call the database*/
const db= mysql.createPool({
    host: "localhost",
    user: "lazan",
    password:"12345",
    database:"lazan",
});

/* 10th step: go to the frontend as connect it*/

/* 11th step: we will creat a post api for our front end to call*/

/* 13th include the middleware*/
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.post('/api/insert', (req, res)=>{
/* to get the data from the input in json format*/
    const title= req.body.title;
    const email = req.body.email;

    const  sqlInsert ="INSERT INTO pizza(title,email) VALUE (?,?)"
    db.query(sqlInsert, [title,email],(err, result)=>{
        console.log(result)
    });
});
/* 12th step: make the data gotten from the front end into json format*/

/* 14th step write a get api to get the data from the database and pasting it in the frontend */
app.get('/api/get',(req, res)=>{
    const  sqlselect ="SELECT * FROM pizza";
    db.query(sqlselect,(err, result)=>{
        res.send(result)
    });
});

app.delete('/api/delete/:title', (req, res)=>{
    const name = req.params.title;
    const sqldelete="DELETE FROM pizza WHERE title = ?"
    db.query(sqldelete, name, (err, result)=>{
        if (err) console.log(err)
    });
});

app.put('/api/update',(req, res)=>{

    const name=req.body.title
    const email=req.body.email

    sqlupdate="UPDATE pizza SET title = ? WHERE email = ?";

    db.query(sqlupdate, [name, email],(err, result)=>{
        if (err) console.log(err);
        console.log(result)
    })
})

/*UPDATE `pizza` SET `title` = 'heere' WHERE `pizza`.`id` = 8;*/