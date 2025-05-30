import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'distinct',
    standalone: true
})
export class DistinctPipe implements PipeTransform {
    transform(items: any[], key: string): any[] {
        if (!items || !key) return items;
        return [...new Map(items.map(item => [item[key], item])).values()];
    }
}