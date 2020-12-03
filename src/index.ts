import readlineSync from 'readline-sync';

export function bitmapDistance() {
    // Number of test cases (1 <= t <= 1000)
    const t = readlineSync.questionInt();
    if (t < 1 || t > 1000) throw new Error('Number of test cases must be between 1 and 1000.');

    for (let test = 0; test < t; test++) {
        // Size of bitmap (1 <= n, m <= 182)
        const size = readlineSync.question();
        const [n, m] = size.split(" ").map(Number);
        if (n < 1 || n > 182 || m < 1 || m > 182) throw new Error('Invalid size of the bitmap.');

        const arr: number[][] = [];
        const newArr: number[][] = [];

        const horizontal = (i: number, j: number) => {
            for (let k = 0; k < m; k++) {
                /**
                 * If value is already 0, don't overwrite it.
                 */
                if (k !== j && newArr[i][k] !== 0) {
                    if (!newArr[i][k]) newArr[i][k] = Math.abs(j - k);
                    else newArr[i][k] = Math.min(newArr[i][k], Math.abs(j - k));
                }
            }
        };

        const vertical = (i: number, j: number) => {
            for (let k = 0; k < n; k++) {
                if (arr[i][j] === 0) {
                    // Row is empty
                    if (!newArr[i][j]) {
                        newArr[i][j] = Math.abs(k - i) + newArr[k][j];
                    } else {
                        newArr[i][j] = newArr[k][j] ? Math.min(newArr[i][j], Math.abs(k - i) + newArr[k][j]) : Math.min(newArr[i][j], Math.abs(k - i));
                    }
                }
            }
        };

        for (let i = 0; i < n; i++) {
            const inputRow = readlineSync.question(`Input values of row ${i}: `);

            /**
             * Separate the validation checks to ensure the appropriate Error is returned.
             */
            if (Number(inputRow.length) !== m) throw new Error(`Row should contain ${m} columns.`);
            if (!inputRow.match(/^[01]*$/)) throw new Error('Row should contain only 0 or 1 values.');

            arr.push(inputRow.split('').map(Number));

            const newRow: number[] = [];
            newArr[i] = newRow;

            // Iterate over the columns per row
            for (let j = 0; j < m; j++) {
                // If the row has 1, calculate the horizontal distance of the other pixels
                if (arr[i][j] === 1) {
                    newArr[i][j] = 0;
                    horizontal(i, j);
                }
            }
        }

        /**
         * Iterate over all zero elements in the initial array.
         * Print each row once it's columns are calculated.
         */
        for (let i = 0; i < n; i++) {
            let row = '';
            for (let j = 0; j < m; j++) {
                vertical(i, j);

                if (j === m - 1) {
                    row += `${newArr[i][j]} `;
                    console.log(row);
                } else row += `${newArr[i][j]} `;
            }
        }
    }
}

bitmapDistance();