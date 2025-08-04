from pydantic import BaseModel
from typing import Optional


class Source(BaseModel):
    id: str
    title: str
    source: str
    favicon: Optional[str] = None

class Data(BaseModel):
    category: str
    sources: list[Source]
    content: str
