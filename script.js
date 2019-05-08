var ruleInput = document.getElementById("ruleInput")
var ruleLabel = document.getElementById("RuleLabel")
var stepsInput = document.getElementById("stepsInput");
var stepsLabel = document.getElementById("stepsLabel")

var buttonSubmit = document.getElementsByClassName('buttonSubmit')[0];
var cellprogram = document.getElementsByClassName('programOutput')[0];
var cells;
var alertMessage = document.getElementsByClassName('alert')[0];
var validation = true;

// Trigger program button

buttonSubmit.addEventListener("click", function(evt) {
    evt.preventDefault();
    AddCellprogram(ruleInput, stepsInput);
});
// Hiding alert message
alertMessage.addEventListener("click", () => {
    alertMessage.classList.remove('show')
});

//Handling input Range change
ruleInput.addEventListener('input', () => {
    
    ruleLabel.innerHTML = "Rule: " + (ruleInput.value || 90)
})



stepsInput.addEventListener('input', () => {
    
    stepsLabel.innerHTML = "Steps: " + (stepsInput.value || 20)
})

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

// Starting program - main function 
function AddCellprogram(ruleInput, stepsInput) {
    validateForm()
    if (!validation) {
        validation = true;
        return
    }   
    // removing old <div> from DOM, when you generate another cellar automate
    if(cells) {
        console.log(cells)
        var array = Array.prototype.slice.call(cells,0)
        array.map((x) => cellprogram.removeChild(x))
    }

    // reseting array of rows and generating first row with only single "1" ind the middlee
    var obj = [
        []
    ]
    var newArray = [...Array(Number(stepsInput.value))].map(x =>  x = 0)
    newArray[Math.floor((Number(stepsInput.value))/2)] = 1
    obj[0] = newArray

    // creating binary represetation of decimal rule - 0-255, also adding blank spaces for 0 if needed (to have every time 8 numbers in Array)
    
    console.log(ruleInput.value)
    var binaryArray = Number(ruleInput.value || 90).toString(2).split('').reverse();
    console.log(binaryArray)

    var binaryArray8 = [...Array(8)].map((x, i) => {
        return x = binaryArray[i] || "0"
    }).reverse();
    console.log(binaryArray8)

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

    obj.map((ele, index) => {
        for (let j=0; j < obj[index].length; j++) {
            var para = document.createElement('div');
            if (obj[index][j] === 0) {
            para.className = 'isZero'
            } else {
            para.className = 'isOne'                                                                                                        
            }
            cellprogram.appendChild(para);
        }
    })


    cellprogram.style.setProperty('--number-of-column',  stepsInput.value)
    cellprogram.style.setProperty('--number-of-rows',  stepsInput.value)
    // console.log(obj)
    cells = cellprogram.getElementsByTagName('div')
}


    