export const isAuth = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.send('error')
    }
}