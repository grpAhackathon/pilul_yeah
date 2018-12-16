$(function()
{
    var data = [
        {
            id: 0,
            forme: "carre",
            medoc: "Doliprane",
            nb: 1,
            hour: ["11:00"]
        },
        {
            id: 1,
            forme: "triangle",
            medoc: "Diamicron",
            nb: 3,
            hour: ["15:00"]
        }
        /*{
            id: 2,
            forme: "rond",
            medoc: "Spasfon",
            nb: 2,
            hour: ["18:00"]
        }*/
    ];

    var forme = {
        "triangle": { active: false},
        "carre": { active: false},
        "rond": { active: false},
    };

    var options = { 
        now: "08:00", //hh:mm 24 hour format only, defaults to current time 
        twentyFour: true, //Display 24 hour format, defaults to false 
        upArrow: 'wickedpicker__controls__control-up', //The up arrow class selector to use, for custom CSS 
        downArrow: 'wickedpicker__controls__control-down', //The down arrow class selector to use, for custom CSS 
        close: 'wickedpicker__close', //The close class selector to use, for custom CSS 
        hoverState: 'hover-state', //The hover state class to use, for custom CSS 
        title: 'Timepicker', //The Wickedpicker's title, 
        showSeconds: false, //Whether or not to show seconds, 
        secondsInterval: 1, //Change interval for seconds, defaults to 1  , 
        minutesInterval: 1, //Change interval for minutes, defaults to 1 
        beforeShow: null, //A function to be called before the Wickedpicker is shown 
        show: null, //A function to be called when the Wickedpicker is shown 
        clearable: false, //Make the picker's input clearable (has clickable "x")  
    };

    var medocList = ["Doliprane", "Kardegic", "Diamicron", "Levothyrox"];

    //Load
    $.each(data, function(index, item)
    {
        var imgPath = item.forme == "carre" ? "carre.png" : item.forme == "triangle" ? "triangle" : item.forme == "rond" ? "rond.png" : "carre.png";
        var elem = $(`<li>
        <div class="pilule" data-forme="` + item.forme + `">
          <div class="forme">
            <img width="70px" height="70px" src="images/` + imgPath + `" />
          </div>
          <div class="pilule_config">
            <div class="first">
              <select>
              </select>
              <input type="text" class="dateToTake" />
            </div>
            <div class="">
              <input type="number" value="1" class="numberPilule" />
            </div>
          </div>
        </div>
        </li>`);

        $(elem).find(".dateToTake").wickedpicker(options);

        $.each(medocList, function(indexMedoc, medocText){
            if (item.medoc == medocText)
            {
                $(elem).find("select").append("<option value='" + indexMedoc + "' selected>" + medocText + "</option>");
            }
            else
            {
                $(elem).find("select").append("<option value='" + indexMedoc + "'>" + medocText + "</option>");
            }
        });

        $(elem).find(".numberPilule").val(item.nb);
        $(elem).find(".dateToTake").val(item.hour[0]);

        $("#content ul").append(elem);
    });

    $("#save").click(function()
    {
        var listPilule = [];

        $("#content ul > li").each(function(index, item)
        {
            listPilule.push({
                forme: $(item).find(".pilule").data("forme"),
                medoc: $(item).find("select").val(),
                nb: $(item).find(".numberPilule").val(),
                hour: $(item).find(".dateToTake").val()
            });
        });

        $("#cellType").hide();
        $("#cellTypeRecap").show();

        //Load
        $.each(listPilule, function(index, item)
        {
            var imgPath = item.forme == "carre" ? "carre.png" : item.forme == "triangle" ? "triangle.png" : item.forme == "rond" ? "rond.png" : "carre.png";
            var elem = $(`<tr>
            <td><img class="forme_icon" width="70px" height="70px" src="images/` + imgPath + `" /><p style="margin-top: 23px;font-size:20px" >` + medocList[item.medoc] + `</p></td>
            <td><p class="date" style="font-size: 20px;">` + item.hour + `</p></td>
            <td><p class="quantiteSize">` + (item.nb * 7) + `</p></td>
            </tr>`);

            $("table").append(elem);
        });
    });

    $("#add").click(function(){

        var canCreate = true;
        var formeToCreate = "";

        $.each(data, function(index, itemForm)
        {
            canCreate = true;
            $.each($(".pilule"), function(formeIndex, formePil)
            {
                var temp = $(formePil).data("forme");
                if (itemForm.forme == temp && canCreate)
                {
                    forme[itemForm.forme].active = true;
                    canCreate = false;
                    return true;
                }
            });

            if (canCreate)
            {
                formeToCreate = itemForm.forme;
                return true;
            }
        });

        $.each(forme, function(ind, formeTemp)
        {
            if (!formeTemp.active)
            {
                canCreate = true;
                formeToCreate = ind;
                formeTemp.active = true;
            }
        });

        if (!canCreate)
        {
            alert("Impossible de créer d'autre pilule, toutes les formes sont utilisées");
            return;
        }

        var elem = $(`<li>
        <div class="pilule" data-forme='` + formeToCreate + `'>
          <div class="forme">
            <img width="70px" height="70px" src="images/` + formeToCreate + `.png" />
          </div>
          <div class="pilule_config">
            <div class="first">
              <select>
              </select>
              <input type="text" class="dateToTake" />
            </div>
            <div class="">
              <input type="number" value="1" class="numberPilule" />
            </div>
          </div>
        </div>
        </li>`);

        $(elem).find(".numberPilule").val(1);
        $(elem).find(".dateToTake").val("00:00");

        $(elem).find(".dateToTake").wickedpicker(options);

        $.each(medocList, function(indexMedoc, medocText)
        {
            $(elem).find("select").append("<option value='" + indexMedoc + "'>" + medocText + "</option>");
        });

        $("#content ul").append(elem);
    });
});