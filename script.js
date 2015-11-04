$(document).ready(function() {
	var apiKey = '40506dc613c1b32f5843771e00b2e755';
	var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta,ga&units=imperial&APPID="+apiKey;

    $.getJSON(weatherUrl, function(weatherData){
        console.log(weatherData);
        currTemp = weatherData.main.temp;



	    var canvas = $('#weather-canvas');
	    var context = canvas[0].getContext('2d');

	    var lineWidth = 15;
	    var outterRadius = 70;
	    var innerRadius = outterRadius - lineWidth;
	    var currPerc = 0;
	    var counterClockwise = false;
	    var circ = Math.PI * 2;
	    var quart = Math.PI / 2;

		function animate(current){

			var shadeColor; //hoisted so no need for it

		    if((currPerc) < 32){
		        shadeColor = '#d4f0ff ';
		    }else if(((currPerc) >= 32) && ((currPerc) < 59)){
		        shadeColor = "#129793 ";
		    }else if(((currPerc) >= 59) && ((currPerc) < 75)){
		        shadeColor = "#7cfc00 ";
		    }else if(((currPerc) >= 75) && ((currPerc) < 90)){
		        shadeColor = "#ff6600 ";
		    }else{
		        shadeColor = "#e3170d ";
		    }

		    context.fillStyle = "#ccc";
		    context.beginPath();
		    context.arc(155, 75,innerRadius,0,2*Math.PI,true);
		    context.closePath();
		    context.fill();


		    context.lineWidth = 10;
		    context.strokeStyle = shadeColor;
		    context.beginPath();
		    context.arc(155, 75, outterRadius, -(quart), ((circ) * current) - quart, false);
		    context.stroke();
		    context.font = "48px Myriad Pro";
		    context.fillStyle= "Blue";
		    context.textBaseLine = "top";
		    context.fillText(currTemp, 175 - outterRadius, 85 - outterRadius/2);
		    currPerc++;
		    if(currPerc < currTemp){
		        requestAnimationFrame(function(){
		            animate(currPerc / 100);

		        });
		    }

		}

		animate();
		context.closePath();

		var cityName = weatherData.name;
		var weatherDescription = weatherData.weather.description;
		var weatherForcast = weatherData.weather.main;
		var windSpeed = weatherData.wind.speed;

		$('#current-temp').append(cityName +"  forcast: "+ weatherForcast + )

	});
});