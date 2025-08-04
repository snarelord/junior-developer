import re
from fastapi.testclient import TestClient
from main import app 

client = TestClient(app)

def test_get_data():
    response = client.get("/data")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    
    for item in data:
        assert "category" in item
        assert "content" in item
        assert "sources" in item
        assert isinstance(item["sources"], list)
        
        for source in item["sources"]:
            assert "favicon" in source
            favicon = source["favicon"]
            assert isinstance(favicon, str)
            if favicon:
                assert favicon.startswith("http")
        
        assert not re.search(r"<ref>.*?</ref>", item["content"])
        assert re.search(r'<a href=".*?" target="_blank" rel="noopener noreferrer">.*?</a>', item["content"])

def test_ref_replacement():
    response = client.get("/data")
    data = response.json()
    for item in data:
        assert "<ref>" not in item["content"]
        if "sources" in item and item["sources"]:
            assert ("<a href=" in item["content"])
