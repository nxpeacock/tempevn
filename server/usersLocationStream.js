usersLocationStream = new Meteor.Stream('usersLocation');

usersLocationStream.permissions.write(function(){
   return true;
});

usersLocationStream.permissions.read(function(){
    return true;
});