$(document).ready( () => {


  start(threeStackedBar);

  start(oneStackedBar);

  start(fiveStackedBar);

})

//starter function starts all the functions working together
function start(choice) {
  m(choice);
  tickLabels(choice);
  tableMaker(choice);
  createBars(choice);
  labelsAndTitles(choice);
  tablePadding(choice);
  alternateY(choice);

}


// Object for charts
let threeStackedBar = {
  names: "threeStackedBar",
  fakedata : [[6, 3, 5], [4, 4, 7], [2, 9, 5], [2, 3, 5], [4, 4, 4], [2, 1, 5], [12, 3, 5]],
  xaxis : ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  arrayLength() {
    yDataSets = this.fakedata[0].length;
    return yDataSets
  },
  barColor : ['green', 'blue', 'purple', 'red', 'yellow'],
  chartHeight : 700,
  chartWidth : 800,
// data label and title formatting
  chartTitle : ["Three Stacked Bar Chart", 20, "blue", "center"],
  xAxisTitle : ["Months", 20, "blue", "center"],
  yAxisTitle : ["Pizza", 20, "black"],
  xLabelFormat : [15, "red", "center"],
  yTicks : [15, "black", "white"],
  xTicks : [15, "white"]
}

let fiveStackedBar = {
  names: "fiveStackedBar",
  fakedata : [[50, 100, 200, 45, 125], [100, 200, 150, 30, 200], [200, 100, 90, 20, 300], [200, 200, 100, 75, 100]],
  xaxis : ['North', 'South', 'East', 'West'],
  arrayLength() {
    yDataSets = this.fakedata[0].length;
    return yDataSets
  },
  barColor : ['red', 'blue', 'brown', 'pink', 'green'],
  chartHeight : 500,
  chartWidth : 450,
// data label and title formatting
  chartTitle : ["Five Stacked Bar Chart", 15, "green", "center"],
  xAxisTitle : ["Regions", 20, "blue", "center"],
  yAxisTitle : ["Product Lines", 20, "black"],
  xLabelFormat : [15, "red", "center"],
  yTicks : [15, "green", "orange"],
  xTicks : [15, "pink"]
}

let oneStackedBar = {
  names: "oneStackedBar",
  fakedata : [2, 3, 5],
  xaxis : ['Aug', 'Sep', 'Oct'],
  arrayLength() {
    yDataSets = this.fakedata[0].length;
    return yDataSets
  },
  barColor : ['blue'],
  chartHeight : 600,
  chartWidth : 800,
// data label and title formatting
  chartTitle : ["Single bar Chart", 30, "brown", "center"],
  xAxisTitle : ["Weeks", 20, "green", "center"],
  yAxisTitle : ["Sales!!", 20, "green"],
  xLabelFormat : [15, "green", "center"],
  yTicks : [20, "white", "red"],
  xTicks : [15, "white"]
}


// there are 6 main functions:  m, tableMaker, createBars...
// createLables, xaxis, titles, yticks


