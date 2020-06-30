
package controllers;

import java.util.HashMap;
public class Translator {

    private static HashMap<String, String> codonChart;
    /*
     * Util function for looking up codons and corresponding amino acid letters
     */
    private static void createCodonChart(){

        codonChart = new HashMap<String, String>();

        codonChart.put("UCA","S");
        codonChart.put("AUA","I");
        codonChart.put("UCC","S");
        codonChart.put("AUC","I");
        codonChart.put("UCG","S");
        codonChart.put("AUU","I");
        codonChart.put("UCU","S");
        codonChart.put("AUG","M");
        codonChart.put("UUC","F");
        codonChart.put("ACA","T");
        codonChart.put("UUU","F");
        codonChart.put("ACC","T");
        codonChart.put("UUA","L");
        codonChart.put("ACG","T");
        codonChart.put("UUG","L");
        codonChart.put("ACU","T");
        codonChart.put("UAC","Y");
        codonChart.put("AAC","N");
        codonChart.put("UAU","Y");
        codonChart.put("AAU","N");
        codonChart.put("UAA","_");
        codonChart.put("AAA","K");
        codonChart.put("UAG","_");
        codonChart.put("AAG","K");
        codonChart.put("UGC","C");
        codonChart.put("AGC","S");
        codonChart.put("UGU","C");
        codonChart.put("AGU","S");
        codonChart.put("UGA","_");
        codonChart.put("AGA","R");
        codonChart.put("UGG","W");
        codonChart.put("AGG","R");
        codonChart.put("CUA","L");
        codonChart.put("GUA","V");
        codonChart.put("CUC","L");
        codonChart.put("GUC","V");
        codonChart.put("CUG","L");
        codonChart.put("GUG","V");
        codonChart.put("CUU","L");
        codonChart.put("GUU","V");
        codonChart.put("CCA","P");
        codonChart.put("GCA","A");
        codonChart.put("CCC","P");
        codonChart.put("GCC","A");
        codonChart.put("CCG","P");
        codonChart.put("GCG","A");
        codonChart.put("CCU","P");
        codonChart.put("GCU","A");
        codonChart.put("CAC","H");
        codonChart.put("GAC","D");
        codonChart.put("CAU","H");
        codonChart.put("GAU","D");
        codonChart.put("CAA","Q");
        codonChart.put("GAA","E");
        codonChart.put("CAG","Q");
        codonChart.put("GAG","E");
        codonChart.put("CGA","R");
        codonChart.put("GGA","G");
        codonChart.put("CGC","R");
        codonChart.put("GGC","G");
        codonChart.put("CGG","R");
        codonChart.put("GGG","G");
        codonChart.put("CGU","R");
        codonChart.put("GGU","G");
    }

    public Translator()
    {
        createCodonChart();
    }

    public static String dnaToRna(String dna)
    {
        /**
         * DOCU: method that converts strings representing DNA sequences (e.g. "CCATAA") into corresponding mRNA sequences (e.g. "CCAUAA").
         * @param dna_seq string
         * @return mRNA_seq string
         */

        StringBuilder s = new StringBuilder();
        for (int i=0;i<dna.length();i++)
        {
            if (dna.toUpperCase().charAt(i) == 'T')
            {
                s.append('u');
            }
            else
            {
                s.append(dna.charAt(i));
            }
        }
        return s.toString().toUpperCase();
    }

    public static String rnaToCodons(String rna)
    {
        /**
         * DOCU: method that converts strings representing mRNA sequences (e.g. "CCAUAA") into corresponding mRNA sequences (e.g. "P_").
         * @param mRNA_seq string
         * @return protein_seq string
         */

        StringBuilder s = new StringBuilder();
        for (int i=0;i+3<=rna.length();i+=3)
        {
            String codon = codonChart.get(rna.substring(i,i+3));
            if (codon != null)
            {
                s.append(codon);
            }
            else
            {
                s.append("?");
            }
        }
        return s.toString();
    }

    public static HashMap<String, String> getCodonChart()
    {
        return codonChart;
    }
}
