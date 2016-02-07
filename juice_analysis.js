var fs = require('fs');
var juice_data_file = './juice_orders';

var juice_data = JSON.parse(fs.readFileSync(juice_data_file ,'utf-8'));

var per_juice_info = function(){
	var juice_info = {};
	juice_data.forEach(function(data){
		if((Object.keys(juice_info).indexOf(data.drinkName)) == -1)
			juice_info[data.drinkName] = 0;
		juice_info[data.drinkName]++;
	});
	return juice_info;
};

var per_day_juice_consumption = function(){
	var per_day_juice_analysis = {};
	var days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	days.forEach(function(day){
		per_day_juice_analysis[day] = {};
	})
	juice_data.forEach(function(data){
		var day = new Date(data.date.slice(0,10)).getDay()
		if(Object.keys(per_day_juice_analysis[days[day-1]]).indexOf(data.drinkName) == -1)
			per_day_juice_analysis[days[day-1]][data.drinkName] = 0;
		per_day_juice_analysis[days[day-1]][data.drinkName]++;
	});
	return per_day_juice_analysis;
};






