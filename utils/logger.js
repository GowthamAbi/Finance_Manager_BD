const express=require('express')

const logger=(request,response,next)=>{
    console.log(`Request url :${request.url}`)
    console.log(`Request Method :${request.method}`)
    console.log(`Request headers:${JSON.stringify(request.headers)}`)
    console.log(`Request params :${JSON.stringify(request.params)}`)
    console.log(`Request query :${JSON.stringify(request.query)}`)
    console.log(`Request body :${JSON.stringify(request.body)}`)
    console.log(`Request cookies :${JSON.stringify(request.cookies)}`)
next()
}
module.exports=logger