const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const range = document.getElementById("res")
range.addEventListener("change",change)
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
    image1.src = `${reader.result}`
    }
    
}

const image1 = new Image();
const char = [" ", '░', "~", ":", "+", "=", "o", "*", "▒", "^", "%", "#", "░", "$", "▒", "▓"]


// data:image/png;base64,
class Cell{
    constructor(x,y,symbols,color){
        this.x=x
        this.y=y
        this.symbols = symbols
        this.color = color

    }
    draw(ctx){
        ctx.fillStyle = this.color
        ctx.fillText(this.symbols,this.x,this.y)

    }
}

class ascii{
    #ctx
    #imageCellArray = []
    #pixels = []
    #symbols = []
    #width
    #height
    constructor(ctx,width,height){
        this.#ctx = ctx
        this.#height = height
        this.#width = width
        this.#ctx.drawImage(image1,0,0,image1.width,image1.height)
        this.#pixels = this.#ctx.getImageData(0,0,this.#width,this.#height)
    }
    

    #convertToSymbol(g){
            // if(g>250) return char[0]
            if(g<120) return char[1]
            // else if(g<110) return char[3]
            // else if(g<120) return char[4]
            // else if(g<130) return char[5]
            // else if(g<135) return char[6]
            // else if(g<140) return char[7]
            else if(g<170) return char[8]
            // else if(g<150) return char[9]
            // else if(g<160) return char[10]
            // else if(g<170) return char[11]
            // else if(g<185) return char[12]
            // else if(g<190) return char[14]
            else if(g<195) return char[15]
            else if(g<255) return char[15]
            // else if(g<250) return char[0]
            // else if (g<80)return char[1]
                
                
            
    }
    #scan(size){
        this.#imageCellArray = []
        for (let y = 0; y < this.#pixels.height; y+=size) {
            for(let x = 0; x < this.#pixels.width;x += size){
                let posx = x*4
                let posy = y*4
                let pos  = (posy*this.#pixels.height)+posx 


                // const red=this.#pixels.data[pos]*0.2989
                // const blue=this.#pixels.data[pos+1]*0.114
                // const green=this.#pixels.data[pos+2]*0.5870

                const red=this.#pixels.data[pos]
                const blue=this.#pixels.data[pos+1]
                const green=this.#pixels.data[pos+2]
                const total = red+blue+green
                const color = "rgb("+red+ "," + blue + "," + green + ")"
                const ave =total/3
                const symbols = this.#convertToSymbol(ave)
                this.#imageCellArray.push(new Cell(x,y,symbols,color))
                
            }
            
        }
        // this.#ctx.font="5px sans-serif"

    }
    #drawAss(){
        this.#ctx.clearRect(0,0,this.#width,this.#height)
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx)
            
        }
    }
    draw(size){
        this.#scan(size)
        this.#drawAss()
        console.log(this.#pixels);

    }
    

}

let effect
image1.onload = function initialize() {
    canvas.width = image1.width;
    canvas.height = image1.height;
    effect = new ascii(ctx,image1.width,image1.height)
    effect.draw(5)
}
function change(){
    ctx.font = "1px vardina"//parseInt(range.value) +"px vardana"
    effect.draw(parseInt(range.value))
}