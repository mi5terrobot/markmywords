const noten = [
    {Wert: "1+", Punkte: 15, Text: "sehr gut (+)", Vierzig: 0.95, Fuenfzig: 0.958},
    {Wert: "1", Punkte: 14, Text: "sehr gut" , Vierzig: 0.9, Fuenfzig: 0.917},
    {Wert: "1-", Punkte: 13, Text: "sehr gut (-)" , Vierzig: 0.85, Fuenfzig: 0.875},
    {Wert: "2+", Punkte: 12, Text: "gut (+)" , Vierzig: 0.8, Fuenfzig: 0.833},
    {Wert: "2", Punkte: 11, Text: "gut" , Vierzig: 0.75, Fuenfzig: 0.792},
    {Wert: "2-", Punkte: 10, Text: "gut (-)" , Vierzig: 0.7, Fuenfzig: 0.75},
    {Wert: "3+", Punkte: 9, Text: "befriedigend (+)" , Vierzig: 0.65, Fuenfzig: 0.708},
    {Wert: "3", Punkte: 8, Text: "befriedigend" , Vierzig: 0.6, Fuenfzig: 0.667},
    {Wert: "3-", Punkte: 7, Text: "befriedigend (-)" , Vierzig: 0.55, Fuenfzig: 0.625},
    {Wert: "4+", Punkte: 6, Text: "ausreichend (+)" , Vierzig: 0.5, Fuenfzig: 0.583},
    {Wert: "4", Punkte: 5, Text: "ausreichend" , Vierzig: 0.45, Fuenfzig: 0.542},
    {Wert: "4-", Punkte: 4, Text: "ausreichend (-)" , Vierzig: 0.4, Fuenfzig: 0.5},
    {Wert: "5+", Punkte: 3, Text: "mangelhaft (+)" , Vierzig: 0.33, Fuenfzig: 0.417},
    {Wert: "5", Punkte: 2, Text: "mangelhaft" , Vierzig: 0.27, Fuenfzig: 0.333},
    {Wert: "5-", Punkte: 1, Text: "mangelhaft (-)" , Vierzig: 0.2, Fuenfzig: 0.25},
    {Wert: "6", Punkte: 0, Text: "ungenügend", Vierzig: 0, Fuenfzig: 0}
];

/* Lade Noten Tabelle */
function load_Tables(points) {
    $(".noten tbody tr").remove(); // Clear existing rows
    points = parseFloat(points); // Ensure points is a number
    for(let i=0; i<noten.length; i++) {
        var min_50 = (Math.ceil(2 * noten[i].Fuenfzig * points)/2).toFixed(1);
        var min_40 = (Math.ceil(noten[i].Vierzig * points)).toFixed(0);
        data = "";
        data += "<tr>" +
            "<td>" + noten[i].Wert + "</td>" +
            "<td>" + noten[i].Text + "</td>" +
            "<td>" + noten[i].Punkte + "</td>" +
            "<td>" + num2ger((noten[i].Fuenfzig * 100).toFixed(1)) + " %</td>" +
            "<td>" + num2ger(min_50) + "</td>" +
            "<td>" + (noten[i].Vierzig * 100).toFixed(0) + " %</td>" +
            "<td>" + min_40 + "</td>" +
            "</tr>";
        $(".noten tbody").append(data);
    }
}

/* Lade EWH Tabelle */
function load_EWH_50(points) {
    $("table.sek1 tbody tr").remove(); // Clear existing rows
    points = parseFloat(points); // Ensure points is a number
    var n1 = (Math.ceil(2 * noten[2].Fuenfzig * points) / 2).toFixed(1);
    var n2 = (Math.ceil(2 * noten[5].Fuenfzig * points) / 2).toFixed(1);
    var n3 = (Math.ceil(2 * noten[8].Fuenfzig * points) / 2).toFixed(1);
    var n4 = (Math.ceil(2 * noten[11].Fuenfzig * points) / 2).toFixed(1);
    var n5 = (Math.ceil(2 * noten[14].Fuenfzig * points) / 2).toFixed(1);
    var data = "<tr><th>Punkte</th>" +
        "<td>" + points + "&mdash;" + num2ger(n1) +  "</td>" +
        "<td>" + num2ger((parseFloat(n1)-0.5).toFixed(1)) + "&mdash;" + num2ger(n2) +  "</td>" +
        "<td>" + num2ger((parseFloat(n2)-0.5).toFixed(1)) + "&mdash;" + num2ger(n3) +  "</td>" +
        "<td>" + num2ger((parseFloat(n3)-0.5).toFixed(1)) + "&mdash;" + num2ger(n4) +  "</td>" +
        "<td>" + num2ger((parseFloat(n4)-0.5).toFixed(1)) + "&mdash;" + num2ger(n5) +  "</td>" +
        "<td>" + num2ger((parseFloat(n5)-0.5).toFixed(1)) + "&mdash;" + 0 +  "</td>" +
        "</tr>";
    $("table.sek1 tbody").append(data);
}

