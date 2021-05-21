package controllers;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import jdk.nashorn.internal.runtime.arrays.ArrayIndex;

import java.lang.Math;

import java.awt.*;
import java.lang.reflect.Array;

public class ProteinAlignerGUIController {

    @FXML
    private Button prevPage;

    @FXML
    private Button alignSequences;

    @FXML
    private TextField sequenceOne;

    @FXML
    private TextField sequenceTwo;

    @FXML
    private TextArea alignmentArea;

    @FXML
    /**
     * Documentation: This function is responsible for loading
     * the original converter window. Because it's located on the
     * "next" page of the tool, it acts as a previous page button
     * for the user to swap back to the start window.
     */
    private void prevPageButtonPress(javafx.event.ActionEvent event) throws Exception {
        // Load the protein aligner window
        Parent root = FXMLLoader.load(getClass().getClassLoader().getResource("views/TranslatorGUI.fxml"));
        Scene scene = new Scene(root, 600, 400);
        Stage window = (Stage) ((Node) event.getSource()).getScene().getWindow();
        window.setTitle("Codon Converter");
        window.setScene(scene);
        window.show();
    }

    @FXML
    /**
     * Documentation: This function is responsible for taking
     * the two user entered protein sequences, running an
     * alignment algorithm from the SequenceAlignment class,
     * showing the alignment in a separate window, and showing
     * the matches and mismatches between the two sequences.
     */
    private void alignSequencesButtonPress(javafx.event.ActionEvent event) throws Exception {
        //Use Needleman Wunsch Algo here to get a score of the sequences

        String seq_1 = sequenceOne.getText().toString();
        String seq_2 = sequenceTwo.getText().toString();

        // initialization step 0: create zero array.
        int[][] array = new int[seq_2.length() + 1][seq_1.length() + 1]; // The second sequence is columnar, while the first sequence is horizontal.

        // intialization step 1: top row must have values 0,-1,-2,...
        for (int i = 1; i < seq_1.length() + 1; i++) {
            array[0][i] = -1 * i;
        }
        String middleLine = "";
        int minLength = Math.min(seq_1.length(), seq_2.length());
        for (int i = 0; i < minLength; i++) {
            if (sequenceOne.getText().substring(i, i + 1).toUpperCase().equals(sequenceTwo.getText().substring(i, i + 1).toUpperCase())) {
                middleLine += "|";
                //middleLine += sequenceOne.getText().substring(i,i+1);
            }
        }
            // initialization step 2: leftmost column must have values 0,-1,-2,...
            for (int j = 1; j < seq_2.length() + 1; j++) {
                array[j][0] = -1 * j;
            }

            // initialization step 3: compute scores and fill in the remaining entries
            for (int k = 1; k < seq_2.length() + 1; k++) {
                for (int l = 1; l < seq_1.length() + 1; l++) {
                    int top = array[k - 1][l];
                    int left = array[k][l - 1];
                    int top_left = array[k - 1][l - 1];

                    int mismatch = (seq_1.charAt(l - 1) == seq_2.charAt(k - 1)) ? 1 : -1; // mismatch score in this instance
                    int gap_score = -1; // default gap score

                    array[k][l] = Math.max(Math.max(top + gap_score, left + gap_score), top_left + mismatch);
                }
            }

            int m = seq_2.length();
            int n = seq_1.length();

            StringBuilder alignment = new StringBuilder();
            StringBuilder alignment_2 = new StringBuilder();

            while (true) {
                int curr_cell = array[m][n];
                int top;
                int top_left;
                int left;

                try {
                    top = array[m - 1][n];
                } catch (ArrayIndexOutOfBoundsException e) {
                    top = Integer.MIN_VALUE;
                }

                try {
                    top_left = array[m - 1][n - 1];
                } catch (ArrayIndexOutOfBoundsException e) {
                    top_left = Integer.MIN_VALUE;
                }

                try {
                    left = array[m][n - 1];
                } catch (ArrayIndexOutOfBoundsException e) {
                    left = Integer.MIN_VALUE;
                }

                int max_score = Math.max(Math.max(top, left), top_left);

                if (top_left == max_score && (m > 0 && n > 0)) {
                    alignment.append(seq_2.charAt(m - 1));
                    alignment_2.append(seq_1.charAt(n - 1));
                    m -= 1;
                    n -= 1;
                } else if (left == max_score && n > 0) {
                    alignment.append('-');
                    alignment_2.append(seq_1.charAt(n - 1));
                    // alignment.append(seq_2.charAt(m-1));
                    n -= 1;

                } else if (top == max_score && m > 0) {
                    alignment.append(seq_2.charAt(m - 1));
                    alignment_2.append('-');
                    // alignment.append('-');
                    m -= 1;

                } else {
                    break;
                }
            }

            // reverse the string to get the correct order
            alignment.reverse();
            alignment_2.reverse();

            StringBuilder bridge = new StringBuilder();

            // adding the bridge (e.g. '|| |  |||') that shows the similarities between the two strands
            for (int i = 0; i < alignment_2.length(); i++) {
                if (alignment_2.charAt(i) == alignment.charAt(i)) {
                    bridge.append("|");
                } else {
                    bridge.append(" ");
                }
            }

            // setting the text field
            alignmentArea.setText(alignment_2 + "\n" + bridge.toString() + "\n" + alignment.toString());

            // backtracking step
        }

        public void initialize ()
        {
            sequenceOne.setEditable(true);
            sequenceTwo.setEditable(true);
            alignmentArea.setEditable(false);
        }

    }


