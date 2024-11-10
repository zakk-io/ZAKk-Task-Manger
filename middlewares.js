const express = require('express')


const handleJsonSyntaxError = (err,req,res,next) => {
    if(err instanceof SyntaxError && err.status == 400 && 'body' in err){
        res.status(400)
        error = {
            "error" : err.name,
            "type" : err.type,
            "message" : err.message,
            "body" : err.body,
        }
        res.json(error)
    }else{
        next()
    }
}




module.exports = {
    handleJsonSyntaxError,
}