function load_EWH_40(points) {    
    var data_notenpunkte = "<tr><th>Notenpunkte</th>";
    var data_points = "<tr><th>ab Punkte</th>";
    for(let i=0; i<noten.length; i++) {
        data_notenpunkte += "<th>" + noten[i].Punkte + "</th>";
        data_points += "<td>" + (Math.ceil(noten[i].Vierzig * points)).toFixed(0) + "</td>";
    }
    data_notenpunkte += "</tr>";
    data_points += "</tr>";
    $("table.ewh.sek2 thead tr:eq(1)").remove(); // Remove existing 2nd row if present
    $("table.ewh.sek2 tbody tr").remove(); // Clear existing rows
    $("table.ewh.sek2 thead tr:first").after(data_notenpunkte);
    $("table.ewh.sek2 tbody").append(data_points);
}

/* Komma statt Punkt */
function num2ger(num) {
    return num.toString().replace(/\./g, ',')
}

/* Lade Slider Steps */
function load_Slider_Steps(step) {
    data = ""
    for(let i=0; i<=100; i+=step) {
        data += "<option>" + i + "</option>";
    }
    // $("datalist").remove();
    $("datalist").append(data);
}

/* copy button */
function copy_Button_Table_EWH_S2() {
    $("#copySek2Table").on("click", function () {
        const table = document.querySelector("table.tbl.ewh.sek2");

        if (!table) {
            alert("Tabelle nicht gefunden.");
            return;
        }

        const tempDiv = document.createElement("div");
        tempDiv.style.position = "fixed";
        tempDiv.style.left = "-9999px";
        tempDiv.appendChild(table.cloneNode(true));
        document.body.appendChild(tempDiv);

        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand("copy");

            // ChatGPT-style feedback
            const $btn = $("#copySek2Table");
            $btn.addClass("copied");
            setTimeout(() => $btn.removeClass("copied"), 1500);

        } catch (err) {
            alert("Fehler beim Kopieren.");
        }

        selection.removeAllRanges();
        document.body.removeChild(tempDiv);
    });
}

/* button kopieren */


/* tabelle kopieren */
function tabelleKopieren_sek1() {
    const tabelle = document.getElementById("tbl-ewh-sek1");
    const bereich = document.createRange();
    bereich.selectNode(tabelle);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(bereich);

    try {
    const erfolgreich = document.execCommand("copy");
    if (erfolgreich) {
        alert("Tabelle wurde in die Zwischenablage kopiert. Du kannst sie jetzt z. B. in Word einfügen.");
    } else {
        alert("Kopieren fehlgeschlagen. Bitte versuche es manuell mit Strg+C.");
    }
    } catch (err) {
    alert("Kopieren nicht möglich. Bitte versuche es manuell mit Strg+C.");
    }

    selection.removeAllRanges();
}
function tabelleKopieren_sek2() {
    const tabelle = document.getElementById("tbl-ewh-sek2");
    const bereich = document.createRange();
    bereich.selectNode(tabelle);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(bereich);

    try {
    const erfolgreich = document.execCommand("copy");
    if (erfolgreich) {
        alert("Tabelle wurde in die Zwischenablage kopiert. Du kannst sie jetzt z. B. in Word einfügen.");
    } else {
        alert("Kopieren fehlgeschlagen. Bitte versuche es manuell mit Strg+C.");
    }
    } catch (err) {
    alert("Kopieren nicht möglich. Bitte versuche es manuell mit Strg+C.");
    }

    selection.removeAllRanges();
}

/* Ändere wenn Slider bewegt wird */
$(document).on("input", "#slider", function() {
    var initialPoints = $(this).val();
    // $("#maxPunkte").val(initialPoints);
    load_Tables(initialPoints);
    load_EWH_50(initialPoints);
    load_EWH_40(initialPoints);
});

/* Lädt die Tabelle beim Laden des Dokuments */
$(document).ready(function() {
    // load_Slider_Steps(10);
    var initialPoints = $("#slider").val();
    $("#maxPunkte").val(initialPoints);
    load_Tables(initialPoints);
    load_EWH_50(initialPoints);
    load_EWH_40(initialPoints);
    copy_Button_Table_EWH_S2();
});