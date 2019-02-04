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

    board += row + (i < size - 1 ? '\n' : '');
  }

  console.log(board);
  return board;
}

// ///////////////// helper functions ///////////////// //

// biasTowardsFilled is, like .1 if you want 60% of the spaces to be filled in
// the more empty a nonogram is, the harder it is to solve
function getRandomFiller (biasTowardsFilled) {
  return Math.round(Math.random() + biasTowardsFilled)
}

function arraySum (arr) {
  return arr.reduce(function(soFar, now){
    return soFar + now;
  });
}

console.log(arraySum([2,3]));

var given = createNonogram(10);

// ///////////////// knowledge about nonogram ///////////////// //

/*
  11 12 13
  21 22 23
  31 32 33
  r#c#
*/
function getGroupsInfo (nonogram) {
  var rows = nonogram.split('\n');
  console.log(rows);

  var cols = rows.forEach(function(eachRow, colNum);{
    for (var rowNum = 0; rowNum < eachRow.length; rowNum++) {
      eachRow[colNum];
    }
  });
}

getGroupsInfo(given);



// ///////////////// solving ///////////////// //
/*
  If open space in line === unplaced spaces known... done
  if any unplaced group length > slop (open space - unplaced spaces known)... know (group - slop) spots in middle of open space... so, like, in an open space of 7, with a group of 5, you know 3 locations


  rose

MFOKACDuIpp


*/


