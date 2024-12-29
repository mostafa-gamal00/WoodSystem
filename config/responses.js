const success=(res,data,message='success',status=200)=>{

    res.status(status).json({ 
        status,
        message: message ,
        data: data 
    });

}
const fail=(res,message='Error fetching data',status=400)=>{

    res.status(status).json({ 
        status,
        message:`error : ${message}`  ,
    });

}

module.exports={success,fail}