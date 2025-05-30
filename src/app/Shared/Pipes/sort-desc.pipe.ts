import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortDesc',
    standalone: true
})
export class SortDescPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        if (!Array.isArray(array) || !field) return array;
        return [...array].sort((a, b) => {
            const valA = a[field];
            const valB = b[field];
            return typeof valA === 'number'
                ? valB - valA
                : valB.toString().localeCompare(valA.toString());
        });
    }
}