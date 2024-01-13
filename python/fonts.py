# fonts by emi
try:
    from colorama import Fore, Style
    BLACK = Fore.BLACK
    RED = Fore.RED
    GREEN = Fore.GREEN
    YELLOW = Fore.YELLOW
    BLUE = Fore.BLUE
    MAGENTA = Fore.MAGENTA
    CYAN = Fore.CYAN
    WHITE = Fore.WHITE
    DIM = Style.DIM
    BRIGHT = Style.BRIGHT
    NORMAL = Style.NORMAL
except ModuleNotFoundError and ImportError: #if program does not support colour module
    BLACK = ""
    RED = ""
    GREEN = ""
    YELLOW = ""
    BLUE = ""
    MAGENTA = ""
    CYAN = ""
    WHITE = ""
    DIM = ""
    BRIGHT = ""
    NORMAL = ""

"""▁ ▂ ▄ ▅ ▆ ▇ █ Ｍ𝐚ᶤ𝓝 ᑭя𝔬ⓖᖇค𝐌 █ ▇ ▆ ▅ ▄ ▂ ▁"""
def main():
    print(CYAN + NORMAL + "♥ Main Menu ♥")
    print(BLACK + "Select from below:")
    print(CYAN + DIM + "Fonts Generator:" + GREEN + " fonts / font / f")
    print(CYAN + DIM + "Symbols:" + GREEN + " symbols / symb / s")
    print(CYAN + DIM + "Emoticons:" + GREEN + " emoticons / emot / e")
    print(BLACK + NORMAL + "Invalid inputs exit the program.")
    try:
        inp = str(input(BLUE + DIM + "Input: ")).lower()
    except KeyboardInterrupt:
        print()
        print(RED + NORMAL + "Program exitted.")
        return
    print(BLACK)
    if inp == "fonts" or inp == "font" or inp == "f":
        fonts()
    elif inp == "symbols" or inp == "symb" or inp == "s":
        symbols()
    elif inp == "emoticons" or inp == "emot" or inp == "e":
        emoticons()
    else:
        print(RED + NORMAL + "Invalid input - Program exitted.")
        return

"""✿.｡.:* ☆:**.♪·¯·♫ 丂𝓎ϻ𝓫Ỗ𝓁ˢ ♫·¯·♪.**:.☆*.:｡.✿"""
def symbols():
    print(CYAN + NORMAL + "♥ Symbols ♥")
    print(CYAN + DIM + "type \"all\" for all symbols.")
    print(CYAN + DIM + "ctrl + c + enter to quit.")
    print(MAGENTA + NORMAL + "Favourites: " + BLACK + "♥ ♫ ❀ ʚϊɞ")
    symbols = {"heart":"♥","heartw":"♡","sparkle":"✧","sparkl":"✦","music":"♫","music2":"♬","butterfly":"ʚϊɞ",
               "plane":"✈","cloud":"☁","raincloud":"🌧","umbrella":"☂","flowerw":"❀","flower":"✿","note":"♩","quaver":"♪",
               "flat":"♭","natural":"♮","sharp":"♯"}
    symbols1 = list(symbols.keys())
    symbols1.sort()
    symbols = {i:symbols[i] for i in symbols1}
    try:
        while 1 == 1:
            inp = str(input(BLUE + DIM + "Search for a symbol: ")).lower()
            if inp == "all":
                print(BLACK + str(symbols))
            else:
                print(BLACK + symbols.get(inp,RED + NORMAL + "Symbol does not exist."))
    except KeyboardInterrupt:
        print()
        print(RED + NORMAL + "Function exitted.")
        print(BLACK)
        main()    
    return

