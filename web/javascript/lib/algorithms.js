const {NWaligner} = require('seqalign');
const needlemanWunsch = NWaligner();

// Make this character a single character that is not
// used by any other amino acid. It makes the conversion
// logic easier by making every amino acid a single character.
const STOP_CHARACTER = '%';

const isValidDNA = dnaStr => {
  let invalidCharacters = new Set();
  for (const char of dnaStr)
  {
    if (char.match(/[^ACGTacgt\s_\-]/))
    {
      invalidCharacters.add(char);
    }
  }
  if (invalidCharacters.size !== 0)
  {
    const num = invalidCharacters.size;
    let errorStr = `The following character${num === 1 ? ' is' : 's are'} invalid in a DNA sequence: `;
    const invalidCharacterArray = Array.from(invalidCharacters);
    for (let i = 0; i < invalidCharacterArray.length; i++)
    {
      errorStr += invalidCharacterArray[i];
      if (i < invalidCharacterArray.length - 1)
      {
        if (invalidCharacterArray.length >= 3 && i === invalidCharacterArray.length - 2)
        {
          errorStr += ', and ';
        }
        else if (invalidCharacterArray.length >= 3)
        {
          errorStr += ', ';
        }
        else if (invalidCharacterArray.length === 2)
        {
          errorStr += ' and ';
        }
      }
    }
    return {
      valid: false,
      error: errorStr
    };
  }
  return {
    valid: true
  };
};

const isValidProtein = proteinStr => {
  let invalidCharacters = new Set();
  if (proteinStr.includes(STOP_CHARACTER))
  {
    invalidCharacters.add(STOP_CHARACTER);
  }
  proteinStr = proteinStr.replace(/(stop)/g, STOP_CHARACTER);
  const PROTEIN_STR_REGEX = `[^FLSY${STOP_CHARACTER}CWPHQRIMTNKVADEGflsycwphqrimtnkvadeg\\s_\\-]`;
  for (const char of proteinStr)
  {
    if (char.match(PROTEIN_STR_REGEX))
    {
      invalidCharacters.add(char);
    }
  }
  if (invalidCharacters.size !== 0)
  {
    const num = invalidCharacters.size;
    let errorStr = `The following character${num === 1 ? ' is' : 's are'} invalid in a protein sequence: `;
    const invalidCharacterArray = Array.from(invalidCharacters);
    for (let i = 0; i < invalidCharacterArray.length; i++)
    {
      errorStr += invalidCharacterArray[i];
      if (i < invalidCharacterArray.length - 1)
      {
        if (invalidCharacterArray.length >= 3 && i === invalidCharacterArray.length - 2)
        {
          errorStr += ', and ';
        }
        else if (invalidCharacterArray.length >= 3)
        {
          errorStr += ', ';
        }
        else if (invalidCharacterArray.length === 2)
        {
          errorStr += ' and ';
        }
      }
    }
    return {
      valid: false,
      error: errorStr
    };
  }
  return {
    valid: true
  };
};

