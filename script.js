// console.log('Hello!');


// // let A = "а" ; let B = "a" ; console.log(A===B);

// let A = "a";
// let B = "a";
// console.log(A === B);

// let X = "a";
// let Y = "a";
// console.log(X === Y);


// console.log(!false === 1); 
// console.log(!false ==  1); 

// function ff(){
//     console.log('dsfdsf')
//     ff()
// }

// ff()

// function f(){
//     while(true){
//         console.log('dfdsf')
//     }
// }
// f()

// let aa =[]
// while(true){
//     let a= [1,2,3,4]
//     // aa.push(a)
// }


// const nums = [
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ];
  const nums = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ];

  
  for(let i =0;i< nums.length; i++){
    for(let j =0;j<nums[i].length; j++){
        process.stdout.write(`${nums[i][j]} `)
    }
    console.log()
  }

  let rowStart = 0 , colStart =0, rowEnd = nums.length-1, colEnd=nums[0].length-1;
  while(rowStart<=rowEnd && colStart<=colEnd){

    for(let j =colStart; j<=colEnd ; j++ ){
      process.stdout.write(`${nums[rowStart][j]}  `)
    }
    rowStart++;

    for(let i =rowStart; i<=rowEnd; i++){
      process.stdout.write(`${nums[i][colEnd]}  `)
    }
    colEnd--;
    
    if( rowStart <= rowEnd){
      for(let j = colEnd;j>=colStart; j--){
        process.stdout.write(`${nums[rowEnd][j]}  `)
      }
      rowEnd--;
    }

    if( colStart<=colEnd){
      for(let i = rowEnd; i>=rowStart; i--){
        process.stdout.write(`${nums[i][colStart]}  `)
      }
      colStart++;
    }
    
  }
  process.stdout.write(`⭐`)
