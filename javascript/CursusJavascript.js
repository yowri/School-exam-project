var log = console.log.bind(console);

$(function(){
	Cursus.init();
});


var Cursus = {
	data:{
		innerPartial:'',
		colorArray:[{color:'#EF5350',used:null},{color:'#EC407A',used:null},{color:'#AB47BC',used:null,used:null},{color:'#7E57C2',used:null},{color:'#5C6BC0',used:null},{color:'#42A5F5',used:null},{color:'#26A69A',used:null},{color:'#66BB6A',used:null},{color:'#FFA726',used:null},{color:'#FF7043',used:null},{color:'#8D6E63',used:null},{color:'#78909C',used:null}],
		cursusCardPartial:'',
		images:['https://pixabay.com/static/uploads/photo/2015/03/28/16/30/sailboats-696079_960_720.jpg','https://pixabay.com/static/uploads/photo/2015/04/29/23/09/lighthouse-746278_960_720.jpg','https://pixabay.com/static/uploads/photo/2014/07/07/19/39/smoke-386359_960_720.jpg']
	},
	init:function(){
		// sets global listerners
		Cursus.setGlobalListeners();

		$.get( "PartialViews/CursusCard.html", function( data ) {
		 	Cursus.data.cursusCardPartial = data;
		});
		
		// loads cursusen from database
		Cursus.loadAllFromDB();
		Cursus.initColors();
		
		// get data
		$.get( "PartialViews/InnerDetailView.html", function( data ) {
		 	Cursus.data.innerPartial = data;
		});
		Cursus.updateSquare();
	},
	setGlobalListeners:function(){
		
	},
	initColors:function(){
		var buttons = $('.roundbutton');
		for(var i = 0; i < buttons.length; i++){
			$(buttons[i]).css('background-color',getRandomColor());
		}
	},
	setDomColor:function(dom){
		var buttons = $(dom).find('.roundbutton');
		for(var i = 0; i < buttons.length; i++){
			$(buttons[i]).css('background-color',getRandomColor());
		}
	},
	loadAllFromDB:function(){
		setTimeout(function(){
			Database.callFunction({targetFunction:'getAllActiveCursusType',callback:function(data){
				if(data.length > 0){
					log(data);
					if(!isEven(data.length)){
						for(var i = 0; i < data.length; i++){
							if(i == data.length - 1){
								Cursus.insertCursusVisual(data[i],12,i);
							} else {
								Cursus.insertCursusVisual(data[i],6,i);
							}
						}
					} else {
						for(var i = 0; i < data.length; i++){
							Cursus.insertCursusVisual(data[i],6,i);
						}
					}
				}
			}});
		},10);
	},
	insertCursusVisual:function(cursus,width,i){
		var dom = $.parseHTML(Cursus.data.cursusCardPartial);
		$(dom).addClass('l'+width);
		$(dom).find('.title').text(cursus.naam);
		$(dom).find('.subTitle').text(cursus.subTitle);
		$(dom).data('cursusData',cursus);
		$(dom).find('.holder').css({'background-image':'url("'+Cursus.data.images[i]+'")'});
		$(dom).find('.holder').click({data:$(dom).data('cursusData')},function(e){
			Cursus.openImage(this,e.data.data);
		});
		$('.cursusItemsWrapper').append(dom);
		Cursus.setDomColor(dom);

		
	},
	appendVisualItem:function(data){

	},
	removeVisualItem:function(dom){

	},
	updateSquare:function(){
		var square = $('.square');
		for(var i = 0; i < square.length; i++){
			var width = $(square[i]).width();
			$(square[i]).css('height',width+ 'px');
		}
	},
	openImage:function(dom,data){
		var rect = $(dom)[0].getBoundingClientRect();
		var clone = $(dom).clone();
		var cloneColor = $(clone).find('.roundbutton').css('background-color');
		$(clone).css({
			'position':'fixed',
			'top':rect.top + 'px',
			'left': rect.left + 'px',
			'width': rect.width + 'px',
			'height': rect.height + 'px',
			'z-index': '100',
			'transition': '0.3s'
		});
		var pos = getCenter(clone);
		$(dom).css('opacity','0');
		$('body').append(clone);
		$(clone).removeClass('hover');
		setTimeout(function(){
			$(clone).find('.content, .roundbutton').css('opacity','0');
			$(clone).css({
			'top':pos.top+'px',
			'left':pos.left + 'px',
		});
		},1);
		setTimeout(function(){
			$(clone).css({
			'width':'100%',
			'height':'100%',
			'top':'0px',
			'left':'0px',
			'overflow':'hidden'
			});
			//$(clone).find('.holder').css({'height':'100%','margin-bottom':'0px'});

			$(clone).append(Cursus.data.innerPartial);
			Cursus.setDomData(data);
			$(clone).find('.customColor').css('background-color',cloneColor);
			$('.innerDetailViewHolder .sideBar').css('opacity','1');
			$(clone).find('.darkerBottom').css('opacity','0');
			$('body').css('overflow','hidden');
			$(clone).find('.darkOverlayDetailView').css('opacity','0.7');
			$(clone).find('.content, .roundbutton').css({'opacity':'1','z-index':'200'});
			$(clone).find('.content').animate({'bottom':'auto','top':'58px'},300);
			$(clone).find('.closeButton').click({dom:clone,parent:dom},function(e){
				// close
				Cursus.closeDetailView(e.data.dom,e.data.parent);
			});
			$(clone).find('.roundbutton').animate({'bottom':'initial','top':'48px'},300);
			setTimeout(function(){
				$(clone).css('overflow-y','auto');
				$(clone).find('.contentWrapperHolder').css('opacity','1');
			},200);
		},300);
	},
	setDomData:function(data){
		$('.innerDetailViewHolder .detailText').text(data.beschrijving);
		$('#GlobalInschrijfButton').attr('href','subscribe?id='+data.ID+'');

		$('#GlobalInschrijfButton').click(function(){
			
		});
	},
	closeDetailView:function(dom,parentDom){
		var rect = $(parentDom)[0].getBoundingClientRect();
		$(dom).css({
			'top':rect.top + 'px',
			'left': rect.left + 'px',
			'width': rect.width + 'px',
			'height': rect.height + 'px',
			'transition':'0.3s',
			'overflow':'hidden'
		});
		//$(dom).find('.holder').css({'height':'300px','margin-bottom':'32px','transition':'0.3s'});

		$(dom).find('.innerDetailViewHolder').css({'display':'none'});
		$(dom).find('.darkerBottom').css('opacity','0.7');
		$(dom).find('.content, .roundbutton').css({'top':'initial','bottom':'28px'},300);
		setTimeout(function(){
			$('body').css('overflow','auto');
			$(parentDom).css('transition','0s');
			$(dom).css('transition','0s');
				setTimeout(function(){
					$(dom).remove();
					$(parentDom).css('opacity','1');
				},1);
		},300);
	}
}

function getRandomColor(){
	var pos = Math.round(Math.random(0,Cursus.data.colorArray.length - 1)*Cursus.data.colorArray.length - 1);
	if(pos < 0){
		pos = 0;
	}
	var color = Cursus.data.colorArray[pos];
	if(color.used == null){
		color.used = true;
		return color.color;
	} else {
		return getRandomColor();
	}
}

function isEven(n) {
   return n % 2 == 0;
}


function getCenter(elm) {
    var top = Math.max(0, (($(window).height() - $(elm).outerHeight()) / 2));
    var left = Math.max(0, (($(window).width() - $(elm).outerWidth()) / 2));
    return {top:top,left:left};
}