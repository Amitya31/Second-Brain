export const random = (len:number):string=>{
    let input = "abcdefghijklmnopqrstuvwxyz1234567890"
    let length = input.length
    let output = ""
    for(let i=1; i<=len; i++){
        output += input[Math.floor(Math.random()*length)]
    }
    return output;
}