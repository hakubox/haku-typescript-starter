import "./assets/basic.scss";
import { printMe } from "./flow";

console.log(process.env);

if (module['hot']) {
    module['hot'].accept("./flow.ts", function () {
        console.log("Accepting the updated printMe module!");
        printMe();
    });
}