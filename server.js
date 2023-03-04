const express =require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.eventNames.PORT || 5000;

//middleware
app.use(express.static('public'));
app.use(express.json());


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/contact.html')
})
app.post('/',(req,res)=>{
    console.log(req.body);
     const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "harshalekkala1@gmail.com",
            pass: "akslpcxebkrlrogv"
          }
     })
     const mailOptions = {
        from: "harshalekkala1@gmail.com", // Sender address
        to: req.body.email, // List of recipients
        subject: `Message from  ${req.body.subject}`, // Subject line
        text:  req.body.message // Plain text body
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
            res.send('error');

        }else{
            console.log('Email sent '+info.response);
            res.send('success');
        }
    })
})


app.listen(PORT,()=>{
    console.log(`server is running ${ PORT}`)
})