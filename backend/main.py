from fastapi import FastAPI
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
    data = Path("data/mock.json").read_text()
    items = json.loads(data)

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

        for source in item["sources"]:
            domain = urlparse(source["source"]).netloc or urlparse(source["source"]).path
            if domain:
                favicon_url = f"https://{domain}/favicon.ico"
            else:
                favicon_url = ""
            source["favicon"] = favicon_url
            print(f"Added favicon for source '{source['title']}': {favicon_url}")

    list_of_data = [Data.model_validate(item) for item in items]

    return list_of_data
