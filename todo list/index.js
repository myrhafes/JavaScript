//Verify Tasks in localStorage
const inpValue = document.getElementById("inpValue");
for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    $('ul').append("<li><span><i class='fas fa-trash-alt'></i> </span>" +key+ "</li>");
    /*if(localStorage.getItem(key) === "selected"){
        $('ul').addClass("completed");
    }*/
}

// Check Off Specific Todos by Cliking
$('ul').on("click", "li", function(){
    $(this).toggleClass("completed");
    /*const selec = $(this).text();
    console.log(selec);
    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        if(selec.value === key.value){
            localStorage.setItem(key,"selected");
        }  
    }*/
});

//Delete Tasks
$('ul').on("click", "span", function(event){
	$(this).parent().fadeOut(500,function(){
        const del = $(this).text();
        for(let i=0; i<localStorage.length; i++){
            const key = localStorage.key(i);
            if(del.value === key.value){
                localStorage.removeItem(key);
                console.log(key);
                break;
            }
        }
		$(this).remove();
	});
	event.stopPropagation();
});

//Add Tasks
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
        if($(this).val() != ""){
            const Value = inpValue.value;
            localStorage.setItem(Value,"");
            //extracting the text value
            var todoText = $(this).val();
            //add it to list of todos
            $('ul').append("<li><span><i class='fas fa-trash-alt'></i> </span>" +todoText+ "</li>");
            //clear input
            $(this).val("");
        }
	}
})
