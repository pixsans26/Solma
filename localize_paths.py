import os
import re
import hashlib

BASE_DIR = "public/assets/images"
POSTERS_DIR = "/assets/images/posters"
BACKDROPS_DIR = "/assets/images/backdrops"
THUMBNAILS_DIR = "/assets/images/thumbnails"
MUSIC_DIR = "/assets/images/music"

files_to_update = [
    "src/data/contentData.js",
    "src/pages/home/Home.jsx",
    "src/pages/account/Downloads.jsx",
    "src/pages/account/Watchlist.jsx",
    "src/pages/search/SearchPage.jsx",
    "src/pages/content/ShortFilms.jsx",
    "src/pages/content/MusicVideos.jsx",
    "src/pages/content/Songs.jsx",
    "src/components/player/MiniPlayer.jsx",
    "src/components/player/SongOptionsSheet.jsx",
    "src/pages/content/MusicListPage.jsx",
    "src/pages/content/MusicPlayer.jsx",
    "src/components/discovery/Carousel.jsx",
    "src/pages/content/MovieDetail.jsx"
]

def get_local_path(url, file_path):
    if "image.tmdb.org" in url:
        filename = url.split('/')[-1]
        if "w780" in url:
            return f"{BACKDROPS_DIR}/{filename}"
        elif "w500" in url and ("poster" in file_path or "contentData" in file_path or "Download" in file_path or "Watchlist" in file_path or "MovieDetail" in file_path):
            return f"{POSTERS_DIR}/{filename}"
        else:
            return f"{THUMBNAILS_DIR}/{filename}"
    elif "picsum.photos" in url:
        h = hashlib.md5(url.encode()).hexdigest()[:10]
        return f"{MUSIC_DIR}/music_{h}.jpg"
    return url

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, "r") as f:
        content = f.read()
    
    # Replace single quoted URLs
    def replacer(match):
        url = match.group(1)
        return f"'{get_local_path(url, file_path)}'"
        
    new_content = re.sub(r"'(https?://[^']+)'", replacer, content)
    
    # Replace double quoted URLs
    def replacer_double(match):
        url = match.group(1)
        return f'"{get_local_path(url, file_path)}"'
    
    new_content = re.sub(r"\"(https?://[^\"]+)\"", replacer_double, new_content)
    
    if new_content != content:
        print(f"Updating {file_path}...")
        with open(file_path, "w") as f:
            f.write(new_content)

print("Path localization complete.")
