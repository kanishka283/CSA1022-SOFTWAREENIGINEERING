from app import app

def test_home():
    c = app.test_client()
    r = c.get("/")
    assert r.status_code == 200

def test_health():
    c = app.test_client()
    assert c.get("/health").json["status"] == "healthy"
