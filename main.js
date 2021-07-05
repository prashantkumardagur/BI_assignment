var links = document.getElementsByClassName('links');

function loadPage(pn){
    $('.links').removeClass('selected');
    links[pn-1].classList.add('selected');
    if(pn==3) { $('#main').load('stopwatch.html');}
    if(pn==2) { $('#main').load('tipCalculator.html');}
    if(pn==1) { $('#main').load('simpleCalculator.html');}
    if(pn==4) $('#main').load('colorChange.html');
    if(pn==5) $('#main').load('randomCard.html', randomCardSetup);
    if(pn==6) { $('#main').load('recipeApp.html', recipeSetup);}
}

/*-----------------------------------------------------------------*/

//Stopwatch Section

var counter=0, mcount=0, scount=0, watchPlay=false;

function stopwatch(){
    if(watchPlay){
        ++counter;
        scount=Math.floor(counter/100)%60;
        mcount=Math.floor(counter/6000);
        $('#ms').html(counter%100);

        if(scount<10) $('#secs').html('0'+scount);
        else $('#secs').html(scount);

        if(mcount<10) $('#mins').html('0'+mcount);
        else $('#mins').html(mcount);
    }
}

function watchAction(){ 
    watchPlay = !watchPlay;
    if(watchPlay) $('#actionBtn').html('<i class="fas fa-pause"></i> Pause');
    else $('#actionBtn').html('<i class="fas fa-play"></i> Start');
}

function watchReset(){ watchPlay=false; counter=0;
    $('#ms').html('00');
    $('#mins').html('00');
    $('#secs').html('00');
}

window.setInterval(stopwatch , 10);

/*-------------------------------------------------------------*/

//Tip Calculator

function updateValue(){ $('#sliderValue').html( $('#slider').val() + "%" ) ;}

function calculateTip(){
    let ba = parseFloat($('#billAmount').val());
    let tip= parseFloat((ba * $('#slider').val() / 100).toFixed(2));
    $('#tipAmount').html("&#8377; " + tip);
    $('#totalAmount').html("&#8377; " + (ba + tip) );
}

/*---------------------------------------------------------------------------*/

//Simple Calculator

var eqtn = "";

function calcClear(){
    eqtn = "";
    $('#calcstr').text('');
    $('#calcResult').text("0");
}

function calcAdd(symbol){
    eqtn += symbol;
    $('#calcstr').text(eqtn);
}

function calcAction(){
    $('#calcResult').text( eval(eqtn).toFixed(2) );
    eqtn = "";
}

/*----------------------------------------------------------------*/

//Color Change

function changeColor(color){
    $('#colorTarget').css('background-color', color);
}

/*---------------------------------------------------------------*/

//Random Card Generator
var randomCardNum =0;

function randomCardSetup(){
    $('#cardForm').submit((event)=>{
        let newCardElement = '<div class="randomCard"><img src="https://picsum.photos/240/150?random='+ (++randomCardNum) +'"><p class="cph">'+ $('#ccname').val() +'</p><p class="cpb">By '+ $('#caname').val() +'</p><p class="cpd">'+ $('#ccd').val() +' hrs</p></div>';
        $('#rcardgrid').append(newCardElement);
        $('#cardForm input').val('');
        event.preventDefault();
    })
}

/*--------------------------------------------------------------*/

//Recipe App

// var recipeObj = {
//     total : 1,
//     recipeArr : [
//         {
//             name: "Maggi Nuggets",
//             recipe: "Just create it!",
//             ingredients: ["Maggi", "Water", "Cheese"]
//         },
//         {
//             name: "Cheese Burst Pizza",
//             recipe: "Its a bit hard they say!",
//             ingredients: ["Cheese", "Flour", "Vegetables"]
//         },
//         {
//             name: "McAloo Tikki",
//             recipe: "Its a secret",
//             ingredients: ["Tikki", "Bun", "Cheese", "Vegetables"]
//         }
//     ]
// }
function recipeSetup(){

    recipeObj = JSON.parse(localStorage.getItem('recipeObj'));

    if(recipeObj==null) $('#recipeList').html("No recipe is saved in localStorage");
    else
    recipeObj.recipeArr.forEach((robj, index) => {
        let newliStr = '<li class="rli" onclick="rexpand('+index+')"><span class="recname">'+ robj.name +'</span><div class="recipeinfo"><h6>RECIPE</h6><p>'+ robj.recipe +'</p><h6>INGREDIENTS</h6><ul>';//<li>Water</li><li>More water</li></ul></div></li>';
        robj.ingredients.forEach(ing => newliStr+="<li>"+ ing +"</li>");
        newliStr+='</ul></div></li>';
        $('#recipeList').append(newliStr);
    });

}


function rexpand(n){
    let rli=document.getElementsByClassName('rli');
    $('.rli').removeClass('expanded');
    rli[n].classList.add('expanded');

}


function searchFunc(){
    let filter = document.getElementById('recipeSearch').value.toUpperCase();
    let rname = document.getElementsByClassName('recname')
    let li = document.getElementsByClassName('rli');

    for(i=0; i<li.length ; ++i){
        if(rname[i].innerText.toUpperCase().indexOf(filter) > -1) li[i].style.display = "block";
        else li[i].style.display = "none";
    }
}