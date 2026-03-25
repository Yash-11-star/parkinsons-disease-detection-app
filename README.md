# Parkinson’s Detection – Full Stack Project

**Overview**
This project provides a full-stack Parkinson’s detection system with:
- A FastAPI backend for audio + drawing (spiral/wave) inference.
- Two Angular frontends for the UI.
- Training scripts and notebooks for model generation and analysis.

**Repo Structure**
- `Backend/`  
  FastAPI app, trained models, datasets, and training scripts/notebooks.
- `Frontend/ParkinsonDetection/`  
  Angular 17 SPA (client-only).
- `Frontend/ParkinsonsDisease/`  
  Angular 17 app with SSR support.

**Backend (FastAPI)**
**Key files**
- `Backend/main.py` – API entrypoint.
- `Backend/prediction.py` – Spiral/Wave image inference.
- `Backend/Audio_predict.py` – Audio inference.

**API endpoints**
- `POST /api/upload-spiral-image`  
  Upload spiral image.
- `POST /api/upload-wave-image`  
  Upload wave image.
- `GET /api/spiral-drawing-detection`  
  Get spiral prediction.
- `GET /api/wave-drawing-detection`  
  Get wave prediction.
- `POST /api/upload-audio`  
  Upload audio file.
- `GET /api/speech-detection`  
  Get latest audio prediction.

**Run backend**
1. Create and activate a Python environment (recommended Python 3.10 for TensorFlow compatibility).
2. Install dependencies (minimum set):
   - `fastapi`, `uvicorn`, `tensorflow`, `keras`, `librosa`, `numpy`, `pandas`, `scikit-learn`, `joblib`, `pillow`, `imbalanced-learn`, `matplotlib`, `wandb`
3. From `Backend/`, run:
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

**Important path note**
The backend currently loads models using **absolute Windows paths** in:
- `Backend/prediction.py`
- `Backend/Audio_predict.py`

Update these to **relative paths** on your machine (for example):
- `spiral_model_new/`
- `wave_model_new_new/`
- `Audio_*_model.joblib`

**Model Training / Generation**
Keep these if you want to retrain or regenerate models:
- `Backend/Spiral.py` – trains spiral model.
- `Backend/Wave.py` – trains wave model.
- `Backend/Audio.ipynb` – generates audio models used by the API.
- `Backend/AudioFinal.ipynb` – analysis/alternate training.
- `Backend/AudioModel.py` – older/alternate audio model training pipeline.
- `Backend/Parkinson Disease Prediction.ipynb` – analysis notebook.

**Datasets and Models**
- `Backend/AudioDataset.zip` – audio dataset archive.
- `Backend/drawings.zip` – drawings dataset archive.
- Trained models live under `Backend/` and model directories like `spiral_model_new/`, `wave_model_new_new/`.

**Frontend**
You have two Angular apps. Choose one to run.

**Frontend 1: ParkinsonDetection**
1. `cd Frontend/ParkinsonDetection`
2. `npm install`
3. `npm start`

**Frontend 2: ParkinsonsDisease (SSR-capable)**
1. `cd Frontend/ParkinsonsDisease`
2. `npm install`
3. `npm start`

**Notes**
- CORS is currently open (`allow_origins=["*"]`) in the backend.
- For production, tighten CORS and manage model paths using environment variables or config.

**License**
No license file is included. Add one if you plan to distribute or open-source the project.
