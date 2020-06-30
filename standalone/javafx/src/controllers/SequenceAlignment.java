package controllers;

import java.util.Vector;

public class SequenceAlignment {

    String seq_0;
    String seq_1;

    /*
    Constructor: default
     */
    public SequenceAlignment()
    {
        seq_0="";
        seq_1="";
    }

    /*
    Constructor: takes two strings representing DNA sequences (e.g. "CCATAA")
     */
    public SequenceAlignment(String a, String b)
    {
        seq_0 = a;
        seq_1 = b;
    }

    /**
     * DOCU: method that takes two string representations
     */
    public static String NeedlemanWunsch(String a, String b) {
        int[][] array = new int[a.length() + 1][a.length() + 1];
        String best_string = b;
        int best_score = -1 * a.length();

        // iterate through all possible alignments
        for (int i = 0; i < a.length(); i++) {
            StringBuilder s = new StringBuilder();

            // second half
            for (int j = i; j < a.length(); j++) {
                s.append(b.charAt(j));
            }

            // first half
            for (int k = 0; k < i; k++) {
                s.append(b.charAt(k));
            }

            // calculate score
            int this_score = 0;
            for (int l = 0; l < a.length(); l++) {
                if (s.toString().charAt(l) == a.charAt(l)) {
                    this_score += 1;
                } else {
                    this_score -= 1;
                }
            }
            if (this_score > best_score) {
                best_score = this_score;
                best_string = s.toString();
            }

        }

        return "";
    }

    public String NeedlemanWunsch()
    {
        return NeedlemanWunsch(seq_0,seq_1);
    }
}
