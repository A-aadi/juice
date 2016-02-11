var fs = require('fs');
var juice_data_file = './juice_orders';

var juice_data = JSON.parse(fs.readFileSync(juice_data_file ,'utf-8'));

var per_juice_info = function(){
	var juice_info = [];
	juice_data.forEach(function(data){
		if(juice_info.indexOf(data.drinkName)) == -1)
			juice_info[data.drinkName] = 0;
		juice_info[data.drinkName]++;
	});
   // fs.writeFileSync('./per_juice_data.JSON', JSON.stringify(juice_info));
	// return juice_info;
};
per_juice_info();

var per_day_juice_consumption = function(){
	var per_day_juice_analysis = {};
	var days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
	days.forEach(function(day){
		per_day_juice_analysis[day] = {};
	})
	juice_data.forEach(function(data){
		var day = new Date(data.date.slice(0,10)).getDay();
		if(Object.keys(per_day_juice_analysis[days[day-1]]).indexOf(data.drinkName) == -1)
			per_day_juice_analysis[days[day-1]][data.drinkName] = 0;
		per_day_juice_analysis[days[day-1]][data.drinkName]++;
	});
};

var per_month_juice_consumption = function(){
	var per_month_juice_analysis = {};
	var months = ['January', 'February','March','April','May', 'June', 'July', 'August',
					'September', 'October', 'Novembor', 'december'];
	juice_data.forEach(function(data){
		var month = new Date(data.date.slice(0,10)).getMonth();
		if(Object.keys(per_month_juice_analysis).indexOf(months[month]) == -1 || 
			Object.keys(per_month_juice_analysis[months[month]]).indexOf(data.drinkName) == -1){
			if(Object.keys(per_month_juice_analysis).indexOf(months[month]) == -1)
				per_month_juice_analysis[months[month]] = {};
			per_month_juice_analysis[months[month]][data.drinkName] = 0;
		}
		per_month_juice_analysis[months[month]][data.drinkName]++;
	});
   	fs.writeFileSync('./per_month_juice_data.JSON', JSON.stringify(per_month_juice_analysis));
	// return per_month_juice_analysis;
};
per_month_juice_consumption();


