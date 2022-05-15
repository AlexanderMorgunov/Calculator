let buttons = [
    {label:"C",
    x:400,
    y:206,
    x4Text:416,
    y4Text:230,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"AC",
    x:455,
    y:206,
    x4Text:466,
    y4Text:230,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"<-",
    x:510,
    y:206,
    x4Text:525,
    y4Text:230,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"Rvt",
    x:565,
    y:206,
    x4Text:575,
    y4Text:230,
    width:40,
    height:40,
    bgColor:"#E5E5E5",
    stroke:false,},

    {label:"7",
    x:345,
    y:261,
    x4Text:361,
    y4Text:286,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"8",
    x:400,
    y:261,
    x4Text:416,
    y4Text:286,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"9",
    x:455,
    y:261,
    x4Text:471,
    y4Text:286,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"4",
    x:345,
    y:316,
    x4Text:361,
    y4Text:341,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"5",
    x:400,
    y:316,
    x4Text:416,
    y4Text:341,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"6",
    x:455,
    y:316,
    x4Text:471,
    y4Text:341,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"1",
    x:345,
    y:371,
    x4Text:361,
    y4Text:396,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"2",
    x:400,
    y:371,
    x4Text:416,
    y4Text:396,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"3",
    x:455,
    y:371,
    x4Text:471,
    y4Text:396,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:"0",
    x:345,
    y:426,
    x4Text:361,
    y4Text:451,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},

    {label:".",
    x:400,
    y:426,
    x4Text:418,
    y4Text:451,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},
    
    {label:"+/-",
    x:455,
    y:426,
    x4Text:466,
    y4Text:451,
    width:40,
    height:40,
    bgColor:"#F1F1F1",
    stroke:true,},
];

