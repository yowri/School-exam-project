var Database = {
	config : {
		DataDoorPath:"core/DatabaseEntrance.php",
	},
	callFunction: function(input){
		this.async = true;
		this.targetFunction;
		this.data;
		this.callBackData;
		this.callback;
		this.shouldStringify = true;
		this.cache = false;
		this.dataEncryption = true;
		this.debugMode = false;
		this.getResult = true;
		this.returnObject = true;
		this.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
		this.processData = true;

		// register the input data
		if(input){
			if(input.async != undefined){
				this.async = input.async;
			}
			if(input.targetFunction != undefined){
				this.targetFunction = input.targetFunction;
			}
			if(input.shouldStringify != undefined){
				this.shouldStringify = input.shouldStringify;
			}
			if(input.altPath != undefined){
				this.altPath = input.altPath;
			}
			if(input.data != undefined){
				if(this.shouldStringify){
					this.data = JSON.stringify(input.data);

					if(input.dataEncryption != undefined){
						this.dataEncryption = input.dataEncryption;
					}
				} else {
					this.data = input.data;
				}
			}
			if(input.callback != undefined){
				this.callback = input.callback;
			}
			if(input.cache != undefined){
				this.cache = input.cache;
			}
			if(input.debugMode != undefined){
				this.debugMode = input.debugMode;
			}
			if(input.callBackData != undefined){
				this.callBackData = input.callBackData;
			}
			if(input.getResult != undefined){
				this.getResult = input.getResult;
			}
			if(input.returnObject != undefined){
				this.returnObject = input.returnObject;
			}
			if(input.contentType != undefined){
				this.contentType = input.contentType;
			}
			if(input.processData != undefined){
				this.processData = input.processData;
			}
		}

		if(this.dataEncryption){
			// if added encryption add here and change this.data
		}
		if(this.targetFunction != undefined){
			// call to sever door
			$.ajax({
				method: "POST",
				url: Database.config.DataDoorPath,
				data: {"targetFunc":this.targetFunction,"requestData":this.data,"altPath":this.altPath,"encrypted":this.dataEncryption,"returnObject":this.returnObject},
				async: this.async,
				cache:this.cache,
				qty_input: $(this),
				processData: this.processData,
        		contentType: this.contentType,
			}).done(function(result) {
				var baseObject = this.qty_input[0];
				var res = result;
				if(baseObject.getResult){
					if(baseObject.returnObject){
						if(Database.IsJsonString(res)){
							res = JSON.parse(res);
						}
					}
				  if(baseObject.callback != undefined){
				  	if(baseObject.callBackData != undefined){
				  		baseObject.callback(res,baseObject.callBackData);
				 	 } else {
				 	 	baseObject.callback(res);
				 	 }
				  }
				} else {
					if(baseObject.callback != undefined){
				  		if(baseObject.callBackData != undefined){
				  			baseObject.callback(baseObject.callBackData);
				 		 } else {
				 	 		baseObject.callback();
				 		}
				  	}
				}
			}).fail(function(jqXHR, textStatus) {
				if(this.qty_input[0].debugMode){
				  alert( "Request failed: " + textStatus );
				}
			});
		} else {
			console.error('When calling "callFuntion", the property targetFunction cannot be undefined.');
		}
	},
	UploadImage: function(domInput){
		var Image = $(domInput).prop("files")[0];
		var sendData = new FormData();
		sendData.append('Image',Image);
		$.ajax({
        url: Database.config.DataDoorPath,
        type: 'POST',
        data: sendData,
        cache: false,
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        }).done(function(result) {
			console.log(result);
		}).fail(function(jqXHR, textStatus) {
			// TODO remove alert
			alert( "Request failed: " + textStatus );
		});
	},
	RemoveImage: function(imageName){
		Database.callFunction({targetFunction:'removeImageFromDatabase',returnObject:false,data:imageName,callback:function(data){
			alert(data);
		}});
	},
	IsJsonString: function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
}
