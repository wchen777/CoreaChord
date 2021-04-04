import pandas as pd

print("generating transition matrix (low/standard chord diversity)...")

# all chord names
chord_names = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

# qualities
qualities = ['maj7', '-7', '-7b5', '7']

# all chords combining chord names and qualities
all_chords = []

# fill all_chords
for chord in chord_names:
    for quality in qualities:
        all_chords.append(chord + quality)

# # create enum representation with dicts
num_to_chord_name = {i: chord for i, chord in enumerate(all_chords)}
chord_name_to_num = {chord: i for i, chord in enumerate(all_chords)}

# data for our csv
t_matrix_data = []

# size of the row
row_size = len(all_chords) + 1

# initialize pandas data frame with column name including the start label
df = pd.DataFrame(columns=(['start'] + all_chords))

# use circle of fifths, sorta?
roots = len(chord_names)
quals = len(qualities)


# diatonic step functions


def down5(chord_name_num):
    return (chord_name_num + 5) % roots


def up5(chord_name_num):
    return (chord_name_num + 7) % roots


def up1(chord_name_num):
    return (chord_name_num + 2) % roots


def down2(chord_name_num):
    return (chord_name_num + 9) % roots


def down1(chord_name_num):
    return (chord_name_num + 11) % roots


# function rules based on chord quality, add 1 to chord index bc of first label


# -7b5 rule should always go to the respective dom7
def m7b5_rule(chord_num, row):
    chord_name_num = chord_num // quals
    # num of chord NAME that is 5 below
    d5 = down5(chord_name_num)
    # dom7
    row[(d5 * quals) + 3 + 1] = 1


# dom7 rule should always go to 5th down, and then decide chord quality
def dom7_rule(chord_num, row):
    chord_name_num = chord_num // quals
    # num of chord NAME that is 5 below
    d5 = down5(chord_name_num)
    # dom7
    row[(d5 * quals) + 3 + 1] = 0.5
    # -7
    row[(d5 * quals) + 1 + 1] = 0.25
    # maj7
    row[(d5 * quals) + 1] = 0.25


def maj7_rule(chord_num, row):
    chord_name_num = chord_num // quals

    # if we are at Cmaj7,

    # F
    d5 = down5(chord_name_num)

    # TOTAL 0.1
    # Fmaj7
    row[(d5 * quals) + 1] = 0.1

    # TOTAL 0.5
    # D
    u1 = up1(chord_name_num)
    # D-7
    row[(u1 * quals) + 1 + 1] = 0.4
    # D7
    row[(u1 * quals) + 3 + 1] = 0.1

    # TOTAL 0.15
    # A
    d2 = down2(chord_name_num)
    # A-7
    row[(d2 * quals) + 1 + 1] = 0.1
    # A7
    row[(d2 * quals) + 3 + 1] = 0.05

    # TOTAL 0.2
    # G
    u5 = up5(chord_name_num)
    # G7
    row[(u5 * quals) + 3 + 1] = 0.2

    # TOTAL 0.05
    # B
    d1 = down1(chord_name_num)
    # B-7b5
    row[(d1 * quals) + 2 + 1] = 0.1


def min7_rule(chord_num, row):
    chord_name_num = chord_num // quals

    # if we are at C-7,

    # F
    d5 = down5(chord_name_num)

    # TOTAL 0.75
    # F-7
    row[(d5 * quals) + 1 + 1] = 0.2
    # F7
    row[(d5 * quals) + 3 + 1] = 0.55

    # TOTAL 0.1
    # D
    u1 = up1(chord_name_num)
    # D-7b5
    row[(u1 * quals) + 2 + 1] = 0.1

    # TOTAL 0.15
    # G
    u5 = up5(chord_name_num)
    # G7
    row[(u5 * quals) + 3 + 1] = 0.1
    # G-7
    row[(u5 * quals) + 1 + 1] = 0.05


def generate():
    for idx, chrd in enumerate(all_chords):
        # chrd is the name of the chord

        # num of the chord
        chord_num = chord_name_to_num[chrd]

        transition_row = [0] * row_size
        transition_row[0] = chrd

        chord_quality = chord_num % quals

        if chord_quality == 0:
            maj7_rule(chord_num, transition_row)
        elif chord_quality == 1:
            min7_rule(chord_num, transition_row)
        elif chord_quality == 2:
            m7b5_rule(chord_num, transition_row)
        elif chord_quality == 3:
            dom7_rule(chord_num, transition_row)

        df.loc[idx] = transition_row


generate()
df.to_csv(r't-mat-low.csv', index=False, header=True)
