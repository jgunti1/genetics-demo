from tkinter import *

def clicked():
    pass
    
root = Tk()
frame = Frame(master=root, width=500, height=500, padx=50,pady=50,bg='gray')
frame.pack()
label = Label(master=frame,text='DNA',padx=10,pady=10)
label.pack()

entry = Entry(master=frame)
entry.pack()

button = Button(master=frame,
                text='Transcribe/Translate',
                padx=10,
                pady=10,
                command=clicked)

button.pack()
root.mainloop()