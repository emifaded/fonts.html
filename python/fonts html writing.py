# helping me write fonts.html in javascript :)

def fontsmapping():
    newchars = ""
    # unfonted
    chars = "qwertyuiopasdfghjklzxcvbnm"
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    numchars = "1234567890"
    # input font chars
    fontchars = input("enter fonted characters: ")
    fontcaps = input("enter fonted capital characters: ")
    fontnum = input("enter fonted numbers: ")
    for i in range(len(chars)):
        if len(fontchars) == len(chars):
            newchars += "\""+chars[i]+"\""+":"+"\""+fontchars[i]+"\""+","
    newchars += "\n"
    for i in range(len(charscaps)):
        if len(fontcaps) == len(charscaps):
            newchars += "\""+charscaps[i]+"\""+":"+"\""+fontcaps[i]+"\""+","
    newchars += "\n"
    for i in range(len(numchars)):
        if len(fontnum) == len(numchars):
            newchars += "\""+numchars[i]+"\""+":"+"\""+fontnum[i]+"\""+","
    print(newchars)

def fontsmappingbykeycode():
    # each representing qwertyuiopasdfghjklzxcvbnm
    keycodechars = 113,119,101,114,116,121,117,105,111,112,97,115,100,102,103,104,106,107,108,122,120,99,118,98,110,109
    print(keycodechars)

fontsmapping()