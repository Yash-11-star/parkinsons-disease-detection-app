import pandas as pd # for data manipulation
import numpy as np # for numerical analysis

# For plottling graphs
import seaborn as sns 
import matplotlib.pyplot as plt

# for saving tools
import joblib/n/n# Setting Plotting Settings
%matplotlib inline
sns.set_style("darkgrid")/n/nparkinsons = pd.read_csv("parkinsons.csv")/n/n# Checking First 5 rows of data
parkinsons.head()/n/nparkinsons.info()/n/nparkinsons.columns/n/n# Shuffling the data
parkinsons = parkinsons.sample(frac=1, random_state=42).copy()/n/n# Splitting the data into train and test data
from sklearn.model_selection import train_test_split
X = parkinsons.drop(["name", "status"], axis=1) 
y = parkinsons["status"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=51)/n/n# Setting the train data to variable name "parkinsons" for data preprocessing
parkinsons = X_train.copy()
parkinsons/n/ny_train/n/nparkinsons.iloc[0]/n/n# Extracting features
features = [feature for feature in parkinsons.columns]/n/n# Check total of missing values
parkinsons.isna().sum()/n/n# import library for scaling
from sklearn.preprocessing import StandardScaler/n/n# initialize and scale values
scaler = StandardScaler()
scaler.fit(parkinsons[features])
parkinsons[features] = scaler.transform(parkinsons[features])/n/njoblib.dump(scaler, "tools/scaler_joblib")/n/n#  Ratio of No Parkinson to Parkinson
y_train.value_counts(normalize=True)/n/n# joining the data together
parkinsons = pd.concat([parkinsons, y_train], axis=1)/n/n# Balancing the data
from imblearn.over_sampling import SMOTE
smote = SMOTE(random_state=51)
X = parkinsons.drop("status", axis=1) 
y = parkinsons["status"]
X_train, y_train = smote.fit_resample(X, y)/n/n#  Ratio of No Diabetes to Diabetes
y_train.value_counts(normalize=True)/n/nX_test[features] = scaler.transform(X_test[features]) # scaling features/n/n# checking first 5 rows of data
X_test.head()/n/nX_test.shape/n/nfrom sklearn.ensemble import RandomForestClassifier/n/nmodel = RandomForestClassifier(random_state=51, n_jobs=-1)/n/nmodel.fit(X_train, y_train)/n/npredictions = model.predict(X_test)/n/n# libraries to check performance
from sklearn.metrics import accuracy_score, confusion_matrix, f1_score,  recall_score/n/nprint(f"The accuracy is {accuracy_score(y_test, predictions) * 100:.2f} %")
print(f"The f1 score is {f1_score(y_test, predictions) * 100:.2f} %") 
print(f"The recall is {recall_score(y_test, predictions) * 100:.2f} %")/n/nsns.heatmap(confusion_matrix(y_test, predictions), annot=True, cbar=False);
# TN   FP
# FN*   TP - Recall/n/nfrom xgboost import XGBClassifier/n/nxgb = XGBClassifier(random_state=51)/n/nxgb.fit(X_train, y_train)/n/npredictions = xgb.predict(X_test)/n/nprint(f"The accuracy is {accuracy_score(y_test, predictions) * 100:.2f} %")
print(f"The f1 score is {f1_score(y_test, predictions) * 100:.2f} %") 
print(f"The recall is {recall_score(y_test, predictions) * 100:.2f} %")/n/nsns.heatmap(confusion_matrix(y_test, predictions), annot=True, cbar=False);
# TN   FP
# FN*   TP - Recall/n/nfrom sklearn.svm import SVC/n/nsvm = SVC()/n/nsvm.fit(X_train, y_train)/n/npredictions = svm.predict(X_test)/n/nprint(f"The accuracy is {accuracy_score(y_test, predictions) * 100:.2f} %")
print(f"The f1 score is {f1_score(y_test, predictions) * 100:.2f} %") 
print(f"The recall is {recall_score(y_test, predictions) * 100:.2f} %")/n/nsns.heatmap(confusion_matrix(y_test, predictions), annot=True, cbar=False);
# TN   FP
# FN*   TP - Recall/n/nimportance_df = pd.DataFrame({
    "Feature" : features,
    "Importance" : model.feature_importances_}).sort_values("Importance", ascending=False)/n/nplt.figure(figsize=[10,6])
plt.title("Most Important Features")
sns.barplot(data=importance_df.head(10), y="Feature", x="Importance");/n/njoblib.dump(model, "tools/model_joblib")/n/n