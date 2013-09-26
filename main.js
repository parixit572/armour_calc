jQuery(function($){
	var cdr_name = "";
	var height = 0;
	var weight = 0;
	var weight_lbs = 0;
	var formula = null;
	var leanMass = 0;
	var leanMass_lbs = 0;
	
	$("#cm-step-2 .cm-macro-disable").height($("#cm-step-2").height()+40);
	$("#cm-step-2 .cm-macro-disable").width($("#cm-step-2").width()+40);
	
	$("#cm-step-3 .cm-macro-disable").height($("#cm-step-3").height()+40);
	$("#cm-step-3 .cm-macro-disable").width($("#cm-step-3").width()+40);
	
	$("#cm-step-4 .cm-macro-disable").height($("#cm-step-4").height()+40);
	$("#cm-step-4 .cm-macro-disable").width($("#cm-step-4").width()+40);
	
	$("#optMS, #optHB").click(function(){
		$("#txtBF").prop('disabled', true);
	})
	$("#optLM").click(function(){
		$("#txtBF").prop('disabled', false);
	})
	
	$("input[name='cm-system']").click(function(){
		if($("input[name='cm-system']:checked").val() == "metric"){
			$(".cm-imperial").hide();
			$(".cm-metric").show();
		}
		else{
			$(".cm-imperial").show();
			$(".cm-metric").hide();
		}
	})
	
	$("#cm-meals-per-day").change(function(){
		cm_calc();
	});
	
	
	$(".cm-calories-fat-loss").click(function(){
		$("#cm-calories-fat-loss-text").html($(this).val());		
	})
	$(".cm-calories-bulking").click(function(){
		$("#cm-calories-bulking-text").html($(this).val());		
	})
	$("input[name='formula']").click(function(){
		if($("input[name='formula']:checked").val() == "A"){
			$("#activity-level").show();
			$("#exercise-level").hide();
		}	
		else{
			$("#activity-level").hide();
			$("#exercise-level").show();
		}
	})
	$(".jk-tdee-input").on("keyup", function(){
		mins = $(this).val().replace(/[^\d.]/g, "");
		if(mins == ""){
			$(this).val("0");
			mins = 0;
		}
		else{
			$(this).val(parseInt(mins));
		}
		
		very_light = parseInt($("input[name='jk-tdee-very-light']").val());
		light = parseInt($("input[name='jk-tdee-light']").val());
		moderate = parseInt($("input[name='jk-tdee-moderate']").val());
		heavy = parseInt($("input[name='jk-tdee-heavy']").val());
		very_heavy = parseInt($("input[name='jk-tdee-very-heavy']").val());
		
		sleeping = 1440 - very_light - light - moderate - heavy - very_heavy;
		
		if(sleeping < 0){
			alert("You must not exceed 1440 minutes.");
			sleeping = parseInt(sleeping) + parseInt(mins);
			$(this).val(sleeping);
			sleeping = 0;
		} 
		$("input[name='jk-tdee-sleeping']").val(sleeping);
	})
	
	
	function cm_calc_calories(){
		var result = 0;
		var gender = $("input[name='cm-gender']:checked").val();
		var age = parseInt($("input[name='cm-age']").val());
		if($("input[name='cm-system']:checked").val() == "metric"){
			height = parseInt($("#cm-height-cm").val()*100)/100;
			weight = parseInt($("#cm-weight-kg").val()*100)/100;
			weight_lbs = weight * 2.2;
		}
		else{
			height = ((parseInt($("#cm-height-ft").val()) * 12) + parseInt($("#cm-height-in").val())) * 2.54; //multiply by 2.54 to get cm
			weight = parseInt($("#cm-weight-lbs").val()) / 2.2; //divide by 2.2 for kilos from pounds
			weight_lbs = parseInt($("#cm-weight-lbs").val());
		}
		
		
		var rockBottom = (weight * 2.2) * 8;
		
		var maintain = 0;
		var activity = 0;
		activity = $("#cm-activity").val();
		var BasalEnergyExpenditure = 0;
		var very_light = 0;
		var light = 0;
		var moderate = 0;
		var heavy = 0;
		var very_heavy = 0;
		var wake = 0;
		var sleep = 0;
		
		formula = $("input[name='formula']:checked").val();
		switch(formula){
			case "M" :
				if(gender == "M"){
					result=5+(10*weight)+(6.25*height)-(5*age)
				}
				else{
					result=-161+(10*weight)+(6.25*height)-(5*age)
				}				
			break;
			
			case "L":
				leanMass = weight - (weight * (parseInt($("input[name='txtBF']").val()) / 100));
				leanMass_lbs = leanMass * 2.2;
				result = 21.6 * leanMass + 370;
			break;
			
			case "H":
				if(gender == "M"){
					result= 66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age);		
				}
				else{
					result= 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
				}
			break;
			
			case "A":
				if(parseInt($("input[name='jk-tdee-very-light']").val()) == "NaN") $("input[name='jk-tdee-very-light']").val("0");
				if(parseInt($("input[name='jk-tdee-light']").val()) == "NaN") $("input[name='jk-tdee-light']").val("0");
				if(parseInt($("input[name='jk-tdee-moderate']").val()) == "NaN") $("input[name='jk-tdee-moderate']").val("0");
				if(parseInt($("input[name='jk-tdee-heavy']").val()) == "NaN") $("input[name='jk-tdee-heavy']").val("0");
				if(parseInt($("input[name='jk-tdee-very-heavy']").val()) == "NaN") $("input[name='jk-tdee-very-heavy']").val("0");
				
				if($("input[name='jk-tdee-very-light']").val() == "") $("input[name='jk-tdee-very-light']").val("0");
				if($("input[name='jk-tdee-light']").val() == "") $("input[name='jk-tdee-light']").val("0");
				if($("input[name='jk-tdee-moderate']").val() == "") $("input[name='jk-tdee-moderate']").val("0");
				if($("input[name='jk-tdee-heavy']").val() == "") $("input[name='jk-tdee-heavy']").val("0");
				if($("input[name='jk-tdee-very-heavy']").val() == "") $("input[name='jk-tdee-very-heavy']").val("0");
				
				if(gender == "M"){
					BasalEnergyExpenditure = Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age));
					very_light = Math.round((BasalEnergyExpenditure * 1.4 / 1440) * parseInt($("input[name='jk-tdee-very-light']").val()));	
					light = Math.round((BasalEnergyExpenditure * 2.5 / 1440) * parseInt($("input[name='jk-tdee-light']").val()));
					moderate = Math.round((BasalEnergyExpenditure * 4.2 / 1440) * parseInt($("input[name='jk-tdee-moderate']").val()));
					heavy = Math.round((BasalEnergyExpenditure * 8.2 / 1440) * parseInt($("input[name='jk-tdee-heavy']").val()));	
					very_heavy = Math.round((BasalEnergyExpenditure * 12 / 1440) * parseInt($("input[name='jk-tdee-very-heavy']").val()));
					//alert(very_light+" "+light+" "+moderate+" "+heavy+" "+very_heavy);
				}
				else{
					BasalEnergyExpenditure = Math.round(655 + (weight * 9.563) + (1.85 * height) - (4.676 * age));
					very_light = Math.round((BasalEnergyExpenditure * 1.4 / 1440) * parseInt($("input[name='jk-tdee-very-light']").val()));	
					light = Math.round((BasalEnergyExpenditure * 2.5 / 1440) * parseInt($("input[name='jk-tdee-light']").val()));	
					moderate = Math.round((BasalEnergyExpenditure * 2.5 / 1440) * parseInt($("input[name='jk-tdee-moderate']").val()));
					heavy = Math.round((BasalEnergyExpenditure * 2.5 / 1440) * parseInt($("input[name='jk-tdee-heavy']").val()));	
					very_heavy = Math.round((BasalEnergyExpenditure * 2.5 / 1440) * parseInt($("input[name='jk-tdee-very-heavy']").val()));
				}
				
				wake = very_light + light + moderate + heavy + very_heavy;
				sleep = Math.round((BasalEnergyExpenditure / 1440) * (1440 - parseInt($("input[name='jk-tdee-very-light']").val()) - parseInt($("input[name='jk-tdee-light']").val()) - parseInt($("input[name='jk-tdee-moderate']").val()) - parseInt($("input[name='jk-tdee-heavy']").val()) - parseInt($("input[name='jk-tdee-very-heavy']").val())));
				result = Math.round((sleep * 1) + (wake * 1));
				activity = 1;
			break;
		}


		maintain = result * activity;
		maintain = Math.round(maintain);
		// MagnetiCat Edit
		var printBMR = result;
		printBMR = Math.round(printBMR);
		
		var loseFat = maintain - (maintain * 0.2);
		var loseFat15 = maintain - (maintain * 0.15);
		var loseFat20 = maintain - (maintain * 0.20);
		var loseFat25 = maintain - (maintain * 0.25);
		if(loseFat < rockBottom && rockBottom <= maintain){
				loseFat = rockBottom;
		}
		if(loseFat15 < rockBottom && rockBottom <= maintain){
				loseFat15 = rockBottom;
		}
		if(loseFat20 < rockBottom && rockBottom <= maintain){
				loseFat20 = rockBottom;
		}
		if(loseFat25 < rockBottom && rockBottom <= maintain){
				loseFat25 = rockBottom;
		}
		loseFat = Math.round(loseFat);
		loseFat15 = Math.round(loseFat15);
		loseFat20 = Math.round(loseFat20);
		loseFat25 = Math.round(loseFat25);
		
		var bulking = maintain * 1.10;
		var bulking5 = maintain * 1.05;
		var bulking10 = maintain * 1.10;
		var bulking15 = maintain * 1.15;
		if(bulking < rockBottom && rockBottom <= maintain){
			bulking = rockBottom;
		}
		if(bulking5 < rockBottom && rockBottom <= maintain){
			bulking5 = rockBottom;
		}
		if(bulking10 < rockBottom && rockBottom <= maintain){
			bulking10 = rockBottom;
		}
		if(bulking15 < rockBottom && rockBottom <= maintain){
			bulking15 = rockBottom;
		}
		bulking = Math.round(bulking);
		bulking5 = Math.round(bulking5);
		bulking10 = Math.round(bulking10);
		bulking15 = Math.round(bulking15);
		
		$("#cm-calories-fat-loss").val(loseFat);
		$("#cm-calories-fat-loss-text").html(loseFat);
		$("#cm-calories-fat-loss15").val(loseFat15);
		$("#cm-calories-fat-loss20").val(loseFat20);
		$("#cm-calories-fat-loss25").val(loseFat25);
		
		$("#cm-calories-maintenance").val(maintain);
		$("#cm-calories-maintenance-text").html(maintain);
		
		$("#cm-calories-bulking").val(bulking);
		$("#cm-calories-bulking-text").html(bulking);
		$("#cm-calories-bulking5").val(bulking5);
		$("#cm-calories-bulking10").val(bulking10);
		$("#cm-calories-bulking15").val(bulking15);
		
		$("#cm-result-tdee .cm-result-box-value").html(maintain);
		$("#cm-result-tdee").show();
		// MagnetiCat Edit
		$("#cm-result-bmr .cm-result-box-value").html(printBMR);
		$("#cm-result-bmr").show();
		
		$("#cm-step-2 .cm-macro-disable").hide();
		
	}
	$("input[name='cm-calories']").click(function(){
		$("#cm-step-3 .cm-macro-disable").hide();
	})
	
	$(".cm-button-calories").click(function(){
		cm_calc_calories();
	})
	
	
	$("#cm-ratios option").click(function(){
		cdr_name = $(this).attr("data-name");
		if(cdr_name == "iifym"){
			$("#cm-carbs").val("--").prop("disabled", true);
			$("#cm-protein").val("--").prop("disabled", true);
			$("#cm-fat").val("--").prop("disabled", true);
			$(".iifym-no-show").hide();
			$(".iifym-show").show();
		}
		else{ 
			$("#cm-carbs").val($(this).attr("data-carbs")).prop("disabled", false);
			$("#cm-protein").val($(this).attr("data-protein")).prop("disabled", false);
			$("#cm-fat").val($(this).attr("data-fat")).prop("disabled", false);
			$(".iifym-no-show").show();
			$(".iifym-show").hide();
		}
	})
	
	function cm_calc(){
		cdr_name = $("#cm-ratios option:selected").attr("data-name");
		total_calories = $("input[name='cm-calories']:checked").val();
		if(total_calories == "other"){
			total_calories = parseInt($("input[name='cm-calories-other']").val());
		}
		else{
			total_calories = parseInt(total_calories);
		}
		
		if(cdr_name == "iifym"){
			protein_modifier = $("input[name='cm-iifym-protein']:checked").val();
			fat_modifier = $("input[name='cm-iifym-fat']:checked").val();
			
			if(protein_modifier == "other"){
				protein_modifier = $("input[name='cm-iifym-protein-other']").val() * 1;	
			}
			if(fat_modifier == "other"){
				fat_modifier = $("input[name='cm-iifym-fat-other']").val() * 1;	
			}
			
			if(formula == "L") {
				protein = leanMass_lbs * 4 * protein_modifier;
			} else {
				protein = weight_lbs * 4 * protein_modifier;
			}
			
			fat = weight_lbs * fat_modifier * 9;
			
			carbs = total_calories - fat - protein;
			
			calories = {
				"day" : {
					'carbs': carbs,
					'protein': protein,
					'fat': fat
				},
				"one" : {
					'carbs': carbs/1,
					'protein': protein/1,
					'fat': fat/1
				},
				"two" : {
					'carbs': carbs/2,
					'protein': protein/2,
					'fat': fat/2
				},
				"three" : {
					'carbs': carbs/3,
					'protein': protein/3,
					'fat': fat/3
				},
				"four" : {
					'carbs': carbs/4,
					'protein': protein/4,
					'fat': fat/4
				},
				"five" : {
					'carbs': carbs/5,
					'protein': protein/5,
					'fat': fat/5
				},
				"six" : {
					'carbs': carbs/6,
					'protein': protein/6,
					'fat': fat/6
				},
				"seven" : {
					'carbs': carbs/7,
					'protein': protein/7,
					'fat': fat/7
				}
			}
			grams = {
				"day" : {
					'carbs': calories.day.carbs / 4,
					'protein': calories.day.protein /4,
					'fat': calories.day.fat /9,
					'divisor': 1
				},
				"one" : {
					'carbs': calories.one.carbs/4,
					'protein': calories.one.protein/4,
					'fat': calories.one.fat/9,
					'divisor': 1
				},
				"two" : {
					'carbs': calories.two.carbs/4,
					'protein': calories.two.protein/4,
					'fat': calories.two.fat/9,
					'divisor': 2
				},
				"three" : {
					'carbs': calories.three.carbs/4,
					'protein': calories.three.protein/4,
					'fat': calories.three.fat/9,
					'divisor': 3
				},
				"four" : {
					'carbs': calories.four.carbs/4,
					'protein': calories.four.protein/4,
					'fat': calories.four.fat/9,
					'divisor': 4
				},
				"five" : {
					'carbs': calories.five.carbs/4,
					'protein': calories.five.protein/4,
					'fat': calories.five.fat/9,
					'divisor': 5
				},
				"six" : {
					'carbs': calories.six.carbs/4,
					'protein': calories.six.protein/4,
					'fat': calories.six.fat/9,
					'divisor': 6
				},
				"seven" : {
					'carbs': calories.seven.carbs/4,
					'protein': calories.seven.protein/4,
					'fat': calories.seven.fat/9,
					'divisor': 7
				}
			}
		}
		else{
			carbs = parseInt($("#cm-carbs").val());
			protein = parseInt($("#cm-protein").val());
			fat = parseInt($("#cm-fat").val());

			if(carbs + protein + fat != 100){
				//Total is not 100%
				alert("Your carbohydrate, protein and fat percentages must add up to 100");
			}
			else{
				carbs = total_calories * carbs / 100;
				protein = total_calories * protein / 100;
				fat = total_calories * fat / 100; 
				calories = {
					"day" : {
						'carbs': carbs,
						'protein': protein,
						'fat': fat
					},
					"one" : {
						'carbs': carbs/1,
						'protein': protein/1,
						'fat': fat/1
					},
					"two" : {
						'carbs': carbs/2,
						'protein': protein/2,
						'fat': fat/2
					},
					"three" : {
						'carbs': carbs/3,
						'protein': protein/3,
						'fat': fat/3
					},
					"four" : {
						'carbs': carbs/4,
						'protein': protein/4,
						'fat': fat/4
					},
					"five" : {
						'carbs': carbs/5,
						'protein': protein/5,
						'fat': fat/5
					},
					"six" : {
						'carbs': carbs/6,
						'protein': protein/6,
						'fat': fat/6
					},
					"seven" : {
						'carbs': carbs/7,
						'protein': protein/7,
						'fat': fat/7
					}
				}
				grams = {
					"day" : {
						'carbs': calories.day.carbs / 4,
						'protein': calories.day.protein /4,
						'fat': calories.day.fat /9,
						'divisor': 1
					},
					"one" : {
						'carbs': calories.one.carbs/4,
						'protein': calories.one.protein/4,
						'fat': calories.one.fat/9,
						'divisor': 1
					},
					"two" : {
						'carbs': calories.two.carbs/4,
						'protein': calories.two.protein/4,
						'fat': calories.two.fat/9,
						'divisor': 2
					},
					"three" : {
						'carbs': calories.three.carbs/4,
						'protein': calories.three.protein/4,
						'fat': calories.three.fat/9,
						'divisor': 3
					},
					"four" : {
						'carbs': calories.four.carbs/4,
						'protein': calories.four.protein/4,
						'fat': calories.four.fat/9,
						'divisor': 4
					},
					"five" : {
						'carbs': calories.five.carbs/4,
						'protein': calories.five.protein/4,
						'fat': calories.five.fat/9,
						'divisor': 5
					},
					"six" : {
						'carbs': calories.six.carbs/4,
						'protein': calories.six.protein/4,
						'fat': calories.six.fat/9,
						'divisor': 6
					},
					"seven" : {
						'carbs': calories.seven.carbs/4,
						'protein': calories.seven.protein/4,
						'fat': calories.seven.fat/9,
						'divisor': 7
					}
				}
				
			}
		}
		meals = $("#cm-meals-per-day").val();
		
		$("#cm-carbs-grams-day").html(Math.round(grams.day.carbs*10)/10);
		$("#cm-protein-grams-day").html(Math.round(grams.day.protein*10)/10);
		$("#cm-fat-grams-day").html(Math.round(grams.day.fat*10)/10);
		
		$("#cm-carbs-grams-meal").html(Math.round(grams[meals].carbs*10)/10);
		$("#cm-protein-grams-meal").html(Math.round(grams[meals].protein*10)/10);
		$("#cm-fat-grams-meal").html(Math.round(grams[meals].fat*10)/10);
		
		$("#cm-carbs-cals-day").html(Math.round(calories.day.carbs));
		$("#cm-protein-cals-day").html(Math.round(calories.day.protein));
		$("#cm-fat-cals-day").html(Math.round(calories.day.fat));
		
		$("#cm-total-cals-day").html(Math.round(calories.day.carbs+ calories.day.protein +calories.day.fat))
		
		$("#cm-carbs-cals-meal").html(Math.round(calories[meals].carbs));
		$("#cm-protein-cals-meal").html(Math.round(calories[meals].protein));
		$("#cm-fat-cals-meal").html(Math.round(calories[meals].fat));
		
		$("#cm-total-cals-meal").html(Math.round(calories[meals].carbs + calories[meals].protein + calories[meals].fat));
		
		var fiber_low = Math.round(weight_lbs * 0.2);
		var fiber_high = Math.round(weight_lbs * 0.25);
		$("#cm-fiber-grams-day").html(fiber_low + " - " + fiber_high);
		
		fiber_low = fiber_low / parseInt(grams[meals].divisor);
		fiber_high = fiber_high / parseInt(grams[meals].divisor);
		$("#cm-fiber-grams-meal").html(Math.round(fiber_low) + " - " + Math.round(fiber_high));
		
		$("#cm-step-4 .cm-macro-disable").hide();
		
	}
	
	$(".cm-calc-button").click(function(){
		cm_calc();
	})
	
	$(".formula").tooltip();
})


function isNumeric(num,fieldPrompt,fieldName){
	var regTest=/(^\d+$)|(^\d+\.\d+$)/;
	if(regTest.test(num)){
		return true
	}else{
		if(fieldPrompt){a
			lert(fieldPrompt+" Please enter numbers only.");
			Get(fieldName).focus();
			Get(fieldName).select()
		}
		return false
	}
}