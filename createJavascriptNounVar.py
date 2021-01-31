

## Read text file and just make it into an array of strings

file_p = 'nounlist.txt'

with open(file_p, 'r') as f:
    txt = f.read()
    
txt = txt.split('\n')

new_txt = ['[']

for idx,txt_var in enumerate(txt):
    if len(txt_var) > 0:
        if idx < (len(txt) - 2):
            new_txt.append(r"'{}',".format(txt_var) + '\n')
        else:
            new_txt.append(r"'{}'".format(txt_var))
new_txt.append(']')
    
file_p = 'nounlist_new.txt'

with open(file_p, 'w') as f:
        txt = f.write(''.join(new_txt))
    



