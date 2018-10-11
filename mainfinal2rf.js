$(document).ready( () => {

  start();
  console.log(m(threeStackedBar));
  console.log(tickLabels(threeStackedBar));
})

// data sets for testing simple bar chart
//const xaxis = ['2009', '2010', '2011', '2012'];
//const fakedata = [4, 7, 4, 12];

// data sets for testing 3 stacked bar chart
//const xaxis = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'global'];
//const fakedata = [[2, 3, 5], [4, 4, 7], [2, 9, 5], [2, 3, 5], [4, 4, 4], [2, 1, 5], [2, 3, 5]];

// data sets for testing 5 stacked bar chart
//const xaxis = ['Jun', 'Jul', 'Aug', 'Sep'];
//const fakedata = [[2, 3, 5, 2, 2], [4, 4, 1, 5, 7], [2, 4, 6, 1, 5], [1, 1, 2, 3, 5]];

// yDataSets determies if the data set is one or 2 dimensinoal array.  2 dimensions means stacked bar
// which impacts the math function for chart sizing and the createBars function for bar appearance
//let yDataSets = fakedata[0].length;

// Object for chart options
let threeStackedBar = {
  fakedata : [[6, 3, 5], [4, 4, 7], [2, 9, 5], [2, 3, 5], [4, 4, 4], [2, 1, 5], [12, 3, 5]],
  xaxis : ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  arrayLength() {
    yDataSets = this.fakedata[0].length;
    return yDataSets
  },
  barColor : ['red', 'blue', 'green', 'red', 'yellow'],
  chartHeight : 600,
  chartWidth : 800,
// data label and title formatting
  chartTitle : ["Three Stacked Bar Chart", 20, "blue", "center"],
  xAxisTitle : ["Months", 20, "green", "center"],
  yAxisTitle : ["Sales!!", 20, "green"],
  xLabelFormat : [15, "green", "center"],
  yTicks : [20, "green"],
  xTicks : [15, "white"]
}

let oneStackedBar = {
  fakedata : [2, 3, 5],
  xaxis : ['Aug', 'Sep', 'Oct'],
  arrayLength() {
    yDataSets = this.fakedata[0].length;
    return yDataSets
  },
  barColor : ['red', 'green', 'yellow'],
  chartHeight : 600,
  chartWidth : 800,
// data label and title formatting
  chartTitle : ["Single bar Chart", 20, "blue", "center"],
  xAxisTitle : ["Months", 20, "green", "center"],
  yAxisTitle : ["Sales!!", 20, "green"],
  xLabelFormat : [15, "green", "center"],
  yTicks : [20, "green"],
  xTicks : [15, "white"]
}

//starter function starts all the functions working together
function start() {
  m(threeStackedBar);
  tickLabels(threeStackedBar);
  tableMaker();
  createBars(threeStackedBar);
  labelsAndTitles(threeStackedBar);
  tablePadding();
  yTicksAndTitle(threeStackedBar);

}
// there are 6 main functions:  math, tableMaker, createBars...
// createLables, xaxis, titles, yticks


// function:  math - generates a total for each of the xvalues and then calcs the biggest Y value
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

// function: yTickMaker uses biggestNum and creates an array of tickmarks from 0 to biggestNumb
// for use on the Y axis. new function yTicks added which creates a y axis data label system
// starting at zero to biggestNum at 25% increments rounded to nearest INT.
let tickLabels = function (optionsObj) {
  let v = m(optionsObj)[0];
  let x = [];
    for (i = 0; i <= 4; i++) {
      x.push(v * 0.25 * i);
    }
      let a = x.reverse();
      let y = a.toString();
      let tickArray = y.split(",").join("<br>");

    return tickArray
}




//function: tableMaker generates a four row table which is fixed for all charts.  each row is given a unique id
//to be used later.  myTr0 is for chart title; myTr1 is for the bar chart divs; myTr2 is for the xlabels; myTr3
// is for the xaxis title.
function tableMaker() {
    var x = document.createElement("TABLE");
    x.setAttribute("id", "bigTable");
    document.body.appendChild(x);

    for (i = 0; i < 4; i++) {
    var y = document.createElement("TR");
    y.setAttribute("id", "myTr" + i);
    document.getElementById("bigTable").appendChild(y);
  };
}

// function createBars: creates divs of different colors and sizes based on data provided.  TDs are created and then
// each TD is appended with a specifc div with a unique id.  color, height and width are set by math function.
// data labels are appened to divs via creaateTextNode getting labels from data set.
function createBars(optionsObj) {

  if(optionsObj.fakedata[0].constructor === Array) {

  for (x = 0; x < optionsObj.fakedata.length; x++) {
    let a = document.createElement("TD");
    a.setAttribute("id", "bars");
    a.setAttribute("style", "font-size: " + optionsObj.xTicks[0] + "px; color: " + optionsObj.xTicks[1]);
  for (i = 0; i < optionsObj.arrayLength(); i++) {
    let b = document.createElement("DIV");
    let c = document.createTextNode(optionsObj.fakedata[x][i]);
    b.appendChild(c);
    b.setAttribute("class", "rectangle");
    b.setAttribute("id", "div" + x + i);
    b.setAttribute("style", "width: " + m(optionsObj)[2] + "px; height: " + m(optionsObj)[1][x][i] * optionsObj.chartHeight + "px; " + "background-color:" + optionsObj.barColor[i]);
    a.appendChild(b);
    document.getElementById("myTr1").appendChild(a);
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
    document.getElementById("myTr1").appendChild(a);
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
    document.getElementById("myTr2").appendChild(b);
  };

  //main chart title
  let e = document.createElement("TD");
  e.setAttribute("id", "chartTitle");
  e.setAttribute("colspan", optionsObj.fakedata.length);
  e.setAttribute("style", "font-size: " + optionsObj.chartTitle[1] + "px; color: " + optionsObj.chartTitle[2] + "; text-align: " + optionsObj.chartTitle[3]);
  let f = document.createTextNode(optionsObj.chartTitle[0]);
  e.appendChild(f);
  document.getElementById("myTr0").appendChild(e);

  //xaxis title
  let a = document.createElement("TD");
  a.setAttribute("id", "xTitle");
  a.setAttribute("colspan", optionsObj.fakedata.length);
  a.setAttribute("style", "font-size: " + optionsObj.xAxisTitle[1] + "px; color: " + optionsObj.xAxisTitle[2] + "; text-align: " + optionsObj.xAxisTitle[3]);
  let d = document.createTextNode(optionsObj.xAxisTitle[0]);
  a.appendChild(d);
  document.getElementById("myTr3").appendChild(a);
}

function yTicksAndTitle (optionsObj) {

  // y ticklabels
  $('#bigTable #myTr1').eq(0).prepend('<td id="ycontainer"><p id="yticks"></p></td>');
  document.getElementById("yticks").innerHTML = tickLabels(optionsObj);
  $('#yticks').css({"color": optionsObj.yTicks[1], "font-size": optionsObj.yTicks[0]});

  //y axis title
  $('#bigTable #myTr1').eq(0).prepend('<td><p id="rotate"></p></td>');
  document.getElementById("rotate").innerHTML = optionsObj.yAxisTitle[0];
  $('#rotate').css({"color": optionsObj.yAxisTitle[2], "font-size": optionsObj.yAxisTitle[1], "transform": "rotate(-90deg"});
}

function tablePadding () {
    $('#bigTable #myTr0').prepend('<td colspan="2">   </td>');
    $('#bigTable #myTr2').prepend('<td colspan="2">   </td>');
    $('#bigTable #myTr3').prepend('<td colspan="2">   </td>');
}



