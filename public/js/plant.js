$(document).ready(function() {
  /*
  function getData(maxUnits, unitName) {
    var data = [];
    for (var i = 0; i <= maxUnits; i++) {
      var x = moment()
        .subtract(maxUnits - i, unitName)
        .toDate()
        .getTime();
      var y = Math.floor(Math.random() * 20);
      data.push({
        x: x,
        y: y
      });
    }
    return data;
  }
  */

  function convertedData(data) {
    for (var i = 0; i <= maxUnits; i++) {
      var x = moment()
        .subtract(maxUnits - i, unitName)
        .toDate()
        .getTime();
      var y = Math.floor(Math.random() * 20);
      data.push({
        x: x,
        y: y
      });
    }
    return data;
  }

  function getDataFromRange(property, range) {
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      var interval;
      if (range === "day") {
        interval = "hour";
      } else if (range === "week") {
        interval = "day";
      } else if (range === "month") {
        interval = "day";
      } else if (range === "year") {
        interval = "month";
      }
      url = "/api/averages?property=";
      url += property;
      url += "&range=";
      url += range;
      url += "&interval=";
      url += interval;
      $.get(url)
        .done(function(data) {
          resolve(convertedData(data));
        })
        .fail(function(error) {
          reject(error);
        });
    });
  }

  var options = {
    chart: {
      type: "line"
    },
    series: [
      {
        name: "values",
        data: [0, 1]
      }
    ],
    plotOptions: {
      line: {
        curve: "smooth"
      }
    },
    xaxis: {
      categories: [0, 1]
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();

  function updateChart(property, range) {
    getDataFromRange(property, range)
      .then(function(data) {
        chart.updateOptions({
          xaxis: {
            type: "datetime",
            labels: {
              rotate: -15,
              rotateAlways: true,
              formatter: function(val, timestamp) {
                var datetime = moment(new Date(timestamp));
                if (range === "day") {
                  return datetime.format("MM/DD, h:mm a");
                } else if (range === "week") {
                  return datetime.format("DD MMM");
                } else if (range === "month") {
                  return datetime.format("DD MMM");
                } else if (range === "year") {
                  return datetime.format("MMM YYYY");
                }
              }
            }
          }
        });
        chart.updateSeries([
          {
            data: data
          }
        ]);
      })
      .catch(function(error) {
        throw error;
      });
  }

  updateChart("day");

  $.fn.dataTable.ext.classes.sPageButton = "waves-effect waves-light btn";
  $("#dataTable").DataTable({
    searching: false,
    order: [[0, "desc"]]
  });

  var $tabs = $(".tabs");
  $tabs.tabs();

  $("select")
    .formSelect()
    .change(function() {
      var value = $("#rangeSelect").val();
      updateChart("moisture", value);
    });
});
