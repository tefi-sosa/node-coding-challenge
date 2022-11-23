/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search (grid, wordlist) {

  grid.forEach((row) => {
    row = row.splice(-1, 1)
  })
  // console.log(grid)

  let newList = []
  wordlist.forEach((word) => {
    word = word.trimEnd().toUpperCase()
    newList.push(word)
  })
  // console.log(newList)

  let gridHeight = grid.length
  let gridWidth = grid[0].length
  let results = []

  newList.forEach((word) => {

    const isWordFound = (grid, word) => {

      for (let y = 0; y < gridHeight; y++) {
          for (let x = 0; x < gridWidth; x++) {

              if (grid[y][x] === word.charAt(0) && searchHelper(grid, y, x, 0, word)) {
                  return true
              }
          }
      }
      return false
    }
  
    const searchHelper = (grid, y, x, pointer, word) => {

      if (pointer === word.length) return true

      if (y < 0 || y > grid.length-1 ||
          x < 0 || x > grid[y].length-1 ||
          grid[y][x] !== word.charAt(pointer)
      ) {
          return false
      }

      const gridCopy = grid[y][x]
      grid[y][x] = " "
      
      let searchDirection = searchHelper(grid, y + 1, x, pointer + 1, word) || // vertical up
                  searchHelper(grid, y - 1, x, pointer + 1, word) || // vertical down
                  searchHelper(grid, y, x + 1, pointer + 1, word) || // horizontal right
                  searchHelper(grid, y, x - 1, pointer + 1, word) || // horizontal left
                  searchHelper(grid, y - 1, x - 1, pointer + 1, word) || // diagonal up left
                  searchHelper(grid, y + 1, x + 1, pointer + 1, word) || // diagonal down right
                  searchHelper(grid, y + 1, x - 1, pointer + 1, word) || // diagonal down left
                  searchHelper(grid, y - 1, x + 1, pointer + 1, word) // diagonal up right
      
      grid[y][x] = gridCopy
      
      return searchDirection
    }
    
    if (isWordFound(grid, word)) {
      results.push(word)
    } 
  })
  
  return results
}
