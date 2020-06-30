package controllers;// package src;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.text.Text;
import javafx.scene.text.TextFlow;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.*;
import java.awt.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import static java.awt.Color.*;

public class TranslatorGUIController{

    @FXML
    private Label dnaLabel;
    @FXML
    private Label rnaLabel;
    @FXML
    private Label proteinLabel;

    @FXML
    private TextArea dnaTextArea;
    @FXML
    private TextFlow rnaTextFlow;
    @FXML
    private TextFlow proteinTextFlow;

    public void initialize()
    {
        dnaTextArea.setEditable(true);
        rnaTextFlow.setVisible(true);
        proteinTextFlow.setVisible(true);
    }

    @FXML
    private Button convertButton;

    @FXML
    private Button resetButton;

    @FXML
    private Button nextPage;

    @FXML
    private Button uploadFastaButton;

    @FXML
    private Label proteinAlignment;

    @FXML
    /**
     * Description: This function is responsible for populating the
     * RNA and Protein sequence fields from the user entered DNA
     * sequence box. The convert button takes the DNA sequence,
     * transcribes it to RNA (each codon is colored to a unique
     * color), and then the Protein sequence is translated from
     * the mRNA codons. Each amino acid shares the same unique color
     * as its corresponding codons.
     */
    private void convertButtonPress(javafx.event.ActionEvent event) throws Exception {
        //Extract DNA text
        //Populate RNA and Protein fields
        Translator t = new Translator();
        String rna = t.dnaToRna(dnaTextArea.getText());
        String codons = t.rnaToCodons(rna);
        String rnaSnip;

        for (int i=0;i+3<=rna.length();i+=3)
        {
            rnaSnip = rna.substring(i,i+3);
            Text rnaText = new Text(rnaSnip);
            if(t.getCodonChart().get(rnaSnip) == null){
                rnaText.setFill(javafx.scene.paint.Color.BLACK);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("D"))
            {
                rnaText.setFill(javafx.scene.paint.Color.RED);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("E"))
            {
                rnaText.setFill(javafx.scene.paint.Color.MAGENTA);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("C"))
            {
                rnaText.setFill(javafx.scene.paint.Color.YELLOW);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("M"))
            {
                rnaText.setFill(javafx.scene.paint.Color.GOLD);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("R"))
            {
                rnaText.setFill(javafx.scene.paint.Color.ROYALBLUE);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("K"))
            {
                rnaText.setFill(javafx.scene.paint.Color.SKYBLUE);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("S"))
            {
                rnaText.setFill(javafx.scene.paint.Color.ORANGE);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("T"))
            {
                rnaText.setFill(javafx.scene.paint.Color.ORANGERED);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("F"))
            {
                rnaText.setFill(javafx.scene.paint.Color.MIDNIGHTBLUE);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("Y"))
            {
                rnaText.setFill(javafx.scene.paint.Color.DEEPSKYBLUE);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("N"))
            {
                rnaText.setFill(javafx.scene.paint.Color.CYAN);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("Q"))
            {
                rnaText.setFill(javafx.scene.paint.Color.AQUAMARINE);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("G"))
            {
                rnaText.setFill(javafx.scene.paint.Color.DARKGRAY);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("I"))
            {
                rnaText.setFill(javafx.scene.paint.Color.LAWNGREEN);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("L"))
            {
                rnaText.setFill(javafx.scene.paint.Color.FORESTGREEN);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("V"))
            {
                rnaText.setFill(javafx.scene.paint.Color.OLIVE);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("A"))
            {
                rnaText.setFill(javafx.scene.paint.Color.DARKKHAKI);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("W"))
            {
                rnaText.setFill(javafx.scene.paint.Color.HOTPINK);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("H"))
            {
                rnaText.setFill(javafx.scene.paint.Color.SALMON);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else if(t.getCodonChart().get(rnaSnip).equals("P"))
            {
                rnaText.setFill(javafx.scene.paint.Color.PLUM);
                rnaTextFlow.getChildren().add(rnaText);
            }
            else
            {
                rnaText.setFill(javafx.scene.paint.Color.ROSYBROWN);
                rnaTextFlow.getChildren().add(rnaText);
            }
        }

        String aa;
        for(int j = 0; j<codons.length(); j++){
            aa = codons.substring(j, j+1);
            Text proteinText = new Text(aa);
            switch(aa)
            {
                case "D":
                     proteinText.setFill(javafx.scene.paint.Color.RED);
                     proteinTextFlow.getChildren().add(proteinText);
                     break;
                case "E":
                    proteinText.setFill(javafx.scene.paint.Color.MAGENTA);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "C":
                    proteinText.setFill(javafx.scene.paint.Color.YELLOW);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "M":
                    proteinText.setFill(javafx.scene.paint.Color.GOLD);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "R":
                    proteinText.setFill(javafx.scene.paint.Color.ROYALBLUE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "K":
                    proteinText.setFill(javafx.scene.paint.Color.SKYBLUE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "S":
                    proteinText.setFill(javafx.scene.paint.Color.ORANGE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "T":
                    proteinText.setFill(javafx.scene.paint.Color.ORANGERED);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "F":
                    proteinText.setFill(javafx.scene.paint.Color.MIDNIGHTBLUE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "Y":
                    proteinText.setFill(javafx.scene.paint.Color.DEEPSKYBLUE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "N":
                    proteinText.setFill(javafx.scene.paint.Color.CYAN);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "Q":
                    proteinText.setFill(javafx.scene.paint.Color.AQUAMARINE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "G":
                    proteinText.setFill(javafx.scene.paint.Color.DARKGRAY);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "I":
                    proteinText.setFill(javafx.scene.paint.Color.LAWNGREEN);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "L":
                    proteinText.setFill(javafx.scene.paint.Color.FORESTGREEN);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "V":
                    proteinText.setFill(javafx.scene.paint.Color.OLIVE);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "A":
                    proteinText.setFill(javafx.scene.paint.Color.DARKKHAKI);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "W":
                    proteinText.setFill(javafx.scene.paint.Color.HOTPINK);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "H":
                    proteinText.setFill(javafx.scene.paint.Color.SALMON);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                case "P":
                    proteinText.setFill(javafx.scene.paint.Color.PLUM);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
                default:
                    proteinText.setFill(javafx.scene.paint.Color.ROSYBROWN);
                    proteinTextFlow.getChildren().add(proteinText);
                    break;
            }
        }

    }

    @FXML
    /**
     * Description: This function is used to operate the reset
     * button on the DNA-RNA-Protein converter window. When this
     * button is clicked, all three designated windows (one for
     * DNA, RNA, and Protein) are cleared and reset to blank
     * states.
     */
    private void resetButtonPress(javafx.event.ActionEvent event) throws Exception {
        // Reset TextArea fields
        dnaTextArea.setText("");
        rnaTextFlow.getChildren().clear();
        proteinTextFlow.getChildren().clear();
    }

    @FXML
    /**
     * Description: This function is used to facilitate the
     * transition between the initial javafx pane (converter)
     * to the adjacent pane responsible for the protein
     * alignment window. It loads in the ProteinAlignerGUI.fxml
     * file and loads that window for the user to see.
     */
    private void nextPageButtonPress(javafx.event.ActionEvent event) throws Exception {
        // Load the protein aligner window
        Parent root = FXMLLoader.load(getClass().getClassLoader().getResource("views/ProteinAlignerGUI.fxml"));
        Scene scene = new Scene(root, 600, 400);
        Stage window = (Stage)((Node)event.getSource()).getScene().getWindow();
        window.setTitle("Protein Aligner");
        window.setScene(scene);
        window.show();
    }

    @FXML
    /**
     * Description: This function is used to allow the user
     * to upload a DNA sequence in the form of a .fasta file
     * type. The .fasta file contents can then be used to
     * convert to RNA and protein sequences.
     */
    private void uploadFastaButtonPress(javafx.event.ActionEvent event) throws Exception {
        Stage stage = new Stage();
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Select FASTA file");

        try
        {
            boolean exists = true;
            String fasta_path = fileChooser.showOpenDialog(stage).getAbsolutePath().toString();
            if(fasta_path == null)
            {
                exists = false;
            }
            if(exists) {
                File f = new File(fasta_path);

                BufferedReader bufferedReader = new BufferedReader(new FileReader(fasta_path));
                Text line = new Text(bufferedReader.readLine());
                proteinTextFlow.getChildren().add(line);

                bufferedReader.close();
            }
        }
        catch(FileNotFoundException fnfe)
        {

        }
        catch(IOException ioex)
        {

        }

    }
}
