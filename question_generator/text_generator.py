from transformers import pipeline, set_seed
import torch

class TextGenerator:
    def __init__(self):
        self.num_return_sequences = 1
        self.generator = pipeline('text-generation', model='./gpt2/')
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        set_seed(42)

    def generate_text(self, sentence, max_length):
        text = self.generator(sentence, max_length=max_length, num_return_sequences=self.num_return_sequences)
        return text

#tg = TextGenerator()
#text_response = tg.generate_text("Hello, I'm a language model,", 40)