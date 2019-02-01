# nonogram

I've been playing [Two Eyes](https://play.google.com/store/apps/details?id=com.gamefox.twoeyes&hl=en_US), a phone game from Gamefox of Korea, in which you solve nonograms to reveal more of the story of a pair of lovers who are reincarnated as a wolf and a deer.  Nonograms are sort of a logic puzzle (though I wonder if it's actually a puzzle, or if it's just a set of instructions to notice and follow) where numbers on the edge of a grid tell the groups of filled-in cells in that row or column, so a person can figure out the layout of the whole game board (which possibly reveals a picture).

This seemed very familiar from JavaScript toy problems, and I thought it might be fun/possible to make a program that would create nonograms and test them to see if they had unique solutions. Fortunately I Googled first to learn about prior work, and it turns out that [solving nonograms is a NP-complete problem](https://en.wikipedia.org/wiki/Nonogram#Nonograms_in_computing).

So for now I'm going to make a program that creates nonograms and then tries within some limit to solve them.