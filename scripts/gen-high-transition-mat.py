import numpy as np
import math
import csv
print("generating transition matrix (high/standard chord diversity)...")
#1/(1+e^(-8*(x-0.3)))

def pseudo_sigmoid(probability):
    return 1 / (1 + math.e**(-13 * (probability - 0.3)))

def _sum(arr): 
    sum=0
    for i in arr:
        sum = sum + i
          
    return(sum) 

def row_verifier(row):
    
    delta = 0.000001
    if abs(_sum(row) - 1.0) > delta:
        print("ERROR: ")

def run():
    med_matrix = [[]] * 49
    with open('./t-mat-med.csv', newline='') as csvfile:
        mat_reader = csv.reader(csvfile, delimiter=' ', quotechar='|')
        for (i,row) in enumerate(mat_reader):
            row_list = []
            row = row[0].split(',')
            for (j,col) in enumerate(row):
                if i == 0 or j == 0:
                    row_list.append(col)
                else:
                    row_list.append(float(col))
            med_matrix[i] = row_list
    for (i,row) in enumerate(med_matrix):
        if i != 0:
            for (j,col) in enumerate(row):
                if j != 0:
                    med_matrix[i][j] = pseudo_sigmoid(col)
            med_matrix[i][1:] = [x / _sum(row[1:]) for x in med_matrix[i][1:]]
            row_verifier(med_matrix[i][1:]) 
    # name of csv file 
    filename = "t-mat-high.csv"
        
    # writing to csv file 
    with open(filename, 'w') as csvfile: 
        # creating a csv writer object 
        csvwriter = csv.writer(csvfile) 
            
        # writing the data rows 
        csvwriter.writerows(med_matrix)
run()