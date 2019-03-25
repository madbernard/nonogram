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

// ///////////////// solving functions ///////////////// //
// clues should be a tuple array of column clues, then row clues
// so like [[[3],[1,2],[1],[2,1]], [[4],[1,1],[2],[1,1]]] for the below
/*
  1111
  1001
  1100
  0101
*/
function solveNonogram (clues) {
  var picture = '';
  /*
    basic algo is, clue says that in this line of x long there are groups, y, z, ... .
    known space is then
      y + z + ... + (length of group array minus 1 (for single space between each group) )
    take known space, compare to line length, amount line is greater than known is l (for what the groups Lack)
    place groups on line as if they started at 0, but do not place marks in the first l spaces
    (this may break down with more groups than 2)
  */
  return picture;
}

// ///////////////// helper functions ///////////////// //

// biasTowardsFilled is, like .1 if you want 60% of the spaces to be filled in
// ...the more empty a nonogram is, the harder it is to solve
function getRandomFiller (biasTowardsFilled) {
  return Math.round(Math.random() + biasTowardsFilled)
}

function arraySum (arr) {
  return arr.reduce(function(soFar, now){
    return soFar + now;
  });
}

console.log(arraySum([2,3]));

var given = createNonogram(5);

// ///////////////// knowledge about nonogram ///////////////// //

/*
  11 12 13
  21 22 23
  31 32 33
  row# then column#
*/
function getGroupsInfo (nonogram) {
  var rows = nonogram.split('\n');
  console.log(rows);
  var cols = [];
  var n = 0;

  while (n < rows.length) {
    for (var i = 0; i < rows.length; i++) {
      rows[i]
    }
    cols[0] += rows[0][0];
    cols[1] += rows[1][0];
    cols[2] += rows[2][0]
    n++;
  }
}

getGroupsInfo(given);

function makeClues (nonogram) {
  var cluesObj = {rowClues: [], colClues: []};
  var rows = nonogram.split('\n');
  var rowGroup, colGroup;

  // we get a number, use it to choose row and col
  for (var i = 0; i < rows.length; i++) {
    rowGroup = 0;
    colGroup = 0;
    cluesObj.rowClues.push([]);
    cluesObj.colClues.push([]);

    // cycle past every point on row and in col
    for (var cyc = 0; cyc < rows.length; cyc++) {
      // coerce '0' to false
      if (rows[i][cyc] == true) {
        rowGroup++;
      }
      else if (rowGroup) {
        cluesObj.rowClues[i].push(rowGroup);
        rowGroup = 0;
      }

      // i goes up one each cycle
      // cycle goes 0-x each cycle
      if (rows[cyc][i] == true) {
        colGroup++;
      }
      else if (colGroup) {
        cluesObj.colClues[i].push(colGroup);
        colGroup = 0;
      }
    }

    // row 1 & col 1 are mapped, move on
    // push stuff in group counters, and if arr has no length push 0
    if (rowGroup) {cluesObj.rowClues[i].push(rowGroup);}
    if (!cluesObj.rowClues[i].length) {cluesObj.rowClues[i].push(0);}
    if (colGroup) {cluesObj.colClues[i].push(colGroup);}
    if (!cluesObj.colClues[i].length) {cluesObj.colClues[i].push(0);}
  }

  console.log(cluesObj);
  return cluesObj;
}
makeClues(given);

// so like [[[3],[1,2],[1],[2,1]], [[4],[1,1],[2],[1,1]]] for the below
/*
  1111
  1001
  1100
  0101
*/

// ///////////////// solving ///////////////// //
/*
  If open space in line === unplaced spaces known... done
  if any unplaced group length > slop (open space - unplaced spaces known)... know (group - slop) spots in middle of open space... so, like, in an open space of 7, with a group of 5, you know 3 locations

  object, r1 = {11: 'odds', 12: 'odds', 13: 'odds', solved: false}



*/


