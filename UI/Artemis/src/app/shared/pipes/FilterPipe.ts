import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                let bool = false;  
                if(el.SampleName)
                    bool = bool || el.SampleName.toLowerCase().indexOf(input) > -1;
                if(el.WellName)
                    bool = bool || el.WellName.toLowerCase().indexOf(input) > -1;
                if(el.MiniplugName)
                    bool = bool || el.MiniplugName.toLowerCase().indexOf(input) > -1;
                if(el.Field)
                    bool = bool || el.Field.toLowerCase().indexOf(input) > -1;
                if(el.PilotScan)
                    bool = bool || el.PilotScan.toLowerCase().indexOf(input) > -1;
                if(el.SAMPNM)
                    bool = bool || el.SAMPNM.toLowerCase().indexOf(input) > -1;
                if(el.SWSName)
                    bool = bool || el.SWSName.toLowerCase().indexOf(input) > -1 ;
                if(el.ParentName)
                    bool = bool || el.ParentName.toLowerCase().indexOf(input) > -1 ;
                return bool;
            })
        }
        return value;
    }
}