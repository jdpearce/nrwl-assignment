import { Component } from '@angular/core';

@Component({
    selector: 'tm-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private readonly MATRIX = [[1, 4, 7], [2, 5, 8], [3, 6, 9]];

    transpose(matrix: Array<Array<Number>>) {
        let newMatrix = []; // etc.

        for (let i = 0; i < matrix.length; i++) {
            for (let j = i; j < matrix[i].length; j++) {
                var temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        return matrix;
    }
}