const codonToAminoAcid = (nucleotide1, nucleotide2, nucleotide3) => {
  if (nucleotide1 === 'U' && nucleotide2 === 'U' && nucleotide3 === 'A') return 'L';
  if (nucleotide1 === 'U' && nucleotide2 === 'U' && nucleotide3 === 'G') return 'L';
  if (nucleotide1 === 'U' && nucleotide2 === 'U' && nucleotide3 === 'U') return 'F';
  if (nucleotide1 === 'U' && nucleotide2 === 'U' && nucleotide3 === 'C') return 'F';
  if (nucleotide1 === 'U' && nucleotide2 === 'C' && nucleotide3 === 'U') return 'S';
  if (nucleotide1 === 'U' && nucleotide2 === 'C' && nucleotide3 === 'C') return 'S';
  if (nucleotide1 === 'U' && nucleotide2 === 'C' && nucleotide3 === 'A') return 'S';
  if (nucleotide1 === 'U' && nucleotide2 === 'C' && nucleotide3 === 'G') return 'S';
  if (nucleotide1 === 'U' && nucleotide2 === 'A' && nucleotide3 === 'U') return 'Y';
  if (nucleotide1 === 'U' && nucleotide2 === 'A' && nucleotide3 === 'C') return 'Y';
  if (nucleotide1 === 'U' && nucleotide2 === 'A' && nucleotide3 === 'A') return ' stop ';
  if (nucleotide1 === 'U' && nucleotide2 === 'A' && nucleotide3 === 'G') return ' stop ';
  if (nucleotide1 === 'U' && nucleotide2 === 'G' && nucleotide3 === 'U') return 'C';
  if (nucleotide1 === 'U' && nucleotide2 === 'G' && nucleotide3 === 'C') return 'C';
  if (nucleotide1 === 'U' && nucleotide2 === 'G' && nucleotide3 === 'A') return ' stop ';
  if (nucleotide1 === 'U' && nucleotide2 === 'G' && nucleotide3 === 'G') return 'W';
  if (nucleotide1 === 'C' && nucleotide2 === 'U' && nucleotide3 === 'U') return 'L';
  if (nucleotide1 === 'C' && nucleotide2 === 'U' && nucleotide3 === 'C') return 'L';
  if (nucleotide1 === 'C' && nucleotide2 === 'U' && nucleotide3 === 'G') return 'L';
  if (nucleotide1 === 'C' && nucleotide2 === 'U' && nucleotide3 === 'A') return 'L';
  if (nucleotide1 === 'C' && nucleotide2 === 'C' && nucleotide3 === 'U') return 'P';
  if (nucleotide1 === 'C' && nucleotide2 === 'C' && nucleotide3 === 'C') return 'P';
  if (nucleotide1 === 'C' && nucleotide2 === 'C' && nucleotide3 === 'G') return 'P';
  if (nucleotide1 === 'C' && nucleotide2 === 'C' && nucleotide3 === 'A') return 'P';
  if (nucleotide1 === 'C' && nucleotide2 === 'A' && nucleotide3 === 'U') return 'H';
  if (nucleotide1 === 'C' && nucleotide2 === 'A' && nucleotide3 === 'C') return 'H';
  if (nucleotide1 === 'C' && nucleotide2 === 'A' && nucleotide3 === 'A') return 'Q';
  if (nucleotide1 === 'C' && nucleotide2 === 'A' && nucleotide3 === 'G') return 'Q';
  if (nucleotide1 === 'C' && nucleotide2 === 'G' && nucleotide3 === 'U') return 'R';
  if (nucleotide1 === 'C' && nucleotide2 === 'G' && nucleotide3 === 'C') return 'R';
  if (nucleotide1 === 'C' && nucleotide2 === 'G' && nucleotide3 === 'A') return 'R';
  if (nucleotide1 === 'C' && nucleotide2 === 'G' && nucleotide3 === 'G') return 'R';
  if (nucleotide1 === 'A' && nucleotide2 === 'U' && nucleotide3 === 'U') return 'I';
  if (nucleotide1 === 'A' && nucleotide2 === 'U' && nucleotide3 === 'C') return 'I';
  if (nucleotide1 === 'A' && nucleotide2 === 'U' && nucleotide3 === 'A') return 'I';
  if (nucleotide1 === 'A' && nucleotide2 === 'U' && nucleotide3 === 'G') return 'M'; // start
  if (nucleotide1 === 'A' && nucleotide2 === 'C' && nucleotide3 === 'U') return 'T';
  if (nucleotide1 === 'A' && nucleotide2 === 'C' && nucleotide3 === 'C') return 'T';
  if (nucleotide1 === 'A' && nucleotide2 === 'C' && nucleotide3 === 'A') return 'T';
  if (nucleotide1 === 'A' && nucleotide2 === 'C' && nucleotide3 === 'G') return 'T';
  if (nucleotide1 === 'A' && nucleotide2 === 'A' && nucleotide3 === 'U') return 'N';
  if (nucleotide1 === 'A' && nucleotide2 === 'A' && nucleotide3 === 'C') return 'N';
  if (nucleotide1 === 'A' && nucleotide2 === 'A' && nucleotide3 === 'A') return 'K';
  if (nucleotide1 === 'A' && nucleotide2 === 'A' && nucleotide3 === 'G') return 'K';
  if (nucleotide1 === 'A' && nucleotide2 === 'G' && nucleotide3 === 'U') return 'S';
  if (nucleotide1 === 'A' && nucleotide2 === 'G' && nucleotide3 === 'C') return 'S';
  if (nucleotide1 === 'A' && nucleotide2 === 'G' && nucleotide3 === 'A') return 'R';
  if (nucleotide1 === 'A' && nucleotide2 === 'G' && nucleotide3 === 'G') return 'R';
  if (nucleotide1 === 'G' && nucleotide2 === 'U' && nucleotide3 === 'U') return 'V';
  if (nucleotide1 === 'G' && nucleotide2 === 'U' && nucleotide3 === 'A') return 'V';
  if (nucleotide1 === 'G' && nucleotide2 === 'U' && nucleotide3 === 'G') return 'V';
  if (nucleotide1 === 'G' && nucleotide2 === 'U' && nucleotide3 === 'C') return 'V';
  if (nucleotide1 === 'G' && nucleotide2 === 'C' && nucleotide3 === 'U') return 'A';
  if (nucleotide1 === 'G' && nucleotide2 === 'C' && nucleotide3 === 'C') return 'A';
  if (nucleotide1 === 'G' && nucleotide2 === 'C' && nucleotide3 === 'A') return 'A';
  if (nucleotide1 === 'G' && nucleotide2 === 'C' && nucleotide3 === 'G') return 'A';
  if (nucleotide1 === 'G' && nucleotide2 === 'A' && nucleotide3 === 'U') return 'D';
  if (nucleotide1 === 'G' && nucleotide2 === 'A' && nucleotide3 === 'C') return 'D';
  if (nucleotide1 === 'G' && nucleotide2 === 'A' && nucleotide3 === 'A') return 'E';
  if (nucleotide1 === 'G' && nucleotide2 === 'A' && nucleotide3 === 'G') return 'E';
  if (nucleotide1 === 'G' && nucleotide2 === 'G' && nucleotide3 === 'U') return 'G';
  if (nucleotide1 === 'G' && nucleotide2 === 'G' && nucleotide3 === 'C') return 'G';
  if (nucleotide1 === 'G' && nucleotide2 === 'G' && nucleotide3 === 'A') return 'G';
  if (nucleotide1 === 'G' && nucleotide2 === 'G' && nucleotide3 === 'G') return 'G';
  return '-';
};

