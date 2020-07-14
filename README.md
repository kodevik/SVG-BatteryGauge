# SVG-BatteryGauge
A simple SVG/Javascript battery gauge which displays percentage charge given a voltage range and a voltage.  
**Initialisation**  
To initialise a new BatteryGauge, you must declare it as an object with the parameters as below (The last 3 parameters are optional):
```
let battery = new BatteryGauge(Scale, Divisions, ChargedVoltage, DischargedVoltage, Div, StrokeWidth, StrokeColour, BgColour);
```
With Scale being how much you want to scale the battery image by, Divisions being the number of battery bars, ChargedVoltage being the voltage of the battery when it is full, DischargedVoltage being the voltage of the battery when it is empty, Div being a div object in your HTML code, StrokeWidth being the width of the outline of the battery (default is 0.5), StrokeColour being the colour of the outline of the battery (default is black) and BgColour being the background colour of the rectangle encapsulating the battery bars (default is white)
e.g.
```

let div = document.getElementById("yourDivNameHere");
let battery = new BatteryGauge(2, 6, 12.7, 11.5, div, 1, 'red','blue');
```