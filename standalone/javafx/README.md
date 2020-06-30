# Genetics Demo

The creation of this project was part of the Bio::Neos training plan -- module 1. 

### Goals
1. To understand Bio::Neos Gitflow Workflow
2. To differentiate between branch types
    1. Master, Devel, Feature, (Bug-fix), (Release)
3. To gain confidence in handling merge conflicts

### Description
**DNA to RNA to Protein implementation with Gitflow**

Build a simple GUI that allows the user to input a DNA sequence. The DNA sequence should contain only the four appropriate bases, A, C, G, and T. These letters will make up the DNA sequence. Repeat regions are allowed. Using this input, this program should transcribe it to an mRNA sequence with appropriate base changes (T's should change to U's, every other letter is transcribed to itself). From there, create a codon-chart to handle the conversion from an mRNA codon to its corresponding amino acid. The program should take a triplet of mRNA bases and translate it into its corresponding amino acid letter (given that the triplet actually codes for an amino acid). If the triplet doesn't code for anything in any case, the amino acid should default to a "\_" character. This will show that the specific codon contains some sort of variant or typo that doesn't code for any amino acids. An example codon chart can be found [here](https://simplemoleculargenetics.weebly.com/uploads/1/8/3/4/18345767/5269678_orig.png)

This project should be implemented in a user-friendly interface in a fashion such that they can view each sequences simultaneously. It would be beneficial to add buttons to allow the user to transcribe and translate their inputted DNA sequence instead of the UI doing it automatically. 

*Training Plan Instructions:*

The main goal of the training module is to get comfortable with Gitflow, appropriate branching, fulfilling merge requests, as well as getting an idea of what it's like to work with previously existing code or working with a collaborator on a project. To start, create a `devel` branch for the training-plan repo. Clone the repository to your local machine while working on the develop branch. Be sure to follow the Gitflow model for the remainder of this project. When working on a new feature for the project, be sure you are working on a feature branch and only merging back into `devel` once the feature is complete. 

Although you will be building a functioning system, remember to focus on the VCS workflow as the primary skill learned during this development. Try to pick a scope of the project that will last *more than 1 day* and *less than one week* independent of the number of trainees working together. Divide up the work so that everyone gets to experience at least *two merges* (Although you may need to pair program at first in order to setup the foundation of the project). If you rapidly conclude development work, get creative and brainstorm ideas for new features so that you can continue to practice the workflow.

As often as necessary, refer back to the Bio::Neos VCS Policy on the Redmine wiki [here](https://redmine.bioneos.com/projects/bioneos/wiki/VCS_Development_and_Branching_Strategy) 

### Quick tips

**Handling Merge Conflicts**

So you have a merge conflict? Take some time to think about BAD ways to solve these issues. Some examples include:
* Ignoring the other code
    * You aren't always 100% correct 100% of the time!
* Trying to save files locally, deleting repo, and re-cloning repo to try to add local "non-working" copies back into repo

Now think of more appropriate strategies:
* Review the changes and if you can understand how to merge differences on your own, and recompile / retest your code
* Ask the original developer to explain his/her section that conflicted with yours
* Call in a more senior developer

**"GIT" Happens**

Face it, we all mess up. With the added stress of working for a company now, these mistakes could really come back to bite you with heavy consequences! So, we all know the phrase "Git Happens". Quite frankly, Git/Gitflow can be confusing to work with at first. It takes practice and a few lessons learned along the way, but this [article](https://about.gitlab.com/2018/08/08/git-happens/) should make correcting some of these problems easier. 