"""¤¸¸.•¸„.-•~(っ◔◡◔)っ €𝕄𝐎𝕋ί𝓒σŇ𝔰 o((>ω< ))o~•-.„¸•.¸¸¤"""
def emoticons():
    print(CYAN + NORMAL + "♥ Emoticons ♥")
    print(CYAN + DIM + "type \"all\" for all emoticons.")
    print(CYAN + DIM + "ctrl + c + enter to quit.")
    print(MAGENTA + NORMAL + "Favourites: " + BLACK + "ILLΞ𓅛IㄩM (⎌ℕ⎌) 【=◈︿◈=】")
    emots = {"illenium":"ILLΞ𓅛IㄩM","nurture":"(⎌ℕ⎌)","porter":"【=◈︿◈=】"}
    emots1 = list(emots.keys())
    emots1.sort()
    emots = {i:emots[i] for i in emots1}
    try:
        while 1 == 1:
            inp = str(input(BLUE + DIM + "Search for a symbol: ")).lower()
            if inp == "all":
                print(emots)
            else:
                print(BLACK + emots.get(inp,RED + NORMAL + "Emoticon does not exist."))
    except KeyboardInterrupt:
        print()
        print(RED + NORMAL + "Function exitted.")
        print(BLACK)
        main()    
    return


""".•°¤*(¯`★´¯)*¤° Ŧόᑎ𝓉ѕ 𝔾ⓔＮέŘΔ𝓉ⓞᖇ °¤*(¯´★`¯)*¤°•."""
def fonts():
    print(CYAN + NORMAL + "♥ Fonts Generator ♥")
    print(CYAN + DIM + "ctrl + c + enter to quit.")
    try:
        while 1 == 1:
            text = str(input(BLUE + "Input text: "))
            print(BLACK)
            print(linesfont(text))
            print(typefont(text))
            print(scriptfont(text))
            print(scriptfontbold(text))
            print(seriffont(text))
            print(seriffontitalic(text))
            print(seriffontitalicbold(text))
            print(sansfont(text))
            print(sansfontbold(text))
            print(sansfontitalic(text))
            print(sansfontitalicbold(text))
            print(gothicfont(text))
            print(gothicfontbold(text))
            print(circlefont(text))
            print(circlefilledfont(text))
            print(squarefont(text))
            print(squarefilledfont(text))
            print(boxed(text))
            print()
    except KeyboardInterrupt:
        print()
        print(RED + NORMAL + "Function exitted.")
        print(BLACK)
        main()

"""Lines font"""
def linesfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝕢𝕨𝕖𝕣𝕥𝕪𝕦𝕚𝕠𝕡𝕒𝕤𝕕𝕗𝕘𝕙𝕛𝕜𝕝𝕫𝕩𝕔𝕧𝕓𝕟𝕞"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "ℚ𝕎𝔼ℝ𝕋𝕐𝕌𝕀𝕆ℙ𝔸𝕊𝔻𝔽𝔾ℍ𝕁𝕂𝕃ℤ𝕏ℂ𝕍𝔹ℕ𝕄"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡𝟘"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return text

"""Typewriter font"""
def typefont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝚚𝚠𝚎𝚛𝚝𝚢𝚞𝚒𝚘𝚙𝚊𝚜𝚍𝚏𝚐𝚑𝚓𝚔𝚕𝚣𝚡𝚌𝚟𝚋𝚗𝚖"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝚀𝚆𝙴𝚁𝚃𝚈𝚄𝙸𝙾𝙿𝙰𝚂𝙳𝙵𝙶𝙷𝙹𝙺𝙻𝚉𝚇𝙲𝚅𝙱𝙽𝙼"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿𝟶"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return text

