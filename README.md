# scrabble
(4) letter tiles in the player’s “hand” are selected randomly from a data structure with the
proper distribution of the letters
- implemented and working, sometimes the blank tile gets thrown in 
• (4) letter tiles can be dragged-and-dropped onto target Scrabble squares
- kinda loose but works
• (4) program identifies which letter tile is dropped onto which Scrabble square
- with scoring!
• (4) board includes bonus squares
- yes, 4 tiles all working
• (4) score is tallied correctly, including consideration of bonus square multipliers
-excitingly working
• (3) any number of words can be played until the player wishes to quit or depletes all tiles
all tiles can be placed, tiles do not refresh but any number of words within the 7 tiles!
• (3) the board is cleared after each round so that a new word can be played
- no rounds :(
• (3) after playing a word, only the number of letter tiles needed to bring the player’s “hand”
back to 7 tiles are selected
• (3) score is kept for multiple words until the user restart a new game
- score is dynamic, So the new game button kinda works, cant get it to delete row of tiles, score is maintained but the tiles get messed up and re-set to the new ones, mismatching letters and scores to theyre respective tiles
• (2) Tiles can only be dragged from the “rack” to Scrabble board. If the user drop them
anywhere else, they will be bounced back to the “rack”.
- nope
• (2) Once the tile is placed on the Scrabble board, it can not be moved.
- nope
• (2) Except for the first letter, all sub-subsequent letters must be placed directly next to or
below another letter with no space. Else, they will bounce back to the “rack”.
- nope
• (2) user can always restart the game.
- if you refresh the page ;)
