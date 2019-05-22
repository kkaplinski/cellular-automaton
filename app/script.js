

var canvasElem = document.getElementById('canvas');
var ctx = canvasElem.getContext('2d');

var ruleInput = document.getElementById("ruleInput");
var ruleLabel = document.getElementById("RuleLabel");
var stepsInput = document.getElementById("stepsInput");
var stepsLabel = document.getElementById("stepsLabel");
var minusButtons = document.getElementsByClassName('minus');
var plusButtons = document.getElementsByClassName('plus');

var buttonSubmit = document.getElementsByClassName('buttonSubmit')[0];
var cellprogram = document.getElementsByClassName('programOutput')[0];

var binaryOutputs = document.getElementsByClassName('binaryOutput');
var binaryArray;
var binaryArray8;

var helper = document.querySelector('.help');
var backdrop = document.querySelector('.backdrop');
var questionMark = document.querySelector('.questionMark')
var wrapper = document.querySelector('.wrapper')



// Setting the value in the --vh custom property to the root of the document
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);


////////////////////////////////// FUNCTIONS /////////////////////////


 // creating binary represetation of decimal rule - 0-255, also adding blank spaces for 0 if needed (to have every time 8 numbers in Array)

function createBinaryRepArray() {
    binaryArray = Number(ruleInput.value || 90).toString(2).split('').reverse();

    binaryArray8 = [...Array(8)].map((x, i) => {
        return x = binaryArray[i] || "0"
    }).reverse();
}
 


// Changin Binary Representation in to graphic 

function binaryRepChangeHandler() {
    Array.from(binaryOutputs).forEach((ele,i) => {
        ele.innerHTML = binaryArray8[i];
        if(ele.innerHTML == 0) {
            ele.style.backgroundColor = '#dfdfde'
        } else {
            ele.style.backgroundColor = '#ffa700'
        }
    });
}

// Starting program - main function 
function AddCellprogram() {
    
    createBinaryRepArray();

    canvasElem.width = cellprogram.clientWidth + 20
    canvasElem.height = cellprogram.clientHeight + 20
  
    // reseting array of rows and generating first row with only single "1" ind the middlee
    var obj = [
        []
    ]
    var newArray = [...Array(Number(stepsInput.value))].map(x =>  x = 0)
    newArray[Math.floor((Number(stepsInput.value))/2)] = 1
    obj[0] = newArray
    
   
    // generate array of rows using switch function. Binary representation of rule will map every rows with the same pattern. 
    for (let i=0; i < stepsInput.value-1; i++) {
        obj[i+1] = obj[i].map((ele, index) => {
            let neighboors = `${ (obj[i][index-1] || "0") +''+ obj[i][index] + ''+ (obj[i][index+1] || "0")}`
            // console.log(neighboors)
            switch (neighboors) {
                case ('111'):
                nextNumbers = Number(binaryArray8[0])
                break;
                case ('110'):
                nextNumbers = Number(binaryArray8[1])
                break;
                case ('101'):
                nextNumbers = Number(binaryArray8[2])
                break;
                case ('100'):
                nextNumbers = Number(binaryArray8[3])
                break;
                case ('011'):
                nextNumbers = Number(binaryArray8[4])
                break;
                case ('010'):
                nextNumbers = Number(binaryArray8[5])
                break;
                case ('001'):
                nextNumbers = Number(binaryArray8[6])
                break;
                case ('000'):
                nextNumbers = Number(binaryArray8[7])
                break;
                default: nextNumbers = 0;
            }   
            return nextNumbers
        })
    } 

    

    //graphic presentation of obj[] with div elements, conditional styling. 
console.log(obj)
    obj.map((ele, index) => { 
        const a = canvasElem.width/Number(stepsInput.value);
        for (let j=0; j < obj[index].length; j++) {
            
            if (obj[index][j] === 0) {
            ctx.fillStyle = '#dfdfde';
            } else {
            ctx.fillStyle = '#ffa700';      
            }
            ctx.fillRect((a*j), (a*index), a,a);   
        }   
     });
}

