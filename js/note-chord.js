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

const majorChordIndex = [0, 2, 3];
const minorChordsIndex = [0, 1, 3];
