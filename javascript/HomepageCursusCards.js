$(function() {
    Card.init();
});

var Card = {
    data:{
        CardPartial:'',
        images:['https://pixabay.com/static/uploads/photo/2015/03/28/16/30/sailboats-696079_960_720.jpg','https://pixabay.com/static/uploads/photo/2015/04/29/23/09/lighthouse-746278_960_720.jpg','https://pixabay.com/static/uploads/photo/2014/07/07/19/39/smoke-386359_960_720.jpg']
    },

    init:function() {
        $.get( "PartialViews/HomepageCursusCard.html", function( data ) {
            Card.data.CardPartial = data;
        });

        Card.loadAllFromDB();
    },

    loadAllFromDB:function() {
        Database.callFunction({targetFunction:'getAllActiveCursusType',callback:function(data){
            if(data.length > 0){
                for(var i = 0; i < 3; i++){
                    if(i == data.length - 1){
                        Card.insertCardVisual(data[i],4,i);
                    } else {
                        Card.insertCardVisual(data[i],4,i);
                    }
                }
            }
        }});
    },

    insertCardVisual:function(cursus,width,i){
        var dom = $.parseHTML(Card.data.CardPartial);
        $(dom).addClass('l'+width);
        $(dom).find('.title').text(cursus.naam);
        $(dom).find('.subTitle').text(cursus.subTitle);
        $(dom).data('cursusData',cursus);
        $(dom).find('.holder').css({'background-image':'url("'+ Card.data.images[i]+'")'});

        $('.cursusCard').append(dom);
    },
}
