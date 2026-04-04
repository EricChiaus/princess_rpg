# Sound Effects Guide

## Required Audio Files

Download these royalty-free sound effects and place them in this directory:

### 1. Background Music
- **File:** `background-music.mp3` OR `background-music.wav`
- **Type:** Princessy, magical, ambient music
- **Length:** 2-3 minutes (will loop automatically)
- **Suggestions:** 
  - "Fantasy Adventure" music
  - "Magical Forest" ambient
  - "Princess Theme" instrumental

### 2. Battle Win
- **File:** `battle-win.mp3` OR `battle-win.wav`
- **Type:** Victory sound (2-3 seconds)
- **Suggestions:**
  - Success chime
  - Magic win sound
  - Positive fanfare

### 3. Battle Lose
- **File:** `battle-lose.mp3` OR `battle-lose.wav`
- **Type:** Defeat sound (2-3 seconds)
- **Suggestions:**
  - Sad trombone
  - Wrong answer buzz
  - Defeat sound effect

### 4. Game Over
- **File:** `game-over.mp3` OR `game-over.wav`
- **Type:** Game over music/sound (3-5 seconds)
- **Suggestions:**
  - Game over theme
  - Sad melody
  - Defeat fanfare

### 5. Castle Reach
- **File:** `castle-reach.mp3` OR `castle-reach.wav`
- **Type:** Victory/achievement sound (2-4 seconds)
- **Suggestions:**
  - Victory fanfare
  - Castle bells
  - Triumph sound

## Audio Format Support

✅ **MP3 files** - Preferred, smaller file size
✅ **WAV files** - Also supported, higher quality
🔄 **Automatic fallback** - Tries MP3 first, then WAV

## Recommended Sources

### Free Royalty-Free Sound Effects:

1. **Freesound.org**
   - Large community database
   - Filter by license (CC0, CC BY)
   - Search terms: "magic", "fantasy", "victory", "game"

2. **Pixabay Sound Effects**
   - Free for commercial use
   - No attribution required
   - High quality selection

3. **Zapsplat**
   - Free with attribution
   - Premium sounds available
   - Game-focused library

4. **OpenGameArt.org**
   - Game-specific assets
   - Community contributed
   - Various licenses (check each)

## Download Tips

- **File Format:** MP3 (preferred) or WAV (both supported)
- **Quality:** 128kbps or higher for MP3
- **Length:** Keep sounds short and loopable for music
- **Volume:** Moderate levels (game will adjust)
- **License:** Ensure royalty-free for commercial use

## File Naming

Make sure files are named exactly (either MP3 or WAV extension):
- `background-music.mp3` or `background-music.wav`
- `battle-win.mp3` or `battle-win.wav`
- `battle-lose.mp3` or `battle-lose.wav`
- `game-over.mp3` or `game-over.wav`
- `castle-reach.mp3` or `castle-reach.wav`

## After Downloading

Once all files are in place:
1. Restart the development server
2. The game will automatically load and play the sounds
3. Background music will loop continuously during gameplay
4. Sound effects will trigger on appropriate actions

## Testing

Test each sound by:
1. Starting the game (background music should start)
2. Answering correctly (battle-win)
3. Answering incorrectly (battle-lose)
4. Losing all lives (game-over)
5. Clicking reachable castle (castle-reach)
6. Background music should play continuously and loop

## Background Music Looping

The background music will:
- ✅ Loop automatically using HTML5 audio loop attribute
- ✅ Have fallback manual looping for files that don't support loop
- ✅ Restart immediately when it ends
- ✅ Play at 30% volume (adjustable in code)
- ✅ Start when user clicks "Start Game" button

## Sound Effects

- **No battle start sound** - Removed for faster gameplay
- **Win/lose sounds only** - Play based on answer correctness
- **Immediate feedback** - Sounds play right when answer is submitted
