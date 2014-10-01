if(Meteor.isClient){
    Meteor.startup(function () {
        try{
            var userLocal = JSON.parse(localStorage.getItem('userLocal'));
            if(!userLocal){
                userLocal = {
                    userId : Random.id(),
                    color : randomColor()
                }
                localStorage.setItem('userLocal',JSON.stringify(userLocal));
            }
            Session.setDefault('userLocal',userLocal);
        }catch(ex){
            console.log(ex)
        }
    });
}