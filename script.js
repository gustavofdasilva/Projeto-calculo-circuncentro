/*
Algorítmo: Calcula o circuncentro de um triângulo
Professor: Olivaine Santana de Queiroz
Autores: Gustavo Silva, Vitor Santana
*/ 
let circTextArea = document.getElementById("circle")
let centerCircTextArea = document.getElementById("centerCircle")

function inf(value) {
    if (value == Infinity || value == -Infinity) {
        return 0
    } else {
        return value
    }
}

function calc() {
    let TriangleA = {
        X: +document.getElementById("XA").value,
        Y: +document.getElementById("YA").value
    }
    
    let TriangleB = {
        X: +document.getElementById("XB").value,
        Y: +document.getElementById("YB").value
    }
    
    let TriangleC = {
        X: +document.getElementById("XC").value,
        Y: +document.getElementById("YC").value
    }

    console.log(`
    ${TriangleA.X}
    ${TriangleA.Y}
    ${TriangleB.X}
    ${TriangleB.Y}
    ${TriangleC.X}
    ${TriangleC.Y}
    `)

//2º etapa: é um triangulo degenerado?
    let TriangleDet = TriangleA.X * (TriangleB.Y - TriangleC.Y) + TriangleB.X * (TriangleC.Y - TriangleA.Y) +  TriangleC.X * (TriangleA.Y - TriangleB.Y)
    if (TriangleDet == 0) {
        return console.log("Inválido");
    } else {
        console.log("válido")
    }

// 3º etapa: reta suporte
    function supportLine(point1, point2) {
        let a = point1.Y - point2.Y
        let b = point2.X - point1.X
        let c = point1.X * point2.Y - point2.X * point1.Y
        supLine = `${a}x + ${b}y + ${c}`
        return supLine
    }

// 4º etapa: ponto medio
    function midPoint(point1, point2) {
        let M = {
            X : (point1.X + point2.X) / 2,
            Y : (point1.Y + point2.Y) / 2
        }
        return M
    }

//5º etapa: mediatriz
    function bisectorPoint(point1, point2) {
        //equação ((point1.X - point2.X) / (point1.Y - point2.Y) * (x - midPoint(point1,point2).X)) = (Y - midpoint(p1,p2).Y)

        let Nr = (point2.Y - point1.Y) / (point2.X - point1.X) 
            Nr = inf(Nr)
        let Ms = -1/Nr 
            Ms = inf(Ms)
        let a = (point1.X - point2.X) / (point1.Y / point2.Y)
        let b = midPoint(point1,point2).X
        let c = midPoint(point1,point2).Y
    
        let info = {
            Nr: Nr,
            Ms:  Ms,
            Mx: midPoint(point1,point2).X,
            My: midPoint(point1,point2).Y
        }
        return info 
    }

//6º etapa: encontrar o ponto de intersecção
    /*
        { ax + by = -c
        { dx + ey = -f
    */
    function circ() {
        eq1 = bisectorPoint(TriangleA,TriangleB)
        eq2 = bisectorPoint(TriangleB,TriangleC)

        let a = -1
        let b1 = 1/eq1.Ms
            b1 = inf(b1)
        let c1 = (eq1.Ms*eq1.Mx - eq1.My)/eq1.Ms
            c1 = inf(c1)
        let b2 = 1/eq2.Ms
            b2 = inf(b2)
        let c2 = (eq2.Ms*eq2.Mx - eq2.My)/eq2.Ms
            c2 = inf(c2)

        let intersectionPoint = {
            X: -(-(b2 * ((-c1+c2) / (b1-b2))) -c2),
            Y: (-c1+c2) / (b1-b2) 
        }

        return intersectionPoint
    }

        //Debug
        function eqCirc()  {
            eq1 = bisectorPoint(TriangleA,TriangleB)
            eq2 = bisectorPoint(TriangleB,TriangleC)

            let a = -1
            let b1 = 1/eq1.Ms
            let c1 = (eq1.Ms*eq1.Mx - eq1.My)/eq1.Ms
            let b2 = 1/eq2.Ms
            let c2 = (eq2.Ms*eq2.Mx - eq2.My)/eq2.Ms

            let y = (-c1+c2) / (b1-b2)
            let x = -(-(b2 * ((-c1+c2) / (b1-b2))) -c2)

            console.log(`
            equação de cada = 
                y/${eq1.Ms} + ${eq1.Ms*midPoint(TriangleA,TriangleB).X - midPoint(TriangleA,TriangleB).Y}/${eq1.Ms} = ${eq1.Ms}x/${eq1.Ms} ->
                1/${eq1.Ms}y - X + ${(eq1.Ms*midPoint(TriangleA,TriangleB).X - midPoint(TriangleA,TriangleB).Y)/eq1.Ms}
            
                ${a}x + ${b1}y + ${c1}
                USAR: ${a}x + ${b1}y = -${c1}

                S = {${x},${y}}
            `)
            /*${b1-b2}y = ${-c1+c2}
                y = ${(-c1+c2) / (b1-b2)}

                ${a}x + ${b2 * ((-c1+c2) / (b1-b2))} = -${c2}
                -x = ${-(b2 * ((-c1+c2) / (b1-b2))) -c2}
                x = ${-(-(b2 * ((-c1+c2) / (b1-b2))) -c2)}*/
        }

//7º etapa: encontrar o raio do círculo
    function circRad() {
        let Cx = circ().X
        let Cy = circ().Y
        let Xa = TriangleA.X
        let Ya = TriangleA.Y
        let R = Math.sqrt(Math.pow(Cx - Xa , 2) + Math.pow(Cy - Ya , 2))
        return R
    }

//8ª etapa: equação do círculo e circuncentro
    function circEq() {
        
        console.log(`
            (x-${circ().X})² + (y-${circ().Y})² = ${circRad()}²

            Círculo: (x-${circ().X})² + (y-${circ().Y})² = ${Math.pow(circRad(),2)}
            Circuncentro: (${circ().X},${circ().Y})
        `)

        let info = {
            circulo:`(x-${circ().X})² + (y-${circ().Y})² = ${Math.pow(circRad(),2)}`,
            centro: `(${circ().X},${circ().Y})`
        }


        return info;
        
    }

//console
console.log(supportLine(TriangleA,TriangleB))
console.log(supportLine(TriangleB,TriangleC))
console.log(supportLine(TriangleC,TriangleA))

console.log(midPoint(TriangleA,TriangleB))
console.log(midPoint(TriangleB,TriangleC))
console.log(midPoint(TriangleC,TriangleA))

console.log(bisectorPoint(TriangleA,TriangleB))
console.log(bisectorPoint(TriangleB,TriangleC))
console.log(bisectorPoint(TriangleC,TriangleA))

circ()
console.log(circRad())
circEq()
circTextArea.innerText = ""
centerCircTextArea.innerText = ""
circTextArea.innerText += circEq().circulo
centerCircTextArea.innerText += circEq().centro
}