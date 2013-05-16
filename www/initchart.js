// Initialiation for dynamic Highchart

$(document).ready(function() {
  Highcharts.setOptions({
    global: {
      useUTC: true
    }
  });

  var chart;
  $("#live_highchart").highcharts({
    chart: {
      type: "line",
      animation: Highcharts.svg, // dont animate in old IE
      marginRight: 10,
      backgroundColor: 'transparent'
    },
    title: {
      text: "Recent values",
      style: {
        color: "#FFF"
      }
    },
    xAxis: {
      type: "datetime",
      tickPixelInterval: 150,
      labels: {
        style: {
          color: "#FFF"
        }
      }
    },
    yAxis: {
      title: {
        text: "Value"
      },
      min: 0,
      // max: 100,
      plotLines: [{
        value: 0,
        width: 1,
        color: "#808080"
      }],
      labels: {
        style: {
          color: "#FFF"
        }
      },
      title: {
        style: {
          color: "#CCC"
        }
      }
    },
    tooltip: {
      formatter: function() {
          return "<b>"+ this.series.name +"</b><br/>"+
          Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) +"<br/>"+
          Highcharts.numberFormat(this.y, 2);
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: "Random data",
      data: (function() {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;

        for (i = -20; i <= -1; i++) {
          data.push({
            x: time + i * 3000,
            y: 100
          });
        }
        return data;
      })()
    }]
  });


  // Handle messages from server - update graph
  Shiny.addCustomMessageHandler("updateHighchart",
    function(message) {
      // Find the chart with the specified name
      var series = $("#" + message.name).highcharts().series[0];

      // Add a new point
      series.addPoint([Number(message.x), Number(message.y)], true, true);
    }
  );
});

