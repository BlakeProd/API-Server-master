// const ContactModel = require('../models/math');
// const Repository = require('../models/repository');
const fs = require('fs');
const path = require('path');

module.exports =
    class MathsController extends require('./Controller') {
         constructor(HttpContext) {
             super(HttpContext);
         }
         
        get() {

            function isPrime(value) {
                for(var i = 2; i < value; i++) {
                    if(value % i === 0) {
                        return false;
                    }
                }
                return value > 1;
            }

            if(this.HttpContext.path.queryString == '?')
            {
                // help request
                let helpPage = path.join(process.cwd(),"/wwwroot/helpPages/MathsServiceHelp.html");
                let pageContent = fs.readFileSync(helpPage);
                this.HttpContext.response.content("text/html", pageContent);
            }
            else if(this.HttpContext.path.params.op != '+' && this.HttpContext.path.params.op != '-' && this.HttpContext.path.params.op != '*'
            && this.HttpContext.path.params.op != '/' && this.HttpContext.path.params.op != '%' && this.HttpContext.path.params.op != '!'
            && this.HttpContext.path.params.op != 'p' && this.HttpContext.path.params.op != 'np')
            {
                let responseObj = { error: "opération inexistante"};
                this.HttpContext.response.JSON(responseObj);   
            }
            else if(this.HttpContext.path.params.x > Number.MAX_VALUE || this.HttpContext.path.params.y > Number.MAX_VALUE || this.HttpContext.path.params.n > Number.MAX_VALUE)
            {
                let responseObj = { error: "Chiffre au-delà du maximum"};
                this.HttpContext.response.JSON(responseObj);   
            }
            else
            {
                if(this.HttpContext.path.params.op)
                {
                    if(this.HttpContext.path.params.op == ' ')
                    {
                        this.HttpContext.path.params.op = '+';
                    }
                    switch(this.HttpContext.path.params.op){
                        case '+' :
                            if(!isNaN(this.HttpContext.path.params.x) && !isNaN(this.HttpContext.path.params.y))
                            {
                                let valuePlus = this.HttpContext.path.params.x + this.HttpContext.path.params.y; 
                                let responsePlus = { value: valuePlus, x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op};
                                this.HttpContext.response.JSON(responsePlus);
                                break;
                            }
                            else
                            {
                                let responseObj = { x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op, error: "x or y is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            
                        case '-':
                            if(!isNaN(this.HttpContext.path.params.x) && !isNaN(this.HttpContext.path.params.y))
                            {
                                let valueMoins = this.HttpContext.path.params.x - this.HttpContext.path.params.y; 
                                let responseMoins = { value: valueMoins, x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op};
                                this.HttpContext.response.JSON(responseMoins);
                                break;
                            }
                            else if(this.HttpContext.path.params.x == '' || this.HttpContext.path.params.y == '')
                            {
                                let responseObj = {x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op, error: "x ou y manque un paramètre"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            else
                            {
                                let responseObj = { error: "x or y is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            
                        case '*':
                            if(!isNaN(this.HttpContext.path.params.x) && !isNaN(this.HttpContext.path.params.y))
                            {
                                let valueFois = this.HttpContext.path.params.x * this.HttpContext.path.params.y; 
                                let responseFois = { value: valueFois, x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op};
                                this.HttpContext.response.JSON(responseFois);
                                break;
                            }
                            else
                            {
                                let responseObj = {x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op, error: "x or y is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                           
                        case '/':
                            if(!isNaN(this.HttpContext.path.params.x) && !isNaN(this.HttpContext.path.params.y))
                            {
                                let valueDivision = this.HttpContext.path.params.x / this.HttpContext.path.params.y; 
                                let responseDivision = { value: valueDivision, x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op};
                                this.HttpContext.response.JSON(responseDivision);
                                break;
                            }
                            else
                            {
                                let responseObj = {x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op, error: "x or y is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            
                            
                        case '%':
                            if(!isNaN(this.HttpContext.path.params.x) && !isNaN(this.HttpContext.path.params.y))
                            {
                                let valueEntier = this.HttpContext.path.params.x % this.HttpContext.path.params.y; 
                                let responseEntier = { value: valueEntier, x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op};
                                this.HttpContext.response.JSON(responseEntier);
                                break;
                            }
                            else
                            {
                                let responseObj = {x: this.HttpContext.path.params.x, y: this.HttpContext.path.params.y, op: this.HttpContext.path.params.op, error: "x or y is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                           
                        case '!':
                            if(!isNaN(this.HttpContext.path.params.n))
                            {
                                let f = this.HttpContext.path.params.n;
                                for(i = 1; i <= this.HttpContext.path.params.n; i++)  
                                    {
                                        f = f * i;
                                    }   
                                let responseFactoriel = { value: f, n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op };
                                this.HttpContext.response.JSON(responseFactoriel);
                                break;
                            }
                            else
                            {
                                let responseObj = { n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op, error: "n is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            
                        case 'p':
                            if(!isNaN(this.HttpContext.path.params.n))
                            {
                                let verification = true;
                                for(var i = 2; i < this.HttpContext.path.params.n; i++)
                                {
                                    if(this.HttpContext.path.params.n%i === 0) 
                                    {
                                        verification = false;
                                    }
                                }
                                let reponseVerification = {value: verification, n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op  };
                                this.HttpContext.response.JSON(reponseVerification);
                                break;
                            }
                            else
                            {
                                let responseObj = { n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op, error: "n is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            

                        case 'np':
                            if(!isNaN(this.HttpContext.path.params.n))
                            {
                                let primeNumber = 0;
                                for(let i = 0; i < this.HttpContext.path.params.n; i++)
                                {
                                    primeNumber++;
                                    while(!isPrime(primeNumber))
                                    {
                                        primeNumber++
                                    }
                                }
                                let reponsePrime = {value: primeNumber, n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op  };
                                this.HttpContext.response.JSON(reponsePrime);
                            }
                            else
                            {
                                let responseObj = { n: this.HttpContext.path.params.x, op: this.HttpContext.path.params.op, error: "n is not a number"};
                                this.HttpContext.response.JSON(responseObj);
                            }
                            break;
                    }
                }
                else
                {
                    let responseObj = { error: "op is missing"};
                    this.HttpContext.response.JSON(responseObj);
                }
            }

            // if (this.repository != null) {
            //     if (!isNaN(id)) {
            //         let data = this.repository.get(id);
            //         if (data != null)
            //             this.HttpContext.response.JSON(data);
            //         else
            //             this.HttpContext.response.notFound();
            //     }
            //     else
            //         this.HttpContext.response.JSON(this.repository.getAll());
            // }
            // else
            //     this.HttpContext.response.notImplemented();
        }
//        post(data) {
//            if (this.repository != null) {
//                data = this.repository.add(data);
//                if (data) {
//                    if (data.conflict)
//                        this.HttpContext.response.conflict();
//                    else
//                        this.HttpContext.response.created(data);
//                } else
//                    this.HttpContext.response.unprocessable();
//            } else
//                this.HttpContext.response.notImplemented();
 //       }
 //       put(data) {
 //           if (this.repository != null) {
 //               let updateResult = this.repository.update(data);
        //         if (updateResult == this.repository.updateResult.ok)
        //             this.HttpContext.response.ok();
        //         else
        //             if (updateResult == this.repository.updateResult.conflict)
        //                 this.HttpContext.response.conflict();
        //             else
        //                 if (updateResult == this.repository.updateResult.notfound)
        //                     this.HttpContext.response.notFound();
        //                 else // this.repository.updateResult.invalid
        //                     this.HttpContext.response.unprocessable();
        //     } else
        //         this.HttpContext.response.notImplemented();
        // }
        // remove(id) {
        //     if (this.repository != null) {
        //         if (this.repository.remove(id))
        //             this.HttpContext.response.accepted();
        //         else
        //             this.HttpContext.response.notFound();
        //     } else
        //         this.HttpContext.response.notImplemented();
        // }
    }