import os
import urllib.request
import re
import hashlib

# Base directory for public images
BASE_DIR = "public/assets/images"
POSTERS_DIR = os.path.join(BASE_DIR, "posters")
BACKDROPS_DIR = os.path.join(BASE_DIR, "backdrops")
THUMBNAILS_DIR = os.path.join(BASE_DIR, "thumbnails")
MUSIC_DIR = os.path.join(BASE_DIR, "music")

# Create directories if they don't exist
for d in [POSTERS_DIR, BACKDROPS_DIR, THUMBNAILS_DIR, MUSIC_DIR]:
    os.makedirs(d, exist_ok=True)

def download(url, dest_path):
    if not url or not url.startswith('http'):
        return False
    if os.path.exists(dest_path):
        return True
    try:
        print(f"Downloading {url} to {dest_path}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                with open(dest_path, "wb") as f:
                    f.write(response.read())
                return True
            else:
                print(f"Failed to download {url}: Status {response.status}")
                return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# Files to scan
files_to_scan = [
    "src/data/contentData.js",
    "src/pages/home/Home.jsx",
    "src/pages/account/Downloads.jsx",
    "src/pages/content/Songs.jsx",
    "src/components/player/MiniPlayer.jsx",
    "src/components/player/SongOptionsSheet.jsx",
    "src/pages/content/MusicListPage.jsx",
    "src/pages/content/MusicPlayer.jsx"
]

for file_path in files_to_scan:
    if not os.path.exists(file_path):
        continue
    with open(file_path, "r") as f:
        content = f.read()
    
    # Generic URL collector
    urls = re.findall(r"'(https?://[^']+)'", content)
    urls += re.findall(r"\"(https?://[^\"]+)\"", content)
    
    for url in set(urls):
        # Determine category based on URL or key? 
        # For simplicity, based on domain and known paths
        if "image.tmdb.org" in url:
            filename = url.split('/')[-1]
            if "w780" in url:
                dest = os.path.join(BACKDROPS_DIR, filename)
            elif "w500" in url and ("poster" in file_path or "contentData" in file_path):
                dest = os.path.join(POSTERS_DIR, filename)
            else:
                dest = os.path.join(THUMBNAILS_DIR, filename)
        elif "picsum.photos" in url:
            # Hash the URL for uniquely identifying picsum seeds
            h = hashlib.md5(url.encode()).hexdigest()[:10]
            filename = f"music_{h}.jpg"
            dest = os.path.join(MUSIC_DIR, filename)
        else:
            continue
            
        download(url, dest)

print("Download complete.")
