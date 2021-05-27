# function that transcribes a DNA sequence

def transcribe(string):
    newString = ""
    for i in range(0,len(string)):
        if string[i] == "T":
            newString += "U"
        else:
            newString += string[i]
    
    return newString

def translate(threeLetStr):
    codon = {}
    codon["UCA"] = "S"
    codon["AUA"] = "I"
    codon["UCC"] = "S"
    codon["UCU"] = "S"
    codon["UCG"] = "S"
    codon["AUC"] = "I"
    codon["AUU"] = "I"
    codon["AUG"] = "M"
    codon["UUC"] = "F"
    codon["ACA"] = "T"
    codon["UUU"] = "F"
    codon["ACC"] = "T"
    codon["UUA"] = "L"
    codon["ACG"] = "T"
    codon["UUG"] = "L"
    codon["ACU"] = "T"
    codon["UAC"] = "Y"
    codon["AAC"] = "N"
    codon["UAU"] = "Y"
    codon["AAU"] = "N"
    codon["UAA"] = "-"
    codon["AAA"] = "K"
    codon["UAG"] = "-"
    codon["AAG"] = "K"
    codon["UGC"] = "C"
    codon["AGC"] = "S"
    codon["UGU"] = "C"
    codon["AGU"] = "S"
    codon["UGA"] = "-"
    codon["AGA"] = "R"
    codon["UGG"] = "W"
    codon["AGG"] = "R"
    codon["CUA"] = "L"
    codon["GUA"] = "V"
    codon["CUC"] = "L"
    codon["GUC"] = "V"
    codon["CUG"] = "L"
    codon["GUG"] = "V"
    codon["CUU"] = "L"
    codon["GUU"] = "V"
    codon["CCA"] = "P"
    codon["GCA"] = "A"
    codon["CCC"] = "P"
    codon["GCC"] = "A"
    codon["CCG"] = "P"
    codon["GCG"] = "A"
    codon["CCU"] = "P"
    codon["GCU"] = "A"
    codon["CAC"] = "H"
    codon["GAC"] = "D"
    codon["CAU"] = "H"
    codon["GAU"] = "D"
    codon["CAA"] = "Q"
    codon["GAA"] = "E"
    codon["CAG"] = "Q"
    codon["GAG"] = "E"
    codon["CGA"] = "R"
    codon["GGA"] = "G"
    codon["CGC"] = "R"
    codon["GGC"] = "G"
    codon["CGG"] = "R"
    codon["GGG"] = "G"
    codon["CGU"] = "R"
    codon["GGU"] = "G"
    p = ""
    l = ""
    for i in range(0, len(threeLetStr)):
        p += threeLetStr[i];
        if len(p) == 3:
            if p in codon:
                l += codon.get(p)
                p=""
    
    return l
        


            