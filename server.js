var express = require('express')
var app = express();
var request = require('request')
var hbs = require('hbs')

app.set("views",__dirname+'/views')
app.set("view engine","hbs")

hbs.registerPartials(__dirname+'/views/partials');


app.get('/:city', (req, res)=>{
    let city = req.params.city;
    
    var url = `https://samples.openweathermap.org/data/2.5/weather?q=${city},uk&appid=b6907d289e10d714a6e88b30761fae22`
    request(url,(error, response, body )=>{
         if(error){
         res.statusCode(404).send("There is a error")
         }else {
             var weather_json = JSON.parse(body)
            //  console.log(weather_json)
             var weather = {
                 city: city,
                 temp: Math.round(weather_json.main.temp),
                 description: weather_json.weather[0].description,
                 icon: weather_json.weather[0].icon,
             }
             console.log(weather)
             res.render("index",{
                 layout: 'layout',
                 weather: 'weather'
             })
            
         }
        
        
    })
    
})

app.listen(3000, ()=>console.log("Server is running"))