/* ***************************************************************************************
table of content 
0.1 noatbook pop up window display
0.2 loading animation on send but click in student display
0.3 teacher menu items vertical align calculation
0.4 group paring question
0.5 teacher prepare mode - add new slides + play mode preview slides
0.6 teacher prepare mode - edit
 0.7 settings pop up

******************************************************************************************* */

$(document).ready(function(){

	var height=window.screen.availHeight;
	var width=window.screen.availWidth;

	

// hover effect to ipad 
		$('.hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover_effect');
    });

// show noatbook after the page is loaded
		$(window).load(function () {
            // run code
            $("#noatbook_but_1").css('display','block');
            $("#noatbook_but_2").css('display','block')
        });



/*  **************************  0.1 noatbook pop up window display ************************************** */
	
	//hide window
	$("#close_noatbook_pop_up").click(function(){
		$("#open_window").hide();//remove box
		$('#mask_overlay').remove();//remove mask
	});


	//show pop up windows
	$("#open_window").hide();


	//show noatbook pop up windows
	$("#noatbook_but_1").click(function(){
		//display mask
		$("<div id='mask_overlay'></div>")
		.css('height', $(document).height())
		.css('opacity','0.3')	
		.appendTo('body');
		var top=($(window).height()-$("#open_window").height())/2;
		var left=($(window).width()-$("#open_window").width())/2;
		$("#open_window").show().appendTo('body');
		$('#open_window').css('top',top);
		$('#open_window').css('left',left);
		$('#open_window').addClass('radious_6');	
	});	

		// calculate responsive noatbook width and height to be proportional to the main_student_container
		
		var main_student_container_width = $(".main_student_container").width();
		var main_student_container_height = $(".main_student_container").height();
		//calculate noatbook width and height as precentege from container dementions
		 var noatbook_width = 	main_student_container_width-(main_student_container_width*5)/100;
		 var noatbook_height = 	main_student_container_height-(main_student_container_height*6)/100;
		
		 //set the noatbook pop up dementions
		 $("#open_window").width(noatbook_width);
		 $("#open_window").height(noatbook_height);

	/*  **************************  0.2 loading animation on send but click in student display ******************************** */
		$(".loading_div").hide()
		$(".send_blue_but").click(function(){
		$(this).find(".send_text").hide();
		$(".loading_div").show()
	}) 

	/*  **************************  0.3 teacher menu items vertical align calculation ************************************** */

	var nav_height= $("nav").height();
	var menu_item_height=$("#teacher_navigation").height();
	padding_calc=(nav_height-menu_item_height)/2;
	$("#teacher_navigation").css("padding-top",padding_calc);
	//calculate play lesson menu items vertical align
	var play_menu_item_height=$(".teacher_play_actions_item span" ).height();
	padding_calc=(nav_height-play_menu_item_height)/2;
	$(".teacher_play_actions span").css("padding-top",padding_calc);



	
	/*  **************************  0.4 group paring question *************************************************************** */

	var match_item ="empty"//global variable to hold the clicked id item

		$(".paring_group_item_wrapper").click(function(){
			//find the selected id
			match_item=$(this).attr("id");
	

			//if already selecte - romove opacity and remove selected item from group
			if($(this).find(".paring_group_item").hasClass('item_seelcted')){
				if($(this).hasClass("inside_group")){//if not inside group remove opacity
					//do nothing
				}
				else{
					
					$(".paring_group_item").removeClass('item_seelcted');
					//remove opacity
					$(this).find('.item_line').css("opacity","");
					$(this).find('.paring_group_item').css("opacity","");
					
				}	
			}
			else{ //if this is the first time for selecting the item add opacity 
				//start by removing opacity and selected state from all the element
				
					$('.item_line').css("opacity","");
					$('.paring_group_item').css("opacity","");
					$(".paring_group_item").removeClass('item_seelcted');
				
				//add opacity to items that inside groups

				$.each( $(".paring_group_item_wrapper"), function() {
					item=$(this).attr("id")
					if($(this).hasClass('inside_group')){
						$(this).find('.item_line').css("opacity","0.5");
				$(this).find('.paring_group_item').css("opacity","0.5");
					}
				});

				//add opacity to this element
				$(this).find('.item_line').css("opacity","0.5");
				$(this).find('.paring_group_item').css("opacity","0.5");
			
				$(this).find('.paring_group_item').addClass('item_seelcted');
			}

		});

		//show the selected item in  group1 according to user click
		$("#paringroup_container_1").click(function(){
				if(match_item!='empty'){
				
					$("#initial_wrapper_group1").hide();
						//check if this item is not selected in the other group
						selected_id_group1=$("#"+match_item+"_selected_g1");
						selected_id_group2=$("#"+match_item+"_selected_g2");
	
						if(selected_id_group2.hasClass('hide')){ //if this element is not selected in other group show it
							selected_id_group1.removeClass('hide')
							$("#"+match_item).addClass("inside_group")
					}
				}
			
			});		
			//cancel selection group 1
			$("#paringroup_container_1").find(".delete_item").click(function(event){
				
				selected_for_delete=$(this).parents('.paring_group_item').attr("id");

				$("#"+selected_for_delete).addClass("hide");
				event.stopPropagation(); //stop the outside click  
				//remove opacity from item
				initial_item=(selected_for_delete).replace("_selected_g1","")
				$("#"+	initial_item).find('.item_line').css("opacity","");
				$("#"+	initial_item).find('.paring_group_item').css("opacity","");
				//remove inside group indication
					$("#"+initial_item).removeClass("inside_group");
						event.stopPropagation(); //stop the outside click  
	
			});	
			//cancel selection group 2
			$("#paringroup_container_2").find(".delete_item").click(function(event){
				
				selected_for_delete=$(this).parents('.paring_group_item').attr("id")
				$("#"+selected_for_delete).addClass("hide");
				event.stopPropagation(); //stop the outside click  
				//remove opacity from item
				initial_item=(selected_for_delete).replace("_selected_g2","")
				$("#"+	initial_item).find('.item_line').css("opacity","");
				$("#"+	initial_item).find('.paring_group_item').css("opacity","");
				//remove inside group indication
					$("#"+initial_item).removeClass("inside_group");
						event.stopPropagation(); //stop the outside click  
	
			});	

			//show the selected item in  group2 according to user click
			$("#paringroup_container_2").click(function(){
				if(match_item!='empty'){
				
					$("#initial_wrapper_group2").hide();
						//check if this item is not selected in the other group
						selected_id_group2=$("#"+match_item+"_selected_g2");
						selected_id_group1=$("#"+match_item+"_selected_g1");
	
						if(selected_id_group1.hasClass('hide')){ //if this element is not selected in other group show it
							selected_id_group2.removeClass('hide')
							$("#"+match_item).addClass("inside_group")
					}
				}	
				

			});

	/*  **************************  0.5 teacher prepare mode - add new slides + play mode preview slides  ************************** */

	// the function display each add item according to the clicked buttton and hides the parent window where all other buttons appers

	/*  POP UP NEW SLIDE */
	
	//hide window
	$("#teacher_close_pop_up").click(function(){
		$("#teacher_popup").hide();//remove box
		$('#mask_overlay').remove();//remove mask
	});


	//hide new edit pop up
	$("#teacher_popup").hide();
	//hide edit delete inner divs
	$(".edit_delete").hide();

	//show add new pop up windows
	$("#teacher_new_questions,#play_teacher_new_questions,#add_pupil_but,#assign_paried").click(function(){
		$("#preview_slides_container").hide();
		set_popup_window()
	});


	/* display preview slide */
	$('.slide_item').click(function(){
		
		if($(this).attr("id")=="play_teacher_new_questions"){ //if the selected slide is the new slide
			$('#teacher_popup').removeClass('window_width_param') //remove changes in window width
			$("#question_items_wrapper").show()// show questions container
			$(".preview_header").hide()//hide preview pop up header
			$(".add_new_header").show() //show add new pop up header
		}
		else{ //if the selected slide is all other slides open the preview pop up
		
			$('#teacher_popup').addClass('window_width_param');
			set_popup_window();//call the new window function
			$("#question_items_wrapper").hide()// hide questions container
			$("#preview_slides_container").show();//show preview pop up content
			$(".preview_header").show()//show preview pop up header
			$(".add_new_header").hide() //hide add new pop up header

		}
	});

	function set_popup_window(){
		//display mask
		$("<div id='mask_overlay'></div>")
		.css('height', $(document).height())
		.css('opacity','0.3')	
		.appendTo('body');
		var top=($(window).height()-$("#teacher_popup").height())/2;
		var left=($(window).width()-$("#teacher_popup").width())/2;
		$('#teacher_popup').css('top',top);
		$('#teacher_popup').css('left',left);
		$("#add_edit_container").hide();//hide all open add new/edit display
		$("#question_items_wrapper").show();
		$("#teacher_popup").show();
		$('#teacher_popup').addClass('radious_6');	

	}


	//click on  circle button
	$(this).find('.newSlide_icon_wrapper').click(function(){
		$("#question_items_wrapper").hide()// hide questions container
		$("#add_edit_container").show();//show item add container
		$(".add_edit_inner_content").hide()//hide all open items
		var item_id=$(this).attr("id");//find the clicked item id
		$("#"+item_id+"_item").show();//show item according to his id
		var header_text=$(this).attr("data-header");
		$("#add_edit_header_text").html(header_text)
		$("#add_text_back,#add_new_back").show() //show the back button functionality in case it was hidden in the inner edit functionality
		$("#add_slide_but").find('span').html("Add Slide")//change slide add button in case it was changed to edit in the inner edit function

	});

	//click on back link inside the items container
	$("#add_new_back,#add_text_back").click(function(){
		$("#question_items_wrapper").show()// show questions container
		$("#add_edit_container").hide();//hide item add container

	});
	// add more option to close question item
	$("#add_more_option").click(function(){
		$("#add_more_option").after("<input type=text placeholder='Type here option number4 text'>");
		$("#add_more_option").remove();
		$("#close_question_assign_option").append("<option>Option number 4</option>")
	})
	// add more option to paring question item
	$("#add_more_paring_items").click(function(){
		$("#add_more_paring_items").remove();
		$('.group_a').append("<div class='group_item'><textarea placeholder='Type here the option name'></textarea></div>")
		$('.group_b').append("<div class='group_item'><textarea placeholder='Type here the option name'></textarea></div>")
		$(".item_arr").append("<div class='group_item arr'></div>")										
	})
	// add more option to paring question item
	$("#add_more_paring_items_group").click(function(){
		$("#add_more_paring_items_group").remove();
		$(".group_a_g").append("<div class='group_item_b'><input type=text placeholder='Type here the group item name'></div>")
		$(".group_b_g").append("<div class='group_item_b'><input type=text placeholder='Type here the group item name'></div>")
		$(".item_arr").append("<div class='group_item arr'></div>")										
	})
	//add slide
	$("#add_slide_but").click(function(){
		$(".add_edit_item_wrapp").hide()//hide all open items
		$(".add_slide_name").show()//hide all open items

		$(".addSlide_name_input").val('slide number # - ' + $("#add_edit_header_text").text())//add default name based on the slide type
	})

	/*  **************************  0.6 teacher prepare mode - edit  ************************************************************* */


	//display the edit delete function when clicking on the edit link
	$("#teacher_edit_display").click(function(){
		$(".edit_delete").fadeToggle();

	})
	// open edit pop up when clicking on the inner edit link
	$(".inner_edit").click(function(){
		//-------------show new slide pop up---------------- //
		$("<div id='mask_overlay'></div>")
		.css('height', $(document).height())
		.css('opacity','0.3')	
		.appendTo('body');
		var top=($(window).height()-$("#teacher_popup").height())/2;
		var left=($(window).width()-$("#teacher_popup").width())/2;
		$('#teacher_popup').css('top',top);
		$('#teacher_popup').css('left',left);
		$("#add_edit_container").hide();//hide all open add new/edit display
		$("#question_items_wrapper").show();
		$("#teacher_popup").show();
		$('#teacher_popup').addClass('radious_6');	
		//-------------hide new  slide display and show edit display---------------- //
		$("#question_items_wrapper").hide()// hide questions container
		$(".add_edit_inner_content").hide()//hide all open items
		$("#add_edit_container").show();//show item add container
		
		var object_id=$(this).attr("data-id");//find id according to its data-id attribute
		$("#"+object_id+"_item").show();//show item according to his id
		var edit_header_text=$(this).attr("data-header");//find header text according to its data-header attribute
		$("#add_edit_header_text").html(edit_header_text)//show header text
		$("#add_text_back,#add_new_back").hide() //hide the back button functionality
		//change the button text
		$("#add_slide_but").find('span').html("Edit Slide")
		
	})
	

	
});	 