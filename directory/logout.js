app.get('/',function(req,res){
    if(req.session.key) {
        res.redirect('/admin');
    } else {
        res.render('home.html');
    }
});
app.post('/login',function(req,res){
    req.session.key=req.body.email;
    res.end('done');
});
app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/');
        }