// validating form and messeging 
function validateForm() {
    
    if ((ruleInput.value < 0 || ruleInput.value > 255) && ruleInput.value != ''  )  {
        alertMessage.classList.add('show')
        var RuleMessage =  `
            <p> Input "Rule" hasto be beetween 1-255. 
                If you leave it blank default value is 90 </p>
            `;
        alertMessage.innerHTML = RuleMessage + (StepsMessage || '')
          
        
      
        setTimeout( () => {alertMessage.classList.remove('show')},3000);
        validation = false;
    }

    if (stepsInput.value > 200 || stepsInput.value <= 0 ) {
        alertMessage.classList.add('show')
        var StepsMessage =  `
            <p> Input "Steps" has to be beetween 1-200. 
                This will create a square-shaped grid with side input lengths </p>
            `;
        alertMessage.innerHTML = StepsMessage + (RuleMessage || '')
        setTimeout( () => {alertMessage.classList.remove('show')},3000);
        validation = false
    }

}

////////////////////////////////// TRIGGERS ///////////////////////////////////////////

// Trigger program button

buttonSubmit.addEventListener("click", function(evt) {
    evt.preventDefault();
    AddCellprogram(ruleInput, stepsInput);
});



//Handling UI change when touch

Array.from([ruleInput, stepsInput, ...minusButtons, ...plusButtons, buttonSubmit, questionMark]).forEach( (ele) => {
    ele.addEventListener('touchstart', () => {
    
        ele.classList.add('touch');
    }, false)
}) 
Array.from([ruleInput, stepsInput, ...minusButtons, ...plusButtons, buttonSubmit, questionMark]).forEach( (ele) => {
    ele.addEventListener('touchend', () => {
    
        ele.classList.remove('touch');
    }, false)
}) 


//Handling input Range change
minusButtons[0].addEventListener('click', () => {
    ruleInput.value--
    ruleLabel.innerHTML = "Rule: " + (ruleInput.value);
    createBinaryRepArray();
    binaryRepChangeHandler();

})
minusButtons[1].addEventListener('click', () => {
    stepsInput.value--
    stepsLabel.innerHTML = "Steps: " + (stepsInput.value)

});
plusButtons[0].addEventListener('click', () => {
    ruleInput.value++
    ruleLabel.innerHTML = "Rule: " + (ruleInput.value);
    createBinaryRepArray();
    binaryRepChangeHandler();

});
plusButtons[1].addEventListener('click', () => {
    stepsInput.value++
    stepsLabel.innerHTML = "Steps: " + (stepsInput.value)

});

ruleInput.addEventListener('input', () => {
    
    ruleLabel.innerHTML = "Rule: " + (ruleInput.value);
    
    // creating binary represetation of decimal rule - 0-255, also adding blank spaces for 0 if needed (to have every time 8 numbers in Array)
    createBinaryRepArray();
    binaryRepChangeHandler();
  
});

stepsInput.addEventListener('input', () => {
    
    stepsLabel.innerHTML = "Steps: " + (stepsInput.value)
});

// Helper handler //

backdrop.addEventListener('click', () => {
    backdrop.style.setProperty('display', 'none')
    helper.style.setProperty('transform', 'translateY(-100vh)')
});

questionMark.addEventListener('click', () => {
    backdrop.style.setProperty('display', 'block')
    helper.style.setProperty('transform', 'translateY(0vh)')
});

// Starting window 

(function startingApp() {
    var startWindow = document.createElement('div')
    startWindow.innerHTML =
    `<div class ="rotateEver">
        <h1  style = "font-weight: 100">Cellular automaton</h1>
        <br>
        <div class = "logo">
            <img  style ="width: 70%; height: auto" src ="./assets/logo.svg">
        </div>
        <br><br>
        <p ><i>By kkaplinski</i></p>
    </div>
   

    `
    wrapper.appendChild(startWindow)
    startWindow.classList.add('loaderStart')
    setTimeout( () => {
        startWindow.style.setProperty('transform', 'translateY(-100vh)')
    },1500)

})();
