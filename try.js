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