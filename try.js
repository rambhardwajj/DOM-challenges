const matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];
  
  function spiralMatrix(matrix) {
    let startRow = 0;
    let startCol = 0;
    let endRow = matrix.length - 1;
    let endCol = matrix[0].length - 1;
    const result = [];
  
    while (startRow <= endRow && startCol <= endCol) {
      for (let i = startCol; i <= endCol; i++) {
        result.push(matrix[startRow][i]);
      }
  
      for (let i = startRow + 1; i <= endRow; i++) {
        result.push(matrix[i][endCol]);
      }
  
      for (let i = endCol - 1; i >= startCol; i--) {
        if( startRow == endRow) break
        result.push(matrix[endRow][i]);
      }
  
      for (let i = endRow - 1; i > startRow; i--) {
        if( startCol==endCol) break
        result.push(matrix[i][startCol]);
      }
  
      startCol += 1;
      startRow += 1;
      endCol -= 1;
      endRow -= 1;
    }
    return result;
  }
  
  console.log(spiralMatrix(matrix));

  
  var setZeroes = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let first_row_has_zero = false;
    let first_col_has_zero = false;

    // Check if the first row contains zero
    for (let c = 0; c < cols; c++) {
        if (matrix[0][c] === 0) {
            first_row_has_zero = true;
            break;
        }
    }

    // Check if the first column contains zero
    for (let r = 0; r < rows; r++) {
        if (matrix[r][0] === 0) {
            first_col_has_zero = true;
            break;
        }
    }

    // Use the first row and column as markers
    for (let r = 1; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
            if (matrix[r][c] === 0) {
                matrix[r][0] = 0;
                matrix[0][c] = 0;
            }
        }
    }

    // Set the marked rows to zero
    for (let r = 1; r < rows; r++) {
        if (matrix[r][0] === 0) {
            for (let c = 1; c < cols; c++) {
                matrix[r][c] = 0;
            }
        }
    }

    // Set the marked columns to zero
    for (let c = 1; c < cols; c++) {
        if (matrix[0][c] === 0) {
            for (let r = 1; r < rows; r++) {
                matrix[r][c] = 0;
            }
        }
    }

    // Set the first row to zero if needed
    if (first_row_has_zero) {
        for (let c = 0; c < cols; c++) {
            matrix[0][c] = 0;
        }
    }

    // Set the first column to zero if needed
    if (first_col_has_zero) {
        for (let r = 0; r < rows; r++) {
            matrix[r][0] = 0;
        }
    }

    return matrix;    
};