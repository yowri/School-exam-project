@RenderDefault@
<script>
	$(function(){
			Database.callFunction({targetFunction:'combineData',data:{id1:77},callback:function(result){
     		console.log(result);
  		}});
	});
	
</script>