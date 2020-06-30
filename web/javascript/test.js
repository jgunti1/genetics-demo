const assert = require('assert');

const path = require('path');
const algorithms = require(path.join(__dirname, 'lib', 'algorithms.js'));

// Run `npm test` to run these unit tests
describe('All Tests', function() {
  // Translation tests
  describe('Translation', function() {
    // DNA to protein tests
    describe('DNA to Proteins', function() {
      it(`should translate to 'T'`, function() {
        assert.deepStrictEqual({
          mrnaStr: 'ACU',
          proteinStr: 'T'
        }, algorithms.dnaToProteins('ACT'));
      });
    });

    // Protein to DNA tests
    describe('Proteins to DNA', function() {
      it(`should translate to 'ACT'`, function() {
        assert.deepStrictEqual({
          dnaStr: 'ACA',
          mrnaStr: 'ACA'
        }, algorithms.proteinsToDna('T'));
      });
      it(`should translate to 'ATG CGT TCA AAA - TAG'`, function() {
        assert.deepStrictEqual({
          dnaStr: 'ATG CGT TCA AAA - TAG',
          mrnaStr: 'AUG CGU UCA AAA - UAG'
        }, algorithms.proteinsToDna('MRSK-stop'));
      });
      it(`should translate to 'ATG GTG GCC GAT GGT CGT TCA - TAG TGG'`, function() {
        assert.deepStrictEqual({
          dnaStr: 'ATG GTG GCC GAT GGT CGT TCA - TAG TGG',
          mrnaStr: 'AUG GUG GCC GAU GGU CGU UCA - UAG UGG'
        }, algorithms.proteinsToDna('mvaDgRS_ stop W'));
      });
      it(`should translate to 'TTT TTA TCA TAC TGT TGG CCC CAT CAA CGT ATC ATG ACA AAT AAA GTG GCC GAT GAG GGT TTT TTA TCA TAC TGT TGG CCC CAT CAA CGT ATC ATG ACA AAT AAA GTG GCC GAT GAG GGT TAG TAG'`, function() {
        assert.deepStrictEqual({
          dnaStr: 'TTT TTA TCA TAC TGT TGG CCC CAT CAA CGT ATC ATG ACA AAT AAA GTG GCC GAT GAG GGT TTT TTA TCA TAC TGT TGG CCC CAT CAA CGT ATC ATG ACA AAT AAA GTG GCC GAT GAG GGT TAG TAG',
          mrnaStr: 'UUU UUA UCA UAC UGU UGG CCC CAU CAA CGU AUC AUG ACA AAU AAA GUG GCC GAU GAG GGU UUU UUA UCA UAC UGU UGG CCC CAU CAA CGU AUC AUG ACA AAU AAA GUG GCC GAU GAG GGU UAG UAG'
        }, algorithms.proteinsToDna('\tFLSYCWPHQRIMTNKVADEG\nflsycwphqrimtnkvadeg stopstop'));
      });
      it(`should fail with an error message`, function() {
        assert.deepStrictEqual({
          error: 'The following characters are invalid in a protein sequence: B, J, O, U, X, Z, b, j, o, u, x, z, 1, 2, 3, 4, 5, 6, 7, 8, 9, and 0'
        }, algorithms.proteinsToDna('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'));
      });
    });
  });

  // Sequence alignment tests
  describe('Sequence Alignment', function() {
    // Edit distance tests (algorithm is open source from GitHub)
    describe('Edit Distance', function() {
      it('should be 2', function() {
        assert.deepStrictEqual(2, algorithms.editDistance('ACT', 'CTA').editDistance);
      });
    });

    // Needleman-Wunsch tests (algorithm is in a third party NPM module)
    describe('Needleman-Wunsch', function() {
      it('should generate an alignment', function() {
        assert.deepStrictEqual('AC-T\nACC-', algorithms.needlemanWunsch('ACT', 'ACC').alignments);
      });
    });
  });

  // Private method tests
  describe('Private Methods', function() {
    // DNA validation tests
    describe('DNA Validation', function() {
      // Valid DNA
      it('should be valid', function() {
        assert.ok(algorithms.__isValidDNA('ACT').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidDNA('AGC GTC TCA ').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidDNA('\n\tGACGACTCATGACTACTACTACGATCAC\nGACTAGCTAGCTGTAC').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidDNA('GAGACTACGTGAC____----AGACTACTACGTAGCT').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidDNA('acgtACGT_-\n\t ').valid);
      });

      // Invalid DNA
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidDNA('ACT XYZ').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidDNA('ACT\n\n\n\nACGTAGCTCGVTGCTAGCTAGTACGTAGCTACGTAGGCTAGTACGTAGTAC').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidDNA('👎').valid);
      });
      it('should not be valid with an error message', function() {
        assert.deepStrictEqual('The following characters are invalid in a DNA sequence: b and B', algorithms.__isValidDNA('abcABC').error);
      });
    });

    // Protein validation tests
    describe('Protein Validation', function() {
      // Valid protein
      it('should be valid', function() {
        assert.ok(algorithms.__isValidProtein('flsycwphqrimtnkvadegFLSYCWPHQRIMTNKVADEG_- \t\n').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidProtein('FLSYCWPHQRIMTNKVADEG stop FLSYCWPHQRIMTNKVADEG').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidProtein(' stop FLSYCWPHQRIMTNKVADEG FLSYCWPHQRIMTNKVADEGFLSYCWPHQRIMTNKVADEGstop').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidProtein('stopstopstop').valid);
      });
      it('should be valid', function() {
        assert.ok(algorithms.__isValidProtein(' stop FLSYCWPHQRIMTNKVADEGstopFLSYCWPHQRIMTNKVADEG stop').valid);
      });

      // Invalid protein
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidProtein('ABCDEFGHIJKLMNOPQRSTUVWXYZ').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidProtein(' sTop FLSYCWPHQRIMTNKVADEG').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidProtein('👎').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidProtein('This string should not be valid').valid);
      });
      it('should not be valid', function() {
        assert.ok(!algorithms.__isValidProtein(`${algorithms.__STOP_CHARACTER}${algorithms.__STOP_CHARACTER} FLSYCWPHQRIMTNKVADEG`).valid);
      });
      it('should not be valid with an error message', function() {
        assert.deepStrictEqual(`The following character is invalid in a protein sequence: ${algorithms.__STOP_CHARACTER}`, algorithms.__isValidProtein(`FLSY${algorithms.__STOP_CHARACTER}CWPHQRIMTNKVADEG`).error);
      });
    });
  });
});
