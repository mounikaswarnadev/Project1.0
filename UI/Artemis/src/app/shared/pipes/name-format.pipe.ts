import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name:'nameFormat'  
})
export class NameFormatPipe implements PipeTransform {
  transform(name: string) {
    let formatedName = name;
    if (name) {
      let arrSubNames = name.split(' ');
      if (arrSubNames.length > 0) {
        const length = arrSubNames.length;
        let lastName = arrSubNames[length - 1];
        let firstName = '';
        arrSubNames.forEach((str: string, index: number) => {
          if (length - 1 === index) {
            formatedName = firstName ? `${lastName}, ${firstName}` : `${lastName}`;
            return formatedName.toUpperCase();
          }
          firstName = `${firstName} ${str}`;
        });
      }      
    }

    return formatedName;
  }
}
