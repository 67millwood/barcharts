

// data sets for testing simple bar chart
//const xaxis = ['2009', '2010', '2011', '2012'];
//const fakedata = [4, 7, 4, 12];

// data sets for testing 3 stacked bar chart
//const xaxis = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//const fakedata = [[2, 3, 5], [4, 4, 7], [2, 9, 5], [2, 3, 5], [4, 4, 4], [2, 1, 5], [2, 3, 5]];

// data sets for testing 5 stacked bar chart
const xaxis = ['Jun', 'Jul', 'Aug', 'Sep'];
const fakedata = [[2, 3, 5, 2, 2], [4, 4, 1, 5, 7], [2, 4, 6, 1, 5], [1, 1, 2, 3, 5]];

// yDataSets determies if the data set is one or 2 dimensinoal array.  2 dimensions means stacked bar
// which impacts the math function for chart sizing and the createBars function for bar appearance
let yDataSets = fakedata[0].length;

// bar and chart size formatting
let barColor = ['red', 'blue', 'green', 'black', 'red'];
let chartHeight = 450;
let chartWidth = 700;

// data label and title formatting
const chartTitle = ["Chart title", 20, "blue", "center"];
const xAxisTitle = ["Months", 20, "green", "center"];
const yAxisTitle = ["Sales", 15, "blue"];
const xLabelFormat = [18, "green", "center"];
const yTicks = [15, "blue"];


//starter function starts all the functions working together
function start() {
  math();
  tableMaker();
  createBars();
  labelsAndTitles();
  yTicksAndTitle();

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
function math () {
  let totals = [];
  let sum = 0;

  if(fakedata[0].constructor === Array) {
  for (i = 0; i < fakedata.length; i++) {
    for (a = 0; a < yDataSets; a++) {
      sum += fakedata[i][a];
    } totals.push(sum);
      sum = 0;
  }

  let biggestNum = Math.max(...totals);
  let percentSize = [];
  let fakeDataSize = [];
  let widthOfBar = (chartWidth * 0.9) / totals.length;
  for (i = 0; i < fakedata.length; i++) {
    for (a = 0; a < yDataSets; a++) {
        percentSize.push(fakedata[i][a] / biggestNum);
        }
        fakeDataSize.push(percentSize);
        percentSize = [];
    }
   const cleanData = [biggestNum, fakeDataSize, widthOfBar];
    return cleanData;
  }

  else {

  let biggestNum = Math.max(...fakedata);
  let percentSize = [];
  let fakeDataSize = [];
  let widthOfBar = (chartWidth * 0.9) / fakedata.length;
  for (i = 0; i < fakedata.length; i++) {
        fakeDataSize.push(fakedata[i] / biggestNum);
    }
   const cleanData = [biggestNum, fakeDataSize, widthOfBar];
    return cleanData;
  }
}

let releasedData = math();

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
function createBars() {

  if(fakedata[0].constructor === Array) {

  for (x = 0; x < fakedata.length; x++) {
    let a = document.createElement("TD");
  for (i = 0; i < yDataSets; i++) {
    let b = document.createElement("DIV");
    let c = document.createTextNode(fakedata[x][i]);
    b.appendChild(c);
    b.setAttribute("class", "rectangle");
    b.setAttribute("id", "div" + x + i);
    b.setAttribute("style", "width: " + releasedData[2] + "px; height: " + releasedData[1][x][i] * chartHeight + "px; " + "background-color:" + barColor[i]);
    a.appendChild(b);
    document.getElementById("myTr1").appendChild(a);
    }
  }
}
  else {
  for (x = 0; x < fakedata.length; x++) {
    let a = document.createElement("TD");
    let b = document.createElement("DIV");
    let c = document.createTextNode(fakedata[x]);
    b.appendChild(c);
    b.setAttribute("class", "rectangle");
    b.setAttribute("id", "div" + x);
    b.setAttribute("style", "width: " + releasedData[2] + "px; height: " + releasedData[1][x] * chartHeight + "px; " + "background-color:" + barColor[0]);
    a.appendChild(b);
    document.getElementById("myTr1").appendChild(a);
    }
  }
}

// function labelsAndTitles: creates TDs for corresponding table rows for titling of xaxis, main chart, xaxis
//labels.  jquery prepend method is used to add TDs for the yaxis title and yticks.  css used to rotate text.
function labelsAndTitles() {
  //xaxis labels
  for (x = 0; x < fakedata.length; x++) {
    let b = document.createElement("TD");
    let c = document.createTextNode(xaxis[x]);
    b.setAttribute("style", "font-size: " + xLabelFormat[0] + "px; text-align: " + xLabelFormat[2] + "; color: " + xLabelFormat[1]);
    b.appendChild(c);
    document.getElementById("myTr2").appendChild(b);
  };

  //main chart title
  let e = document.createElement("TD");
  e.setAttribute("id", "chartTitle");
  e.setAttribute("colspan", fakedata.length);
  e.setAttribute("style", "font-size: " + chartTitle[1] + "px; color: " + chartTitle[2] + "; text-align: " + xLabelFormat[2]);
  let f = document.createTextNode(chartTitle[0]);
  e.appendChild(f);
  document.getElementById("myTr0").appendChild(e);

  //xaxis title
  let a = document.createElement("TD");
  a.setAttribute("id", "xTitle");
  a.setAttribute("colspan", fakedata.length);
  a.setAttribute("style", "font-size: " + xAxisTitle[1] + "px; color: " + xAxisTitle[2] + "; text-align: " + xAxisTitle[3]);
  let d = document.createTextNode(xAxisTitle[0]);
  a.appendChild(d);
  document.getElementById("myTr3").appendChild(a);
}

function yTicksAndTitle () {
  $('#bigTable #myTr0').eq(0).prepend('<td rowspan="5"><p id="yticks">y ticks</td>');
  $('#yticks').css({"color": yTicks[1], "font-size": yTicks[0]});
  $('#bigTable #myTr0').eq(0).prepend('<td rowspan="5"><p id="rotate"></p></td>');
  document.getElementById("rotate").innerHTML = yAxisTitle[0];
  $('#rotate').css({"color": yAxisTitle[2], "font-size": yAxisTitle[1], "transform": "rotate(-90deg"});
}



