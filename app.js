const express = require('express');
var mysql = require('mysql');

var staticDirectoryPath = require('path').join(__dirname,'/public')
console.log(staticDirectoryPath)

const app = express();
app.use(express.json())
app.use(express.static(staticDirectoryPath))

var db = mysql.createConnection(
    {
        host        :   'localhost',
        user        :   'root',
        password    :   'Mysql@160321',
        database    :   'menu'
    }
);

app.get('/',function(req,res)
{
    res.render('index');
});

app.get('/api',function(req,res)
{
    if(db!= null)
    {
res.send('connection established successfully');

    }
    else{
        res.send('connection failed');
    }
});


app.post('/api/addcontact',function(req,res)
{
    let name = req.body.name;
    let phoneno = req.body.phoneno;
    let email = req.body.email;
    let address = req.body.address;

    db.query('INSERT INTO contact SET ?',req.body,function(err,results)
    {
        if(err)throw err;
        res.send('Contact successfully created');
    })
})
  

  app.get('/api/searchcontact',function(req,res)
  {
      let email = req.body.email;
      
      db.query('SELECT * FROM contact WHERE email = ?', [email] ,function(err,results,field)
   {
       if(err)throw err
       res.send(results);
    })
  });


app.post('/api/updatecontact',function(req,res)
{
    name = req.body.name;
    phoneno = req.body.phoneno;
    email = req.body.email;
    address = req.body.address;

    db.query('UPDATE contact SET name = ?, email = ?, address = ? WHERE phoneno = ?',[name,email,address,phoneno], function (err, results, fields)
{
    if(err)throw err;
    res.send(results);
})

});


  app.get('/api/deletecontact',function(req,res)
  {
      let email = req.body.email;
      db.query('DELETE FROM contact WHERE email = ?',email,function(err,results)
      {
          if(err)throw err;
          res.send('Contact successfully deleted');
      })
  });

  app.listen(9001,function(){
      console.log("The server is listening at port 9001");
      console.log("Link is : http://localhost:9001")
  });