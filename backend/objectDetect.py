import os
import clip
import torch
from PIL import Image



# Load the model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load('ViT-B/32', device)

# Prepare the inputs
image = preprocess(Image.open("nothing.jpg")).unsqueeze(0).to(device)
text = clip.tokenize(["smoke detector", "lock", "fire extinguisher","random"]).to(device)

with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)
    
    logits_per_image, logits_per_text = model(image, text)
    probs = logits_per_image.softmax(dim=-1).cpu().numpy()

print("Label probs:", probs)