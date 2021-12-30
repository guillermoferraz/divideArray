//CREAR Y DIVIDIR ARRAY (PAR O IMPAR) Y BUSCAR NUMERO 
import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";
import * as Colors from "https://deno.land/std/fmt/colors.ts";

const ask = new Ask();

async function main() {
    let appStart = performance.now();

    console.log(Colors.red(`
    ################################
    #  CREATE AND DIVIDE AN ARRAY  #
    ################################
    `))


    let longArray = await ask.prompt([
        {
            name: "x",
            type: "input",
            message: "Length of array:"
        }
    ])
    let x: any = longArray.x

    // creacion del array
    function createArray(x: number) {
        let array = []
        for (let i = 0; i <= x; i++) {
            array.push(i)
        }
        return array
    }

    //division del array
    function divide(array: number[]) {
        let results: any = {}
        let arrayOne: number[];
        let arrayTwo: number[];
        if (array.length % 2 !== 0) {
            arrayOne = array.slice(0, (array.length / 2) + 1)
            arrayTwo = array.slice((array.length / 2) + 1, array.length)
        } else {
            arrayOne = array.slice(0, array.length / 2)
            arrayTwo = array.slice(array.length / 2, array.length)
        }
        results = { "arrayOne": arrayOne, "arrayTwo": arrayTwo }
        return results
    }


    //buscar numero en los arrays
    let find = await ask.prompt([
        {
            name: "number",
            type: "input",
            message: "Find Number on Arrays:"
        }
    ])
    let n: any = find.number
    const array = createArray(parseInt(x))
    const resultDivide: { [key: string]: number[] } = divide(array)

    function findNumber(n: number, resultDivide: { [key: string]: number[] }) {
        let result: string[] = []

        if (n < resultDivide.arrayOne.length) {
            resultDivide.arrayOne.forEach(item => {
                if (item.toString() === (n.toString())) {
                    result.push(`FIND NUMBER ${n} ON ARRAY ONE`)
                }
            });
        } else {
            resultDivide.arrayTwo.forEach(item => {
                if (item.toString() === (n.toString())) {
                    result.push(`FIND NUMBER ${n} ON ARRAY TWO`)
                }
            });
        }

        let returnData = result && result.length > 0 ? result : ["NUMBER  NOT FOUND!"]
        return returnData[0]
    }


    console.log("DIVIDE:", resultDivide)
    console.log("")
    
    //ejecucion de reultado
    const findNumberEntry = findNumber(n, resultDivide)
    console.log("RESULT:", findNumberEntry + "\n")

    //tiempo de ejeccion
    let appEnd = performance.now();
    console.log("Tiempo de ejecucion " + (appEnd - appStart) + " milisegundos." + "\n")

    //restart app
    let restartEntry = await ask.prompt([
        {
            name: "option",
            type: "input",
            message: "Restart app: y/n"
        }
    ])
    let option: any = restartEntry.option
    restart(option)
    function restart(option: any) {
        if (option === "yes" || option === "y" || option === "YES" || option === "Y") {
            main()
        } else {
            console.log(Colors.red(`
        ################################
        #             EXIT             #
        ################################
    `))

        }
    }


}
main()
