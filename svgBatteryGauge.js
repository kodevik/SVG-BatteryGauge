/*
SVGBatteryGauge - by Viktor Sarychkin
*/
//Constructor
function BatteryGauge(Div, Options){
    scale = Options.scale;
    divisions = Options.divisions;
    chargedVoltage = Options.chargedVoltage;
    dischargedVoltage = Options.dischargedVoltage;
    div = Div;
    strokeWidth = Options.strokeWidth;
    strokeColour = Options.strokeColour;
    bgColour = Options.bgColour;
}
//Convert percentage to colour
BatteryGauge.prototype.numToColour = function(num){
    if (num >= 70){
        return 'green';
    }
    else if(num>=50){
        return 'yellow';
    }
    else if(num>=20){
        return 'orange';
    }
    else{
        return 'red';
    }
}
//Battery drawing function
BatteryGauge.prototype.drawBattery = function(Extra = ""){
    var w = 120*scale;
    var h = 200*scale //scaling width and height of the battery
    var divSvgContent = `<svg height="${h}" width="${w}" viewbox="0 0 30 50">
    <rect
    y="6.7442555"
    x="5.2442555"
    height="36.51149"
    width="19.51149"
    id="rect1402"
    style="opacity:1;fill:${bgColour};fill-opacity:100;fill-rule:evenodd;stroke:${strokeColour};stroke-width:${strokeWidth};stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <rect
    y="4.3445573"
    x="11.653558"
    height="1.5449684"
    width="6.6928849"
    id="rect1404"
    style="opacity:1;fill:${strokeColour};fill-opacity:1;fill-rule:evenodd;stroke:${strokeColour};stroke-width:0.307115;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" /> ${Extra}`; //drawing battery shape, ${Extra} is for extra svg content to be written to the div, i.e. bars showing the percentage of the battery
    div.innerHTML = divSvgContent; // write content to the div
}
// Converting a figure for voltage to a percentage given a range
BatteryGauge.prototype.voltToPercentage = function(volts, chrg, dschrg){
    percentage = (volts-dschrg)/(chrg-dschrg)*100>100 ? 100 : (volts-dschrg)/(chrg-dschrg)*100<0 ? 0 : (volts-dschrg)/(chrg-dschrg)*100;
    return Math.round(percentage); // return rounded value for percentage
}
BatteryGauge.prototype.update = function(voltage){
    var svgBars = ''; // empty string for svg content to be appended to
    var distance = 35.5/divisions; // distance between percentage bars is the height of the battery at 1x scale divided by the number of bars intended
    var rectHeight = distance-0.5; // height of each percentage bar is the distance between them with 0.5px taken off for a border
    var percent = this.voltToPercentage(voltage, chargedVoltage, dischargedVoltage); // converting the voltage given to a percentage
    var skip = Math.floor(divisions - divisions*percent/100); // how many bars to skip drawing to show percentage
    for (i=skip; i < divisions; i++){ // iterating through the range between skip and divisions
        var y = 7.5+distance*i; // y value of the rectangle, with y:7.5px being the y coordinate of the topmost bar at 100%
        if (i==skip){
            svgBars += '<g><rect x="6" y="'+ y+'" width="18" height="'+rectHeight+'" style="fill:'+ this.numToColour(percent)+';fill-rule:evenodd;" /><text id="top" style="font-family: Arial; font-size: 3px" x="50%" y="'+(y+(5/divisions)*4+0.5)+'" text-anchor="middle">'+percent+'%</text></g>'; // putting the percentage value in the top bar
        }
        else{
            svgBars += '<rect x="6" y="'+ y+'" width="18" height="'+rectHeight+'" style="fill:'+ this.numToColour(percent)+';fill-rule:evenodd;" />';
        }
    }
	svgBars += '<use xlink:href="#top"/>'
    this.drawBattery(svgBars); // draw the battery with the percentage bars
}