var canvas = document.querySelector("#MyCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.rect(210, 106, 420, 385);
ctx.strokeStyle = "#000000";
ctx.stroke();
ctx.closePath();

buttons.forEach(button=>{
    ctx.beginPath();
    ctx.rect(button.x, button.y,button.width,button.height);
    ctx.fillStyle=button.bgColor;
    if(button.stroke){
        ctx.strokeStyle="black";
        ctx.stroke();
    }
    ctx.fill();
    ctx.font = "14px Roboto";
    ctx.fillStyle="black";
    ctx.fillText(button.label, button.x4Text,button.y4Text);
    ctx.closePath();
});

class calculate{
    constructor(){
        this.number = {
            value: '0',
            isPositive: true,
        };
        this.arithmeticActions = '';
        this.previousArithmeticActions = {
            value: '',
            state:false,
        };
        this.result = 0;
    }

    clickOnButton(btn){
            if((IsNumberCorrect(this.number.value,btn))&&(parseInt(btn).toString()!='NaN')){

            if(this.number.value == '0'){
                this.number.value = btn;
                this.arithmeticActions+=this.number.value[this.number.value.length-1];
                DisplayRender(this.arithmeticActions);

            }

            else{
            this.number.value+=btn;
            this.arithmeticActions+=this.number.value[this.number.value.length-1];
            DisplayRender(this.arithmeticActions);
            }
        }

        switch(btn){
            case 'AC':
            case 'C':
            this.number.value = '0';
            this.arithmeticActions = '';
            DisplayRender(this.arithmeticActions);
            this.previousArithmeticActions.value = '';
            break;

            case '<-':
            if(this.number.value.length>0){
                
            if(this.number.value.length==1){
                this.number.value = '0';
                this.arithmeticActions = this.arithmeticActions.substring(0,this.arithmeticActions.length-1);
            }
            else{
                this.number.value = this.number.value.slice(0,-1);
                this.arithmeticActions = this.arithmeticActions.substring(0,this.arithmeticActions.length-1);
            }
            }

            else if((+(this.arithmeticActions[this.arithmeticActions.length-1])).toString()=='NaN'){
                this.arithmeticActions = this.arithmeticActions.slice(0,-1);
                this.number.value = this.number.previousValue;
        }
        
            DisplayRender(this.arithmeticActions);
            break;

            case '+/-':
            if(+(this.arithmeticActions[this.arithmeticActions.length-1]).toString()!="NaN"){

                let AddMinusOfLastNum = ()=>{ 
                    let str = this.arithmeticActions;
                    let num = this.number.value;
                    if(this.number.isPositive==true){

                        if(str[(str.length)-(num.length)-1]=='-'){
                            newCalculate.arithmeticActions = str.substring(0,(str.length-num.length-1))+'+'+str.substring((str.length-num.length),str.length);
                        }
                        else{

                            this.arithmeticActions = (str.substring(0,(str.length-num.length))+'-'+str.substring((str.length-num.length),str.length));
                            this.number.isPositive = false;
                            this.number.value = '-'+this.number.value;

                        }

                    }
                    else{
                        this.arithmeticActions = (str.substring(0,(str.length-num.length))+str.substring((str.length-num.length+1),str.length));
                        this.number.isPositive = true;
                        this.number.value = num.substring(1,num.length);
                    }
                }

                AddMinusOfLastNum();
                DisplayRender(this.arithmeticActions);
            }
            
            break;

            case '.':
                if(!(this.number.value.includes('.'))){
                    if(this.arithmeticActions==''){
                        this.arithmeticActions='0.';
                        this.number.value = this.number.value + '.';
                    }
                    else{
                    this.number.value = this.number.value + '.';
                    this.arithmeticActions+='.';
                    }
                }
                DisplayRender(this.arithmeticActions);
                break;

            case 'Rvt':
                if(this.previousArithmeticActions.state==false){
                    this.previousArithmeticActions.state = true;
                    DisplayRender(this.previousArithmeticActions.value);
                }
                else{
                    this.previousArithmeticActions.state = false;
                    DisplayRender(this.arithmeticActions);
                }
                break;
    }

}
}

let newCalculate = new calculate();

ctx.beginPath();
ctx.rect(235,131,370,60);
ctx.fillStyle="#F1F1F1";
ctx.fill();
ctx.stroke();
ctx.fillStyle="black";
ctx.font = "28px Roboto";
// ctx.direction = "rtl";
ctx.fillText(newCalculate.number.value, 580,170);
ctx.closePath();


function getClickCoordinats(canvas,e){
    let top = canvas.getBoundingClientRect().top;
    let left = canvas.getBoundingClientRect().left;
    return({x:e.clientX-left, y:e.clientY-top});
}

function IsNumberCorrect(number,btn){

        if(parseFloat(number)%1!=0){

        let count = number.toString().split('.').pop().length;
        if(count<8)return true;
        else return false;
    }
            if((lengthOfNumber())&&(!((btn=='0')&&(number=='0')))){
            return true;
        }
        else return false;

    function lengthOfNumber(){
        if(number[number.length-1]=='.'){
            return true;
        }
        else if((Math.abs(number).toString().length<12)) return true;
        else return false;
    }

}

function DisplayRender(number){
    ctx.clearRect(235,131,370,60);
    ctx.textAlign = 'start';
    ctx.fillText(number,(580 - number.toString().length*15),170);
}

function addArifmeticSign(sign){
    switch (sign){
        case '+':
            removeUselessSign();
            newCalculate.arithmeticActions+='+';
            newCalculate.number.previousValue = newCalculate.number.value;
            newCalculate.number.value = '';
            newCalculate.number.isPositive = true;
            DisplayRender(newCalculate.arithmeticActions);
            break;

        case '-':
            removeUselessSign();
            newCalculate.arithmeticActions+='-';
            newCalculate.number.previousValue = newCalculate.number.value;
            newCalculate.number.value = '';
            newCalculate.number.isPositive = true;
            DisplayRender(newCalculate.arithmeticActions);
            break;

        case '*':
            removeUselessSign();
                newCalculate.arithmeticActions+='*';
                newCalculate.number.previousValue = newCalculate.number.value;
                newCalculate.number.value = '';
                newCalculate.number.isPositive = true;
                DisplayRender(newCalculate.arithmeticActions);
                break;

        case '/':
            removeUselessSign();
                newCalculate.arithmeticActions+='/';
                newCalculate.number.previousValue = newCalculate.number.value;
                newCalculate.number.value = '';
                newCalculate.number.isPositive = true;
                DisplayRender(newCalculate.arithmeticActions);
                break;
        
        case '=':
        case 'Enter':
        removeUselessSign();
        newCalculate.previousArithmeticActions.value = newCalculate.arithmeticActions;
        DisplayRender(eval(newCalculate.arithmeticActions));
        newCalculate.arithmeticActions = eval(newCalculate.arithmeticActions).toString();
        newCalculate.number.value = newCalculate.arithmeticActions;
        break;        
    }
}

function removeUselessSign(){
    if((+(newCalculate.arithmeticActions[newCalculate.arithmeticActions.length-1])).toString()=="NaN"){
        newCalculate.arithmeticActions = newCalculate.arithmeticActions.toString().slice(0,-1);
    }
}

function InputNumbers(e){
    if(parseInt(e.key).toString()!='NaN'){
        newCalculate.clickOnButton(e.key);
    }
}

canvas.addEventListener("click",function(e){

    buttons.forEach(button=>{
        if((getClickCoordinats(canvas,e).x>button.x&&getClickCoordinats(canvas,e).x<=button.x+40)&&(getClickCoordinats(canvas,e).y>button.y&&getClickCoordinats(canvas,e).y<=button.y+40)){
            newCalculate.clickOnButton(button.label);
        }
    });

});

document.addEventListener('keydown',function(e){
    addArifmeticSign(e.key);
});

document.addEventListener('keydown',function(e){
    InputNumbers(e);
    console.log(e.key);
});

