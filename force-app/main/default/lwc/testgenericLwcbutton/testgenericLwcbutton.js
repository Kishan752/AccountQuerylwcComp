import { LightningElement } from 'lwc';

export default class TestgenericLwcbutton extends LightningElement {

    handleClick(event){
        console.log('Button clicked handled');
    }

    methodParent(){

        console.log('Hola amigo');
        /*String.prototype.giveLydiaPizza = () => {
            return 'Just give Lydia pizza already!';
          };
          


          let name = 'Lydia';
          
         name =name.giveLydiaPizza();
          console.log(name);*/

          for (let i = 0; i < 3; i++) {
            setTimeout(() => console.log(i), 1);
          }

    }
}