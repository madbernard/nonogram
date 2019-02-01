// make nonogram as a string, so it's easier to get columns?

/*
solved: need whole line, also each group in line
so not just [true, 1, 0, 0, 1, 1]
each line = object?
groups... group1 = true, group2 = false?
line = {solved: false, groupsSolved: [true,false], display:[1,0,?,?,?]} ?
*/

function createNonogram (size) {
  var board = '';
  var col = 0, row = '';

  for (var i = 0; i < size; i++) {
    col = 0;
    row = '';

    while (col < size) {
      row += getRandomFiller(0.1);
      col++;
    }

    board += row + '\n';
  }

  console.log(board);
  return board;
}

// moreFilledThanHalf is, like .1 if you want 60% of the spaces to be filled in
function getRandomFiller (moreFilledThanHalf) {
  return Math.round(Math.random() + moreFilledThanHalf)
}

createNonogram(10);









