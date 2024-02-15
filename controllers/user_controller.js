module.exports = {
    signIn: (req, res)=>{
        return res.render('signIn', {
            title: "sign-in"
        });
    },
    signUp: (req, res)=>{
        return res.render('signUp', {
            title: "sign-up"
        })
    }
}