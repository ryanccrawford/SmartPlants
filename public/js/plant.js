$(document).ready(function() {
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

  function getDataFromRange(range) {
    if (range === "day") {
      return getData(24, "hours");
    } else if (range === "week") {
      return getData(7, "days");
    } else if (range === "month") {
      return getData(4, "weeks");
    } else if (range === "year") {
      return getData(12, "months");
    }
    /*
    switch (range) {
      case "day":
        return getData(24, "hours", "MM/DD, h:mm:ss a");

      case "week":
        return getData(7, "days", "MM/DD/YY");

      case "month":
        return getData(4, "weeks", "MM/DD/YY");

      case "year":
        return getData(12, "months", "MM/DD/YY");
    }
    */
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

  function updateChart(range) {
    var data = getDataFromRange(range);
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
      updateChart(value);
    });
});