"""Script font"""
def scriptfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝓆𝓌𝑒𝓇𝓉𝓎𝓊𝒾𝑜𝓅𝒶𝓈𝒹𝒻𝑔𝒽𝒿𝓀𝓁𝓏𝓍𝒸𝓋𝒷𝓃𝓂"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝒬𝒲𝐸𝑅𝒯𝒴𝒰𝐼𝒪𝒫𝒜𝒮𝒟𝐹𝒢𝐻𝒥𝒦𝐿𝒵𝒳𝒞𝒱𝐵𝒩𝑀"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def scriptfontbold(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝓺𝔀𝓮𝓻𝓽𝔂𝓾𝓲𝓸𝓹𝓪𝓼𝓭𝓯𝓰𝓱𝓳𝓴𝓵𝔃𝔁𝓬𝓿𝓫𝓷𝓶"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝓠𝓦𝓔𝓡𝓣𝓨𝓤𝓘𝓞𝓟𝓐𝓢𝓓𝓕𝓖𝓗𝓙𝓚𝓛𝓩𝓧𝓒𝓥𝓑𝓝𝓜"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""Serif font"""
def seriffont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝐪𝐰𝐞𝐫𝐭𝐲𝐮𝐢𝐨𝐩𝐚𝐬𝐝𝐟𝐠𝐡𝐣𝐤𝐥𝐳𝐱𝐜𝐯𝐛𝐧𝐦"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝐐𝐖𝐄𝐑𝐓𝐘𝐔𝐈𝐎𝐏𝐀𝐒𝐃𝐅𝐆𝐇𝐉𝐊𝐋𝐙𝐗𝐂𝐕𝐁𝐍𝐌"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗𝟎"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return text
def seriffontitalic(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝑞𝑤𝑒𝑟𝑡𝑦𝑢𝑖𝑜𝑝𝑎𝑠𝑑𝑓𝑔ℎ𝑗𝑘𝑙𝑧𝑥𝑐𝑣𝑏𝑛𝑚"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝑄𝑊𝐸𝑅𝑇𝑌𝑈𝐼𝑂𝑃𝐴𝑆𝐷𝐹𝐺𝐻𝐽𝐾𝐿𝑍𝑋𝐶𝑉𝐵𝑁𝑀"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def seriffontitalicbold(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝒒𝒘𝒆𝒓𝒕𝒚𝒖𝒊𝒐𝒑𝒂𝒔𝒅𝒇𝒈𝒉𝒋𝒌𝒍𝒛𝒙𝒄𝒗𝒃𝒏𝒎"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝑸𝑾𝑬𝑹𝑻𝒀𝑼𝑰𝑶𝑷𝑨𝑺𝑫𝑭𝑮𝑯𝑱𝑲𝑳𝒁𝑿𝑪𝑽𝑩𝑵𝑴"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""Sans font"""
def sansfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝗊𝗐𝖾𝗋𝗍𝗒𝗎𝗂𝗈𝗉𝖺𝗌𝖽𝖿𝗀𝗁𝗃𝗄𝗅𝗓𝗑𝖼𝗏𝖻𝗇𝗆"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝖰𝖶𝖤𝖱𝖳𝖸𝖴𝖨𝖮𝖯𝖠𝖲𝖣𝖥𝖦𝖧𝖩𝖪𝖫𝖹𝖷𝖢𝖵𝖡𝖭𝖬"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫𝟢"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return text
def sansfontbold(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝗾𝘄𝗲𝗿𝘁𝘆𝘂𝗶𝗼𝗽𝗮𝘀𝗱𝗳𝗴𝗵𝗷𝗸𝗹𝘇𝘅𝗰𝘃𝗯𝗻𝗺"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝗤𝗪𝗘𝗥𝗧𝗬𝗨𝗜𝗢𝗣𝗔𝗦𝗗𝗙𝗚𝗛𝗝𝗞𝗟𝗭𝗫𝗖𝗩𝗕𝗡𝗠"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵𝟬"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return text
def sansfontitalic(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝘲𝘸𝘦𝘳𝘵𝘺𝘶𝘪𝘰𝘱𝘢𝘴𝘥𝘧𝘨𝘩𝘫𝘬𝘭𝘻𝘹𝘤𝘷𝘣𝘯𝘮"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝘘𝘞𝘌𝘙𝘛𝘠𝘜𝘐𝘖𝘗𝘈𝘚𝘋𝘍𝘎𝘏𝘑𝘒𝘓𝘡𝘟𝘊𝘝𝘉𝘕𝘔"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def sansfontitalicbold(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝙦𝙬𝙚𝙧𝙩𝙮𝙪𝙞𝙤𝙥𝙖𝙨𝙙𝙛𝙜𝙝𝙟𝙠𝙡𝙯𝙭𝙘𝙫𝙗𝙣𝙢"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝙌𝙒𝙀𝙍𝙏𝙔𝙐𝙄𝙊𝙋𝘼𝙎𝘿𝙁𝙂𝙃𝙅𝙆𝙇𝙕𝙓𝘾𝙑𝘽𝙉𝙈"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""Gothic font"""
def gothicfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝔮𝔴𝔢𝔯𝔱𝔶𝔲𝔦𝔬𝔭𝔞𝔰𝔡𝔣𝔤𝔥𝔧𝔨𝔩𝔷𝔵𝔠𝔳𝔟𝔫𝔪"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝔔𝔚𝔈ℜ𝔗𝔜𝔘ℑ𝔒𝔓𝔄𝔖𝔇𝔉𝔊ℌ𝔍𝔎𝔏ℨ𝔛ℭ𝔙𝔅𝔑𝔐"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def gothicfontbold(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "𝖖𝖜𝖊𝖗𝖙𝖞𝖚𝖎𝖔𝖕𝖆𝖘𝖉𝖋𝖌𝖍𝖏𝖐𝖑𝖟𝖝𝖈𝖛𝖇𝖓𝖒"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "𝕼𝖂𝕰𝕽𝕿𝖄𝖀𝕴𝕺𝕻𝕬𝕾𝕯𝕱𝕲𝕳𝕵𝕶𝕷𝖅𝖃𝕮𝖁𝕭𝕹𝕸"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""Circle font"""
def circlefont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "ⓆⓌⒺⓇⓉⓎⓊⒾⓄⓅⒶⓈⒹⒻⒼⒽⒿⓀⓁⓏⓍⒸⓋⒷⓃⓂ"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "ⓆⓌⒺⓇⓉⓎⓊⒾⓄⓅⒶⓈⒹⒻⒼⒽⒿⓀⓁⓏⓍⒸⓋⒷⓃⓂ"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def circlefilledfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "🅠🅦🅔🅡🅣🅨🅤🅘🅞🅟🅐🅢🅓🅕🅖🅗🅙🅚🅛🅩🅧🅒🅥🅑🅝🅜"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "🅠🅦🅔🅡🅣🅨🅤🅘🅞🅟🅐🅢🅓🅕🅖🅗🅙🅚🅛🅩🅧🅒🅥🅑🅝🅜"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""Square font"""
def squarefont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "🅀🅆🄴🅁🅃🅈🅄🄸🄾🄿🄰🅂🄳🄵🄶🄷🄹🄺🄻🅉🅇🄲🅅🄱🄽🄼"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "🅀🅆🄴🅁🅃🅈🅄🄸🄾🄿🄰🅂🄳🄵🄶🄷🄹🄺🄻🅉🅇🄲🅅🄱🄽🄼"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text
def squarefilledfont(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "🆀🆆🅴🆁🆃🆈🆄🅸🅾🅿🅰🆂🅳🅵🅶🅷🅹🅺🅻🆉🆇🅲🆅🅱🅽🅼"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "🆀🆆🅴🆁🆃🆈🆄🅸🅾🅿🅰🆂🅳🅵🅶🅷🅹🅺🅻🆉🆇🅲🆅🅱🅽🅼"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    return text

"""【boxed? idk what this is】"""
def boxed(text):
    chars = "qwertyuiopasdfghjklzxcvbnm"
    font = "ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ"
    for i in range(len(chars)):
        text = text.replace(chars[i],font[i])
    charscaps = "QWERTYUIOPASDFGHJKLZXCVBNM"
    fontcaps = "ＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭ"
    for i in range(len(charscaps)):
        text = text.replace(charscaps[i],fontcaps[i])
    numchars = "1234567890"
    fontnum = "１２３４５６７８９０"
    for i in range(len(numchars)):
        text = text.replace(numchars[i],fontnum[i])
    return "【﻿"+text+"】"

main()