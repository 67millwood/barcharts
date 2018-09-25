// This is where we will build the chart


// numClean takes two arrays for x and y values
// creates the important numbers necessary to develop a bar chart
function numClean(x_values, y_values) {
  // get the number of data points
  var datapoints = x_values.length;
  // get the largest value in the data
  var maximum = Math.max(...y_values);
  // sets each bar graph to have increments of 20% of maximum y_value
  var y_ticks = Math.round(maximum * 0.2);

  // create a new array with each y_value as a % of maximum y_value
  // this allows proper scaling of the y axis
  var pct_of_maximum = [];
  for (i = 0; i < datapoints; i++) {
    pct_of_maximum.push(y_values[i] / maximum)
  } console.log(pct_of_maximum)
    console.log(datapoints)
    console.log(maximum)
    console.log(y_ticks)
}

var data2 = [4, 9, 3, 1];
var data1 = ['sept', 'oct', 'nov', 'dec'];

numClean(data1, data2)

