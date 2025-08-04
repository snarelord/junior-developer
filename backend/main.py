from fastapi import FastAPI, HTTPException
from pathlib import Path
from models import Data
import json
import re
from urllib.parse import urlparse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/data", response_model=list[Data])
def get_data() -> list[Data]:
    try: 
        file_path = Path("data/mock.json")
        if not file_path.exists():
            raise FileNotFoundError("File not found")
        data_text = file_path.read_text(encoding="utf-8")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading data file: {str(e)}")

    try:
        items = json.loads(data_text)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

    for item in items:
        source_lookup = {s["id"]: s for s in item["sources"]}

        def replace_ref(match):
            source_id = match.group(1)
            source = source_lookup.get(source_id)
            if source:
                domain = urlparse(source["source"]).netloc
                return f'<a href="{source["source"]}" target="_blank" rel="noopener noreferrer">{domain}</a>'
            return f"[Missing source: {source_id}]"

        item["content"] = re.sub(r"<ref>(.*?)</ref>", replace_ref, item["content"])

        for source in item.get("sources", []):
            try: 
                raw_url = source.get("source")
                if not isinstance(raw_url, str):
                    raise ValueError("Invalid or missing source URL")
                
                parsed = urlparse(raw_url)
                domain = parsed.netloc or parsed.path

                if domain: 
                    favicon_url = f"https://{domain}/favicon.ico"
                else: 
                    favicon_url = ""

                source["favicon"] = favicon_url
                print(f"Added favicon for source '{source.get('title', 'Unknown')}': {favicon_url}")

            except Exception as e:
                print(f"Error processing source '{source.get('title', 'Unknown')}': {str(e)}")
                source["favicon"] = ""

    list_of_data = [Data.model_validate(item) for item in items]

    return list_of_data
