var warCalculator = {
    init: function () {
        $("input").change(this.hadleChange);
        google.charts.load('current', { 'packages': ['corechart'] });
    },
    hadleChange: function () {
        if (!warCalculator.inputsValid()) {
            warCalculator.clearCalculations();
            return;
        }
        warCalculator.doCalculations();
    },
    doCalculations: function () {
        var aScore = parseInt($("#aScore").val(), 10);
        var eScore = parseInt($("#eScore").val(), 10);
        var aFlags = parseInt($("#aFlags").val(), 10);
        var eFlags = parseInt($("#eFlags").val(), 10);
        var aParticipants = parseInt($("#aParticipants").val(), 10);
        var eParticipants = parseInt($("#eParticipants").val(), 10);
        var aAverage = Math.round(aScore / (6 * aParticipants - aFlags),1);
        var eAverage = Math.round(eScore / (6 * eParticipants - eFlags),1);
        var aFinal = aAverage * aFlags + aScore;
        var eFinal = eAverage * eFlags + eScore;
        var CurrentDiff = aScore - eScore;
        var PredictedDiff = aFinal - eFinal;
        var AvarageCurrent = Math.round(CurrentDiff / eFlags, 1);
        var AvaragePredicted = Math.round((aFinal - eScore) / eFlags, 1);
        $("#aAverage").html(aAverage);
        $("#eAverage").html(eAverage);
        $("#aFinal").html(aFinal);
        $("#eFinal").html(eFinal);
        $("#CurrentDiff").html(CurrentDiff);
        $("#PredictedDiff").html(PredictedDiff);
        $("#AvarageCurrent").html(AvarageCurrent);
        $("#AvaragePredicted").html(AvaragePredicted);
        warCalculator.drawChart(aParticipants, eParticipants, aScore, eScore, aFinal, eFinal, aAverage, eAverage);
    },
    clearCalculations: function () {
        $(".calc").html("");
    },
    drawChart: function (aParticipants, eParticipants, aScore, eScore, aFinal, eFinal, aAverage, eAverage) {
        var arr = [];
        arr.push(["Round", "Alliance predicted", "Enemy predicted"]);
        console.log(arr);
        var upper = Math.max(aParticipants, eParticipants) * 6;
        for (var i = 0; i < upper + 1; i++) {
            arr.push([i.toString(), i * aAverage, i * eAverage]);
        }
        var data = google.visualization.arrayToDataTable(arr);
        var options = {
            title: 'War prediction',
            hAxis: { title: 'Round', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 }
        };
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);

    },
    inputsValid: function () {
        var valid = true;
        $("input").each(function (idx, val) {
            var value = parseInt($(val).val());
            var min = parseInt($(val).prop("min"));
            var max = parseInt($(val).prop("max"));
            if (isNaN(value) || value < min || value > max) {
                valid = false;
            }
        });
        return valid;
    }
};
$(document).ready(function () {
    warCalculator.init();
});