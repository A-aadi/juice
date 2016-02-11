var per_juice_consumption = function(){
	$.get('juicedata',function(data){
		data = JSON.parse(data)
		var juice_info_for_bar = [];
		var juice_info_for_pie = [];
		var per_juice_count  = {};
		data.forEach(function(each){ per_juice_count[each.drinkName]=
			(per_juice_count[each.drinkName]||0)+1});
		var juiceNames = Object.keys(per_juice_count);
		for(var i in juiceNames){
			if(juiceNames[i].toUpperCase() !='CTL' && juiceNames[i]!='Register User'){
				juice_info_for_bar.push({'name':juiceNames[i],'quantity':per_juice_count[juiceNames[i]]})
				juice_info_for_pie.push({'label':juiceNames[i],'value':per_juice_count[juiceNames[i]]})
			}
		}
		if($('#per_juice_info')[0].innerHTML == 'juice according consumption'){
			// juiceConsumption(juice_info_for_bar)
			pie_chart(juice_info_for_pie,"pie chart representation of juice consumption")
		}
	});
};

var juiceConsumption = function(data){
	// d3.selectAll("svg").remove()
	var svgContainer = d3.select('body').append('svg')
						.attr('width', 1200)
						.attr('height', 600)
	var x = d3.scale.linear()
			.domain([10, 6000])
			.range([500, 50])
	var formatPercent = d3.format("1.0%");
	var xa = d3.scale.ordinal()
	   .rangeRoundBands([40, 300], 0);

	var ya = d3.scale.linear()
	   .range([500, 70]);

	var xAxis = d3.svg.axis()
	   .scale(xa)
	   .orient("bottom");

	var yAxis = d3.svg.axis()
	   .scale(ya)
	   .orient("right")
	   .tickFormat(formatPercent);
	svgContainer.append("g")
	    .attr("class", "graph")
	   .attr('id','axis')
	     .attr("transform", "translate(0," + 500 + ")")
	     .call(xAxis);

	 svgContainer.append("g")
	     .attr('id','axis')
	     .attr("class", "graph")
	     .call(yAxis)
	var lines = d3.selectAll('svg')
				.selectAll('line')
				.data(data)
				.enter()
				.append('line')
				.attr('x1',function(d, i){ return (i*50)+30})
				.attr('x2', function(d, i){return (i*50)+30})
				.attr('y1', 500)
				.attr('y2', function(d, i){ return x(d.quantity)})
				.attr('stroke', 'black')
				.attr('stroke-width',10);
	lines.append('svg:title')
		.text(function(d, i){ return d.name})
}

var pie_chart = function(data, title){
	d3.selectAll('svg').remove();
	var pie = new d3pie("chart", {
		"header": {
			"title": {
				"text": title,
			}
		},
		"size": {
			"canvasHeight": 700,
			"canvasWidth": 1300,
			"pieOuterRadius": 200,
			"pieInnerRadius": 150
		},
		"data": {
			"content":data
		},
		"labels": {
			"outer": {
				"pieDistance": 80
			},
			"inner" : {
				"format": "percentage"
			}
		},
		"tooltips": {
	    	"enabled": true,
	    	"type": "placeholder",
	    	"string":"Quantity={value}"
	  	}
	});
}
