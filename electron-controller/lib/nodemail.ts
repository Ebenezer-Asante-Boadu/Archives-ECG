import nodemailer from "nodemailer";

export async function sendEmail(email:string, message:string){
    try{
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: "derrickmensahtorkornoo@gmail.com",
                pass: "ggwu nqgy odks ivzw"
            }
        });

        const mailOptions = {
            from: "derrickmensahtorkornoo@gmail.com",
            to: email,
            subject: "ECG ARCHIVES FILE REQUEST",
            text: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("successfully sent the message!!!")
    }catch(err){
        console.log(err);
    }
}

// BENJI - 05919314220
// PHEBE - 0554796903