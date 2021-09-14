import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlightPipe'
})

export class HighlightSearch implements PipeTransform {

    transform(value: any, args: any): any {
        if (!args) {
            return value;
        }
        var re = new RegExp(args, 'gi');
        return value.replace(re, "<strong>$&</strong>");
    }
}