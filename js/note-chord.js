const notes = {
  major: {
    A: ['A', 'B', 'C#', 'E', 'F#'],
    B: ['B', 'C#', 'D#', 'F#', 'G#'],
    C: ['C', 'D', 'E', 'G', 'A'],
    D: ['D', 'E', 'F#', 'A', 'B'],
    E: ['E', 'F#', 'G#', 'B', 'C#'],
    F: ['F', 'G', 'A', 'C', 'D'],
    G: ['G', 'A', 'B', 'D', 'E']
  },

  minor: {
    A: ['A', 'C', 'D', 'E', 'G'],
    B: ['B', 'D', 'E', 'F#', 'A'],
    C: ['C', 'Eb', 'F', 'G', 'Bb'],
    D: ['D', 'F', 'G', 'A', 'C'],
    E: ['E', 'G', 'A', 'B', 'D'],
    F: ['F', 'Ab', 'Bb', 'C', 'Eb'],
    G: ['G', 'Bb', 'C', 'D', 'F']
  }
}


// TODO chords, doesnt matter which combination becasue they all sound good
const chords = {
  0: [0, 1, 2],
  1: [0, 1, 3],
  2: [0, 1, 4],
  3: [0, 2, 3],
  4: [0, 2, 4],
  5: [0, 3, 4],
  6: [1, 2, 3],
  7: [1, 2, 4],
  8: [1, 3, 4],
  9: [2, 3, 4]
}
// const majorChordIndex = [0, 2, 3];
// const minorChordsIndex = [0, 1, 3];
