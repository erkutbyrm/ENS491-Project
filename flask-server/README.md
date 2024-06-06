# DeepKinZero Backend

## API Endpoints
- [Prediction with UniProt ID list](docs/gene-id.md): `POST /api/predict/gene-id`
- [Prediction with FASTA file upload](docs/sequence-file.md): `POST /api/predict/sequence-file`
- [Prediction with FASTA string](docs/sequence-string.md): `POST /api/predict/sequence-string`

## Adding/Updating DistilProtBert checkpoints
- Place the new checkpoints into `model/checkpoints/distilprotbert_models/distilprotbert/` (if the directory does not exist, create a new folder)
- Update the config file (`model/configs/distilprotbert_model.yaml`) to match the name of the new checkpoint. For example:
  ```yaml
  testing:
  ...
    checkpoint_file_name: 'distilprotbert_saved'
  ...
  ```
  
## Running Natively
### Set up virtual environment
#### Windows
```bash
python -m venv virtualenv  
.\virtualenv\Scripts\activate  
pip install -r requirements.txt  
```

#### Linux / MacOS
```bash
python3 -m venv virtualenv  
source virtualenv/bin/activate  
pip install -r requirements.txt  
```

### Run server
```bash
flask --app server --debug run
```  
### Deactivate the virtual environment
```bash
deactivate
``` 

## Running with Docker
```bash
docker pull yunuses/dkz-backend:latest
docker run -d --name dkz -v [path/to/model/checkpoints]:/model/checkpoints -p 5000:5000 dkz-backend
```

Note: The checkpoints should have a structure such as:
```
checkpoints
├── distilprotbert_embeddings
│   ├── distilprotbert_kinase.pt
│   └── distilprotbert_phosphosite.pt
└── distilprotbert_models
    ├── distilprotbert
    │   └── distilprotbert_saved.pt
    └── kinase_encoder_distilprotbert.pkl
```




