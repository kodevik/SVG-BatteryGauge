# SVG-BatteryGauge
A simple SVG/Javascript battery gauge which displays percentage charge given a voltage range and a voltage.
**Initialisation**
To initialise a new BatteryGauge, you must declare it as an object with the parameters as below (The last 3 parameters are optional):
```
let battery = new BatteryGauge(Scale, Divisions, ChargedVoltage, DischargedVoltage, Div, StrokeWidth, StrokeColour, BgColour);
```
With Scale being
e.g.
```

let div = document.getElementById("yourDivNameHere");
let battery = new BatteryGauge(2, 6, 12.7, 11.5, div);
```