// function:  m - generates a total for each of the xvalues and then calcs the biggest Y value
// biggestNum is then the maximum height of the chart (if user picks 600px, biggestNum will be 600px)
// all other values are then caluculated as a % of biggestNum and eventually muliplied by the user determined
// max chart height (600px in this example).  this sets out the height of each y value.
// widthOfBar takes the number of data sets, divides the user determined width of the chart (90% of it for
// conservatism on space) and then provides an integer which is set as the px width of all the bars
// the key variables are stored outside the math function as the varaible releasedData.
// if tests to see if the data is single dimension array (simple bar chart) or 2 dimensional (stacked bar)
let m = function (optionsObj) {
  let totals = [];
  let sum = 0;

  if(optionsObj.fakedata[0].constructor === Array) {
  for (i = 0; i < optionsObj.fakedata.length; i++) {
    for (a = 0; a < optionsObj.arrayLength(); a++) {
      sum += optionsObj.fakedata[i][a];
    } totals.push(sum);
      sum = 0;
  }

  let biggestNum = Math.max(...totals);
  let percentSize = [];
  let fakeDataSize = [];
  let widthOfBar = (optionsObj.chartWidth * 0.9) / totals.length;
  for (i = 0; i < optionsObj.fakedata.length; i++) {
    for (a = 0; a < optionsObj.arrayLength(); a++) {
        percentSize.push(optionsObj.fakedata[i][a] / biggestNum);
        }
        fakeDataSize.push(percentSize);
        percentSize = [];
    }
   const cleanData = [biggestNum, fakeDataSize, widthOfBar];
    return cleanData;
  }

  else {

  let biggestNum = Math.max(...optionsObj.fakedata);
  let percentSize = [];
  let fakeDataSize = [];
  let widthOfBar = (optionsObj.chartWidth * 0.9) / optionsObj.fakedata.length;
  for (i = 0; i < optionsObj.fakedata.length; i++) {
        fakeDataSize.push(optionsObj.fakedata[i] / biggestNum);
    }
   const cleanData = [biggestNum, fakeDataSize, widthOfBar];
    return cleanData;
  }
}


//function: tableMaker generates a four row table which is fixed for all charts.  each row is given a unique id
//to be used later.  myTr0 is for chart title; myTr1 is for the bar chart divs; myTr2 is for the xlabels; myTr3
// is for the xaxis title.
function tableMaker(optionsObj) {
    var x = document.createElement("TABLE");
    x.setAttribute("id", optionsObj.names);
    document.body.appendChild(x);

    for (i = 0; i < 4; i++) {
    var y = document.createElement("TR");
    y.setAttribute("id", optionsObj.names + "myTr" + i);
    document.getElementById(optionsObj.names).appendChild(y);
  };
}

// function createBars: creates divs of different colors and sizes based on data provided.  TDs are created and then
// each TD is appended with a specifc div with a unique id.  color, height and width are set by math function.
// data labels are appened to divs via creaateTextNode getting labels from data set.
function createBars(optionsObj) {

  if(optionsObj.fakedata[0].constructor === Array) {
  let v = optionsObj.arrayLength();
  for (x = 0; x < optionsObj.fakedata.length; x++) {
    let a = document.createElement("TD");
    a.setAttribute("id", "bars");
    a.setAttribute("style", "font-size: " + optionsObj.xTicks[0] + "px; color: " + optionsObj.xTicks[1]);
      for (f = 0; f < v; f++) {
        let b = document.createElement("DIV");
        let c = document.createTextNode(optionsObj.fakedata[x][f]);
        b.appendChild(c);
        b.setAttribute("class", "rectangle");
        b.setAttribute("id", "div" + x + f);
        b.setAttribute("style", "width: " + m(optionsObj)[2] + "px; height: " + m(optionsObj)[1][x][f] * optionsObj.chartHeight + "px; " + "background-color:" + optionsObj.barColor[f]);
        a.appendChild(b);
        document.getElementById(optionsObj.names + "myTr1").appendChild(a);
        }
      }
  }
  else {
  for (x = 0; x < optionsObj.fakedata.length; x++) {
    let a = document.createElement("TD");
    a.setAttribute("id", "bars");
    a.setAttribute("style", "font-size: " + optionsObj.xTicks[0] + "px; color: " + optionsObj.xTicks[1]);
    let b = document.createElement("DIV");
    let c = document.createTextNode(optionsObj.fakedata[x]);
    b.appendChild(c);
    b.setAttribute("class", "rectangle");
    b.setAttribute("id", "div" + x);
    b.setAttribute("style", "width: " + m(optionsObj)[2] + "px; height: " + m(optionsObj)[1][x] * optionsObj.chartHeight + "px; " + "background-color:" + optionsObj.barColor[0]);
    a.appendChild(b);
    document.getElementById(optionsObj.names + "myTr1").appendChild(a);
    }
  }
}