const aminoAcidToMrna = aminoAcid => {
  if (aminoAcid === 'F') return 'UUU';
  if (aminoAcid === 'L') return 'UUA';
  if (aminoAcid === 'S') return 'UCA';
  if (aminoAcid === 'Y') return 'UAC';
  if (aminoAcid === STOP_CHARACTER) return 'UAG';
  if (aminoAcid === 'C') return 'UGU';
  if (aminoAcid === 'W') return 'UGG';
  if (aminoAcid === 'P') return 'CCC';
  if (aminoAcid === 'H') return 'CAU';
  if (aminoAcid === 'Q') return 'CAA';
  if (aminoAcid === 'R') return 'CGU';
  if (aminoAcid === 'I') return 'AUC';
  if (aminoAcid === 'M') return 'AUG';
  if (aminoAcid === 'T') return 'ACA';
  if (aminoAcid === 'N') return 'AAU';
  if (aminoAcid === 'K') return 'AAA';
  if (aminoAcid === 'V') return 'GUG';
  if (aminoAcid === 'A') return 'GCC';
  if (aminoAcid === 'D') return 'GAU';
  if (aminoAcid === 'E') return 'GAG';
  if (aminoAcid === 'G') return 'GGU';
  return '-';
};

module.exports = {
  dnaToProteins: dnaStr => {
    const validity = isValidDNA(dnaStr);
    if (!validity.valid)
    {
      return {
        error: validity.error
      };
    }

    dnaStr = dnaStr.replace(/\s+/g, '').toUpperCase();
    let mrnaStr = '';
    for (let i = 0; i < dnaStr.length; i++)
    {
      let char = dnaStr.charAt(i);
      if (char === 'T')
      {
        char = 'U';
      }
      mrnaStr += char;
      if ((i + 1) % 3 === 0)
      {
        mrnaStr += ' ';
      }
    }
    mrnaStr = mrnaStr.trim();
    let proteinStr = '';
    for (let i = 0; i < mrnaStr.length; i += 4)
    {
      const nucleotide1 = mrnaStr.charAt(i);
      const nucleotide2 = mrnaStr.charAt(i + 1);
      const nucleotide3 = mrnaStr.charAt(i + 2);
      proteinStr += codonToAminoAcid(nucleotide1, nucleotide2, nucleotide3);
    }
    proteinStr = proteinStr.trim();
    return {
      mrnaStr: mrnaStr,
      proteinStr: proteinStr
    };
  },

  proteinsToDna: proteinStr => {
    const validity = isValidProtein(proteinStr);
    if (!validity.valid)
    {
      return {
        error: validity.error
      };
    }

    proteinStr = proteinStr.replace(/(stop)/g, STOP_CHARACTER).replace(/\s+/g, '').toUpperCase();
    let mrnaStr = '';
    for (let i = 0; i < proteinStr.length; i++)
    {
      let aminoAcid = proteinStr.charAt(i);
      mrnaStr += aminoAcidToMrna(aminoAcid) + ' ';
    }
    mrnaStr = mrnaStr.trim();
    let dnaStr = '';
    for (let i = 0; i < mrnaStr.length; i++)
    {
      let nucleotide = mrnaStr.charAt(i);
      if (nucleotide === 'U')
      {
        nucleotide = 'T';
      }
      dnaStr += nucleotide;
    }
    dnaStr = dnaStr.trim();
    return {
      dnaStr: dnaStr,
      mrnaStr: mrnaStr
    };
  },

  // https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/string/levenshtein-distance/levenshteinDistance.js
  editDistance: (dnaStr1, dnaStr2) => {
    const validity = isValidDNA(dnaStr1 + dnaStr2);
    if (!validity.valid)
    {
      return {
        error: validity.error
      };
    }

    dnaStr1 = dnaStr1.replace(/_/g, '-').replace(/\s+/g, '').toUpperCase();
    dnaStr2 = dnaStr2.replace(/_/g, '-').replace(/\s+/g, '').toUpperCase();

    // Create an empty edit distance matrix for all possible modifications of
    // substrings of dnaStr1 to substrings of dnaStr2.
    const distanceMatrix = Array(dnaStr2.length + 1).fill(null).map(() => Array(dnaStr1.length + 1).fill(null));
    // Fill in the first row of the matrix.
    // If this is first row then transform empty string to dnaStr1.
    // In this case, the number of transformations equals the size of the dnaStr1 substring.
    for (let i = 0; i <= dnaStr1.length; i += 1)
    {
      distanceMatrix[0][i] = i;
    }
    // Fill the first column of the matrix.
    // If this is first column then transform empty string to dnaStr2.
    // In this case, the number of transformations equals the size of the dnaStr2 substring.
    for (let j = 0; j <= dnaStr2.length; j += 1)
    {
      distanceMatrix[j][0] = j;
    }
    for (let j = 1; j <= dnaStr2.length; j += 1)
    {
      for (let i = 1; i <= dnaStr1.length; i += 1)
      {
        const indicator = dnaStr1[i - 1] === dnaStr2[j - 1] ? 0 : 1;
        distanceMatrix[j][i] = Math.min(
            distanceMatrix[j][i - 1] + 1, // deletion
            distanceMatrix[j - 1][i] + 1, // insertion
            distanceMatrix[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    return {
      editDistance: distanceMatrix[dnaStr2.length][dnaStr1.length]
    };
  },

  needlemanWunsch: (dnaStr1, dnaStr2) => {
    const validity = isValidDNA(dnaStr1 + dnaStr2);
    if (!validity.valid)
    {
      return {
        error: validity.error
      };
    }

    dnaStr1 = dnaStr1.replace(/_/g, '-').replace(/\s+/g, '').toUpperCase();
    dnaStr2 = dnaStr2.replace(/_/g, '-').replace(/\s+/g, '').toUpperCase();
    return {
      alignments: needlemanWunsch.align(dnaStr1, dnaStr2).alignment
    };
  },

  // Tests for private methods
  __isValidDNA: isValidDNA,
  __isValidProtein: isValidProtein,
  __STOP_CHARACTER: STOP_CHARACTER
};
