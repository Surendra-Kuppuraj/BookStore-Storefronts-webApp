$(document).ready(function(){
  
   $("#bookClick").click(function(){
 		var result = $("div.editBookText").text();
 		$("div.editBookText").empty();
 		$('div.editBookText').html(result);
   }         
    );

   

});