// function labelsAndTitles: creates TDs for corresponding table rows for titling of xaxis, main chart, xaxis
//labels.  jquery prepend method is used to add TDs for the yaxis title and yticks.  css used to rotate text.
function labelsAndTitles(optionsObj) {
  //xaxis labels
  for (x = 0; x < optionsObj.fakedata.length; x++) {
    let b = document.createElement("TD");
    let c = document.createTextNode(optionsObj.xaxis[x]);
    b.setAttribute("style", "font-size: " + optionsObj.xLabelFormat[0] + "px; text-align: " + optionsObj.xLabelFormat[2] + "; color: " + optionsObj.xLabelFormat[1]);
    b.appendChild(c);
    document.getElementById(optionsObj.names + "myTr2").appendChild(b);
  };

  //main chart title
  let e = document.createElement("TD");
  e.setAttribute("id", "chartTitle");
  e.setAttribute("colspan", optionsObj.fakedata.length);
  e.setAttribute("style", "font-size: " + optionsObj.chartTitle[1] + "px; color: " + optionsObj.chartTitle[2] + "; text-align: " + optionsObj.chartTitle[3]);
  let f = document.createTextNode(optionsObj.chartTitle[0]);
  e.appendChild(f);
  document.getElementById(optionsObj.names + "myTr0").appendChild(e);

  //xaxis title
  let a = document.createElement("TD");
  a.setAttribute("id", "xTitle");
  a.setAttribute("colspan", optionsObj.fakedata.length);
  a.setAttribute("style", "font-size: " + optionsObj.xAxisTitle[1] + "px; color: " + optionsObj.xAxisTitle[2] + "; text-align: " + optionsObj.xAxisTitle[3]);
  let d = document.createTextNode(optionsObj.xAxisTitle[0]);
  a.appendChild(d);
  document.getElementById(optionsObj.names + "myTr3").appendChild(a);
}


// function: tickLabels uses biggestNum and creates an array of tickmarks from 0 to biggestNumb
// for use on the Y axis. new function yTicks added which creates a y axis data label system
// starting at zero to biggestNum at 25% increments rounded to nearest INT.
let tickLabels = function (optionsObj) {
  let v = m(optionsObj)[0];
  let x = [];
    for (i = 0; i <= 4; i++) {
      x.push(Math.round(v * 0.25 * i));
    }
      let a = x.reverse();
      let y = a.toString();
      let h = (optionsObj.chartHeight/optionsObj.yTicks[0] - 5) / 4;
      let g = "<br>";
      let n = g.repeat(h);
      let tickArray = y.split(",").join(n);

    return tickArray
}

//create of y axis title and y scale tick marks
function alternateY (optionsObj) {
let row = document.getElementById(optionsObj.names + 'myTr1');

let cell1 = row.insertCell(0);
let cell2 = row.insertCell(1);

//y scale tickmarks
cell2.innerHTML = tickLabels(optionsObj);
cell2.setAttribute("id", optionsObj.names + "cell2");
$('#' + optionsObj.names + 'cell2').css({"color": optionsObj.yTicks[1], "font-size": optionsObj.yTicks[0], "background-color": optionsObj.yTicks[2]});
//y axis title
cell1.innerHTML = optionsObj.yAxisTitle[0];
cell1.setAttribute("id", optionsObj.names + "cell1");
$('#' + optionsObj.names + 'cell1').css({"color": optionsObj.yAxisTitle[2], "font-size": optionsObj.yAxisTitle[1]});

}
// tablePadding keeps the yLabels and yTitle centered on the chart data by adding empty cells to the table
function tablePadding (optionsObj) {
    $('#' + optionsObj.names + ' #' + optionsObj.names + 'myTr0').prepend('<td colspan="2">   </td>');
    $('#' + optionsObj.names + ' #' + optionsObj.names + 'myTr2').prepend('<td colspan="2">   </td>');
    $('#' + optionsObj.names + ' #' + optionsObj.names + 'myTr3').prepend('<td colspan="2">   </td>');
}



