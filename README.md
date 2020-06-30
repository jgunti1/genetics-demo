# Bio::Neos Genetics Demo

This collection of genetics demo projects makes up the first module of the Bio::Neos training plan for new employees. The purpose of the module is to understand the company Git workflow and practice using it while collaborating with others.

## Training Module Explanation

Since the point of the module is to practice Git—not any particular programming language or framework, there are multiple implementations of the project in several programming languages. The projects are sorted into two categories: [web apps](./web) and [standalone GUI applications](./standalone). Within each category is any number of implementations of the project in different languages. As of June 2020, the only web app is a [Node.js app](./web/javascript), and the only standalone GUI app is a [JavaFX application](./standalone/javafx).

## Project Description

This project should take somewhere between one day and one week to complete. The number of trainees working on the project may vary, and the scope of the project should vary accordingly.

A basic project should include a GUI that allows the user to enter a DNA sequence using the four bases (A, C, G, and T). The program should transcribe the input to mRNA (A, C, and G transcribe to themselves, and T transcribes to U). Then, the program should translate each codon (triplet) of mRNA into the appropriate amino acid letter (based on a [codon table](https://en.wikipedia.org/wiki/Genetic_code#RNA_codon_table)). For stop codons, simply output `stop` instead of a letter. For triplets that don't code for an amino acid, output `_` to indicate a typo or irregularity.

The project should contain a user-friendly interface that allows the user to view the DNA, mRNA, and amino acid sequences simultaneously. Prefer buttons that trigger transcription and translation to automatically converting when the user types.

With more people working on the project, it is possible to implement many more features than the basic ones described above. Some possibilities that were implemented in the Node.js and JavaFX versions of the project include:

- Reversed translation and transcription (convert from amino acids to mRNA and from mRNA to DNA)
- File input and output (`txt` and `fasta` formats)
- Sequence alignment operations
    - Edit distance calculator between two DNA sequences
    - Needleman-Wunsch alignment algorithm
- Unit tests
    
There are certainly other features that could be implemented depending on the number of employees working on the project and their levels of experience. Those were just a few examples.
