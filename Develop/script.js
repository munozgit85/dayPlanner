
var text_Hour = 7;
var text_Suffix = ":00am";

var savedBlocks = [];
var savedBlocks_NAME = "saved Blocks";

function changeBlockColor($div, currentTime, textTime)
{
    var timeCurrent = currentTime.split("");
    var timeText = textTime.split("");

    if(timeCurrent[timeCurrent.length - 2] !== timeText[timeText.length - 2])
    {
        if(timeCurrent[timeCurrent.length - 2] > timeText[timeText.length - 2])
        {
            console.log("p > a");
            $div.addClass("bg-secondary");
        }
        else
        {
            console.log("p < a");
            $div.addClass("bg-primary");
        }
    }
    else
    {
        console.log("same time of day");

        var timePerHourCur = parseHour(timeCurrent);
        var timePerHourText = parseHour(timeText);

        if(parseInt(timePerHourCur) > parseInt(timePerHourText))
        {
            console.log("current greater");
            $div.addClass("bg-secondary");
        }
        else if(parseInt(timePerHourCur) < parseInt(timePerHourText))
        {
            if(parseInt(timePerHourText) === 12)
            {
                console.log("current greater");
                $div.addClass("bg-secondary");
            }
            else
            {
                console.log("current less");
                $div.addClass("bg-success");
            }
        }
        else
        {
            $div.addClass("bg-danger");
        }
    }
}

function generateHourBlock(iterations)
{
    if(!iterations)
    {
        iterations = 1;
    }

    var currentTime = GetCurrentHour("LT");

    for(var i = 0; i < iterations; i++)
    {
        var text_time = text_Hour + text_Suffix;

        $createBlock = $("<div>").addClass("row py-1");
    
        $createTimeText = $("<h5>").addClass("text-center").text(text_time);
        $createTimeDiv = $("<div>").addClass("col-2 py-3 bg-light border border-dark align-middle").append($createTimeText);

        $iTextDiv = $("<textarea>").addClass("col-8 py-3 overflow-auto").text("").attr("id", text_time);
        changeBlockColor($iTextDiv, currentTime, text_time);
    
        $createLockIcon = $("<span>").addClass("lock");

        $createLockDiv = $("<div>").addClass("col-1 py-3 lock-container border border-primary saveBtn").append($createLockIcon);
        
        $createLockIcon.toggleClass('unlocked');
    
        $createBlock.append($createTimeDiv, $iTextDiv, $createLockDiv);
    
        $("#planner").append($createBlock);
    
        incrementTextHour();
    }

}

function incrementTextHour()
{
    if(text_Hour === 12)
    {
        text_Hour = 1;
    }
    else if(text_Hour === 11)
    {
        text_Suffix = ":00pm";
        text_Hour++;
    } else
    {
        text_Hour++;
    }
}


function GetCurrentHour(pFormat)
{
    var time = moment().format(pFormat).toLowerCase();

    time = time.split("");

    var suffix = "";

    var hour = parseHour(time);

    console.log(hour);

    if(time[time.length - 2] === "p")
    {
        console.log("afternoon");
        suffix = ":00pm";
    }
    else
    {
        console.log("morning");
        suffix = ":00am";
    }

    console.log(hour + suffix);
    return hour + suffix;
}

function parseHour(pTime)
{
    var i = 0;
    var iHour = "";

    while(pTime[i] !== ":" || i > 100)
    {
        iHour += pTime[i];
        i++;
    }

    return iHour;
}

function UpdatesavedBlocks(pText, pID)
{
    nBlock = {
        id : pID,
        input : pText.trim()
    }

    for(var i = 0; i < savedBlocks.length; i++)
    {
        if(savedBlocks[i].id === nBlock.id)
        {
            savedBlocks.splice(i, 1);

            localStorage.setItem(savedBlocks_NAME, JSON.stringify(savedBlocks));

            return null;
        }
    }

    savedBlocks.push(nBlock);

    localStorage.setItem(savedBlocks_NAME, JSON.stringify(savedBlocks));
}


function GetsavedBlocks()
{

    if(localStorage.getItem(savedBlocks_NAME))
    {
        savedBlocks = JSON.parse(localStorage.getItem(savedBlocks_NAME));

        savedBlocks.forEach(iBlock => {
           
            iID = "#" + iBlock.id;

            $createBlock = $(document.getElementById(iBlock.id));

            $createBlock.val(iBlock.input);

            $createLock = $(($createBlock).parent().children().children()[1])
            
            $createLock.toggleClass("unlocked");

        });

    }

}

generateHourBlock(12);
GetsavedBlocks();


$(".lock").click(function() {
    console.log("lock clicked");


    $(this).toggleClass('unlocked');

    $iTextArea = $($(this).parent().parent().children()[1]);

    iInput = $iTextArea.val();
    iID = $iTextArea.attr("id");

    UpdatesavedBlocks(iInput, iID);
  });
