
# Si es primera vez que descarga el proyecto es necesario ejecutar este archivo (descarga los modelos en la raiz)
# Para ello debe ejecutar el archivo tal cual para descargar el modelo 't5-base-question-generator', una vez descargado
# debe comentar las dos líneas pipeline y path (línea 15 y 16), y descomentar (línea 18 y 19) y ejecutar de nuevo para
# descargar el modelo 'tbert-base-cased-qa-evaluator'.

#SAVE MODELS FROM PIPELINES HUGGINGFACE
import transformers
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification

import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

pipeline = transformers.pipeline('text2text-generation')
path = 't5-base-question-generator'

#pipeline = AutoModelForSequenceClassification.from_pretrained("iarfmoose/bert-base-cased-qa-evaluator")
#path = 'tbert-base-cased-qa-evaluator'

pipeline.save_pretrained(path)

with open(path + '/manifest.json', 'w') as file:
    json.dump({
        'type': 'huggingface_pipeline',
        'pipeline_class': type(pipeline).__name__,
        'tokenizer_class': type(pipeline.tokenizer).__name__,
        'model_class': type(pipeline.model).__name__,
    }, file, indent=2)

