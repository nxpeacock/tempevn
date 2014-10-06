Meteor.methods ({
    'queryWiki' : function(id,title){
        var url = "http://vi.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=xml&titles="+title;
        var rs = HTTP.get(url);
        var getXml2Json = function(id,data,cb){
            var parser = new xml2js.Parser();
            return {
                id : id,
                data : parser.parseString(data,cb)
            }
        }
        console.log(id)
        var wrappedXml2Json = Meteor.wrapAsync(getXml2Json);
        return wrappedXml2Json(id,rs.content);
    }
})