$(document).ready(function() {
  var histData;

  function getDataFromRange(range) {
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      //var interval;
      if (range === "day") {
        interval = "hour";
      } else if (range === "week") {
        interval = "day";
      } else if (range === "month") {
        interval = "day";
      } else if (range === "year") {
        interval = "month";
      }
      //url = "/api/hist?range=";
      url = "/api/hist?deviceId=";
      url += window.location.pathname.replace("/devices/", "");
      url += "&range=";
      url += range;
      //url += "&interval=";
      //url += interval;
      $.get(url)
        .done(function(data) {
          console.log(data);
          resolve(data);
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

  function formatString(range) {
    if (range === "day") {
      return "MM/DD, h:mm a";
    } else if (range === "week") {
      return "DD MMM";
    } else if (range === "month") {
      return "DD MMM";
    } else if (range === "year") {
      return "MMM YYYY";
    }
  }

  function updateChart(data, range) {
    chart.updateOptions({
      xaxis: {
        type: "datetime",
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function(val, timestamp) {
            var datetime = moment(new Date(timestamp));
            return datetime.format(formatString(range));
          }
        }
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return parseInt(val);
          }
        }
      }
    });
    chart.updateSeries([
      {
        data: data
      }
    ]);
  }

  function getPropertyData(data, propertyName) {
    return data.map(function(dataPoint) {
      return {
        x: dataPoint.tTime,
        y: dataPoint[propertyName]
      };
    });
  }

  $.fn.dataTable.ext.classes.sPageButton = "waves-effect waves-light btn";
  $("#dataTable").DataTable({
    searching: false,
    order: [[0, "desc"]]
  });

  var $tabs = $(".tabs");
  $tabs.tabs();

  $("#rangeSelect")
    .formSelect()
    .change(function() {
      var range = $(this).val();
      getDataFromRange(range)
        .then(function(data) {
          histData = data;
          var property = $("#propertySelect").val();
          var propertyData = getPropertyData(data, property);
          updateChart(propertyData, range);
        })
        .catch(function(error) {
          throw error;
        });
    });

  $("#propertySelect")
    .formSelect()
    .change(function() {
      var range = $("#rangeSelect").val();
      var property = $(this).val();
      var propertyData = getPropertyData(histData, property);
      updateChart(propertyData, range);
    });

  var range = $("#rangeSelect").val();
  getDataFromRange(range)
    .then(function(data) {
      histData = data;
      var property = $("#propertySelect").val();
      var propertyData = getPropertyData(data, property);
      updateChart(propertyData, range);
    })
    .catch(function(error) {
      throw error;
    });
});
