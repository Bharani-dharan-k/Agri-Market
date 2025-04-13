# Load trained model and mappings
import pickle
try:
    with open("crop_price_model.pkl", "rb") as f:
        model = pickle.load(f)
    
    if not hasattr(model, "predict"):
        raise TypeError("Loaded object is not a valid ML model!")

    with open("mapping_dicts.pkl", "rb") as f:
        mapping_dicts = pickle.load(f)

    print("✅ Model and mappings loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model or mappings: {e}")
    model = None
