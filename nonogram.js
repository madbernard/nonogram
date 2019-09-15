// Represent board on command line with space-filling characters
var indicateUnknown = ' ';
var knownWall = '-';
var knownFill = 'H';

// make nonogram as a string, so it's easier to get columns?
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

var given = createNonogram(5);

// ///////////////// knowledge about nonogram ///////////////// //

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

    // cycle past every point on row i and in col i
    // cyc goes 0-end each cycle
    for (var cyc = 0; cyc < rows.length; cyc++) {
      // make clues for the i row
      if (rows[i][cyc] === knownFill) {
        rowGroup++;
      }
      else if (rowGroup) {
        cluesObj.rowClues[i].push(rowGroup);
        rowGroup = 0;
      }

      // make clues for the i column
      if (rows[cyc][i] === knownFill) {
        colGroup++;
      }
      else if (colGroup) {
        cluesObj.colClues[i].push(colGroup);
        colGroup = 0;
      }
    }

    // row i & col i are mapped, move on
    // push stuff in group counters, and if arr has no length push 0
    if (rowGroup) { cluesObj.rowClues[i].push(rowGroup); }
    if (!cluesObj.rowClues[i].length) { cluesObj.rowClues[i].push(0); }
    if (colGroup) { cluesObj.colClues[i].push(colGroup); }
    if (!cluesObj.colClues[i].length) { cluesObj.colClues[i].push(0); }
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

// ///////////////// solving functions ///////////////// //

/*
  solved: need whole line, also each group in line
  so not just [true, 1, 0, 0, 1, 1]
  each line = object?
  groups... group1 = true, group2 = false?
  line = {solved: false, groupsSolved: [true,false], display:[1,0,x,x,x]} ?
*/

/*
  Clue Object for this:
    11110
    00000
    11010
    10101
    11111
  Looks like:
    { rowClues: [ [ 4 ], [ 0 ], [ 2, 1 ], [ 1, 1, 1 ], [ 5 ] ],
      colClues: [ [ 1, 3 ], [ 1, 1, 1 ], [ 1, 2 ], [ 1, 1, 1 ], [ 2 ] ] }
*/
/*
  If open space in line === unplaced spaces known... done
  if any unplaced group length > slop (open space - unplaced spaces known)... know (group - slop) spots in middle of open space... so, like, in an open space of 7, with a group of 5, you know 3 locations

  object, r1 = {11: 'odds', 12: 'odds', 13: 'odds', solved: false}



*/
function solveNonogram (clues, size) {
  var picture = '';
  /*
    basic algo is, clue says that in this line of length L there are groups, y, z, ... .
    known space is then
      y + z + ... + (length of group array minus 1 (for single space between each group) )
    take known space, compare to line length, amount that the Length of space is greater than known fillers is Lacking (for what the groups/known fillers Lack)
    place groups on line as if they started at 0, but do not place marks in the first l spaces

    figure out how many spaces there are, length of spaces (spaces are open areas, any X/wall will create more spaces)
      ie, split on x
    figure out what groups could be in what spaces
    assign known groups to their space
    re-run the "lacks" algorithm to fill in anything known in this space
  */
  return picture;
}

// run this when you have one open range of space and some groups known to be in it
function placeInRange (clueArr, openRange) {
  // the known filled + the spaces between them
  var known = clueArr.reduce((soFar, now) => soFar + now) + clueArr.length - 1;
  var lacks = openRange - known;
  var line = '';

  // say lack is 3, we have clues [2,4]. safeToFill of those two blocks: 0, 1; wiggleRoom = 2, 3
  clueArr.forEach( (clue, idx) => {
    var safeToFill = clue - lacks;
    var wiggleRoom = Math.min(clue, lacks);

    // fill in unknowns in the start of the line places that could have fill or could not
    while (wiggleRoom) {
      line += indicateUnknown;
      --wiggleRoom;
    }

    // fill in knownFill in places that will have fill, no matter how much sliding around happens
    while (safeToFill > 0) {
      line += knownFill;
      --safeToFill;
    }

    // if there's more to come in clues array, add a space
    line += (clueArr[idx + 1]) ? indicateUnknown : '';
  });

  return line.padEnd(openRange, indicateUnknown);
}

// tests for placeInRange
console.log('tests for placeInRange: [5], 5, expect "HHHHH"', placeInRange([5],5));
console.log('tests for placeInRange: [2,4], 10, expect "      H   "', placeInRange([2,4],10));


// ///////////////// helper functions ///////////////// //

// biasTowardsFilled is, like .1 if you want 60% of the spaces to be filled in
// ...the more empty a nonogram is, the harder it is to solve
function getRandomFiller (biasTowardsFilled) {
  return ( Math.round(Math.random() + biasTowardsFilled) === 0 ) ? knownWall : knownFill;
}


// ///////////////// API ///////////////// //

// Eventually, nonogram not clientside
// coordinates are x, y, so [col, row]
function checkGuess (character, x, y, nonogram = given) {
  var rows = nonogram.split('\n');
  return character === rows[y][x];
};

console.log('test: top left is wall?',checkGuess(knownWall, 0, 0, given));
console.log('test: center is wall?',checkGuess(knownWall, 2, 2, given));
