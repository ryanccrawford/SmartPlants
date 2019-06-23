$(document).ready(function() {
  function getLabels(maxUnits, unitName, format) {
    var labels = [];
    for (var i = 0; i <= maxUnits; i++) {
      var label = moment()
        .subtract(maxUnits - i, unitName)
        .format(format);
      labels.push(label);
    }
    return labels;
  }

  function getLabelsFromRange(range) {
    if (range === "day") {
      return getLabels(24, "hours", "MM/DD, h:mm:ss a");
    } else if (range === "week") {
      return getLabels(7, "days", "MM/DD/YY");
    } else if (range === "month") {
      return getLabels(4, "weeks", "MM/DD/YY");
    } else if (range === "year") {
      return getLabels(12, "months", "MM/DD/YY");
    }
    /*
    switch (range) {
      case "day":
        return getLabels(24, "hours", "MM/DD, h:mm:ss a");

      case "week":
        return getLabels(7, "days", "MM/DD/YY");

      case "month":
        return getLabels(4, "weeks", "MM/DD/YY");

      case "year":
        return getLabels(12, "months", "MM/DD/YY");

      default:
        break;
    }
    */
  }

  function getData(maxUnits, unitName, format) {
    var labels = [];
    for (var i = 0; i <= maxUnits; i++) {
      var x = moment()
        .subtract(maxUnits - i, unitName)
        .format(format);
      var y = Math.floor(Math.random() * 20);
      labels.push({
        x: x,
        y: y
      });
    }
    return labels;
  }

  function getDataFromRange(range) {
    if (range === "day") {
      return getData(24, "hours", "MM/DD, h:mm:ss a");
    } else if (range === "week") {
      return getData(7, "days", "MM/DD/YY");
    } else if (range === "month") {
      return getData(4, "weeks", "MM/DD/YY");
    } else if (range === "year") {
      return getData(12, "months", "MM/DD/YY");
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

  var $tabs = $(".tabs");
  $tabs.tabs();
  //$tabs.tabs("select", "summaryTab");

  function updateChart(range) {
    var data = getDataFromRange(range);
    var cats = getLabelsFromRange(range);
    chart.updateOptions({
      xaxis: {
        categories: cats
      }
    });
    chart.updateSeries([
      {
        data: data
      }
    ]);
  }

  updateChart("day");

  $("select")
    .formSelect()
    .change(function() {
      var value = $(this).val();
      updateChart(value);
    });
});
