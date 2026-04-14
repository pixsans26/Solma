import os
import urllib.request

BASE_DIR = "public/assets/images/music"
os.makedirs(BASE_DIR, exist_ok=True)

artist_images = {
    "arijit": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Arijit_Singh_performance_at_Chandigarh_2025.jpg",
    "diljit": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Diljit_Dosanjh.jpg",
    "weeknd": "https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg",
    "taylor": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Taylor_Swift_at_the_2023_MTV_Video_Music_Awards_%283%29.png",
    "badshah": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Badshah_snapped_promoting_their_song_%28cropped%29.jpg",
    "sidhu": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Sidhu_Moose_Wala_during_the_shooting_of_his_film_Moosa_Jatt_%28cropped%29.jpg"
}

def download(name, url):
    dest = os.path.join(BASE_DIR, f"{name}.jpg")
    try:
        print(f"Downloading {name} from {url}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as response:
            with open(dest, "wb") as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"Failed to download {name}: {e}")
        return False

for name, url in artist_images.items():
    download(name, url)

print("Artist download complete.")
