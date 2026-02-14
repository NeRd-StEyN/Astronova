import os
import json
import re
from pipeline.script_gen import generate_script
from pipeline.voice_gen import run_generate_voiceover
from pipeline.visual_gen import fetch_pexels_video, fetch_pexels_image, create_placeholder_image
from pipeline.video_editor import create_video
from pipeline.seo_gen import generate_seo_metadata, save_metadata
from dotenv import load_dotenv

load_dotenv()

def clean_json_response(response_text):
    """Extracts JSON from a response string that might contain markdown blocks."""
    match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if match:
        return match.group(0)
    return response_text

def main(topic):
    print(f"Starting pipeline for topic: {topic}")
    
    # 1. Generate Script
    print("Generating script...")
    raw_script = generate_script(topic)
    script_json = json.loads(clean_json_response(raw_script))
    
    scenes = script_json['scenes']
    print(f"Done Script generated with {len(scenes)} scenes.")
    
    voiceover_paths = []
    visual_paths = []
    
    # Create asset folders if they don't exist
    os.makedirs("assets/audio", exist_ok=True)
    os.makedirs("assets/video", exist_ok=True)
    os.makedirs("assets/images", exist_ok=True)
    
    for i, scene in enumerate(scenes):
        print(f"Processing scene {i+1}/{len(scenes)}...")
        
        # 2. Generate Voiceover
        vo_path = f"assets/audio/scene_{i+1}.mp3"
        run_generate_voiceover(scene['text'], vo_path)
        voiceover_paths.append(vo_path)
        
        # 3. Fetch Visuals
        visual_path = f"assets/video/scene_{i+1}.mp4"
        # Try video first
        res = fetch_pexels_video(scene['visual_keyword'], visual_path)
        if not res:
            # Fallback to image
            visual_path = f"assets/images/scene_{i+1}.jpg"
            res = fetch_pexels_image(scene['visual_keyword'], visual_path)
        
        if not res:
            print(f"No visual found for scene {i+1}. Using placeholder.")
            visual_path = f"assets/images/placeholder_{i+1}.jpg"
            create_placeholder_image(visual_path, scene['visual_keyword'])
            visual_paths.append(visual_path)
        else:
            visual_paths.append(visual_path)
            
    print("Assembling final video...")
    output_file = "output_video.mp4"
    create_video(scenes, voiceover_paths, visual_paths, output_file)
    
    # 5. Generate SEO Metadata
    print("Generating SEO metadata...")
    metadata = generate_seo_metadata(topic, script_json)
    save_metadata(metadata, "video_metadata.json")
    
    print(f"Pipeline complete! Video saved to: {output_file}")
    print(f"Metadata saved to: video_metadata.json")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        topic = " ".join(sys.argv[1:])
    else:
        topic = input("Enter a topic for the video: ")
    main(topic)
