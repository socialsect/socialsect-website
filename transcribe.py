import whisper

# Update this path to your actual desktop path
# Windows example: "C:/Users/YourUsername/Desktop/IMG_8403.MP4"
# Mac example: "/Users/YourUsername/Desktop/IMG_8403.MP4"
video_path = "/Users/mac/Desktop/IMG_8405.MP4"

print("Loading model and transcribing... this may take a minute.")
model = whisper.load_model("base") # Use "tiny" for faster, "small" or "medium" for better accuracy
result = model.transcribe(video_path)

# Save to a text file on your desktop
with open("/Users/mac/Desktop/transcript3.txt", "w", encoding="utf-8") as f:
    f.write(result["text"])

print("Transcription complete! Saved to transcript2.txt")